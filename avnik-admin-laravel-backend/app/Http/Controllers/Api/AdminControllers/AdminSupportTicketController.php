<?php

namespace App\Http\Controllers\Api\AdminControllers;

use App\Http\Controllers\Controller;
use App\Models\Support\SupportTicket;
use App\Models\Support\TicketMessage;
use App\Models\User;
use Auth;
use Carbon\Carbon;
use DB;

class AdminSupportTicketController extends Controller
{
    /**
     * Get all support tickets (admin view)
     */
    public function getAllTickets()
    {
        try {
            $pageNo = request('pageNo') ?? 1;
            $filterBy = request('filterBy') ?? 'All';
            $priorityFilter = request('priorityFilter') ?? 'All';
            $searchQuery = request('searchQuery') ?? '';
            $limit = 15;

            $query = SupportTicket::with([
                'messages' => function($q) {
                    $q->orderBy('created_at', 'desc')->limit(1);
                },
                'user:id,name,email'
            ])->orderBy('created_at', 'desc');

            // Apply status filter
            if ($filterBy != 'All') {
                $query->where('status', $filterBy);
            }

            // Apply priority filter
            if ($priorityFilter != 'All') {
                $query->where('priority', $priorityFilter);
            }

            // Apply search
            if (!empty($searchQuery)) {
                $query->where(function($q) use ($searchQuery) {
                    $q->where('title', 'LIKE', '%' . $searchQuery . '%')
                      ->orWhere('description', 'LIKE', '%' . $searchQuery . '%')
                      ->orWhere('ticket_id', 'LIKE', '%' . $searchQuery . '%')
                      ->orWhereHas('user', function($u) use ($searchQuery) {
                          $u->where('name', 'LIKE', '%' . $searchQuery . '%')
                            ->orWhere('email', 'LIKE', '%' . $searchQuery . '%');
                      });
                });
            }

            $total = $query->count();
            $tickets = $query->paginate($limit, ['*'], 'page', $pageNo);

            return response()->json([
                'success' => true,
                'data' => $tickets->items(),
                'pagination' => [
                    'total' => $total,
                    'per_page' => $limit,
                    'current_page' => $pageNo,
                    'last_page' => $tickets->lastPage(),
                ],
                'stats' => [
                    'open' => SupportTicket::where('status', 'Open')->count(),
                    'in_progress' => SupportTicket::where('status', 'In Progress')->count(),
                    'resolved' => SupportTicket::where('status', 'Resolved')->count(),
                    'closed' => SupportTicket::where('status', 'Closed')->count(),
                ],
                'message' => 'Tickets retrieved successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error retrieving tickets: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get ticket details for admin
     */
    public function getTicketDetails($ticketId)
    {
        try {
            $ticket = SupportTicket::where('id', $ticketId)
                ->with([
                    'messages' => function($q) {
                        $q->orderBy('created_at', 'asc');
                    },
                    'user:id,name,email,user_profile_id',
                    'messages.user:id,name,email,user_profile_id'
                ])
                ->first();

            if (!$ticket) {
                return response()->json([
                    'success' => false,
                    'message' => 'Ticket not found'
                ], 404);
            }

            return response()->json([
                'success' => true,
                'data' => $ticket,
                'message' => 'Ticket details retrieved successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error retrieving ticket: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Add admin response to ticket
     */
    public function addAdminResponse()
    {
        try { 
            $admin =  Auth::user();
            
            $validated = request()->validate([
                'ticket_id' => 'required|exists:support_tickets,id',
                'message' => 'required|string|max:5000',
                'attachment' => 'nullable|file|max:5120'
            ]);

            $ticket = SupportTicket::where('id', $validated['ticket_id'])->first();

            if (!$ticket) {
                return response()->json([
                    'success' => false,
                    'message' => 'Ticket not found'
                ], 404);
            }

            $attachment_path = null;
            if (request()->hasFile('attachment')) {
                $file = request()->file('attachment');
                $path = $file->store('support_attachments', 'public');
                $attachment_path = $path;
            }

            $message = TicketMessage::create([
                'ticket_id' => $validated['ticket_id'],
                'user_id' => $admin->id,
                'message' => $validated['message'],
                'attachment' => $attachment_path,
                'message_type' => 'admin',
                'created_at' => Carbon::now('UTC'),
            ]);

            // Broadcast notification to user
            broadcast(new \App\Events\AdminSupportResponse($ticket, $message))->toOthers();

            return response()->json([
                'success' => true,
                'data' => $message->load('user:id,name,email'),
                'message' => 'Response added successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error adding response: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Update ticket status
     */
    public function updateTicketStatus()
    {
        try {
            $validated = request()->validate([
                'ticket_id' => 'required|exists:support_tickets,id',
                'status' => 'required|in:Open,In Progress,Resolved,Closed'
            ]);

            $ticket = SupportTicket::where('id', $validated['ticket_id'])->first();

            if (!$ticket) {
                return response()->json([
                    'success' => false,
                    'message' => 'Ticket not found'
                ], 404);
            }

            $ticket->update([
                'status' => $validated['status'],
                'resolved_at' => $validated['status'] === 'Resolved' ? Carbon::now('UTC') : null,
                'closed_at' => $validated['status'] === 'Closed' ? Carbon::now('UTC') : null,
            ]);

            // Broadcast status update
            broadcast(new \App\Events\TicketStatusUpdated($ticket))->toOthers();

            return response()->json([
                'success' => true,
                'data' => $ticket,
                'message' => 'Ticket status updated successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error updating status: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Update ticket priority
     */
    public function updateTicketPriority()
    {
        try {
            $validated = request()->validate([
                'ticket_id' => 'required|exists:support_tickets,id',
                'priority' => 'required|in:Low,Medium,High,Critical'
            ]);

            $ticket = SupportTicket::where('id', $validated['ticket_id'])->first();

            if (!$ticket) {
                return response()->json([
                    'success' => false,
                    'message' => 'Ticket not found'
                ], 404);
            }

            $ticket->update(['priority' => $validated['priority']]);

            return response()->json([
                'success' => true,
                'data' => $ticket,
                'message' => 'Ticket priority updated successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error updating priority: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Assign ticket to admin
     */
    public function assignTicket()
    {
        try {
            $validated = request()->validate([
                'ticket_id' => 'required|exists:support_tickets,id',
                'assigned_to' => 'required|exists:users,id'
            ]);

            $ticket = SupportTicket::where('id', $validated['ticket_id'])->first();

            if (!$ticket) {
                return response()->json([
                    'success' => false,
                    'message' => 'Ticket not found'
                ], 404);
            }

            $ticket->update(['assigned_to' => $validated['assigned_to']]);

            return response()->json([
                'success' => true,
                'data' => $ticket,
                'message' => 'Ticket assigned successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error assigning ticket: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get ticket statistics
     */
    public function getTicketStats()
    {
        try {
            $stats = [
                'total' => SupportTicket::count(),
                'open' => SupportTicket::where('status', 'Open')->count(),
                'in_progress' => SupportTicket::where('status', 'In Progress')->count(),
                'resolved' => SupportTicket::where('status', 'Resolved')->count(),
                'closed' => SupportTicket::where('status', 'Closed')->count(),
                'critical' => SupportTicket::where('priority', 'Critical')->count(),
                'high' => SupportTicket::where('priority', 'High')->count(),
                'avg_resolution_time' => SupportTicket::where('status', 'Resolved')
                    ->whereNotNull('resolved_at')
                    ->selectRaw('AVG(TIMESTAMPDIFF(HOUR, created_at, resolved_at)) as avg_time')
                    ->first()
                    ->avg_time ?? 0,
            ];

            return response()->json([
                'success' => true,
                'data' => $stats,
                'message' => 'Statistics retrieved successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error retrieving stats: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Close ticket (admin)
     */
    public function closeTicket()
    {
        try {
            $validated = request()->validate([
                'ticket_id' => 'required|exists:support_tickets,id'
            ]);

            $ticket = SupportTicket::where('id', $validated['ticket_id'])->first();

            if (!$ticket) {
                return response()->json([
                    'success' => false,
                    'message' => 'Ticket not found'
                ], 404);
            }

            $ticket->update(['status' => 'Closed', 'closed_at' => Carbon::now('UTC')]);

            broadcast(new \App\Events\TicketStatusUpdated($ticket))->toOthers();

            return response()->json([
                'success' => true,
                'data' => $ticket,
                'message' => 'Ticket closed successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error closing ticket: ' . $e->getMessage()
            ], 500);
        }
    }
}

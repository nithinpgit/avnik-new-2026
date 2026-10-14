<?php

namespace App\Http\Controllers\Api\UserControllers;

use App\Http\Controllers\Controller;
use App\Models\Support\SupportTicket;
use App\Models\Support\TicketMessage;
use App\Models\User;
use DB;
use Auth;
use Carbon\Carbon;

class SupportTicketController extends Controller
{
    /**
     * Get all support tickets for authenticated user
     */
    public function getTickets()
    {
        try {
            $user = Auth::user();
            $pageNo = request('pageNo') ?? 1;
            $filterBy = request('filterBy') ?? 'All';
            $searchQuery = request('searchQuery') ?? '';
            $limit = 15;

            $query = SupportTicket::where('user_id', $user->id)
                ->with([
                    'messages' => function($q) {
                        $q->orderBy('created_at', 'desc')->limit(1);
                    },
                    'user:id,name,email'
                ])
                ->orderBy('created_at', 'desc');

            // Apply status filter
            if ($filterBy != 'All') {
                $query->where('status', $filterBy);
            }

            // Apply search
            if (!empty($searchQuery)) {
                $query->where(function($q) use ($searchQuery) {
                    $q->where('title', 'LIKE', '%' . $searchQuery . '%')
                      ->orWhere('description', 'LIKE', '%' . $searchQuery . '%')
                      ->orWhere('ticket_id', 'LIKE', '%' . $searchQuery . '%');
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
     * Create a new support ticket
     */
    public function createTicket()
    {
        try {
            $user = Auth::user();
            
            $validated = request()->validate([
                'title' => 'required|string|max:255',
                'category' => 'required|string|in:Technical,Payment,Booking,Profile,Other',
                'priority' => 'required|string|in:Low,Medium,High,Critical',
                'description' => 'required|string|max:5000',
                'attachment' => 'nullable|file|max:5120'
            ]);

            $attachment_path = null;
            if (request()->hasFile('attachment')) {
                $file = request()->file('attachment');
                $path = $file->store('support_attachments', 'public');
                $attachment_path = $path;
            }

            $ticket_id = 'TKT-' . strtoupper(uniqid());

            $ticket = SupportTicket::create([
                'user_id' => $user->id,
                'ticket_id' => $ticket_id,
                'title' => $validated['title'],
                'category' => $validated['category'],
                'priority' => $validated['priority'],
                'description' => $validated['description'],
                'attachment' => $attachment_path,
                'status' => 'Open',
                'created_at' => Carbon::now('UTC'),
            ]);

            // Create initial message
            TicketMessage::create([
                'ticket_id' => $ticket->id,
                'user_id' => $user->id,
                'message' => $validated['description'],
                'attachment' => $attachment_path,
                'message_type' => 'user',
                'created_at' => Carbon::now('UTC'),
            ]);

            return response()->json([
                'success' => true,
                'data' => $ticket,
                'message' => 'Support ticket created successfully! Ticket ID: ' . $ticket_id
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error creating ticket: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get ticket details with all messages
     */
    public function getTicketDetails($ticketId)
    {
        try {
            $user = Auth::user();
            
            $ticket = SupportTicket::where('user_id', $user->id)
                ->where('id', $ticketId)
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

            // Mark ticket as read
            $ticket->update(['is_read' => 1]);

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
     * Add message to support ticket
     */
    public function addMessage()
    {
        try {
            $user = Auth::user();
            
            $validated = request()->validate([
                'ticket_id' => 'required|exists:support_tickets,id',
                'message' => 'required|string|max:5000',
                'attachment' => 'nullable|file|max:5120'
            ]);

            $ticket = SupportTicket::where('user_id', $user->id)
                ->where('id', $validated['ticket_id'])
                ->first();

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
                'user_id' => $user->id,
                'message' => $validated['message'],
                'attachment' => $attachment_path,
                'message_type' => 'user',
                'created_at' => Carbon::now('UTC'),
            ]);

            // Reopen ticket if it was closed
            if ($ticket->status == 'Closed') {
                $ticket->update(['status' => 'Reopened']);
            }

            // Broadcast notification
            broadcast(new \App\Events\SupportTicketUpdated($ticket))->toOthers();

            return response()->json([
                'success' => true,
                'data' => $message->load('user:id,name,email'),
                'message' => 'Message added successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error adding message: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Close support ticket
     */
    public function closeTicket()
    {
        try {
            $user = Auth::user();
            $ticket_id = request('ticket_id');

            $ticket = SupportTicket::where('user_id', $user->id)
                ->where('id', $ticket_id)
                ->first();

            if (!$ticket) {
                return response()->json([
                    'success' => false,
                    'message' => 'Ticket not found'
                ], 404);
            }

            $ticket->update(['status' => 'Closed', 'closed_at' => Carbon::now('UTC')]);

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

    /**
     * Reopen support ticket
     */
    public function reopenTicket()
    {
        try {
            $user = Auth::user();
            $ticket_id = request('ticket_id');

            $ticket = SupportTicket::where('user_id', $user->id)
                ->where('id', $ticket_id)
                ->first();

            if (!$ticket) {
                return response()->json([
                    'success' => false,
                    'message' => 'Ticket not found'
                ], 404);
            }

            $ticket->update(['status' => 'Reopened', 'closed_at' => null]);

            return response()->json([
                'success' => true,
                'data' => $ticket,
                'message' => 'Ticket reopened successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error reopening ticket: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get unread tickets count
     */
    public function getUnreadCount()
    {
        try {
            $user = Auth::user();
            $count = SupportTicket::where('user_id', $user->id)
                ->where('is_read', 0)
                ->count();

            return response()->json([
                'success' => true,
                'data' => ['unread_count' => $count]
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error retrieving count: ' . $e->getMessage()
            ], 500);
        }
    }
}

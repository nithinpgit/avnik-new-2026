<?php

namespace App\Models\Support;

use Illuminate\Database\Eloquent\Model;

class SupportTicket extends Model
{

    protected $table = 'support_tickets';

    protected $fillable = [
        'user_id',
        'ticket_id',
        'title',
        'category',
        'priority',
        'description',
        'attachment',
        'status',
        'assigned_to',
        'is_read',
        'created_at',
        'resolved_at',
        'closed_at'
    ];

    protected $dates = [
        'created_at',
        'updated_at',
        'resolved_at',
        'closed_at'
    ];

    protected $casts = [
        'is_read' => 'boolean',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
        'resolved_at' => 'datetime',
        'closed_at' => 'datetime'
    ];

    /**
     * Relationships
     */
    public function user()
    {
        return $this->belongsTo(\App\User::class);
    }

    public function assignedTo()
    {
        return $this->belongsTo(\App\User::class, 'assigned_to');
    }

    public function messages()
    {
        return $this->hasMany(TicketMessage::class, 'ticket_id');
    }

    /**
     * Scopes
     */
    public function scopeOpen($query)
    {
        return $query->where('status', 'Open');
    }

    public function scopeInProgress($query)
    {
        return $query->where('status', 'In Progress');
    }

    public function scopeResolved($query)
    {
        return $query->where('status', 'Resolved');
    }

    public function scopeClosed($query)
    {
        return $query->where('status', 'Closed');
    }

    public function scopeUnread($query)
    {
        return $query->where('is_read', 0);
    }

    public function scopePriority($query, $priority)
    {
        return $query->where('priority', $priority);
    }

    public function scopeByCategory($query, $category)
    {
        return $query->where('category', $category);
    }

    /**
     * Accessors
     */
    public function getUnreadMessagesCountAttribute()
    {
        return $this->messages()->where('message_type', 'admin')->where('is_read', 0)->count();
    }

    public function getResolutionTimeAttribute()
    {
        if ($this->resolved_at && $this->created_at) {
            return $this->resolved_at->diffInHours($this->created_at);
        }
        return null;
    }
}

<?php

namespace App\Models\Support;

use Illuminate\Database\Eloquent\Model;

class TicketMessage extends Model
{

    protected $table = 'ticket_messages';

    protected $fillable = [
        'ticket_id',
        'user_id',
        'message',
        'attachment',
        'message_type',
        'is_read',
        'created_at'
    ];

    protected $dates = [
        'created_at',
        'updated_at'
    ];

    protected $casts = [
        'is_read' => 'boolean',
        'created_at' => 'datetime',
        'updated_at' => 'datetime'
    ];

    /**
     * Relationships
     */
    public function ticket()
    {
        return $this->belongsTo(SupportTicket::class, 'ticket_id');
    }

    public function user()
    {
        return $this->belongsTo(\App\User::class);
    }

    /**
     * Scopes
     */
    public function scopeAdminMessages($query)
    {
        return $query->where('message_type', 'admin');
    }

    public function scopeUserMessages($query)
    {
        return $query->where('message_type', 'user');
    }

    public function scopeUnread($query)
    {
        return $query->where('is_read', 0);
    }
}

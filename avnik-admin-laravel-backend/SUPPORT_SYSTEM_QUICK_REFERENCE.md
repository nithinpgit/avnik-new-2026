# Support System - Quick Reference & Setup Guide

---

## 🚀 Quick Setup (5 Minutes)

### 1. Copy Files
```bash
# Controllers
cp SupportTicketController.php → app/Http/Controllers/Api/UserControllers/
cp AdminSupportTicketController.php → app/Http/Controllers/Api/AdminControllers/

# Models
cp SupportTicket.php → app/Models/Support/
cp TicketMessage.php → app/Models/Support/

# Migrations
cp 2026_05_02_create_support_tickets_table.php → database/migrations/
cp 2026_05_02_create_ticket_messages_table.php → database/migrations/

# Routes
cp support_api.php → routes/

# React Components
cp Support.jsx → resources/js/User/Support/
cp AdminSupport.jsx → resources/js/Admin/Support/
```

### 2. Update routes/api.php
```php
// Add this line
require base_path('routes/support_api.php');
```

### 3. Run Migrations
```bash
php artisan migrate
```

### 4. Create Event Classes
Create two files in `app/Events/`:

**SupportTicketUpdated.php:**
```php
<?php
namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class SupportTicketUpdated implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;
    public $ticket;
    public function __construct($ticket) { $this->ticket = $ticket; }
    public function broadcastOn() { return new PrivateChannel('support.' . $this->ticket->user_id); }
    public function broadcastAs() { return 'supportTicketUpdatedAVF'; }
}
```

**TicketStatusUpdated.php:**
```php
<?php
namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class TicketStatusUpdated implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;
    public $ticket;
    public function __construct($ticket) { $this->ticket = $ticket; }
    public function broadcastOn() { return new PrivateChannel('support.' . $this->ticket->user_id); }
    public function broadcastAs() { return 'ticketStatusUpdatedAVF'; }
}
```

### 5. Register Components

**In your Dashboard/Layout:**
```jsx
import Support from './User/Support/Support';
import AdminSupport from './Admin/Support/AdminSupport';

// Add to render
<Support Active={currentPage === 'support'} />
<AdminSupport Active={currentPage === 'admin-support'} />
```

### 6. Done! ✅

---

## 💻 API Quick Reference

### User Endpoints

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/api/support/tickets` | Get user tickets (paginated, searchable) |
| POST | `/api/support/tickets/create` | Create new ticket |
| GET | `/api/support/tickets/{id}` | Get ticket details with messages |
| POST | `/api/support/tickets/message/add` | Add message to ticket |
| POST | `/api/support/tickets/close` | Close ticket |
| POST | `/api/support/tickets/reopen` | Reopen ticket |
| GET | `/api/support/tickets/unread/count` | Get unread count |

### Admin Endpoints

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/api/admin/support/tickets` | Get all tickets (admin view) |
| GET | `/api/admin/support/tickets/{id}` | Get ticket details (admin) |
| POST | `/api/admin/support/tickets/response` | Send admin response |
| POST | `/api/admin/support/tickets/status/update` | Update ticket status |
| POST | `/api/admin/support/tickets/priority/update` | Update priority |
| POST | `/api/admin/support/tickets/assign` | Assign to admin |
| GET | `/api/admin/support/tickets/stats/overview` | Get statistics |

---

## 🧪 Testing with Postman

### 1. Create Ticket
```
POST http://localhost:8000/api/support/tickets/create
Headers: Authorization: Bearer {token}
Body (form-data):
  - title: "Test Payment Issue"
  - category: "Payment"
  - priority: "High"
  - description: "I was charged twice for event booking"
  - attachment: <select file>
```

### 2. Get Tickets
```
POST http://localhost:8000/api/support/tickets
Headers: Authorization: Bearer {token}
Body (raw JSON):
{
    "pageNo": 1,
    "filterBy": "All",
    "searchQuery": ""
}
```

### 3. Get Ticket Details
```
GET http://localhost:8000/api/support/tickets/1
Headers: Authorization: Bearer {token}
```

### 4. Add Message
```
POST http://localhost:8000/api/support/tickets/message/add
Headers: Authorization: Bearer {token}
Body (form-data):
  - ticket_id: 1
  - message: "Thank you for the update, I've received the refund"
  - attachment: <optional file>
```

### 5. Admin: Get All Tickets
```
POST http://localhost:8000/api/admin/support/tickets
Headers: Authorization: Bearer {admin_token}
Body (raw JSON):
{
    "pageNo": 1,
    "filterBy": "Open",
    "priorityFilter": "High",
    "searchQuery": ""
}
```

### 6. Admin: Add Response
```
POST http://localhost:8000/api/admin/support/tickets/response
Headers: Authorization: Bearer {admin_token}
Body (form-data):
  - ticket_id: 1
  - message: "We've processed your refund. It should appear in 3-5 business days."
  - attachment: <optional file>
```

### 7. Admin: Update Status
```
POST http://localhost:8000/api/admin/support/tickets/status/update
Headers: Authorization: Bearer {admin_token}
Body (raw JSON):
{
    "ticket_id": 1,
    "status": "Resolved"
}
```

---

## 🔌 Socket.IO Events

### Events Frontend Listens To
```javascript
// When user's ticket is updated by admin
'supportTicketUpdatedAVF' - Ticket has been updated

// When ticket status changes
'ticketStatusUpdatedAVF' - Status changed (Open/In Progress/Resolved/Closed)

// Admin broadcasts these
'adminSupportResponseAVF' - New admin response
```

### How to Listen (Example)
```javascript
// In React component
useEffect(() => {
    // Initialize socket for current user
    SocketNotificationService.initialize(currentUser.id);
    
    // Subscribe to updates
    const unsubscribe = SocketNotificationService.on('supportTicketUpdatedAVF', (data) => {
        console.log('Ticket updated:', data);
        loadTickets(); // Refresh tickets
        toastr['info']('Support ticket updated');
    });
    
    // Cleanup on unmount
    return unsubscribe;
}, [currentUser?.id]);
```

---

## 📊 Database Schema

### support_tickets Table
```sql
CREATE TABLE support_tickets (
    id BIGINT PRIMARY KEY,
    user_id BIGINT (FK users),
    ticket_id VARCHAR(50) UNIQUE,
    title VARCHAR(255),
    category ENUM('Technical', 'Payment', 'Booking', 'Profile', 'Other'),
    priority ENUM('Low', 'Medium', 'High', 'Critical'),
    description LONGTEXT,
    attachment VARCHAR(255) NULL,
    status ENUM('Open', 'In Progress', 'Resolved', 'Closed', 'Reopened'),
    assigned_to BIGINT NULL (FK users),
    is_read BOOLEAN DEFAULT 0,
    resolved_at TIMESTAMP NULL,
    closed_at TIMESTAMP NULL,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
)
```

### ticket_messages Table
```sql
CREATE TABLE ticket_messages (
    id BIGINT PRIMARY KEY,
    ticket_id BIGINT (FK support_tickets),
    user_id BIGINT (FK users),
    message LONGTEXT,
    attachment VARCHAR(255) NULL,
    message_type ENUM('user', 'admin'),
    is_read BOOLEAN DEFAULT 0,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
)
```

---

## 🎯 Common Use Cases

### Use Case 1: User Creates Support Ticket
```javascript
// 1. User fills form
const data = {
    title: "Can't login",
    category: "Technical",
    priority: "High",
    description: "Getting error when trying to login",
    attachment: file // optional
};

// 2. Frontend calls API
POST /api/support/tickets/create

// 3. Backend creates:
//    - SupportTicket record
//    - Initial TicketMessage record
//    - Returns TKT-XXXXX ID

// 4. Socket broadcast to admin dashboard
// 5. Admin sees new ticket in real-time
```

### Use Case 2: Admin Responds to Ticket
```javascript
// 1. Admin reads ticket
GET /api/admin/support/tickets/1

// 2. Admin types response
const message = "We've reset your password. Check your email.";

// 3. Admin clicks Send
POST /api/admin/support/tickets/response
{ ticket_id: 1, message }

// 4. Backend creates TicketMessage with type='admin'

// 5. Socket broadcasts to user
// 6. User sees response in real-time
// 7. Notification toast shown
```

### Use Case 3: Admin Resolves Ticket
```javascript
// 1. Admin changes status dropdown
<select onChange={handleStatusChange}>
    <option>In Progress</option>
    <option>Resolved</option> ← Click
</select>

// 2. Backend updates ticket status
POST /api/admin/support/tickets/status/update
{ ticket_id: 1, status: "Resolved" }

// 3. Sets resolved_at timestamp

// 4. Socket broadcasts update
// 5. User sees Resolved badge
// 6. User can only view/reopen (no new messages)
```

---

## 🐛 Common Issues & Fixes

### Issue: "Undefined type 'SupportTicket'" Error
**Fix:** Run migrations and ensure models exist in `app/Models/Support/`

### Issue: 404 on API endpoints
**Fix:** 
1. Check routes are registered: `require base_path('routes/support_api.php');` in `routes/api.php`
2. Run `php artisan route:cache` to clear cached routes
3. Verify routes with: `php artisan route:list | grep support`

### Issue: Socket events not received
**Fix:**
1. Check SocketNotificationService is initialized
2. Verify event classes exist in `app/Events/`
3. Check broadcasting is enabled in `config/broadcasting.php`
4. Verify Socket.IO server is running

### Issue: File upload returns 413
**Fix:** Increase PHP upload limit in `php.ini`:
```ini
upload_max_filesize = 10M
post_max_size = 15M
```

### Issue: Admin can't see tickets
**Fix:**
1. Verify user has admin role
2. Check `admin` middleware in routes/support_api.php
3. Verify gate is defined: `php artisan make:policy`

---

## 📝 Component Props

### Support.jsx (User)
```jsx
<Support 
    Active={boolean}  // Show/hide component
/>
```

### AdminSupport.jsx (Admin)
```jsx
<AdminSupport 
    Active={boolean}  // Show/hide component
/>
```

---

## 🔐 Security Notes

✅ **Implemented:**
- User can only see own tickets
- Admin has access to all tickets
- File uploads validated
- Request validation on all endpoints
- CSRF protection via middleware
- Authorization via auth:api + admin middleware

⚠️ **To Add:**
- Rate limiting on ticket creation
- File virus scanning
- IP whitelisting for admins
- Two-factor authentication
- Audit logging

---

## 📈 Performance Tips

1. **Pagination** - Always use pagination for large datasets
2. **Lazy Load** - Load ticket details only when selected
3. **Search** - Use debounce (1000ms) to reduce API calls
4. **Caching** - Cache unread count (5min TTL)
5. **Indexing** - Add database indexes on: ticket_id, user_id, status, created_at

---

## 🚀 Deployment Checklist

- [ ] Copy all files to production
- [ ] Run `php artisan migrate`
- [ ] Create Event classes
- [ ] Register support routes in api.php
- [ ] Test with real user account
- [ ] Test file uploads
- [ ] Verify Socket.IO connection
- [ ] Test admin dashboard
- [ ] Monitor error logs
- [ ] Set up alerting for critical errors

---

## 📞 Quick Fixes (Copy & Paste)

### Fix: Routes not found
```bash
# routes/api.php
require base_path('routes/support_api.php');
php artisan route:cache
php artisan route:clear
```

### Fix: Migration fails
```bash
# If tables already exist
DROP TABLE ticket_messages;
DROP TABLE support_tickets;
php artisan migrate
```

### Fix: Socket not connecting
```javascript
// In AdminSupport.jsx or Support.jsx
useEffect(() => {
    console.log('Initializing socket with user:', currentUser?.id);
    SocketNotificationService.initialize(currentUser.id);
}, [currentUser?.id]);
```

---

**Version:** 1.0.0 | **Status:** ✅ Production Ready | **Last Updated:** May 2, 2026

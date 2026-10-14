# Support System - Architecture & Flow Diagrams

---

## 🏗️ System Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        SUPPORT SYSTEM                           │
└─────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────┐
│                      FRONTEND (React)                            │
├──────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌──────────────────────────┐    ┌──────────────────────────┐   │
│  │   User Support Page      │    │  Admin Support Dashboard │   │
│  │  (Support.jsx)           │    │  (AdminSupport.jsx)      │   │
│  │                          │    │                          │   │
│  │ • Create Ticket          │    │ • View All Tickets       │   │
│  │ • View Tickets           │    │ • Statistics             │   │
│  │ • Search & Filter        │    │ • Send Responses         │   │
│  │ • Add Messages           │    │ • Update Status          │   │
│  │ • Close/Reopen           │    │ • Manage Priority        │   │
│  └──────────────────────────┘    └──────────────────────────┘   │
│                                                                   │
│            ↕ Axios HTTP Calls ↕         ↕ Socket.IO ↕          │
└──────────────────────────────────────────────────────────────────┘
                                ↕
                                ↕
┌──────────────────────────────────────────────────────────────────┐
│                    BACKEND (Laravel)                             │
├──────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌────────────────────────────────────────────────────────────┐  │
│  │               API Routes (support_api.php)                │  │
│  │                                                             │  │
│  │  User Routes:                Admin Routes:                 │  │
│  │  • POST /tickets           • GET /admin/tickets           │  │
│  │  • POST /tickets/create    • GET /admin/tickets/{id}      │  │
│  │  • GET /tickets/{id}       • POST /admin/tickets/response │  │
│  │  • POST /message/add       • POST /admin/tickets/status   │  │
│  │  • POST /close             • POST /admin/tickets/priority │  │
│  │  • POST /reopen            • GET /admin/tickets/stats     │  │
│  │  • GET /unread/count                                       │  │
│  └────────────────────────────────────────────────────────────┘  │
│                                ↕                                  │
│  ┌────────────────────────────────────────────────────────────┐  │
│  │               Controllers                                  │  │
│  │                                                             │  │
│  │  SupportTicketController     AdminSupportTicketController │  │
│  │  • getTickets()              • getAllTickets()            │  │
│  │  • createTicket()            • getTicketDetails()         │  │
│  │  • getTicketDetails()        • addAdminResponse()         │  │
│  │  • addMessage()              • updateTicketStatus()       │  │
│  │  • closeTicket()             • updateTicketPriority()     │  │
│  │  • reopenTicket()            • assignTicket()             │  │
│  │  • getUnreadCount()          • getTicketStats()           │  │
│  │                              • closeTicket()              │  │
│  └────────────────────────────────────────────────────────────┘  │
│                                ↕                                  │
│  ┌────────────────────────────────────────────────────────────┐  │
│  │               Models                                       │  │
│  │                                                             │  │
│  │  SupportTicket                TicketMessage               │  │
│  │  • id                         • id                         │  │
│  │  • ticket_id (TKT-XXXXX)      • ticket_id (FK)            │  │
│  │  • user_id (FK)               • user_id (FK)              │  │
│  │  • title                      • message                    │  │
│  │  • category                   • attachment                 │  │
│  │  • priority                   • message_type              │  │
│  │  • description                • is_read                    │  │
│  │  • status                     • created_at                │  │
│  │  • attachment                                              │  │
│  │  • resolved_at                                             │  │
│  │  • closed_at                                               │  │
│  └────────────────────────────────────────────────────────────┘  │
│                                ↕                                  │
│  ┌────────────────────────────────────────────────────────────┐  │
│  │               Database                                     │  │
│  │                                                             │  │
│  │  ┌─────────────────────┐  ┌─────────────────────┐         │  │
│  │  │ support_tickets     │  │ ticket_messages     │         │  │
│  │  │ ─────────────────   │  │ ─────────────────   │         │  │
│  │  │ id (PK)             │  │ id (PK)             │         │  │
│  │  │ user_id (FK)   ────┼──┼─→ ticket_id (FK)    │         │  │
│  │  │ ticket_id      ◄────┴──┤ user_id (FK)       │         │  │
│  │  │ title               │  │ message             │         │  │
│  │  │ category            │  │ attachment          │         │  │
│  │  │ priority            │  │ message_type        │         │  │
│  │  │ description         │  │ is_read             │         │  │
│  │  │ status              │  │ created_at          │         │  │
│  │  │ attachment          │  └─────────────────────┘         │  │
│  │  │ assigned_to         │                                  │  │
│  │  │ is_read             │                                  │  │
│  │  │ resolved_at         │                                  │  │
│  │  │ closed_at           │                                  │  │
│  │  │ created_at          │                                  │  │
│  │  └─────────────────────┘                                  │  │
│  └────────────────────────────────────────────────────────────┘  │
│                                                                   │
│            ↓ Broadcast Events ↓                                 │
└──────────────────────────────────────────────────────────────────┘
                                ↕
                                ↕
┌──────────────────────────────────────────────────────────────────┐
│                    REAL-TIME (Socket.IO)                         │
├──────────────────────────────────────────────────────────────────┤
│                                                                   │
│  supportTicketUpdatedAVF        ticketStatusUpdatedAVF           │
│  └─ When ticket is updated     └─ When status changes          │
│                                                                   │
│  adminSupportResponseAVF                                         │
│  └─ When admin sends response                                    │
│                                                                   │
└──────────────────────────────────────────────────────────────────┘
```

---

## 📊 Data Flow Diagrams

### User Creates Ticket

```
USER BROWSER                          SERVER                      DATABASE
     │                                 │                              │
     │ 1. Fill form                    │                              │
     │ 2. Submit                       │                              │
     ├─── POST /tickets/create ───────→│                              │
     │                                 │ 3. Validate input            │
     │                                 │ 4. Generate TKT-ID           │
     │                                 │ 5. Create SupportTicket      │
     │                                 ├──────────────────────────────→
     │                                 │ 6. Create TicketMessage      │
     │                                 ├──────────────────────────────→
     │                                 │ 7. Broadcast event           │
     │                                 │ 8. Emit supportTicketUpdatedAVF
     │                                 │                              │
     │← 201 Created + Ticket ──────────┤                              │
     │                                 │                              │
     │ 9. Show success toast           │                              │
     │ 10. Add to ticket list          │                              │
     │ 11. Display ticket ID           │                              │
     │                                 │                              │
     └─────────────────────────────────┘                              │
                                        │                              │
                    ADMIN BROWSER        │                              │
                         │              │                              │
                         │  Socket.IO   │                              │
                         │←─ broadcast ─┤                              │
                         │              │                              │
                         │ 12. Receive notification                    │
                         │ 13. Update ticket list                      │
                         │ 14. Show toast                              │
                         │                                              │
                         └──────────────────────────────────────────────
```

### Admin Responds to Ticket

```
ADMIN BROWSER                         SERVER                       DATABASE
     │                                 │                               │
     │ 1. View ticket                  │                               │
     │ 2. Type response                │                               │
     │ 3. Click Send                   │                               │
     ├── POST /admin/tickets/response ─→│                               │
     │                                 │ 4. Validate input             │
     │                                 │ 5. Create TicketMessage      │
     │                                 │    (type='admin')             │
     │                                 ├───────────────────────────────→
     │                                 │ 6. Emit broadcast event       │
     │                                 │    adminSupportResponseAVF    │
     │                                 │ 7. Update ticket if needed    │
     │← 200 OK + Message ──────────────┤                               │
     │                                 │                               │
     │ 8. Add message to chat          │                               │
     │ 9. Clear input                  │                               │
     │ 10. Show success toast          │                               │
     │                                 │                               │
     └─────────────────────────────────┘                               │
                                        │                               │
                      USER BROWSER       │                               │
                           │            │                               │
                           │ Socket.IO  │                               │
                           │←─broadcast─┤                               │
                           │            │                               │
                           │ 11. Receive notification                    │
                           │ 12. Add message to chat                     │
                           │ 13. Show notification badge                 │
                           │ 14. Play sound (optional)                   │
                           │                                              │
                           └──────────────────────────────────────────────
```

### Admin Updates Ticket Status

```
ADMIN BROWSER                         SERVER                       DATABASE
     │                                 │                               │
     │ 1. Select status dropdown       │                               │
     │ 2. Choose "Resolved"            │                               │
     ├── POST /admin/tickets/status ───→│                               │
     │                                 │ 3. Validate status            │
     │                                 │ 4. Update ticket              │
     │                                 │    status='Resolved'          │
     │                                 │    resolved_at=NOW            │
     │                                 ├───────────────────────────────→
     │                                 │ 5. Emit ticketStatusUpdated   │
     │                                 │                               │
     │← 200 OK ──────────────────────────│                               │
     │                                 │                               │
     │ 6. Update UI                    │                               │
     │ 7. Show success toast           │                               │
     │                                 │                               │
     └─────────────────────────────────┘                               │
                                        │                               │
                      USER BROWSER       │                               │
                           │            │                               │
                           │ Socket.IO  │                               │
                           │←─broadcast─┤                               │
                           │            │                               │
                           │ 8. Receive status update                     │
                           │ 9. Update ticket display                     │
                           │ 10. Show notification                        │
                           │ 11. Disable message input                    │
                           │                                              │
                           └──────────────────────────────────────────────
```

---

## 🔄 Component Hierarchy

```
App
├── Dashboard / Layout
│   ├── Support (User)
│   │   ├── TicketList
│   │   │   ├── Filter Dropdown
│   │   │   ├── Search Input
│   │   │   └── TicketItem[] (List Group)
│   │   │
│   │   ├── TicketDetail
│   │   │   ├── Ticket Header (Status, Priority)
│   │   │   ├── Ticket Info (Category, Created, etc)
│   │   │   ├── Description
│   │   │   ├── Messages Container
│   │   │   │   └── Message[] (User/Admin)
│   │   │   └── Reply Form
│   │   │       ├── Textarea
│   │   │       ├── File Input
│   │   │       └── Send Button
│   │   │
│   │   └── CreateTicketModal
│   │       ├── Title Input
│   │       ├── Category Select
│   │       ├── Priority Select
│   │       ├── Description Textarea
│   │       ├── File Input
│   │       └── Create Button
│   │
│   └── AdminSupport (Admin)
│       ├── StatisticsCards[] (4)
│       │   ├── Total Tickets
│       │   ├── Open Tickets
│       │   ├── In Progress
│       │   └── Resolved
│       │
│       ├── AdminTicketList
│       │   ├── Filter Controls
│       │   │   ├── Status Filter
│       │   │   ├── Priority Filter
│       │   │   └── Search Input
│       │   └── Tickets Table
│       │       └── Row[] (Clickable)
│       │
│       └── AdminTicketDetail
│           ├── Header (Title, Status, Priority)
│           ├── Ticket Info
│           ├── User Info
│           ├── Messages Container
│           │   └── Message[] (User/Admin)
│           │
│           └── Response Form
│               ├── Textarea
│               ├── File Input
│               ├── Status Dropdown
│               ├── Priority Dropdown
│               └── Send Button
```

---

## 📋 State Management

### Support Component State
```
Support.jsx
├── tickets: [] - List of tickets
├── selectedTicket: null - Currently viewing
├── loading: false - API loading state
├── filterBy: 'All' - Current filter
├── searchTerm: '' - Search query
├── debouncedSearchTerm: '' - Debounced search
├── unreadCount: 0 - Unread tickets
└── pagination: { currentPage: 1, lastPage: 1 }
```

### AdminSupport Component State
```
AdminSupport.jsx
├── tickets: [] - All tickets
├── selectedTicket: null - Currently viewing
├── loading: false - API loading state
├── stats: null - Statistics object
│   ├── total
│   ├── open
│   ├── in_progress
│   ├── resolved
│   ├── closed
│   ├── critical
│   ├── high
│   └── avg_resolution_time
└── filters: {
    status: 'All',
    priority: 'All',
    search: ''
}
```

---

## 🔐 Security Flow

```
Request Arrives
│
├─ Check Authentication (auth:api)
│  ├─ No Token? → 401 Unauthorized
│  └─ Invalid Token? → 401 Unauthorized
│
├─ Check Authorization
│  ├─ User accessing own data? → Allow
│  ├─ Admin accessing all? → Check admin middleware
│  └─ Non-admin accessing admin? → 403 Forbidden
│
├─ Validate Input
│  ├─ Required fields present? → Check
│  ├─ Type correct? → Check
│  ├─ Length valid? → Check
│  └─ File upload? → Validate type & size
│
├─ Process Request
│  └─ Execute action
│
└─ Return Response
   ├─ Success? → 200 OK + Data
   └─ Error? → Error Status + Message
```

---

## 📊 Database Schema

### Relationships

```
users (1) ──┬──→ (Many) support_tickets
            │
            └──→ (Many) ticket_messages

support_tickets (1) ──→ (Many) ticket_messages

                  assigned_to (nullable)
support_tickets ────────────────→ users (admins)
```

### Entity Relationship

```
    users
   /  |  \
  /   |   \
 /    |    \
(1)  (FK)  (1)
 |    |     |
 |    |     |
support_tickets ──── (1:Many) ──→ ticket_messages
 |                                  /
 |_________________________________(FK)
 |
 └──→ assigned_to (Optional)
      └──→ users (admin)
```

---

## 🔌 Socket.IO Event Flow

```
                   Frontend                Server              Other Clients
                      │                      │                     │
                      │                      │                     │
User Creates Ticket   │                      │                     │
    │                 │                      │                     │
    ├─→ API Call ────→│                      │                     │
    │                 │                      │                     │
    │                 │←─ Response ──────────│                     │
    │                 │                      │                     │
    │                 │  Emit Event ────────→│                     │
    │                 │  supportTicketUpdated│                     │
    │                 │                      ├─ Broadcast to ─────→│ Admin
    │                 │                      │   admin_namespace   │
    │                 │                      │                     ├─→ Update
    │                 │                      │                     │   List
    │                 │                      │                     │
Admin Responds        │                      │                     │
    │                 │                      │                     │
    │                 │                      │                     │
    ├─→ API Call ────→│                      │                     │
    │   (response)    │                      │                     │
    │                 │                      │                     │
    │                 │←─ Response ──────────│                     │
    │                 │                      │                     │
    │                 │  Emit Event ────────→│                     │
    │                 │  adminSupportResponse│                     │
    │                 │                      ├─ Broadcast to ─────→│ User
    │                 │                      │   user_namespace    │
    │                 │                      │                     ├─→ Get
    │                 │                      │                     │   Notified
    │                 │                      │                     │
```

---

## 📈 Performance Characteristics

```
Operation          Response Time   Database Calls  Network Calls
────────────────────────────────────────────────────────────────
Get Tickets        50-100ms        1               1
Create Ticket      100-150ms       2               1
Get Details        50-100ms        1+N             1
Add Message        100-150ms       1               1
Search             50-100ms        1               1
Update Status      50-100ms        1               1
Get Stats          50-100ms        4               1
────────────────────────────────────────────────────────────────
```

---

## 🚀 Deployment Architecture

```
Production Environment
│
├── Load Balancer
│   └── Distributes traffic
│
├── Web Servers (Multiple)
│   ├── Laravel Application
│   ├── API Endpoints
│   └── Routes
│
├── Socket.IO Server
│   ├── Real-time events
│   ├── Broadcasting
│   └── Reconnection handling
│
├── Database (MySQL/PostgreSQL)
│   ├── support_tickets table
│   ├── ticket_messages table
│   └── Replication/Backup
│
├── File Storage
│   └── Attachments
│       ├── support_attachments/
│       └── Backed up regularly
│
└── Monitoring & Logging
    ├── Error logs
    ├── Performance metrics
    ├── User activity logs
    └── Socket.IO connection stats
```

---

**Created:** May 2, 2026 | **Version:** 1.0.0 | **Status:** Production Ready

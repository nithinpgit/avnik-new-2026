
import React, { useEffect, useState, useContext } from 'react';
import ApiService from '../../ApiServer/ApiService';
import { FileManagerPath } from '../../ApiServer/UrlService';
import moment from 'moment';
import 'moment-timezone';


import CurrentUser from '../../components/UserContext/CurrentUserContext/CurrentUser';
import Axios from 'axios';
import { authHeader } from '../../ApiServer/Config';
import useDebounce from '../../components/Hooks/UseDebounce/UseDebounce';
import TopNavbar from '../../components/Navbar/Navbar';
import { InnerFooter } from '../../components/Footer/Footer';

// Support API Service
const SupportTicketAPI = {
    getTickets(data) {
        return Axios.post('/api/support/tickets', data, authHeader());
    },
    createTicket(data) {
        return Axios.post('/api/support/tickets/create', data, authHeader());
    },
    getTicketDetails(ticketId) {
        return Axios.get(`/api/support/tickets/${ticketId}`, authHeader());
    },
    addMessage(data) {
        return Axios.post('/api/support/tickets/message/add', data, authHeader());
    },
    closeTicket(ticketId) {
        return Axios.post('/api/support/tickets/close', { ticket_id: ticketId }, authHeader());
    },
    reopenTicket(ticketId) {
        return Axios.post('/api/support/tickets/reopen', { ticket_id: ticketId }, authHeader());
    },
    getUnreadCount() {
        return Axios.get('/api/support/tickets/unread/count', authHeader());
    }
};

// Ticket List Component
const TicketList = ({ tickets, onSelectTicket, loading, onFilterChange, filterBy, onSearch, searchTerm }) => {
    const getPriorityColor = (priority) => {
        const colors = {
            'Critical': '#dc3545',
            'High': '#fd7e14',
            'Medium': '#ffc107',
            'Low': '#28a745'
        };
        return colors[priority] || '#6c757d';
    };

    const getStatusBadge = (status) => {
        const statusClasses = {
            'Open': 'badge-primary',
            'In Progress': 'badge-info',
            'Resolved': 'badge-success',
            'Closed': 'badge-secondary',
            'Reopened': 'badge-warning'
        };
        return statusClasses[status] || 'badge-secondary';
    };

    return (
        <div className="inbox-users-list">
            <div className="list-header d-flex justify-content-between align-items-center mb-3">
                <h5 className="mb-0" style={{ fontWeight: 'bold' }}>Support Tickets</h5>
            </div>
            <div className="flex-container mb-3" style={{ display: 'flex', gap: '10px' }}>
                <div style={{ flexGrow: '1' }} className="flex-select-bx">
                    <div className="custom-select-bx">
                        <select 
                            className="form-control custom-select-bx"
                            value={filterBy}
                            onChange={(e) => onFilterChange(e.target.value)}
                        >
                            <option value="All">All Status</option>
                            <option value="Open">Open</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Resolved">Resolved</option>
                            <option value="Closed">Closed</option>
                        </select>
                    </div>
                </div>
                <div style={{ flexGrow: '1' }} className="flex-input-bx">
                    <div className="cmn-search-bx">
                        <input 
                            className="form-control"
                            type="search" 
                            placeholder="Search tickets..."
                            value={searchTerm}
                            onChange={(e) => onSearch(e.target.value)}
                        />
                        <button className="btn link-btn" type="submit"><i className="av av-search-icon"></i></button>
                    </div>
                </div>
            </div>

            <div className="inbox-meg-usr-bx" style={{ maxHeight: '600px', overflowY: 'auto' }}>
                {loading ? (
                    <div className="text-center py-5">
                        <i className="fa fa-spinner fa-spin fa-2x text-primary"></i>
                    </div>
                ) : tickets.length > 0 ? (
                    <ul>
                        {tickets.map((ticket) => (
                            <li 
                                key={ticket.id}
                                className="cursor-pointer"
                                onClick={() => onSelectTicket(ticket)}
                                style={{ 
                                    borderLeftColor: getPriorityColor(ticket.priority), 
                                    borderLeftWidth: '4px', 
                                    borderLeftStyle: 'solid',
                                    padding: '15px',
                                    borderBottom: '1px solid #e0e0e0',
                                    backgroundColor: '#fff'
                                }}
                            >
                                <div className="d-flex justify-content-between align-items-start">
                                    <div className="flex-grow-1">
                                        <div className="d-flex align-items-center mb-2">
                                            <h6 className="mb-0 mr-2" style={{ fontWeight: '600', color: '#333' }}>{ticket.title}</h6>
                                            <span className={`badge ${getStatusBadge(ticket.status)}`} style={{ fontSize: '0.75rem' }}>
                                                {ticket.status}
                                            </span>
                                            <span className="badge ml-2" style={{ backgroundColor: getPriorityColor(ticket.priority), color: 'white', fontSize: '0.75rem' }}>
                                                {ticket.priority}
                                            </span>
                                        </div>
                                        <p className="text-muted small mb-2" style={{ fontSize: '0.85rem' }}>
                                            {ticket.ticket_id} • {ticket.category}
                                        </p>
                                        <p className="text-truncate mb-0 small" style={{ color: '#666' }}>
                                            {ticket.description}
                                        </p>
                                    </div>
                                    <div className="text-right ml-3 text-muted small" style={{ fontSize: '0.85rem' }}>
                                        <p className="mb-0">
                                            {moment(ticket.created_at).format('MMM DD, YYYY')}
                                        </p>
                                        {ticket.messages && ticket.messages.length > 0 && (
                                            <p className="mb-0 text-primary mt-1" style={{ color: '#145388' }}>
                                                {ticket.messages.length} messages
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className="text-center py-5">
                        <i className="fa fa-inbox fa-3x text-muted mb-3"></i>
                        <p className="text-muted">No tickets found</p>
                    </div>
                )}
            </div>
        </div>
    );
};

// Create Ticket Modal Component
const CreateTicketModal = ({ onClose, onSubmit, loading }) => {
    const [formData, setFormData] = useState({
        title: '',
        category: 'Other',
        priority: 'Medium',
        description: '',
        attachment: null
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'attachment') {
            setFormData(prev => ({ ...prev, [name]: files[0] }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <div className="modal fade default-popup" id="createTicketModal" tabIndex="-1" role="dialog" aria-labelledby="createTicketModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-lg" role="document">
                <div className="modal-content">
                    <button type="button" className="close" onClick={onClose} aria-label="Close">
                        <span aria-hidden="true"><i className="av av-close-icon"></i></span>
                    </button>
                    <div className="modal-header">
                        <h2 className="modal-title" id="createTicketModalLabel">Create Support Ticket</h2>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="modal-body">
                            <div className="form-group">
                                <label className="form-label">Title *</label>
                                <input 
                                    type="text"
                                    className="form-control"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    required
                                    maxLength="255"
                                />
                            </div>

                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label className="form-label">Category *</label>
                                        <div className="custom-select-bx">
                                            <select 
                                                className="form-control custom-select-bx"
                                                name="category"
                                                value={formData.category}
                                                onChange={handleChange}
                                            >
                                                <option value="Technical">Technical Issue</option>
                                                <option value="Payment">Payment Issue</option>
                                                <option value="Booking">Booking Issue</option>
                                                <option value="Profile">Profile Issue</option>
                                                <option value="Other">Other</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label className="form-label">Priority *</label>
                                        <div className="custom-select-bx">
                                            <select 
                                                className="form-control custom-select-bx"
                                                name="priority"
                                                value={formData.priority}
                                                onChange={handleChange}
                                            >
                                                <option value="Low">Low</option>
                                                <option value="Medium">Medium</option>
                                                <option value="High">High</option>
                                                <option value="Critical">Critical</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="form-label">Description *</label>
                                <textarea 
                                    className="form-control"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    rows="6"
                                    required
                                    maxLength="5000"
                                    placeholder="Please provide detailed information about your issue..."
                                />
                                <small className="form-text text-muted">
                                    {formData.description.length}/5000 characters
                                </small>
                            </div>

                            <div className="form-group">
                                <label className="form-label">Attachment (Optional)</label>
                                <div className="custom-file">
                                    <input 
                                        type="file"
                                        className="custom-file-input"
                                        id="attachmentInput"
                                        name="attachment"
                                        onChange={handleChange}
                                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.mp4,.mp3"
                                    />
                                    <label className="custom-file-label" htmlFor="attachmentInput">
                                        {formData.attachment ? formData.attachment.name : 'Choose file'}
                                    </label>
                                </div>
                                <small className="form-text text-muted">
                                    Max 5MB. Supported: PDF, DOC, DOCX, JPG, PNG, MP4, MP3
                                </small>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <div className="apply-btn d-flex justify-content-end" style={{ gap: '10px' }}>
                                <button type="button" className="btn cmn-bdr-btn" onClick={onClose} style={{ padding: '8px 20px', borderRadius: '5px' }}>
                                    Cancel
                                </button>
                                <button type="submit" className="btn default-btn" disabled={loading} style={{ padding: '8px 20px', borderRadius: '5px' }}>
                                    {loading ? (
                                        <><i className="fa fa-spinner fa-spin mr-2"></i>Creating...</>
                                    ) : (
                                        <>Create Ticket</>
                                    )}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

// Ticket Detail Component
const TicketDetail = ({ ticket, onAddMessage, onCloseTicket, onReopenTicket, loading }) => {
    const [message, setMessage] = useState('');
    const [attachment, setAttachment] = useState(null);

    const handleAddMessage = () => {
        if (message.trim()) {
            onAddMessage({
                ticket_id: ticket.id,
                message,
                attachment
            });
            setMessage('');
            setAttachment(null);
        }
    };

    const getPriorityColor = (priority) => {
        const colors = {
            'Critical': '#dc3545',
            'High': '#fd7e14',
            'Medium': '#ffc107',
            'Low': '#28a745'
        };
        return colors[priority] || '#6c757d';
    };

    const getStatusBadge = (status) => {
        const statusClasses = {
            'Open': 'badge-primary',
            'In Progress': 'badge-info',
            'Resolved': 'badge-success',
            'Closed': 'badge-secondary',
            'Reopened': 'badge-warning'
        };
        return statusClasses[status] || 'badge-secondary';
    };

    if (!ticket) {
        return (
            <div className="text-center py-5">
                <i className="fa fa-envelope-open-o fa-3x text-muted mb-3"></i>
                <p className="text-muted">Select a ticket to view details</p>
            </div>
        );
    }

    return (
        <div className="ticket-detail">
            <div className="detail-header sticky-top bg-white pb-3 border-bottom">
                <div className="d-flex justify-content-between align-items-start mb-3">
                    <div>
                        <h5 className="mb-2">{ticket.title}</h5>
                        <p className="text-muted mb-0">{ticket.ticket_id}</p>
                    </div>
                    <div className="text-right">
                        <span className={`badge ${getStatusBadge(ticket.status)} mr-2`}>
                            {ticket.status}
                        </span>
                        <span className="badge" style={{ backgroundColor: getPriorityColor(ticket.priority), color: 'white' }}>
                            {ticket.priority}
                        </span>
                    </div>
                </div>

                <div className="row text-sm mb-3">
                    <div className="col-md-3">
                        <small className="text-muted">Category</small>
                        <p className="mb-0">{ticket.category}</p>
                    </div>
                    <div className="col-md-3">
                        <small className="text-muted">Created</small>
                        <p className="mb-0">{moment(ticket.created_at).format('MMM DD, YYYY HH:mm')}</p>
                    </div>
                    <div className="col-md-3">
                        <small className="text-muted">Messages</small>
                        <p className="mb-0">{ticket.messages ? ticket.messages.length : 0}</p>
                    </div>
                    <div className="col-md-3 text-right">
                        {ticket.status === 'Closed' ? (
                            <button 
                                className="btn btn-sm btn-outline-primary"
                                onClick={() => onReopenTicket(ticket.id)}
                                disabled={loading}
                            >
                                <i className="fa fa-undo mr-2"></i>Reopen
                            </button>
                        ) : (
                            <button 
                                className="btn btn-sm btn-outline-danger"
                                onClick={() => onCloseTicket(ticket.id)}
                                disabled={loading}
                            >
                                <i className="fa fa-times mr-2"></i>Close
                            </button>
                        )}
                    </div>
                </div>
            </div>

            <div className="detail-body my-4">
                <div className="description mb-4">
                    <h6 className="mb-3">Description</h6>
                    <p>{ticket.description}</p>
                    {ticket.attachment && (
                        <div className="alert alert-info">
                            <i className="fa fa-paperclip mr-2"></i>
                            <a href={FileManagerPath + ticket.attachment} target="_blank" rel="noopener noreferrer">
                                View Attachment
                            </a>
                        </div>
                    )}
                </div>

                <h6 className="mb-3">Messages ({ticket.messages ? ticket.messages.length : 0})</h6>
                <div className="messages-container" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                    {ticket.messages && ticket.messages.map((msg, idx) => (
                        <div key={idx} className={`message mb-3 ${msg.message_type === 'admin' ? 'message-admin' : 'message-user'}`}>
                            <div className="message-header d-flex justify-content-between mb-2">
                                <strong>{msg.user ? msg.user.name : 'Admin'}</strong>
                                <small className="text-muted">
                                    {moment(msg.created_at).format('MMM DD, HH:mm')}
                                </small>
                            </div>
                            <div className="message-content p-3 rounded" style={{ backgroundColor: msg.message_type === 'admin' ? '#e7f3ff' : '#f5f5f5' }}>
                                {msg.message}
                                {msg.attachment && (
                                    <div className="mt-2">
                                        <a href={FileManagerPath + msg.attachment} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-outline-primary">
                                            <i className="fa fa-paperclip mr-1"></i>Attachment
                                        </a>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {ticket.status !== 'Closed' && (
                    <div className="message-input mt-4 pt-4 border-top">
                        <h6 className="mb-3">Add Reply</h6>
                        <textarea 
                            className="form-control mb-3"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Type your message..."
                            rows="4"
                            maxLength="5000"
                        />
                        <small className="form-text text-muted mb-3">
                            {message.length}/5000 characters
                        </small>
                        <div className="d-flex justify-content-between">
                            <div>
                                <label className="btn btn-sm btn-outline-secondary">
                                    <i className="fa fa-paperclip mr-2"></i>Attach File
                                    <input 
                                        type="file"
                                        hidden
                                        id="messageAttachmentInput"
                                        onChange={(e) => setAttachment(e.target.files[0])}
                                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.mp4,.mp3"
                                    />
                                </label>
                                {attachment && (
                                    <small className="ml-2 text-success">
                                        <i className="fa fa-check mr-1"></i>{attachment.name}
                                    </small>
                                )}
                            </div>
                            <button 
                                className="btn btn-sm btn-primary"
                                onClick={handleAddMessage}
                                disabled={loading || !message.trim()}
                            >
                                {loading ? <i className="fa fa-spinner fa-spin"></i> : <i className="fa fa-send"></i>} Send
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

// Main Support Component
const Support = ({ Active }) => {
    const currentUser = useContext(CurrentUser);
    const [tickets, setTickets] = useState([]);
    const [selectedTicket, setSelectedTicket] = useState(null);
    const [loading, setLoading] = useState(false);
    const [filterBy, setFilterBy] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');
    const debouncedSearchTerm = useDebounce(searchTerm, 1000);
    const [unreadCount, setUnreadCount] = useState(0);
    const [pagination, setPagination] = useState({ currentPage: 1, lastPage: 1 });

    // Initialize socket notifications
    useEffect(() => {
        // if (currentUser?.id) {
        //     SocketNotificationService.initialize(currentUser.id);
            
        //     // Subscribe to support ticket updates
        //     const unsubscribe = SocketNotificationService.on('supportTicketUpdatedAVF', (data) => {
        //         toastr['info']('Support ticket updated');
        //         loadTickets();
        //     });

        //     return unsubscribe;
        // }
    }, [currentUser?.id]);

    // Load tickets on filter/search change
    useEffect(() => {
        loadTickets();
    }, [filterBy, debouncedSearchTerm, pagination.currentPage]);

    const loadTickets = () => {
        setLoading(true);
        SupportTicketAPI.getTickets({
            pageNo: pagination.currentPage,
            filterBy,
            searchQuery: debouncedSearchTerm
        })
        .then(res => {
            if (res.data.success) {
                setTickets(res.data.data);
                setPagination(res.data.pagination);
            }
        })
        .catch(err => toastr['error']('Error loading tickets'))
        .finally(() => setLoading(false));
    };

    const handleCreateTicket = (formData) => {
        setLoading(true);
        const data = new FormData();
        data.append('title', formData.title);
        data.append('category', formData.category);
        data.append('priority', formData.priority);
        data.append('description', formData.description);
        if (formData.attachment) {
            data.append('attachment', formData.attachment);
        }

        SupportTicketAPI.createTicket(data)
        .then(res => {
            if (res.data.success) {
                toastr['success'](res.data.message);
                $('#createTicketModal').modal('hide');
                loadTickets();
            }
        })
        .catch(err => toastr['error']('Error creating ticket'))
        .finally(() => setLoading(false));
    };

    const handleAddMessage = (data) => {
        setLoading(true);
        const formData = new FormData();
        formData.append('ticket_id', data.ticket_id);
        formData.append('message', data.message);
        if (data.attachment) {
            formData.append('attachment', data.attachment);
        }

        SupportTicketAPI.addMessage(formData)
        .then(res => {
            if (res.data.success) {
                toastr['success']('Message added');
                loadTickets();
                SupportTicketAPI.getTicketDetails(selectedTicket.id)
                    .then(res2 => setSelectedTicket(res2.data.data))
                    .catch(err => console.error(err));
            }
        })
        .catch(err => toastr['error']('Error adding message'))
        .finally(() => setLoading(false));
    };

    const handleCloseTicket = (ticketId) => {
        if (confirm('Are you sure you want to close this ticket?')) {
            setLoading(true);
            SupportTicketAPI.closeTicket(ticketId)
            .then(res => {
                if (res.data.success) {
                    toastr['success']('Ticket closed');
                    loadTickets();
                }
            })
            .catch(err => toastr['error']('Error closing ticket'))
            .finally(() => setLoading(false));
        }
    };

    const handleReopenTicket = (ticketId) => {
        setLoading(true);
        SupportTicketAPI.reopenTicket(ticketId)
        .then(res => {
            if (res.data.success) {
                toastr['success']('Ticket reopened');
                loadTickets();
            }
        })
        .catch(err => toastr['error']('Error reopening ticket'))
        .finally(() => setLoading(false));
    };

    return (
        <main>
            <TopNavbar />
            
            <section className="mid-content-sec in-page-content-sec" style={{ marginLeft: '0' }}>
                <div className="inbox-wrapper">
                    <div className="container">
                        <div className="ah-tab-content-wrapper">
                            <div className="ah-tab-content" data-ah-tab-active={Active !== undefined ? Active : true}>
                                <div className="support-content-sec">
                <div className="cmn-rit-top-heading-sec message-top-bx d-flex justify-content-between align-items-center" style={{ paddingBottom: '15px', borderBottom: '1px solid #D7D7D7', marginBottom: '20px' }}>
                    <div className="inbox-message-number" style={{ fontSize: '24px', color: '#3A3A3A', fontWeight: 'bold' }}>Support & Help Center</div>
                    <button 
                        className="btn cmn-bdr-btn create-event-btn"
                        style={{ backgroundColor: '#145388', color: '#fff', borderRadius: '5px', padding: '8px 20px' }}
                        data-toggle="modal"
                        data-target="#createTicketModal"
                    >
                        <i className="fa fa-plus mr-2"></i>Create Ticket
                    </button>
                </div>

                <div className="cmn-sidebar-outer" style={{ borderTop: 'none', paddingTop: '0' }}>
                    <div className="cmn-sidebar-left" style={{ width: '350px', flex: '0 0 350px', paddingRight: '20px' }}>
                        <TicketList 
                            tickets={tickets}
                            onSelectTicket={setSelectedTicket}
                            loading={loading}
                            onFilterChange={setFilterBy}
                            filterBy={filterBy}
                            onSearch={setSearchTerm}
                            searchTerm={searchTerm}
                        />
                    </div>
                    <div className="cmn-sidebar-content" style={{ flex: '1', width: 'calc(100% - 350px)' }}>
                        <TicketDetail 
                            ticket={selectedTicket}
                            onAddMessage={handleAddMessage}
                            onCloseTicket={handleCloseTicket}
                            onReopenTicket={handleReopenTicket}
                            loading={loading}
                        />
                    </div>
                </div>

                <CreateTicketModal 
                    onClose={() => $('#createTicketModal').modal('hide')}
                    onSubmit={handleCreateTicket}
                    loading={loading}
                />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <InnerFooter />
        </main>
    );
};
export default Support;

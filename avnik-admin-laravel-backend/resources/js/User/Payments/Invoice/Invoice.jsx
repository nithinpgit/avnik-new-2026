import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import './Invoice.css'; // You'll need to create this CSS file

const Invoice = () => {
    let { id } = useParams();
    const [invoiceData, setInvoiceData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // API integration - replace with actual API call
    useEffect(() => {
        const fetchInvoiceData = async () => {
            try {
                setLoading(true);
                
                // Replace this URL with your actual API endpoint
                const response = await fetch(`/api/invoices/${id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`, // Add auth token if needed
                        'Accept': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                
                // Transform API response to match our component structure
                const transformedData = {
                    invoiceNumber: data.invoice_number || `INV-${id}`,
                    invoiceDate: data.invoice_date ? new Date(data.invoice_date).toLocaleDateString('en-US') : new Date().toLocaleDateString('en-US'),
                    dueDate: data.due_date ? new Date(data.due_date).toLocaleDateString('en-US') : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US'),
                    
                    // Invoice Type
                    invoiceType: data.invoice_type || "outgoing", // "outgoing" or "incoming"
                    
                    // Company Details
                    company: {
                        name: data.company?.name || "Avnik Soft Tech",
                        address: data.company?.address || "B6A, Prithviraj Rd, C Scheme, Ashok Nagar",
                        city: data.company?.city || "Jaipur",
                        state: data.company?.state || "Rajasthan",
                        zipCode: data.company?.zip_code || "302001",
                        phone: data.company?.phone || "97992 96279",
                        email: data.company?.email || "info@avniksofttech.com",
                        website: data.company?.website || "www.avnik.com"
                    },

                    // Customer/Vendor Details
                    customer: {
                        name: data.customer?.name || data.vendor?.name || "Customer Name",
                        email: data.customer?.email || data.vendor?.email || "customer@email.com",
                        address: data.customer?.address || data.vendor?.address || "Customer Address",
                        city: data.customer?.city || data.vendor?.city || "City",
                        state: data.customer?.state || data.vendor?.state || "State",
                        zipCode: data.customer?.zip_code || data.vendor?.zip_code || "00000",
                        phone: data.customer?.phone || data.vendor?.phone || "000-000-0000"
                    },

                    // Event Details
                    event: {
                        name: data.event?.name || data.event_name || "Event Name",
                        date: data.event?.date || data.event_date || "Event Date",
                        venue: data.event?.venue || data.event_venue || "Event Venue",
                        ticketType: data.event?.ticket_type || data.ticket_type || "Ticket Type",
                        quantity: data.event?.quantity || data.quantity || 1
                    },

                    // Payment Details
                    payment: {
                        subtotal: parseFloat(data.payment?.subtotal || data.subtotal || 0),
                        processingFee: parseFloat(data.payment?.processing_fee || data.processing_fee || 0),
                        tax: parseFloat(data.payment?.tax || data.tax || 0),
                        total: parseFloat(data.payment?.total || data.total || 0),
                        amountPaid: parseFloat(data.payment?.amount_paid || data.amount_paid || 0),
                        paymentMethod: data.payment?.payment_method || data.payment_method || "Not specified",
                        transactionId: data.payment?.transaction_id || data.transaction_id || "N/A",
                        paymentDate: data.payment?.payment_date ? new Date(data.payment.payment_date).toLocaleDateString('en-US') : 
                                   data.payment_date ? new Date(data.payment_date).toLocaleDateString('en-US') : "N/A"
                    },

                    // Refund Details (if applicable)
                    refund: data.refund ? {
                        refundAmount: parseFloat(data.refund.refund_amount || data.refund.amount || 0),
                        refundReason: data.refund.refund_reason || data.refund.reason || "Refund",
                        refundDate: data.refund.refund_date ? new Date(data.refund.refund_date).toLocaleDateString('en-US') : "N/A",
                        refundMethod: data.refund.refund_method || data.refund.method || "Original payment method",
                        refundId: data.refund.refund_id || data.refund.id || "N/A"
                    } : null,

                    status: data.status || "Pending"
                };

                setInvoiceData(transformedData);
                
            } catch (error) {
                console.error('Error fetching invoice data:', error);
                setError(error.message);
                
                // Show user-friendly error message
                if (error.message.includes('404')) {
                    setInvoiceData(null); // This will show "Invoice not found"
                } else if (error.message.includes('401') || error.message.includes('403')) {
                    setError('You are not authorized to view this invoice.');
                } else if (error.message.includes('500')) {
                    setError('Server error. Please try again later.');
                } else {
                    // Fallback to mock data on error (for development)
                    console.warn('API failed, using mock data for development');
                    setInvoiceData({
                        invoiceNumber: `INV-${id}`,
                        invoiceDate: new Date().toLocaleDateString('en-US'),
                        dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US'),
                        invoiceType: "outgoing",
                        company: {
                            name: "Avnik Soft Tech",
                            address: "B6A, Prithviraj Rd, C Scheme, Ashok Nagar",
                            city: "Jaipur",
                            state: "Rajasthan",
                            zipCode: "302001",
                            phone: "97992 96279",
                            email: "info@avniksofttech.com",
                            website: "www.avnik.com"
                        },
                        customer: {
                            name: "John Doe",
                            email: "john.doe@email.com",
                            address: "456 Customer Ave",
                            city: "Los Angeles",
                            state: "CA",
                            zipCode: "90210",
                            phone: "(555) 987-6543"
                        },
                        event: {
                            name: "Annual Tech Conference 2025",
                            date: "October 15, 2025",
                            venue: "Convention Center Hall A",
                            ticketType: "VIP Pass",
                            quantity: 2
                        },
                        payment: {
                            subtotal: 500.00,
                            processingFee: 15.00,
                            tax: 41.25,
                            total: 556.25,
                            amountPaid: 556.25,
                            paymentMethod: "Credit Card (**** 1234)",
                            transactionId: "TXN-789456123",
                            paymentDate: "September 20, 2025"
                        },
                        refund: {
                            refundAmount: 100.00,
                            refundReason: "Partial cancellation - 1 ticket",
                            refundDate: "September 22, 2025",
                            refundMethod: "Original payment method",
                            refundId: "REF-123789"
                        },
                        status: "Paid"
                    });
                    
                    // Only show alert in development mode
                    if (process.env.NODE_ENV === 'development') {
                        console.warn('Using fallback mock data due to API error:', error.message);
                    }
                }
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchInvoiceData();
        }
    }, [id]);

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount);
    };

    if (loading) {
        return <div className="invoice-loading">Loading invoice...</div>;
    }

    if (error && !invoiceData) {
        return (
            <div className="invoice-error">
                <h3>Error Loading Invoice</h3>
                <p>{error}</p>
                <button onClick={() => window.location.reload()} className="btn-retry">
                    Try Again
                </button>
            </div>
        );
    }

    if (!invoiceData) {
        return <div className="invoice-error">Invoice not found</div>;
    }

    const handlePrint = () => {
        window.print();
    };

    // Dynamic invoice type handling
    const isOutgoing = invoiceData.invoiceType === "outgoing";
    const invoiceTitle = isOutgoing ? "INVOICE" : "RECEIPT/BILL";
    const customerLabel = isOutgoing ? "Bill To:" : "From:";
    const companyLabel = isOutgoing ? "" : "Bill To:";
    const statusColorClass = invoiceData.status.toLowerCase();
    const invoiceTypeIndicator = isOutgoing ? "(Outgoing)" : "(Incoming)";
    const amountLabel = isOutgoing ? "Amount Due:" : "Amount Paid:";

    return (
        <div className="invoice-container">
            <div className="invoice-header">
                <div className="company-info">
                    <h1>{invoiceData.company.name}</h1>
                    <p>{invoiceData.company.address}</p>
                    <p>{invoiceData.company.city}, {invoiceData.company.state} {invoiceData.company.zipCode}</p>
                    <p>Phone: {invoiceData.company.phone}</p>
                    <p>Email: {invoiceData.company.email}</p>
                </div>
                <div className="invoice-details">
                    <h2>{invoiceTitle}</h2>
                    <p className="invoice-type-indicator">{invoiceTypeIndicator}</p>
                    <p><strong>Invoice #:</strong> {invoiceData.invoiceNumber}</p>
                    <p><strong>Invoice Date:</strong> {invoiceData.invoiceDate}</p>
                    <p><strong>Due Date:</strong> {invoiceData.dueDate}</p>
                    <p><strong>Status:</strong> <span className={`status ${statusColorClass}`}>{invoiceData.status}</span></p>
                </div>
            </div>

            <div className="billing-section">
                {isOutgoing ? (
                    // Outgoing Invoice: You are billing the customer
                    <div className="bill-to">
                        <h3>{customerLabel}</h3>
                        <p><strong>{invoiceData.customer.name}</strong></p>
                        <p>{invoiceData.customer.address}</p>
                        <p>{invoiceData.customer.city}, {invoiceData.customer.state} {invoiceData.customer.zipCode}</p>
                        <p>Phone: {invoiceData.customer.phone}</p>
                        <p>Email: {invoiceData.customer.email}</p>
                    </div>
                ) : (
                    // Incoming Invoice: You paid someone else
                    <div className="billing-layout">
                        <div className="bill-from">
                            <h3>{customerLabel}</h3>
                            <p><strong>{invoiceData.customer.name}</strong></p>
                            <p>{invoiceData.customer.address}</p>
                            <p>{invoiceData.customer.city}, {invoiceData.customer.state} {invoiceData.customer.zipCode}</p>
                            <p>Phone: {invoiceData.customer.phone}</p>
                            <p>Email: {invoiceData.customer.email}</p>
                        </div>
                        <div className="bill-to">
                            <h3>{companyLabel}</h3>
                            <p><strong>{invoiceData.company.name}</strong></p>
                            <p>{invoiceData.company.address}</p>
                            <p>{invoiceData.company.city}, {invoiceData.company.state} {invoiceData.company.zipCode}</p>
                            <p>Phone: {invoiceData.company.phone}</p>
                            <p>Email: {invoiceData.company.email}</p>
                        </div>
                    </div>
                )}
            </div>

            <div className="event-details">
                <h3>Event Information</h3>
                <div className="event-info-grid">
                    <div><strong>Event:</strong> {invoiceData.event.name}</div>
                    <div><strong>Date:</strong> {invoiceData.event.date}</div>
                    <div><strong>Venue:</strong> {invoiceData.event.venue}</div>
                    <div><strong>Ticket Type:</strong> {invoiceData.event.ticketType}</div>
                </div>
            </div>

            <div className="invoice-items">
                <table className="items-table">
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Quantity</th>
                            <th>Unit Price</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{invoiceData.event.ticketType} - {invoiceData.event.name}</td>
                            <td>{invoiceData.event.quantity}</td>
                            <td>{formatCurrency(invoiceData.payment.subtotal / invoiceData.event.quantity)}</td>
                            <td>{formatCurrency(invoiceData.payment.subtotal)}</td>
                        </tr>
                        <tr>
                            <td>Processing Fee</td>
                            <td>1</td>
                            <td>{formatCurrency(invoiceData.payment.processingFee)}</td>
                            <td>{formatCurrency(invoiceData.payment.processingFee)}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className="invoice-summary">
                <div className="summary-row">
                    <span>Subtotal:</span>
                    <span>{formatCurrency(invoiceData.payment.subtotal)}</span>
                </div>
                <div className="summary-row">
                    <span>Processing Fee:</span>
                    <span>{formatCurrency(invoiceData.payment.processingFee)}</span>
                </div>
                <div className="summary-row">
                    <span>Tax (8.25%):</span>
                    <span>{formatCurrency(invoiceData.payment.tax)}</span>
                </div>
                <div className="summary-row total">
                    <span><strong>Total:</strong></span>
                    <span><strong>{formatCurrency(invoiceData.payment.total)}</strong></span>
                </div>
                <div className="summary-row paid">
                    <span>{amountLabel}</span>
                    <span>{formatCurrency(invoiceData.payment.amountPaid)}</span>
                </div>
            </div>

            <div className="payment-details">
                <h3>Payment Information</h3>
                <div className="payment-grid">
                    <div><strong>Payment Method:</strong> {invoiceData.payment.paymentMethod}</div>
                    <div><strong>Transaction ID:</strong> {invoiceData.payment.transactionId}</div>
                    <div><strong>Payment Date:</strong> {invoiceData.payment.paymentDate}</div>
                </div>
            </div>

            {invoiceData.refund && (
                <div className="refund-details">
                    <h3>Refund Information</h3>
                    <div className="refund-grid">
                        <div><strong>Refund Amount:</strong> {formatCurrency(invoiceData.refund.refundAmount)}</div>
                        <div><strong>Refund Date:</strong> {invoiceData.refund.refundDate}</div>
                        <div><strong>Refund Method:</strong> {invoiceData.refund.refundMethod}</div>
                        <div><strong>Refund ID:</strong> {invoiceData.refund.refundId}</div>
                        <div><strong>Reason:</strong> {invoiceData.refund.refundReason}</div>
                    </div>
                </div>
            )}

            <div className="invoice-footer">
                <div className="terms">
                    <h4>Terms & Conditions</h4>
                    <ul>
                        <li>All sales are final unless otherwise specified</li>
                        <li>Refunds will be processed within 5-7 business days</li>
                        <li>Event tickets are non-transferable</li>
                        <li>Please arrive 30 minutes before event start time</li>
                    </ul>
                </div>
                
                <div className="contact-info">
                    <h4>Questions?</h4>
                    <p>Contact us at {invoiceData.company.email}</p>
                    <p>or call {invoiceData.company.phone}</p>
                </div>
            </div>  

            <div className="invoice-actions no-print">
                <button onClick={handlePrint} className="btn-print">Print Invoice</button>
                {/* <button className="btn-download">Download PDF</button> */}
            </div>
        </div>
    );
};

export default Invoice;

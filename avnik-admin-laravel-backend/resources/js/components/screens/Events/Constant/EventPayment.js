import StripePaymentModal from "../Payments/Modals/StripePaymentModal";
import React from 'react';
class EventPayment{
    
    stripeModalPayment(eventId,slotId,amount){

        $('#stripe_payment_modal').modal('show')
                    
    }

}

export default new  EventPayment();

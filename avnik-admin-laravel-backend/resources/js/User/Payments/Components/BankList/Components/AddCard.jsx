import React, { useState } from "react";
import { CardCvcElement, CardElement, CardExpiryElement, CardNumberElement, useElements, useStripe } from '@stripe/react-stripe-js';

const AddCard = (props) => {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState(null);
    const [cardComplete, setCardComplete] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState(null);
    const [isSubmit, setIsSubmit] = useState(false);
    const [cardHolderName, setCardHolderName] = useState(""); // Add state

    const handleCardSubmit = async (event) => {
        event.preventDefault();
        setIsSubmit(true);
        setProcessing(true);
        if (!stripe || !elements) {
            return;
        }

        if (error) {
            setIsSubmit(false);
            elements.getElement('card').focus();
            elements.getElement(CardNumberElement).clear();
            elements.getElement(CardExpiryElement).clear();
            elements.getElement(CardCvcElement).clear();
            return;
        }

        if (cardComplete) {
            setProcessing(true);
        }
        const payload = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardNumberElement),
            // billing_details: { name: cardHolderName },
        });
        if (payload?.error) {
            setIsSubmit(false);
            toastr["error"](payload?.error?.message);
            setPaymentMethod(null);
            elements.getElement(CardNumberElement).clear();
            elements.getElement(CardExpiryElement).clear();
            elements.getElement(CardCvcElement).clear();
            setProcessing(false);
        } else {
            props.AddCustomerCard(payload?.paymentMethod?.id);
            // Clear all fields after successful API response
            setCardHolderName("");
            elements.getElement(CardNumberElement).clear();
            elements.getElement(CardExpiryElement).clear();
            elements.getElement(CardCvcElement).clear();
            setProcessing(false);
            setIsSubmit(false);
        }
        console.log(payload)
    }

    return (
        <>
            <form onSubmit={handleCardSubmit}>
                <div className="row">
                    <div className="col-sm-3 col-md-3">
                        <div className="form-group">
                            <label className="form-label" htmlFor="CardHolderName">
                                Card Holder Name
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="CardHolderName"
                                placeholder="Card Holder Name"
                                value={cardHolderName}
                                onChange={e => setCardHolderName(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="col-sm-3 col-md-4">
                        <div className="form-group">
                            <label className="form-label" htmlFor="CardNumber">
                                Card Number
                            </label>
                            <CardNumberElement className="form-control" />
                        </div>
                    </div>
                    <div className="col-sm-3 col-md-3">
                        <div className="form-group">
                            <label className="form-label" htmlFor="CardExpiryDate">
                                Card Expiry Date
                            </label>
                            <CardExpiryElement className="form-control" />
                        </div>
                    </div>
                    <div className="col-sm-3 col-md-2">
                        <div className="form-group">
                            <label className="form-label" htmlFor="Cvv">
                                CVV
                            </label>
                            <CardCvcElement className="form-control" />
                        </div>
                    </div>
                    <div className="col-12 col-sm-12">
                        <div className="float-right">
                            <button
                                type="submit"
                                className="btn default-btn"
                                disabled={!stripe}
                            >
                                {props?.preloader ? <span className='button-pre-loading'>wait...</span> : " Save Card"}
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
};

export default AddCard;

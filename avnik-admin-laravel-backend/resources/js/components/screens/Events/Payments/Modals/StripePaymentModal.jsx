
import React,{useEffect,useState} from 'react';
import {CardCvcElement, CardElement, CardExpiryElement, CardNumberElement, Elements, useElements, useStripe} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import StripePaymentServices from '../../../../../ApiServer/Payment/StripePaymentServices';
import { showHideDiv } from '../../../../../utility/UtilityFunctions';
import { ApiService } from '../../../../../ApiServer/ApiService';

const CARD_OPTIONS = {

};
  const CardField = ({onChange}) => (
    <>
      {/* <CardElement options={CARD_OPTIONS} onChange={onChange} /> */}
      <CardNumberElement  className="form-control" onChange={onChange} options={CARD_OPTIONS}/>
      <CardExpiryElement className="form-control" onChange={onChange} options={CARD_OPTIONS}/>
      <CardCvcElement className="form-control" onChange={onChange} options={CARD_OPTIONS}/>
    </>
  );
  
  const Field = ({
    label,
    id,
    type,
    placeholder,
    required,
    autoComplete,
    value,
    onChange,
  }) => (
    <div className="FormRow">
      <label htmlFor={id} className="FormRowLabel">
        {label}
      </label>
      <input
        className="FormRowInput"
        id={id}
        type={type}
        placeholder={placeholder}
        required={required}
        autoComplete={autoComplete}
        value={value}
        onChange={onChange}
      />
    </div>
  );
  
  const SubmitButton = ({processing, error, children, disabled}) =>(<button
      className={`btn default-btn ${error ? 'is-invalid' : ''}`}
      type="submit"
      disabled={processing || disabled}
    >
      {processing ? <span className='button-pre-loading'>wait...</span> : children}
    </button>
  );
  
  
  const StripeCheckoutForm =({onPayment, eventId, amount,slotId})=>{
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState(null);
    const [cardComplete, setCardComplete] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState(null);
    const [DebitCards,setDebitCards]=useState([]);
    const [isSubmit, setIsSubmit] = useState(false);
    useEffect(()=>{
      getListOfCards();
        return ()=>{

        }
    },[]);
    // const [billingDetails, setBillingDetails] = useState({
    //   email: '',
    //   phone: '',
    //   name: '',  
    // });
    const [eventDetails, setEventDetails]=useState({
          email:'',
          phone:'',
          amount:'',
          eventId:'',
          eventSlotId:'',
          saveCard:false
    });
    const resetPayment=()=>{
      setError(null);
      setCardComplete(false);
      setProcessing(false);
      setPaymentMethod(null);
      setIsSubmit(false);
      elements.getElement(CardNumberElement).clear();
      elements.getElement(CardExpiryElement).clear();
      elements.getElement(CardCvcElement).clear();
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
      setProcessing(true);

        setIsSubmit(true);
        if (!stripe || !elements) {
          
          return;
        }
    
        if (error) {
          setIsSubmit(false);
          // elements.getElement('card').focus(); 
          elements.getElement(CardNumberElement).clear();
          elements.getElement(CardExpiryElement).clear();
          elements.getElement(CardCvcElement).clear();
          return;
        }
    
        if (cardComplete) {
          setProcessing(true);
        }
        if(amount>0){
          if(paymentMethod){

          }else{}
          const payload = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardNumberElement),
            // billing_details: billingDetails,
          });
console.log(payload?.error,eventDetails)

        if(!paymentMethod&&payload?.error){
          setIsSubmit(false);
          toastr["error"](payload?.error?.message);
          setPaymentMethod(null);
          elements.getElement(CardNumberElement).clear();
          elements.getElement(CardExpiryElement).clear();
          elements.getElement(CardCvcElement).clear();
        }else{
          const PostData={
            stripeToken:amount>0?paymentMethod?paymentMethod:payload.paymentMethod?.id:'',
            eventId:eventId,
            slotId:slotId,
            saveCard:eventDetails?.saveCard
          }
          
          const {status,data} = await StripePaymentServices.chargesPaymentService(PostData);
         
          if(status==200){
              onPayment(true,data.data);
              toastr["success"](data?.message);
              setError(null);
              setCardComplete(false);
              setProcessing(false);
              setPaymentMethod(null);
              setIsSubmit(false);
              elements.getElement(CardNumberElement).clear();
              elements.getElement(CardExpiryElement).clear();
              elements.getElement(CardCvcElement).clear();
              
          }else if(status=='failed'){
            elements.getElement(CardNumberElement).clear();
            elements.getElement(CardExpiryElement).clear();
            elements.getElement(CardCvcElement).clear();
            onPayment(false,data);
            toastr["error"](data?.message);
            setIsSubmit(false);
          }
          setError(null);
          setCardComplete(false);
          setProcessing(false);
          setPaymentMethod(null);
          setIsSubmit(false);
          elements.getElement(CardNumberElement).clear();
          elements.getElement(CardExpiryElement).clear();
          elements.getElement(CardCvcElement).clear();
        }
        setProcessing(false);
        if (payload.error) {
          setError(payload.error);
        } else {
          setPaymentMethod(payload.paymentMethod);
        }
      }else{
        const PostData={
          eventId:eventId,
          slotId:slotId,
          saveCard:eventDetails?.saveCard
        }
        const {status,data} = await StripePaymentServices.chargesPaymentService(PostData);
        console.log(status,data,"payment response");
        if(status==200){

            onPayment(true,data.data);
            toastr["success"](data?.message);
            setError(null);
            setCardComplete(false);
            setProcessing(false);
            setPaymentMethod(null);
            setIsSubmit(false);
            elements.getElement(CardNumberElement).clear();
            elements.getElement(CardExpiryElement).clear();
            elements.getElement(CardCvcElement).clear();
            
        }else if(status=='failed'){
          onPayment(false,data);
          toastr["error"](data?.message);
          setIsSubmit(false);
        }
        setError(null);
        setCardComplete(false);
        setProcessing(false);
        setPaymentMethod(null);
        setIsSubmit(false);
        elements.getElement(CardNumberElement).clear();
        elements.getElement(CardExpiryElement).clear();
        elements.getElement(CardCvcElement).clear();
      }
      };
      const getListOfCards=()=>{
        ApiService._listCustomerCards().then((res)=>{
          if(res?.status==200){
            setDebitCards(res?.data?.data)
          }
        }).catch((error)=>{
          console.log(error)
        })
      } 
      
console.log(eventDetails,error,'errorr')
const handleChooseCardPayment=(e)=>{
  console.log(e.target.value);
  setPaymentMethod(e.target.value);
  setIsSubmit(false)
 }
 const ErrorMessage = ({children}) => (
  <div className="ErrorMessage" role="alert">
    <svg width="16" height="16" viewBox="0 0 17 17">
      <path
        fill="#FFF"
        d="M8.5,17 C3.80557963,17 0,13.1944204 0,8.5 C0,3.80557963 3.80557963,0 8.5,0 C13.1944204,0 17,3.80557963 17,8.5 C17,13.1944204 13.1944204,17 8.5,17 Z"
      />
      <path
        fill="#6772e5"
        d="M8.5,7.29791847 L6.12604076,4.92395924 C5.79409512,4.59201359 5.25590488,4.59201359 4.92395924,4.92395924 C4.59201359,5.25590488 4.59201359,5.79409512 4.92395924,6.12604076 L7.29791847,8.5 L4.92395924,10.8739592 C4.59201359,11.2059049 4.59201359,11.7440951 4.92395924,12.0760408 C5.25590488,12.4079864 5.79409512,12.4079864 6.12604076,12.0760408 L8.5,9.70208153 L10.8739592,12.0760408 C11.2059049,12.4079864 11.7440951,12.4079864 12.0760408,12.0760408 C12.4079864,11.7440951 12.4079864,11.2059049 12.0760408,10.8739592 L9.70208153,8.5 L12.0760408,6.12604076 C12.4079864,5.79409512 12.4079864,5.25590488 12.0760408,4.92395924 C11.7440951,4.59201359 11.2059049,4.59201359 10.8739592,4.92395924 L8.5,7.29791847 L8.5,7.29791847 Z"
      />
    </svg>
    {children} <ResetButton onClick={resetPayment}/>
  </div>
);

const ResetButton = ({onClick}) => (
  <button type="button" className="ResetButton btn btn-sm " onClick={onClick}>
    {/* <svg width="32px" height="32px" viewBox="0 0 32 32">
      <path
        fill="#FFF"
        d="M15,7.05492878 C10.5000495,7.55237307 7,11.3674463 7,16 C7,20.9705627 11.0294373,25 16,25 C20.9705627,25 25,20.9705627 25,16 C25,15.3627484 24.4834055,14.8461538 23.8461538,14.8461538 C23.2089022,14.8461538 22.6923077,15.3627484 22.6923077,16 C22.6923077,19.6960595 19.6960595,22.6923077 16,22.6923077 C12.3039405,22.6923077 9.30769231,19.6960595 9.30769231,16 C9.30769231,12.3039405 12.3039405,9.30769231 16,9.30769231 L16,12.0841673 C16,12.1800431 16.0275652,12.2738974 16.0794108,12.354546 C16.2287368,12.5868311 16.5380938,12.6540826 16.7703788,12.5047565 L22.3457501,8.92058924 L22.3457501,8.92058924 C22.4060014,8.88185624 22.4572275,8.83063012 22.4959605,8.7703788 C22.6452866,8.53809377 22.5780351,8.22873685 22.3457501,8.07941076 L22.3457501,8.07941076 L16.7703788,4.49524351 C16.6897301,4.44339794 16.5958758,4.41583275 16.5,4.41583275 C16.2238576,4.41583275 16,4.63969037 16,4.91583275 L16,7 L15,7 L15,7.05492878 Z M16,32 C7.163444,32 0,24.836556 0,16 C0,7.163444 7.163444,0 16,0 C24.836556,0 32,7.163444 32,16 C32,24.836556 24.836556,32 16,32 Z"
      />
    </svg> */}
    Reset
  </button>
);
      return(
          <>
            <div className="modal right fade default-popup side-popup join-event-popup" id='stripe_payment_modal' tabIndex="-1" aria-labelledby="myModalLabel2" aria-hidden="true">
                <div className="modal-dialog">
                    <form onSubmit={handleSubmit}>
                        <div className="modal-content">
                            <button type="button" onClick={resetPayment} className="close" data-dismiss="modal" aria-label="Close"> <i className="av av-close-icon"></i></button>
                            <div className="modal-header">
                                <h2 className="modal-title" id="exampleModalLabel">Payment Summary</h2>
                            </div>
                            <div className="modal-body">   
                                <div className="payment-summary-content">
                                    <div className="row">
                                        <div className="col-12 col-sm-12">
                                            <div className="amount-payable-list">
                                                <ul className="cmn-ul-list">
                                                    <li className="ac-payable">
                                                        <span>Amount Payable</span> <strong>${amount?amount:0 }</strong>
                                                    </li>
                                                    <li className="total-amount">
                                                        <span>Total Amount</span> <strong>${amount?amount:0 }</strong>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        {amount>0 ?<SavedCardList cards={DebitCards} value={paymentMethod} onChange={handleChooseCardPayment}/>:""}
                                        {amount && amount>0?<div className="col-12 col-sm-12">
                                            <div className="payment-card-add">
                                                <ul className="cmn-ul-list">
                                                    <li>
                                                        <div className="cmn-new-toggle">
                                                            <button type="button" className="btn blue-bdr-btn" onClick={()=>showHideDiv('add-card')}>
                                                              <span className="av av-add-plus-solid-icon">
                                                                <span className="path1"></span>
                                                                <span className="path2"></span>
                                                                <span className="path3"></span>
                                                                </span> Add Card</button>
                                                            <div id="add-card" className="write-review-content-bx new-toggle-dropdown" style={{display: 'none'}}>
                                                                <div className="row">
                                                                    <div className="col-12 col-sm-12">
                                                                        <div className="form-group">
                                                                            <label className="form-label" htmlFor="CardNumber">Card Number</label>
                                                                            {/* <input type="text" className="form-control" id="CardNumber" placeholder="XXX - XXXX - XXXX - XXXX" /> */}
                                                                            <CardNumberElement options={CARD_OPTIONS} className="form-control"/>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-12 col-sm-6">
                                                                        <div className="form-group">
                                                                            <label className="form-label" htmlFor="CardExpiryDate">Card Expiry Date</label>
                                                                            {/* <input type="text" className="form-control" id="CardExpiryDate" placeholder="MM/YY" /> */}
                                                                            <CardExpiryElement options={CARD_OPTIONS} className="form-control" />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-12 col-sm-6">
                                                                        <div className="form-group">
                                                                            <label className="form-label" htmlFor="Cvv">CVV</label>
                                                                            {/* <input type="text" className="form-control" id="Cvv" placeholder="XXX" /> */}
                                                                            <CardCvcElement options={CARD_OPTIONS}  className="form-control"/>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-12 col-sm-12">
                                                                        <div className="form-group">
                                                                            <div className="checkbox custom">
                                                                                <label>
                                                                                    <input type="checkbox" onChange={()=>setEventDetails((event)=>({...event,saveCard:!event.saveCard}))} defaultChecked={eventDetails.saveCard} checked={eventDetails.saveCard}/>
                                                                                      Save this card for future payments.
                                                                                </label>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>:''}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <div className="apply-btn">
                                {error && <ErrorMessage>{error.message}</ErrorMessage>}
                                    <SubmitButton processing={processing} error={error} disabled={!stripe || isSubmit }>
                                     {amount && amount>0?`Pay $${amount?amount:0}`:'Book'}  
                                    </SubmitButton>
                                    {amount && amount > 0 && (
                                        <div className="refund-policy-note mt-5">
                                            <p >
                                                <strong className='text-danger'>Note:</strong> If you cancel within 1 minute of payment, you will receive a full refund.
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
          </>
      );
  }

  const SavedCardList=(props)=>{
      return(
        <div className="col-12 col-sm-12">
        <div className="saved-card-list">
            <ul className="cmn-ul-list">
            {props?.cards?.length>0 ?props.cards?.map((res)=><li>
                    <div className="radio custom">
                        <label>
                            <input type="radio" onChange={props.onChange} name="cards" value={res?.id} checked={res?.id==props?.value} />{res?.card?.brand} <span>******** {res?.card?.last4}</span>
                        </label>
                    </div>
                </li>):""}
            </ul>
        </div>
    </div>
      );
  }

  const ELEMENTS_OPTIONS = {
    fonts: [
      {
        cssSrc: 'https://fonts.googleapis.com/css?family=Roboto',
      },
    ],
  };

const stripePromise = loadStripe('pk_test_SzN8dKdpVOi3egScdycPM9RB');
 const StripePaymentModal = ({onChange, eventId, amount,slotId}) => {
    return (
        <>
          <Elements stripe={stripePromise} options={ELEMENTS_OPTIONS}>
            <StripeCheckoutForm onPayment={onChange} eventId={eventId} amount={amount} slotId={slotId} />
          </Elements>
        </>
    );
}

export default  StripePaymentModal;
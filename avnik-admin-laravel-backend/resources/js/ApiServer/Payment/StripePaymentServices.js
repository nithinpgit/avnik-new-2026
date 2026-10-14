import axios from "axios";
import Auth from "../../Routes/Auth";
import UrlService from "../UrlService";

class StripePaymentServices  {

    async fetchPaymentDetailsService(props){
    
        try{
           const response= await axios.get(UrlService.stripePaymentsUrls(),props,
             {headers:{
                'Accept':'application/json',
                 authorization:`Bearer ${Auth.getAccessToken()}`,
             }}
           );
           
          return response;

         }catch(error){
           
            return false;
         
        }
       }
       async chargesPaymentService(props){
    
        try{
           const response= await axios.post(UrlService.stripePaymentsUrls(),props,
             {headers:{
                'Accept':'application/json',
                 authorization:`Bearer ${Auth.getAccessToken()}`,
             }}
           );
          return response;
         }catch(error){
            return false;
        }
       }
     
}

export default new StripePaymentServices();

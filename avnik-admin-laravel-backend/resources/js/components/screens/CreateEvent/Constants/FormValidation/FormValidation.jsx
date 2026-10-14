
class FormValidation {
    
    formValidation(FormData){

        if(FormData){
            
        }
        return true;
    }
    FormValidationStepTwo(data){

        if(data.eventTitle){
            
            return true;
        
        }else if(data.SelectedStartDate?.length>0){
            
            return true;

        }else{
        
            return false;
        }

    }
    
}

export default new  FormValidation(); 
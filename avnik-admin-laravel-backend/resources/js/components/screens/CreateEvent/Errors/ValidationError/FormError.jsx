

class FormErrors {
 
     responseValidationError(error){
        error.map((res)=>{
            return toastr["error"](res);
        })
     }

}
export default new FormErrors(); 

import React, { useContext } from 'react';
import UserPaymentContext from '../../../UserPaymentContext/UserPaymentContext';


const BankVerificationFrom = ({handleVerification,preloader}) => {
    const [state, dispatch] = useContext(UserPaymentContext);
    const handleOnChange=(e)=>{
        let name=e.target.name;
        let value=e.target.value;
        dispatch({type:name,payload:{Type:name,[name]:value}});
    }
    const FormObject={
        "legal_entity.first_name":{"for":"FirstName","name":"FirstName","label":"First Name","type":"text","required":true,'placeholder':"Enter First Name"},
        "legal_entity.last_name":{"for":"LastName","name":"LastName","label":"Last Name","type":"text","required":true,'placeholder':"Enter Last Name" },
        "legal_entity.dob.day":{"for":"DOB","name":"DOB","label":"Date of birth","type":"date","required":true,'placeholder':"Enter Date of Birth"},
        "legal_entity.dob.month":{"for":"Month","name":"Month","label":"Last Name","type":"hidden","required":false,},
        "legal_entity.dob.year":{"for":"Year","name":"Year","label":"Year","type":"text","required":true,"placeholder":"Enter Year"},
        "legal_entity.ssn_last_4":{"for":"SSN","name":"SSN","label":"Last 4 digits of Social Security number","type":"number","required":true,'placeholder':"Enter Last 4 digits"}
    };
    return (
        <>
            <div className="modal fade" id="bank-verification-popup" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    {/* <h5 className="modal-title" id="exampleModalLabel">Modal title</h5> */}
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <form onSubmit={handleVerification}>
                <div className="modal-body">
                    <div className='row'>

                    {state?.ConnectAccounts?.verification?.fields_needed?.length>0?state?.ConnectAccounts?.verification?.fields_needed?.filter((fil)=>fil!='legal_entity.dob.year').map((res)=>
                   
                    <div className="col-sm-6 col-md-6" key={res} style={FormObject[res]?.type=="hidden"?{display:'none'}:{display:'block'}}>

                    <div class="form-group">
                    <label for={FormObject[res]?.for}>{FormObject[res]?.label} {FormObject[res]?.required?<strong className="text-danger">*</strong>:""}</label>
                    <input type={FormObject[res]?.type} onChange={handleOnChange} name={FormObject[res]?.name} className="form-control"  aria-describedby="emailHelp" required={FormObject[res]?.required} placeholder={FormObject[res]?.placeholder} />
                    </div>
                    </div>

                    
                    ):""}
                    </div>

                </div>
                <div className="modal-footer">
                    <button type="submit" className="btn default-btn float-right" disabled={preloader}>{preloader?<span className='button-pre-loading'>wait...</span>:"Save"}</button>
                </div>
                </form>

                </div>
            </div>
            </div>

        </>
    );
}
export default BankVerificationFrom;
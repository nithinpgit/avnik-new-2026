import moment from 'moment';
import React, { useContext } from 'react';
import UserPaymentContext from '../../UserPaymentContext/UserPaymentContext';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css';
import { DateRangePicker } from 'react-date-range';
import { ApiService } from '../../../../ApiServer/ApiService';
let Style={
    width: '44%',
    height: 'auto',
    zIndex: 99999,
    // background:' transparent',
    background:' #fff',
    position: 'absolute',
    marginLeft: '-400px',
    marginTop: '40px',
}
const SearchPayment = ({fetch}) => {
    const [state,dispatch,handelSearchSubmit] = useContext(UserPaymentContext);
    const selectionRange = {
        startDate: state.DateRangeStart,
        endDate: state.DateRangeEnd,
        key: 'selection',
      }
      const handleSelect=(ranges)=>{
        console.log(ranges,'ranges');
        dispatch({type:'DATE_PICKER',payload:{DateRangeStart:ranges.selection.startDate,DateRangeEnd:ranges.selection.endDate}})
      }
      const handleWithdrawModal=(e)=>{
        $('#WithdrawalModal').modal('show');
      }
      const handleTotalWithdraw=(e)=>{
        e.preventDefault();
        if(state?.Pagination?.AvailableToWithdraw>100){
            ApiService._connectAccountPayout({amount:state?.Pagination?.AvailableToWithdraw}).then((res)=>{
                $('#WithdrawalModal').modal('hide');
                if(res.status==200){
                    fetch();
                 console.log(res,'connect customer')
                    toastr["success"]('Your amount process to withdraw');
                    // dispatch({type:'CARD_LIST',payload:{Type:'CARD_LIST',DebitCards:res?.data?.data}});
                }else{
                    toastr["error"](res?.data?.message);
                }
            }).catch((error)=>{
                toastr["error"]('!opps');
                console.log(error);
            }) 
        }else{
            $('#WithdrawalModal').modal('hide');
            
            toastr["error"]('Min balance required 100');
        }
        
      }
    return (
        <>
            <div className="cmn-rit-top-heading-sec message-top-bx">
                <div className="float-left">
                    {parseInt(state?.Pagination?.AvailableToWithdraw) > 0 ?
                        <button className="btn default-btn start-end-btn" onClick={handleWithdrawModal} disabled={state?.Pagination?.AvailableToWithdraw>100?false:true} >Withdraw All (${state?.Pagination? state?.Pagination?.AvailableToWithdraw : 0})</button> : ''
                    }
                </div>
                <form onSubmit={handelSearchSubmit}>
                    <div className="inbox-rit-search">
                        <ul class="cmn-ul-list">
                            
                            {state.UserPaymentFilter=="Date"?<li>
                            <div class="multi-date-calendar">
                                <input type="text" style={{width: '330px'}} onClick={()=>dispatch({type:'DATE_PICKER_MODAL',payload:!state.DateRangePickerModal})} class="form-control" placeholder="" value={moment(state.DateRangeStart).format('ddd, MMM D YYYY')+' - '+moment(state.DateRangeEnd).format('ddd, MMM D YYYY')} readOnly/>
                                <label><i class="av av-calendar-icon"></i></label>
                                    {state.DateRangePickerModal?<div className="card" style={Style}>

                                        <div className="card-body p-0">
                                        <DateRangePicker
                                            ranges={[selectionRange]}
                                            onChange={handleSelect}
                                            rangeColors="#145388"
                                            color="#145388"
                                            months={2}
                                            direction="horizontal"
                                        />
                                        </div>
                                    </div>:''}
                                </div>    
                            </li>:''}
                            
                            <li>
                                <div className="flex-container">
                                    <div style={{ flexGrow: '5' }} className="flex-select-bx">
                                        <select className="form-control custom-select-bx" onChange={(e) =>dispatch({type:'USER_PAYMENT_SEARCH_FILTER',payload:e.target.value})} value={state?.UserPaymentFilter}  >
                                            <option value="All">- All -</option>
                                            <option value="Received">Received</option>
                                            <option value="FilePayment">File Payment</option>
                                            <option value="Date">Date</option>
                                            <option value="Sent">Sent</option>
                                        </select>
                                    </div>
                                    <div style={{ flexGrow: '5' }} className="flex-input-bx">
                                        <div className="cmn-search-bx">
                                            <input className="form-control" type="text" onChange={(e) => dispatch({type:'USER_PAYMENT_SEARCH',payload:e.target.value})} value={state.UserPaymentSearch} placeholder="Search" aria-label="Search" />
                                            <button className="btn link-btn" type="submit"><i className="av av-search-icon"></i></button>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>

                    </div>
                </form>
            </div>
            <WithdrawalModal amount={state?.Pagination? state?.Pagination?.AvailableToWithdraw : 0} handleSubmit={handleTotalWithdraw}/>
        </>
    );
};

const WithdrawalModal=(props)=>{
    return(
<>
            <div
                className="modal fade default-popup confirm-message-popup"
                id="WithdrawalModal"
                tabIndex="-1"
                role="dialog"
                ariaLabelledBy="exampleModalLabel"
                ariaHidden="true"
            >
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <form onSubmit={props.handleSubmit}>
                            <div className="modal-header">
                                <button
                                    type="button"
                                    className="close"
                                    data-dismiss="modal"
                                    aria-label="Close"
                                >
                                    <span aria-hidden="true">
                                        <i className="av av-close-icon"></i>
                                    </span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="message-m-box">
                                    {/* <div className="message-with-icon">
                                    <span className="info-icon"><i className="av av-info-icon"></i></span>
                                </div> */}
                                    <strong>
                                     Do you wish to withdraw ${props?.amount>0?props?.amount:0} to your bank? <br></br>
                                    (Your amount will show in your bank within 3-4 business days)
                                    </strong>
                                   
                                </div>
                            </div>
                            <div className="modal-footer">
                                <div className="no-yes-btns">
                                    <ul className="cmn-ul-list">
                                        <li>
                                            <button
                                                type="button"
                                                className="btn blue-bdr-btn"
                                                data-dismiss="modal"
                                            >
                                                No
                                            </button>
                                        </li>
                                        <li>
                                            <button
                                                type="submit"
                                                className="btn default-btn"
                                                // disabled={value?false:true}
                                            >
                                                Yes
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
export default SearchPayment;

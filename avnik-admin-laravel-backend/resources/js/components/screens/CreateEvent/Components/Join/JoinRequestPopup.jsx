import Axios from "axios";
import React, {useContext, useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { ApiService } from "../../../../../ApiServer/ApiService";
import GlobalContext from "../../../../../Global/Context/GlobalContext";
import JoinRequestContext from "./JoinRequestContext/JoinRequestContext";
import moment from "moment";
import { Link ,useHistory} from "react-router-dom";

const JoinRequestPopup = props => {
    const [globalState, globalDispatch] = useContext(GlobalContext);
    const Property = useContext(JoinRequestContext);
   const  history =useHistory();
    const status = {
        1: { title: 'Ongoing', className: 'awaiting-status'},
        2: { title: 'Scheduled', className: 'awaiting-status'},
        3: { title: 'Cancelled', className: 'refunded-status'},
        4: { title: 'Completed', className: 'completed-status'},
        5: { title: 'N/A', className: 'completed-status'},
        6: { title: 'Cancelled By Host', className: 'refunded-status'},
      }
      const checkStatusRender=(endDateTime,startDateTime,resStatus)=>{
        // if(resStatus==="enabled"&&moment(endDateTime, 'YYYY-MM-DD HH:mm:ss')>moment()&&moment()<moment(startDateTime,'YYYY-MM-DD HH:mm:ss')){      
        //     return<> 
        //     <span className={`btn status-btn ${status[1].className}`}>
        //     {status[1].title}
        //     </span>
        //     </> 
        // }else 
        if (resStatus==="enabled"&&moment()<moment(startDateTime,'YYYY-MM-DD HH:mm:ss')&&moment()<moment(endDateTime,'YYYY-MM-DD HH:mm:ss')){
            return<> 
            <span className={`btn status-btn ${status[2].className}`}>
            {status[2].title}
            </span>
            </>
        }
        if(resStatus==="cancelled"){
            return<> 
            <span className={`btn status-btn ${status[3].className}`}>
            {status[3].title}
            </span>
            </>
        }
        if(resStatus==="cancelledByHost"){
            return<> 
            <span className={`btn status-btn ${status[6].className}`}>
            {status[6].title}
            </span>
            </>
        }
        if (resStatus==="enabled"&&moment()>moment(startDateTime,'YYYY-MM-DD HH:mm:ss')||moment()>moment(endDateTime,'YYYY-MM-DD HH:mm:ss')){
            return<> 
            <span className={`btn status-btn ${status[4].className}`}>
            {status[4].title}
            </span>
            </>
        }else{
            return<> 
            <span className={`btn status-btn ${status[5].className}`}>
            {status[5].title}
            </span>
            </>
        }
        
      }
    const [AutoAccept, setAutoAccept] = useState();
    const enableAutoAccept = id => {
        ApiService._joiningRequestPop(id)
            .then(res => {
                if (res.data.status == 200) {
                    setAutoAccept(res.data.data);
                    props.JoinUserRequest(Property?.id);
                }
            })
            .catch(error => {});
    };
    useEffect(() => {
        setAutoAccept(
            Property.events?.auto_accept_participant == false ? false : true
        );
        return;
    }, [Property]);

    const RejectAcceptCancelHandler = (ActionType, UserId, SlotId, EventId) => {
        let data = {
            actionType: ActionType,
            userId: UserId,
            slotId: SlotId,
            eventId: EventId
        };
        Axios.patch(`api/joiningRequest/${EventId}`, data, {
            headers: {
                Accept: "application/json",
                authorization: `Bearer ${localStorage.getItem("accessToken")}`
            }
        })
            .then(res => {
                if (res.data.status == 200) {
                    props.JoinUserRequest(SlotId);
                }
            })
            .catch(error => {});
    };

    const handleGlobalState = eventObj => {
        let Files = JSON.parse(Property?.events?.event_files);
        let ImageFiles = "";
        Files.map((res, index) =>
            res.type == "jpg" ||
            res.type == "png" ||
            res.type == "gif" ||
            res.type == "jpeg" ||
            res.type == "svg"
                ? (ImageFiles = res.file_url)
                : ""
        );

       
        let data = {
            roomName:Property.events?.event_title,
            eventId:Property?.event_fk_id,
            slotId:Property?.id,
            roomImage:ImageFiles,
            broadcasting:false,
        }
        ApiService._createEventRoom(data).then((res)=>{
                if(res.data.status==200){
                    $('#join-request-popup').modal('hide');
                setTimeout(() => {
                    history.push('/messages')
                }, 1000);
                }else{

                }
                console.log(res)
        }).catch((error)=>{
            console.log(error);
        })
        
    };

    const ModalToggle = eve => {
        $(eve).modal({ backdrop: "static", keyboard: false });
    };
    // if (globalState.Redirect === "/messages") {
    //     return <Redirect to="/messages" />;
    // }
    return (
        <>
            
            <div
                className="modal left fade side-popup join-request-popup"
                id="join-request-popup"
                tabIndex="-1"
                aria-labelledby="join-request-popup"
                aria-hidden="true"
            >
                <div className="modal-dialog">
                {Property==''?<JoinRequestPreloader/>:<form>
                        <div className="modal-content">
                            <button
                                type="button"
                                className="close"
                                data-dismiss="modal"
                                aria-label="Close"
                            >
                                {" "}
                                <i className="av av-close-icon"></i>
                            </button>
                            <div className="modal-header">
                                <h2 className="modal-title">
                                    {Property.events?.event_title ||
                                        "no title found"}
                                </h2>
                                <div>
                                    {" "}
                                    <span>
                                        {moment.tz(moment(
                                            Property.start_date,
                                            "YYYY-MM-DD"),Property?.events?.timezone
                                        ).tz(globalState?.timeZone).format("D MMM YYYY") +
                                            " " + moment(moment(Property.start_time,"HH:mm"),Property?.events?.timezone).tz(globalState?.timeZone).format("h:m A")}
                                    </span>

{Property?.status=="cancelledByHost"?<span className="btn status-btn refunded-status">Cancelled by Host</span>:''}
                                </div>
                            </div>
                            <div className="modal-body input-bdr-btm">
                                <div className="row">
                                    <div className="col-12 col-sm-12">
                                        <div className="people-joined-heading">
                                            <div className="auto-accept-btns">
                                                <ul className="cmn-ul-list">
                                                    <li>
                                                        <strong className="p-j-h">
                                                            {Property != ""
                                                                ? Property
                                                                      .event_payment.filter((fl)=>!fl?.extended)
                                                                      .length
                                                                : 0}{" "}
                                                            People Joined
                                                        </strong>
                                                    </li>
                                                    <li>
                                                        {/* <button type="button" onClick={()=>{
                                                                    
                                                                    if(confirm('Are you sure?')){
                                                                        enableAutoAccept(Property.events?.id);
                                                                    }
                                                                }} className="btn default-btn">{AutoAccept?"Disable Auto Accept":'Auto Accept'}</button> */}
                                                    </li>

                                                    <li>
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                ModalToggle(
                                                                    "#invite-link-popup"
                                                                )
                                                            }
                                                            className="btn link-btn default-btn"
                                                        >
                                                            Share & Invite
                                                        </button>

                                                        {/* <a href="#" onClick={()=>ModalToggle('#invite-link-popup')} className="btn link-btn" ><i className="av av-invite-icon"></i>
                                                             </a>  */}
                                                    </li>
                                                    <li>
                                                        {Property ? (
                                                            <button
                                                                type="button"
                                                                onClick={
                                                                    handleGlobalState
                                                                }
                                                                className="btn link-btn default-btn"
                                                            >
                                                                Message
                                                            </button>
                                                        ) : (
                                                            //  <a href="#" onClick={handleGlobalState} className="btn link-btn" ><i className="av av-chat-notify-icon"></i></a>
                                                            ""
                                                        )}
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="people-request-list">
                                            <ul>
                                                {Property != ""
                                                    ? Property?.event_booking.map(
                                                          (res,i) => {
                                                              return (
                                                                  <li
                                                                      key={
                                                                          res.id
                                                                      }
                                                                  >
                                                                      <div className="accept-reject-bx">
                                                                          {" "}
                                                                          <strong>
                                                                              <a
                                                                                  href={`/profile/${res?.participant_user?.username}`}
                                                                                  target="_blank"
                                                                              >
                                                                                  {
                                                                                      res?.participant_user?.name
                                                                                  }
                                                                              </a>
                                                                          </strong>
                                                                          <strong>
                                                                              {

                                                                                      moment.utc(res?.updated_at,'YYYY-MM-DD HH:mm:ss').local().format('D MMM YYYY hh:mm A')                                                                                  }
                                                                          </strong>
                                                                          <div className="a-r-btns">
                                                                         {/* {Property?.status==="cancelledByHost"&&Property?.event_booking?.find((bookRes)=>bookRes?.event_slot_id==Property?.id)?<span 
                                                                          className={`btn status-btn ${'refunded-status'}`}
                                                                          >
                                                                            Cancelled
                                                                          </span>:Property?.status==="cancelled"?""
                                                                          :<span 
                                                                          className={`btn status-btn ${Property?.event_booking?.find((bookRes)=>bookRes?.status=="cancelled"&&bookRes?.event_slot_id==Property?.id&&bookRes?.p_user_id==res?.paid_user?.id)?'refunded-status':moment()>moment(res?.start_date_time,'YYYY-MM-DD HH:mm')?'refunded-status':'awaiting-status'}`}
                                                                          > */}
                                                                          {/* {Property?.event_booking?.find((bookRes)=>bookRes?.status=="cancelled"&&bookRes?.event_slot_id==Property?.id&&bookRes?.p_user_id==res?.paid_user?.id)?'Cancelled': moment()>moment(res?.start_date_time,'YYYY-MM-DD HH:mm')?'Completed':'Scheduled'} */}
                                                                          {checkStatusRender(res?.end_date_time,res?.start_date_time,res?.status)}
                                                                          {/* </span> */}
                                                                         {/* } */}
                                                                          


                                                                              {/* <button type="button" onClick={()=>{
        
                                                                    if(confirm('Are you sure?')){
                                                                        RejectAcceptCancelHandler('accepted',res.paid_user.id,Property.id,Property.events?.id);
                                                                    }
                                                            
                                                            }} className="btn light-bdr-btn" disabled={res.accept_by_host=="accepted"||res.accept_by_host=="cancel"||res.accept_by_host=="rejected"?true:false}>Accept</button>
                                                               <button type="button" onClick={()=>{
                                                                    if(confirm('Are you sure?')){
                                                                        RejectAcceptCancelHandler('rejected',res.paid_user?.id,Property?.id,Property.events?.id);
                                                                    }}} disabled={res.accept_by_host=="rejected"?true:false} className="btn light-bdr-btn">Reject</button> */}
                                                                              {/* <button type="button" onClick={()=>{
                                                                    if(confirm('Are you sure?')){
                                                                        RejectAcceptCancelHandler('cancel',res.paid_user.id,Property?.id,Property.events?.id);
                                                                    }
                                                                }} disabled={res.accept_by_host=="accepted"||res.accept_by_host=="cancel" || res.accept_by_host=="rejected"?true:false} className="btn light-bdr-btn">Cancel</button> */}
                                                                          </div>
                                                                      </div>
                                                                  </li>
                                                              );
                                                          }
                                                      )
                                                    : ""}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>}
                </div>
            </div>
             

            {/* } */}
        </>
    );
};

export default React.memo(JoinRequestPopup);

const JoinRequestPreloader = ()=> {
    
        let array = [];
        for (let index = 0; index < 10; index++) {
            array.push(index);
        }

        return (
            <>
                
                        <form>
                            <div className="modal-content">
                                <button
                                    type="button"
                                    className="close"
                                    data-dismiss="modal"
                                    aria-label="Close"
                                >
                                    {" "}
                                    <i className="av av-close-icon"></i>
                                </button>
                                <div className="modal-header">
                                    <h2 className="modal-title">
                                        <Skeleton height={30} width={180} />
                                    </h2>
                                </div>
                                <div className="modal-body input-bdr-btm">
                                    <div className="row">
                                        <div className="col-12 col-sm-12">
                                            <div className="people-joined-heading">
                                                <div className="auto-accept-btns">
                                                    <ul className="cmn-ul-list">
                                                        <li>
                                                            <strong className="p-j-h">
                                                                <Skeleton
                                                                    height={24}
                                                                    width={100}
                                                                />
                                                            </strong>
                                                        </li>
                                                        <li>
                                                            {" "}
                                                            <Skeleton
                                                                height={24}
                                                                width={55}
                                                            />{" "}
                                                        </li>
                                                        <li>
                                                            {" "}
                                                            <Skeleton
                                                                circle={true}
                                                                height={24}
                                                                width={24}
                                                            />{" "}
                                                        </li>
                                                        <li>
                                                            {" "}
                                                            <Skeleton
                                                                circle={true}
                                                                height={24}
                                                                width={24}
                                                            />{" "}
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>

                                            {array.map(res => {
                                                return (
                                                    <>
                                                        <div
                                                            key={res}
                                                            className="people-request-list"
                                                        >
                                                            <ul>
                                                                <li>
                                                                    <div className="accept-reject-bx">
                                                                        {" "}
                                                                        <strong>
                                                                            <Skeleton
                                                                                height={
                                                                                    24
                                                                                }
                                                                                width={
                                                                                    100
                                                                                }
                                                                            />
                                                                        </strong>
                                                                        <div className="a-r-btns">
                                                                            <Skeleton
                                                                                style={{
                                                                                    marginRight:
                                                                                        "5px"
                                                                                }}
                                                                                height={
                                                                                    22
                                                                                }
                                                                                width={
                                                                                    55
                                                                                }
                                                                                count={
                                                                                    3
                                                                                }
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
            </>
        );
    }


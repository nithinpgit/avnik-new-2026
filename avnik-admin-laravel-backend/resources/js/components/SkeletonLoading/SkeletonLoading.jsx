import React from 'react';
import Skeleton from 'react-loading-skeleton';
import { Link } from 'react-router-dom';

const UserEventsListSkeleton = ({count}) => {



return        (
<>

                {[1,2,3,4,5].map((res)=> <div key={res} className="c-table-row">

                    <div className="cell event-details-editable" data-title="Event Name">
                        <Skeleton  height={30} width={120} />   
                    </div>

                    <div className="cell event-more-editable" data-title="Extend">
                        <div className="event-more-btn">
                             <Skeleton  height={15} width={15} />
                        </div>
                    </div>
                    <div className="cell event-type-editable" data-title="Event Type">
                        <div className="c-table-text"><Skeleton  height={30} width={110} /></div>
                    </div>
                    <div className="cell event-date-time-editable" data-title="Event Date">
                        <div className="message-short-text"><Skeleton  height={30} width={110} /> </div>
                    </div>
                    <div className="cell event-amount-editable" data-title="Amount">
                        <Skeleton  height={30} width={65} />
                    </div>
                    <div className="cell event-duration-editable" data-title="Duration">
                        <Skeleton  height={30} width={65} />
                    </div>
                    <div className="cell event-hosted-by-editable" data-title="Hosted By">
                        <div className="c-table-text"><Skeleton  height={30} width={110} /></div>
                    </div>
                    <div className="cell event-status-editable" data-title="Status">
                        <div className="complite-cancel-status"><Skeleton  height={30} width={110} /></div>
                    </div>
                    <div className="cell event-message-editable" data-title="Message">
                        <div className="message-delete-btn">
                            <div className="r-m-t-bx my-account-menu table-dd">
                                <div className="btn-group">
                                <Skeleton  height={30} width={20} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>)}
                  
        </>
        );

}

// notification 
const UserNotificationSkeleton = ({count}) => {



    return        (
    <>
    
                    {[1,2,3,4,5].map((res)=> <div key={res} className="c-table-row">
                    <div className="cell payment-order-name-editable" data-title="Name">
                    <div className="c-table-text payment-date-time-editable">
                        <Skeleton circle={true} width={30} height={30}/>
                        <Skeleton width={120} height={30}/>
                    </div>
                    </div>
                        {/* <div className="cell event-details-editable" data-title="Event Name">
                            <Skeleton  height={30} width={120} />   
                        </div> */}
    
                        <div className="cell event-more-editable" data-title="Extend">
                            <div className="event-more-btn">
                                 {/* <Skeleton  height={15} width={15} /> */}
                            </div>
                        </div>
                        <div className="cell event-type-editable" data-title="Event Type">
                            <div className="c-table-text">
                            {/* <Skeleton  height={30} width={110} /> */}
                            </div>
                        </div>
                        <div className="cell event-date-time-editable" data-title="Event Date">
                            <div className="message-short-text"><Skeleton  height={30} width={110} /> </div>
                        </div>
                        <div className="cell event-amount-editable" data-title="Amount">
                            {/* <Skeleton  height={30} width={65} /> */}
                        </div>
                        <div className="cell event-duration-editable" data-title="Duration">
                            {/* <Skeleton  height={30} width={65} /> */}
                        </div>
                        <div className="cell event-hosted-by-editable" data-title="Hosted By">
                            <div className="c-table-text">
                            {/* <Skeleton  height={30} width={110} /> */}
                            </div>
                        </div>
                        <div className="cell event-status-editable" data-title="Status">
                            <div className="complite-cancel-status">
                            <Skeleton  height={30} width={110} />
                            </div>
                        </div>
                        <div className="cell event-message-editable" data-title="Message">
                            <div className="message-delete-btn">
                                <div className="r-m-t-bx my-account-menu table-dd">
                                    <div className="btn-group">
                                    {/* <Skeleton  height={30} width={20} /> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>)}
                      
            </>
            );
    
    }

const FavoriteListSkeleton=()=>{
    return(
        <>
        {[1,2,3,4,5].map((res)=> 
        <div key={res} className="c-table-row">
                <div className="cell favorite-icon-editable" data-title="Favorite">
                <Skeleton width={40} height={30}/>
               
                </div>
                <div className="cell fav-event-details-editable" data-title="Event Details">
                    <div className="message-user-bx">
                        <Skeleton  width={130} height={30}/>
                    </div>
                </div>
                <div className="cell fav-location-editable" data-title="Event Date">
                    <Skeleton  width={130} height={30}/>
                </div>
            </div>
        )}
        </>
    );
}

const UserPaymentPreloader=()=>{
    return(
       
       <>

       
  
  {[1,2,3,4,5].map((res)=> 
        <div key={res} className="c-table-row">
                <div className="cell payment-order-name-editable" data-title="Name">
                    <div className="c-table-text payment-date-time-editable"><Skeleton circle={true} width={30} height={30}/> <Skeleton width={120} height={30}/></div>
                </div>
                <div className="cell payment-order-number-editable" data-title="Order Number">
                    <div className="c-table-text"><Skeleton width={120} height={30}/></div>
                </div>
                <div className="cell payment-date-time-editable" data-title="Event Date">
                    <div className="c-table-text"><Skeleton width={120} height={30}/> </div>
                </div>
                <div className="cell payment-amount-editable" data-title="Amount">
                    <div className="c-table-text"><Skeleton width={120} height={30}/></div>
                </div>
                <div className="cell payment-from-to-editable" data-title="Duration">
                    <div className="c-table-text"><a href="#"><Skeleton width={120} height={30}/></a></div>
                </div>
        </div> )}
        
       
        </>
    );
}

const UserReviewsPreloader=()=>{
    return(
       
       <>

       
  
  {[1,2,3,4,5].map((res)=> 
        <div key={res} className="c-table-row">
                <div className="cell payment-order-name-editable" data-title="Name">
                    <div className="c-table-text payment-date-time-editable"><Skeleton circle={true} width={30} height={30}/> <Skeleton width={120} height={30}/></div>
                </div>
                <div className="cell payment-order-number-editable" data-title="Order Number">
                    <div className="c-table-text"><Skeleton width={120} height={30}/></div>
                </div>
                <div className="cell payment-date-time-editable" data-title="Event Date">
                    <div className="c-table-text"><Skeleton width={120} height={30}/> </div>
                </div>
                <div className="cell payment-amount-editable" data-title="Amount">
                    <div className="c-table-text"><Skeleton width={120} height={30}/></div>
                </div>
                <div className="cell payment-from-to-editable" data-title="Duration">
                    <div className="c-table-text"><a href="#"><Skeleton width={120} height={30}/></a></div>
                </div>
                <div className="cell payment-from-to-editable" data-title="Duration">
                    <div className="c-table-text"><a href="#"><Skeleton width={120} height={30}/></a></div>
                </div>
                
                <div className="cell review-write-editable text-right" data-title="Write Review">
                    <div className="c-table-text text-right">
                        <Skeleton width={120} height={30}/>
                    </div>
                </div>
        </div> )}
        
       
        </>
    );
}

const SlotsDetailsPreloader=()=>{
    return(
        <>
            {[1,2,3,4,5].map((res)=> 
                <ul key={res}>
                    <li>
                        <div className="t-s-bx">
                            <div className="ts-option">
                                <div className="r-m-t-bx my-account-menu">
                                    <div className="btn-group">
                                     <Skeleton width={10} height={20}/>
                                    </div>
                                </div>
                            </div>
                        <div className="ts-time">
                            <Skeleton width={200} height={20}/>

                        </div>
                            <div className="ts-btn">
                                <Skeleton width={84} height={30}/>
                            </div>
                        </div>
                        </li>
                </ul>
            )}
        </>
    )
}
const UserProfileDataPreloader=()=>{
    return (<>
        <div className="m-s-info">
                                                            <ul className="cmn-ul-list">
                                                                
                                                                    <li>
                                                                        <i className="av av-member-since-icon"></i>
                                                                        <span><Skeleton width={200} height={30}/></span>
                                                                    </li> 
                                                                
                                                                    <li className='my-profile-language3'>
                                                                        <i className="av av-translate-icon"></i>
                                                                        <Skeleton width={60} height={30}/> <Skeleton width={60} height={30}/> <Skeleton width={60} height={30}/>
                                                                    </li> 
                                                                
                                                                    <li>
                                                                        <i className="av av-location-icon"></i>
                                                                        <><Skeleton width={120} height={30}/></>
                                                                    </li> 
                                                                
                                                                    <li className="my-profile-skill">
                                                                        <i className="av av-Profession-icon"></i>
                                                                {[1,2,3].map((res,i)=><><span key={res} className={i===0?'d-none skill-separator':'d-block skill-separator'}>|</span><span ><Skeleton width={60} height={30}/></span></>)}
                                                                    </li> 
                                                            </ul>
                                                        </div>
         </>)
}
const MessageConversationPreloader=()=>{
    return (
        <>
            {[1,2,3,4,5,6].map((res,i)=><li key={i} className="active" style={{background:""}}>
                <div className="in-user-bx">
                    <figure className="cmn-profile-pic">
                    <Skeleton circle={true} width={58} height={58}/>
                    </figure>
                    <div className="in-rit-user-bx">
                        <div className="name-date-text">
                            <p>
                                <span>
                                    <small><Skeleton width={200} height={30}/></small>                                    
                                </span>
                            </p>
                            <span><Skeleton width={200} height={30}/></span>
                        </div>
                        <div className="in-m-text-bx">
                            <p><Skeleton width={200} height={30}/></p>
                            <a href="#"><i className="av av-favorite-icon"></i> </a>
                        </div>
                    </div>
                </div>
            </li>)}
        </>
    )
}
const CalendarPreloader=()=>{
    return (
        <>
            <section className="mid-content-sec in-page-content-sec events-calender">
                <div className="calender-events-content">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-8">
                                <div className="main-calender-event-view">
                                    <div className="white-content-bx">
                                        <div className="event-calender-bx">
                                            <figure>
                                                <Skeleton width={893} height={442}/>
                                            </figure>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4">
                                <div className="month-wise-calendar">
                                    <div className="white-content-bx">
                                        <figure>
                                        <Skeleton width={416} height={282}/>
                                        </figure>
                                        <div className="dot-instructions-point">
                                            <ul className="cmn-ul-list">
                                                <li>
                                                    <div className="d-i-p-bx">
                                                    <Skeleton width={10} circle={true} height={10}/>
                                                        <span><Skeleton width={100} height={30}/></span>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="d-i-p-bx d-i-green">
                                                    <Skeleton width={10} circle={true} height={10}/>
                                                        <span>
                                                        <Skeleton width={100} height={30}/>
                                                        </span>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="d-i-p-bx d-i-blue">
                                                    <Skeleton width={10} circle={true} height={10}/>
                                                        <span><Skeleton width={100} height={30}/></span>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="upcoming-events">
                                    <div className="white-content-bx">
                                        <div className="tab-heading">
                                            <h2 className="float-left">
                                            <Skeleton width={80} height={30}/>
                                            </h2>
                                            <Skeleton width={100} height={30}/>
                                        </div>

                                        {/* <UpComingEvents
                                            events={globalState.MyUpComing}
                                        /> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
export {CalendarPreloader,MessageConversationPreloader,UserProfileDataPreloader,SlotsDetailsPreloader,UserNotificationSkeleton,UserEventsListSkeleton,UserReviewsPreloader,FavoriteListSkeleton,UserPaymentPreloader};

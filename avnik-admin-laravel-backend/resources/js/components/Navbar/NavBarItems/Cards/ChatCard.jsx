import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { FileManagerPath } from '../../../../ApiServer/UrlService';

const ChatCard=()=>{
    return(
        <div className="r-m-t-bx noti-message-menu chat-message-menu">
        <div className="btn-group">
            <button type="button" className="btn dropdown-toggle notify-dott" data-toggle="dropdown" data-display="static" aria-haspopup="true" aria-expanded="false"><i className="av av-inbox-icon"></i> </button>
            <div className="dropdown-menu dropdown-menu-lg-right">
                <ul>
                <li >
                            <a href={void(0)} className="dropdown-item">
                                {/* <figure className="n-m-pic"><img src={res?.data?.image?FileManagerPath+res?.data?.image:FileManagerPath+'public/assets/images/bell.png'} alt="" /></figure> */}
                                <div className="rit-m-bx">
                                    <strong >Unread Message 0</strong>
                                    {/* <p dangerouslySetInnerHTML={{__html: res?.data?.description}}></p> */}
                                    {/* <span>{moment(res?.created_at).local().format('DD MMM YYYY hh:mm A')}</span> */}
                                </div>
                            </a>
                </li>
                    {/* <li>
                        <a href="#" className="dropdown-item">
                            <figure className="n-m-pic"><img src={FileManagerPath+`public/assets/images/favorite-a-pic.jpg`} alt="" /></figure>
                            <div className="rit-m-bx">
                                <strong>kevinwillson88</strong>
                                <p>Send a new comment!</p>
                                <span>17 June 2020  04:45 PM </span>
                            </div>
                        </a>
                    </li>
                    <li>
                        <a href="#" className="dropdown-item">
                            <figure className="n-m-pic"><img src={FileManagerPath+`public/assets/images/favorite-a-pic.jpg`} alt="" /></figure>
                            <div className="rit-m-bx">
                                <strong>kevinwillson88</strong>
                                <p>Send a new comment!</p>
                                <span>17 June 2020  04:45 PM </span>
                            </div>
                        </a>
                    </li>
                    <li>
                        <a href="#" className="dropdown-item">
                            <figure className="n-m-pic"><img src={FileManagerPath+`public/assets/images/favorite-a-pic.jpg`} alt="" /></figure>
                            <div className="rit-m-bx">
                                <strong>kevinwillson88</strong>
                                <p>Send a new comment!</p>
                                <span>17 June 2020  04:45 PM </span>
                            </div>
                        </a>
                    </li> */}
                </ul>
                <div className="see-all-link"><Link to="/messages">See All</Link></div>
            </div>
        </div>
    </div>
    );
}
export default ChatCard;

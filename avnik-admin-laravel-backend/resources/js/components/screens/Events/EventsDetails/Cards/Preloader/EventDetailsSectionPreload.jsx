import React, { Component } from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
export default class EventDetailsSectionPreload extends Component {
    
    
    render() {
        return (
            <>
            <section className="mid-content-sec in-page-content-sec">
            <div className="event-details">
                <div className="container">
                    <div className="e-d-heding">
  
                        <h1><Skeleton width={300} height={37} duration={2} /></h1>
                                
                        <div className="ed-top-btns">
                            <ul className="cmn-ul-list">            
                                <li>
                                    <Skeleton width={100} height={37}  />
                                </li>
                                <li>
                                    <Skeleton width={100} height={37}  />
                                </li>
                                <li>
                                    <Skeleton width={100} height={37}  />
                                </li>
                                
                            </ul>
                        </div>
                    </div>
                    <div className="e-d-tabs-bx">
                        <div className="av-default-tabs">
                            <div className="ah-tab-wrapper">
                                <div className="ah-tab">
                                    <a className="ah-tab-item" data-ah-tab-active="true" href="">                                    
                                    <Skeleton width={100} height={37} duration={2} />
                                    </a>
                                    <a className="ah-tab-item" href="">
                                    <Skeleton width={100} height={37} duration={2} />

                                    </a>
                                    <a className="ah-tab-item" href="">
                                    <Skeleton width={100} height={37} duration={2} />
                                     
                                    </a>
                                    <a className="ah-tab-item" href="">
                                        <Skeleton width={100} height={37} duration={2} />
                                    </a>
                                </div>
                            </div>
                            <div className="ah-tab-content-wrapper">
                                <div className="ah-tab-content" data-ah-tab-active="true">
                                    <div className="event-details-bx">
                                        <div className="row">
                                            <div className="col-sm-12 col-md-12 col-lg-7">
                                                <div className="insert-file-slider e-d-gallery">
                                                    <div id="e-d-gallery" className="owl-carousel owl-theme">
                                                        <div className="item">
                                                            <figure className="event-lft-img">
                                                                <a href="#"><Skeleton width={657} height={438} duration={2} /></a>
                                                            </figure>
                                                            
                                                        </div>
                                                        
                                                    </div>
                                                </div>
                                                <div className="event-right-content">asdasd</div>
                                            </div>
                                            <div className="col-sm-12 col-md-12 col-lg-5">
                                                <div className="event-right-content">
                                                    <div className="h-evnt-d">
                                                        <div className="e-des-tags-edit">
                                                        <div style={{ fontSize: 20, lineHeight: 1.5 }}>
                                                        <h1><Skeleton width={200} /> </h1>
                                                            { <Skeleton count={4} />}
                                                        </div>
                                                            
                                                        </div>
                                                        
                                                    </div>
                                                    <div className="h-evnt-d h-event-tags">
                                                        <div className="e-des-tags-edit">
                                                        <strong><Skeleton width={50} /> </strong>
                                                            {/* <a href="#" className="d-edit-link">Edit</a> */}
                                                        </div>
                                                        <div className="e-d-tags">
                                                            <div className="tags-list">
                                                                <ul className="ul-row-col">
                                                                    <li>
                                                                        <Skeleton width={100} height={33} />
                                                                    </li>
                                                                    <li>
                                                                        <Skeleton width={100} height={33} />
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="meeting-short-info">
                                                        <div className="event-countdown">
                                                            <strong><Skeleton width={140} height={24} /></strong>
                                                            <ul className="cmn-ul-list">
                                                                
                                                                    <li >
                                                                        <div className="c-d-bx" >
                                                                                <Skeleton  />
                                                                        </div>
                                                                    </li>
                                                                    <li >
                                                                        <div className="c-d-bx" >
                                                                                <Skeleton  />
                                                                        </div>
                                                                    </li>
                                                                    <li >
                                                                        <div className="c-d-bx" >
                                                                                <Skeleton  />
                                                                        </div>
                                                                    </li>
                                                                    <li >
                                                                        <div className="c-d-bx" >
                                                                                <Skeleton  />
                                                                        </div>
                                                                    </li>
                                                                
                                                            </ul>
                                                        </div>
                                                        <div className="meeting-space">
                                                            <h3><Skeleton width={140} height={24} /></h3>
                                                            <div className="m-s-info">
                                                                <ul className="cmn-ul-list">
                                                                    <li>
                                                                    <Skeleton circle={true} width={32} height={32} />
                                                                    <Skeleton width={140} height={24} />
                                                                    </li>
                                                                    <li>
                                                                    <Skeleton circle={true} width={32} height={32} />
                                                                    <Skeleton width={140} height={24} />

                                                                    </li>
                                                                    <li>
                                                                    <Skeleton circle={true} width={32} height={32} />
                                                                    <Skeleton width={140} height={24} />
                                                                        
                                                                    </li>
                                                                    <li>
                                                                    <Skeleton circle={true} width={32} height={32} />
                                                                    <Skeleton width={140} height={24} />
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                        <div className="join-event-bx">
                                                        <Skeleton width={110} height={36} />

                                                        </div>
                                                        <div>

                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
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
}

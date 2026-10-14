import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link, Redirect } from 'react-router-dom';
import '../../../../../public/assets/js/avnik-scroll.js';
import Footer, { InnerFooter } from '../../Footer/Footer.jsx';
import { FileManagerPath } from '../../../ApiServer/UrlService.jsx';
import ReactOwlCarousel from 'react-owl-carousel';
import AvnikSlider from './AvnikSlider.jsx';
import Auth from '../../../Routes/Auth.js';

class Welcome extends Component {
    constructor(props) {
        super(props)
        const Token = localStorage.getItem("accessToken");
        let IsLogin = true;
        if (Token == null) {
            IsLogin = false
        }
        this.state = {
            IsLogin: false,
        }
    }

    render() {
        if (this.state.IsLogin||Auth.getAccessToken()) {
            return (
                <Redirect to="/home" />
            );
        }
        document.title = "Welcome";
        return (
            <>
                <main className="landing-page">
                    <header>
                        <div className="top-nav sticky">

                            {/* <img className="d-logo" src="https://meet.avnik.com//public/assets/images/logo.svg`} alt="Avnik"/> */}
                            {/* <img className="m-logo" src="https://meet.avnik.com//public/assets/images/m-logo.svg`} alt=""/> */}
                            <nav className="navbar navbar-expand-lg">
                                <Link className="navbar-brand" to="#">
                                    <img src="https://meet.avnik.com//public/assets/images/logo.svg" alt="logo" />
                                </Link>
                                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                                    <span className="navbar-toggler-icon"><i className="av av-menu-box-icon"></i></span>
                                </button>
                                <div className="collapse navbar-collapse justify-content-end" id="navbarNavDropdown">
                                    <ul className="navbar-nav">
                                      
                                        
                                       
                                        {localStorage.getItem('accessToken') ?
                                            <Link className="nav-link" to={`/profile/${JSON.parse(localStorage.getItem('userData'))?.username}`}>My Profile<span className="sr-only">(current)</span></Link>
                                            : <li className="nav-item sign-in-btn">
                                                <Link className="btn default-btn" to="/login">Sign In</Link>
                                            </li>}
                                    </ul>
                                </div>
                            </nav>
                        </div>
                    </header>
                    <section className="home-slider-sec">
                    <AvnikSlider 
                            className="owl-carousel owl-theme "
                            loop={true}
                            margin={0}
                            nav={true}
                            dots={true}
                            responsiveClass={true}
                            navText={[
                              '<i class="av av-arrow-left-line-icon" aria-hidden="true"></i>',
                              '<i class="av av-arrow-right-line-icon" aria-hidden="true"></i>'
                          ]}
                          responsive={{
                            0: {
                                items: 1,
                                nav: false
                            },
                            600: {
                                items: 1,
                                nav: false
                            },
                            1000: {
                                items: 1,
                                nav: false,
                                loop: true,
                                margin: 0
                            }
                        }}
                            >
                                <div className="item">
                                <div className="container">
                                    <div className="row">
                                        <div className="col-sm-6 col-md-6 col-lg-6">
                                            <div className="slider-content-left">
                                                <div className="cmn-heading">
                                                    <h1>Transform Your Space into Profit: Host Events, Earn from Home!</h1>
                                                </div>
                                                <p>Easy to use platform with payment withdrawals directly to your bank account</p>
                                                <a className="btn default-btn" href="https://meet.avnik.com/register">Get Started</a>
                                            </div>
                                        </div>
                                        <div className="col-sm-6 col-md-6 col-lg-6">
                                            <figure className="banner-right-img">
                                                <img src={`${FileManagerPath}/public/assets/images/banner-img1.png`} alt="" />
                                            </figure>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            
                            </AvnikSlider>
                        

                    </section>
                    <section className="process-sec why-should-sec">
                        <div className="container">
                            <div className="section-heading text-center">
                                <h2>Why Should I Sign Up?</h2>
                            </div>
                            <div className="wb_info">
                                <img className="dot_img" src={`${FileManagerPath}/public/assets/images/process-dot-img.png`} alt="" />
                                <div className="row wb_process_item p-item-1">
                                    <div className="col-lg-6 col-md-6 col-sm-12">
                                        <div className="wb_process_img"> <img src={`${FileManagerPath}/public/assets/images/as-a-provider-img.png`} alt="" /> </div>
                                    </div>
                                    <div className="col-lg-6 col-md-6 col-sm-12">
                                        <div className="wb_process_content">
                                            <img className="number" src={`${FileManagerPath}/public/assets/images/step-no-1.png`} alt="" />
                                            <h3>As a Provider</h3>
                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore ma aliqua.</p>
                                            <div className="w-s-box">
                                                <div className="w-s-img"><img src={`${FileManagerPath}/public/assets/images/earn-money-icon.svg`} alt="" /></div>
                                                <div className="w-s-content">
                                                    <strong>Earn Money</strong>
                                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor aliqua.</p>
                                                </div>
                                            </div>
                                            <div className="w-s-box">
                                                <div className="w-s-img"><img src={`${FileManagerPath}/public/assets/images/share-your-skills-icon.svg`} alt="" /></div>
                                                <div className="w-s-content">
                                                    <strong>Share Your Skills</strong>
                                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor aliqua.</p>
                                                </div>
                                            </div>
                                            <div className="w-s-box">
                                                <div className="w-s-img"><img src={`${FileManagerPath}/public/assets/images/sale-your-files-icon.svg`} alt="" /></div>
                                                <div className="w-s-content">
                                                    <strong>Sell your files to customers</strong>
                                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor aliqua.</p>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                <div className="row wb_process_item p-item-1 p-item-2">
                                    <div className="col-lg-6 col-md-6 col-sm-12">
                                        <div className="wb_process_content pr_70 pl_70">

                                            <img className="number" src={`${FileManagerPath}/public/assets/images/step-no-2.png`} alt="" />
                                            <h3>As a Participant</h3>
                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore ma aliqua.</p>
                                            <div className="w-s-box">
                                                <div className="w-s-img"><img src={`${FileManagerPath}/public/assets/images/learn-online-icon.svg`} alt="" /></div>
                                                <div className="w-s-content">
                                                    <strong>Learn Online</strong>
                                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor aliqua.</p>
                                                </div>
                                            </div>
                                            <div className="w-s-box">
                                                <div className="w-s-img"><img src={`${FileManagerPath}/public/assets/images/make-friends-icon.svg`} alt="" /></div>
                                                <div className="w-s-content">
                                                    <strong>Make Friends</strong>
                                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor aliqua.</p>
                                                </div>
                                            </div>
                                            <div className="w-s-box">
                                                <div className="w-s-img"><img src={`${FileManagerPath}/public/assets/images/share-your-skills-icon.svg`} alt="" /></div>
                                                <div className="w-s-content">
                                                    <strong>Share your skills</strong>
                                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor aliqua.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-6 col-sm-12">
                                        <div className="wb_process_img text-right"> <img src={`${FileManagerPath}/public/assets/images/as-a-viewer-img.png`} alt="" /> </div>
                                    </div>
                                </div>

                            </div>
                            <div className="events-type">
                            <AvnikSlider 
                            className="owl-carousel owl-theme next-pre-sec"
                            loop={true}
                            margin={30}
                            nav={true}
                            dots={false}
                            responsiveClass={true}
                            navText={[
                              '<i class="av av-arrow-left-line-icon" aria-hidden="true"></i>',
                              '<i class="av av-arrow-right-line-icon" aria-hidden="true"></i>'
                          ]}
                          responsive={{
                            0: {
                                items: 1,
                                nav: true
                            },
                            600: {
                                items: 2,
                                nav: true
                            },
                            1000: {
                                items: 3,
                                nav: true,
                                loop: true
                            }
                        }}
                            >
                                    <div className="item">
                                        <div className="e-t-outer">
                                            <div className="e-t-box">
                                                <div className="e-t-icon"><i className="av av-webinar-icon"></i></div>
                                                <div className="e-t-content">
                                                    <strong>Webinars</strong>
                                                    <p>One to many meeting. </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="item">
                                        <div className="e-t-outer">
                                            <div className="e-t-box">
                                                <div className="e-t-icon"><i className="av av-appointments-icon"></i></div>
                                                <div className="e-t-content">
                                                    <strong>Appointments</strong>
                                                    <p>One on one meeting</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="item">
                                        <div className="e-t-outer">
                                            <div className="e-t-box">
                                                <div className="e-t-icon"><i className="av av-Meet-icon"></i></div>
                                                <div className="e-t-content">
                                                    <strong>Discussion</strong>
                                                    <p>Many to many meeting</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="item">
                                        <div className="e-t-outer">
                                            <div className="e-t-box">
                                                <div className="e-t-icon"><i className="av av-traning-icon"></i></div>
                                                <div className="e-t-content">
                                                    <strong>Training</strong>
                                                    <p>One to many meeting with interation</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                            </AvnikSlider>
                                
                            </div>
                        </div>
                    </section>
                    
                    
                    <section className="our-testimonils-sec">
                        <div className="container">
                            <div className="section-heading text-center">
                                <h2>An opportunity for you to have a stable income</h2>
                                
                            </div>
                            <AvnikSlider 
                            className="owl-carousel owl-theme"
                            loop
                            items={4}
                            margin={30}
                            nav={true}
                            dots={false}
                            navText={[
                              '<i class="av av-arrow-left-line-icon" aria-hidden="true"></i>',
                              '<i class="av av-arrow-right-line-icon" aria-hidden="true"></i>'
                          ]}
                          responsive={{
                              0: {
                                  items: 1,
                                  nav: false
                              },
                              600: {
                                  items: 1,
                                  nav: false
                              },
                              1000: {
                                  items: 1,
                                  nav: false,
                                  loop: true,
                                  margin: 0
                              }
                          }}
                            >
                            <div className="item">
                                    <div className="testi-outer-bx">
                                        <div className="testi-detail-bx">
                                            <div className="testi-img-outer">
                                                <div className="testi-img">
                                                    <img src={`${FileManagerPath}/public/assets/images/testi-usr-pic.jpg`} alt="" />
                                                </div>
                                            </div>
                                            <div className="testi-info">
                                                <p>Easy to use platform with all aspects of an online meeting combined. Found it very useful. </p>
                                                <span className="rating"><i className="fa fa-star" aria-hidden="true"></i><i className="fa fa-star" aria-hidden="true"></i><i className="fa fa-star" aria-hidden="true"></i><i className="fa fa-star" aria-hidden="true"></i><i className="fa fa-star" aria-hidden="true"></i></span>
                                                <strong>Avni Kasliwal</strong>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </AvnikSlider>
                            <div id="testimonias-slider" className="owl-carousel owl-theme">
                                
                            </div>
                        </div>
                    </section>
                    <Footer />
                </main>
            </>
        );
    }


}

export default Welcome;

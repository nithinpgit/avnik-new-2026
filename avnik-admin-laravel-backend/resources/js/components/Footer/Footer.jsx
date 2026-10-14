import React from 'react';

const Footer = () => {
    return (
        <footer>
            <div className="container">
                <div className="footer-links-list">
                    <div className="row">
                        <div className="col-sm-6 col-md-3 col-lg-3">
                            <div className="ftr-links-bx">
                                <strong>E-Learning</strong>
                                <ul>
                                    <li><a href="#">Webinars</a> </li>
                                    <li><a href="#">Appoinments</a> </li>
                                    <li><a href="#">Meet</a> </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-sm-6 col-md-3 col-lg-3">
                            <div className="ftr-links-bx">
                                <strong>Feature</strong>
                                <ul>
                                    <li><a href="#">Platform Overview</a> </li>
                                    <li><a href="#">Virtual Classroom</a> </li>
                                    <li><a href="#">Online Courses Platform</a> </li>
                                    <li><a href="#">Unified Content Management</a> </li>
                                </ul>
                            </div>
                        </div>                        
                    </div>
                </div>
                <div className="copyright-social">
                    <p className="copyright-text">© {new Date().getFullYear()} All Right Reserved Design by avnik </p>
                    <div className="footer-social-icn">
                        <ul>
                            <li className="text-btm">Follow Us:-</li>
                            <li className="fb"><a href="#"><i className="fa fa-facebook" aria-hidden="true"></i></a></li>
                            <li className="google"><a href="#"><i className="fa fa-google-plus" aria-hidden="true"></i></a></li>
                            <li className="twitter"><a href="#"><i className="fa fa-twitter" aria-hidden="true"></i></a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
}
export default Footer;

const InnerFooter = () => {


    return (
        <>
            <footer className="inner-footer">
                <div className="container">
                    <div className="copyright-social">
                        <p className="copyright-text">© 2019 All Right Reserved Design by avnik </p>
                    </div>
                </div>
            </footer>
        </>
    )
}
export {InnerFooter};

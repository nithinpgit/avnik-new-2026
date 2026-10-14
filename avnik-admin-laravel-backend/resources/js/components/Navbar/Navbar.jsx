import React, { Component, useContext, useState } from "react";
import { FileManagerPath } from "../../ApiServer/UrlService";
import CurrentUser from "../UserContext/CurrentUserContext/CurrentUser";
import TimeBox from "./NavBarItems/Cards/TimeBox";
import Lang from "./NavBarItems/Lang/Lang";
import Logo from "./NavBarItems/Logo";
import RightNavbarItem from "./NavBarItems/RightNavBarItem";
import { Link } from "react-router-dom";
const TopNavbar = () => {
    const currentUser = useContext(CurrentUser);
    const [toggle, setToggle] = useState(false);

    return (
        <>
            <div className={`sidebar-mm extra-info ${toggle ? "active" : ""}`}>
                <div className="close-icon menu-close">
                    <button onClick={() => setToggle(!toggle)}>
                        {" "}
                        <i className="av av-cancle-icon"></i>{" "}
                    </button>
                </div>
                <div className="side-nav-bx">
                    <TimeBox />
                </div>
                <div className="side-nav-bx">
                    <Link
                        className="sm-profile-link"
                        to={`/profile/${currentUser?.username}`}
                    >
                        <div className="review-bx side-menu-img-bx">
                            <figure className="n-m-pic">
                                <img
                                    src={
                                        currentUser?.user_profile
                                            ?.profile_picture
                                            ? `${FileManagerPath +
                                                  "/" +
                                                  currentUser?.user_profile
                                                      ?.profile_picture}`
                                            : currentUser?.user_profile
                                                  ?.social_profile_picture_url
                                            ? currentUser?.user_profile
                                                  ?.social_profile_picture_url
                                            : `${FileManagerPath}/public/assets/images/avatar.png`
                                    }
                                    alt={currentUser?.Name}
                                />
                            </figure>
                            <div className="rit-m-bx">
                                <div className="review-parent-bx">
                                    <div className="user-name-rating">
                                        <strong>{currentUser?.name}</strong>
                                    </div>
                                    <span>{currentUser?.email}</span>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
                <div className="side-nav-bx">
                    <ul>
                        <li>
                            <Link to="/home">
                                <i className="av av-home-icon"></i> Home
                            </Link>
                        </li>
                        <li>
                            <Link to="/payments">
                                <i className="av av-payment-icon"></i> Payments
                            </Link>
                        </li>
                        <li>
                            <Link to="/bookings">
                                <i className="av av-event-time-icon"></i>{" "}
                                Bookings
                            </Link>
                        </li>
                        <li>
                            <Link to="/my-events">
                                <i className="av av-event-time-icon"></i>{" "}
                                MyEvents
                            </Link>
                        </li>
                        <li>
                            <Link to="/media/files">
                                <i className="av av-files-icon"></i> File
                                Manager
                            </Link>
                        </li>
                        <li>
                            <Link to="/reviews">
                                <i className="av av-review-line-icon"></i>{" "}
                                Reviews
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="side-nav-bx">
                    <ul>
                        <li>
                            <Link to="/messages">
                                <i className="av av-inbox-icon"></i> Message
                            </Link>
                        </li>
                        <li>
                            <Link to="/favorites">
                                <i className="av av-favorite-line-icon"></i>{" "}
                                Favorite
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="side-nav-bx">
                    <ul>
                        <li>
                            <Link to="#">
                                <i className="av av-dashboard-icon"></i>{" "}
                                Dashboard
                            </Link>
                        </li>
                        <li>
                            <Link to="/setting">
                                <i className="av av-setting-icon"></i> Setting
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="side-nav-bx">
                    <ul>
                        <li>
                            <Link to="/Logout">
                                <i className="av av-logout-icon"></i> Logout
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
            <div className={`offcanvas-overly ${toggle ? "active" : ""}`}></div>
            <header>
                <div className="top-nav sticky">
                    <div className="navbar">
                        <div className="h-lft-bx">
                            <div className="mobile-menu-toggle">
                                <a
                                    href={void 0}
                                    className="sidebar-mm menu-tigger"
                                    onClick={() => setToggle(!toggle)}
                                >
                                    <i className="av av-left-menu-icon"></i>
                                </a>
                            </div>
                            {/* <Lang /> */}

                            {false ? (
                                <TimeBox />
                            ) : (
                                <>
                                    <div className="timer-box">
                                        <p className="not-s-message">
                                            NO BOOKED EVENT
                                        </p>
                                    </div>
                                </>
                            )}
                        </div>
                        <Logo />
                        <RightNavbarItem />
                    </div>
                </div>
            </header>
        </>
    );
};

export default TopNavbar;

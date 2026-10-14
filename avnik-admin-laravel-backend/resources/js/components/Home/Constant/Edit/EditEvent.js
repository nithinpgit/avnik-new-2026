import React, { Component, useContext } from "react";
import { Link } from "react-router-dom";
import EventHandlingServices from "../../../../ApiServer/EventHandling/EventHandlingServices";
import GlobalContext from "../../../../Global/Context/GlobalContext";
import Auth from "../../../../Routes/Auth";
const EditEvent = (props) => {
    const [globalState, globalDispatch] = useContext(GlobalContext);
    const editEvent = (eventId, slotId) => {
        globalDispatch({
            type: "EditEvent",
            payload: {
                Type: "EditEvent",
                EventEditId: eventId,
                eventSlotEditId: slotId,
            },
        });
        $("#EditFollowingEventModal").modal(
            { backdrop: "static", keyboard: false },
            "show"
        );
    };
    const inviteEvent = (eventId) => {
        return alert(eventId);
    };
    const addSlots = (eventId) => {

        globalDispatch({
            type: "ADD_SLOTS",
            payload: {
                Type: "ADD_SLOTS",
                AddSlotEventId: eventId,
            },
        });
        $("#AddSlotsModal").modal(
            { backdrop: "static", keyboard: false },
            "show"
        );
    }

    const shareEvent = (id) => {
        globalDispatch({
            type: "share",
            payload: {
                Type: "share",
                Share: `${window.location.origin}/share/event/${id}`,
            },
        });
    };
    const disableEvent = (eventId, slotId) => {
        globalDispatch({
            type: "EditEvent",
            payload: {
                Type: "EditEvent",
                eventDisableId: eventId,
                eventDisableSlotId: slotId,
            },
        });
        $("#DisableFollowingEventModal").modal(
            { backdrop: "static", keyboard: false },
            "show"
        );
    };
    const deleteEvent = (eventId, slotId) => {
        globalDispatch({
            type: "DeleteEvent",
            payload: {
                Type: "DeleteEvent",
                eventDeleteId: eventId,
                eventDeleteSlotId: slotId,
            },
        });
        $("#DeleteFollowingEventModal").modal("show");
    };
    return (
        <>
            <div className="wishlist-icon">
                <div className="btn-group cmn-new-toggle">
                    <a
                        href={void 0}
                        className="btn link-btn dropdown-toggle"
                        data-toggle="dropdown"
                        data-display="static"
                        aria-haspopup="true"
                        aria-expanded="false"
                    >
                        {" "}
                        <i className="av av-event-menu-icon"></i>{" "}
                    </a>
                    <div className="dropdown-menu new-toggle-dropdown event-more-toggle dropdown-menu-lg-right">
                        {/* {Auth.isAuthenticated() ? ( */}
                        <ul>
                            <li>
                                <button
                                    type="button"
                                    onClick={() =>
                                        editEvent(
                                            props?.id,
                                            props?.eventSlotId
                                        )
                                    }
                                    className="dropdown-item"
                                >
                                    <i className="av av-edit-icon"></i> Edit
                                    Event
                                </button>
                            </li>
                            <li>
                                <a
                                    data-toggle="modal"
                                    href="#share-profile-popup"
                                    className="dropdown-item"
                                    onClick={() => shareEvent(props.id)}
                                >
                                    <i className="av av-share-icon"></i>{" "}
                                    Share
                                </a>
                            </li>
                            {/* <li>
                                    <button
                                        type="button"
                                        onClick={() => inviteEvent(props.id)}
                                        className="dropdown-item"
                                    >
                                        <i className="av av-invite-icon"></i>{" "}
                                        Invite
                                    </button>
                                </li> */}
                            <li>
                                <button
                                    type="button"
                                    onClick={() => addSlots(props.id)}
                                    className="dropdown-item"
                                >
                                    <i className="av av-extended-duration-more-icon"></i>{" "}
                                    Add Slots
                                </button>
                            </li>
                            <li>
                                <button
                                    type="button"
                                    onClick={() =>
                                        deleteEvent(
                                            props?.id,
                                            props?.eventSlotId
                                        )
                                    }
                                    className="dropdown-item"
                                >
                                    <i className="av av-delete-icon"></i>{" "}
                                    Delete
                                </button>
                            </li>
                            <li>
                                <button
                                    type="button"
                                    onClick={() =>
                                        disableEvent(
                                            props?.id,
                                            props?.eventSlotId
                                        )
                                    }
                                    className="dropdown-item"
                                >
                                    <i className="av av-disable-icon"></i>{" "}
                                    Disable
                                </button>
                            </li>
                        </ul>
                        {/* ) : (
                            ""
                        ) */}
                        {/* } */}
                    </div>
                </div>
            </div>
        </>
    );
};
export default EditEvent;

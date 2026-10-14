import { preventDefault } from "@fullcalendar/react";
import React, { useContext } from "react";
import ReactDOM from "react-dom";
import FilterPopup from "./FilterPopup";
import EventsShowContext from "../Home/EventsShowContext/EventsShowContext";
const TopFilter = (props) => {
    const [state, dispatch,fetchEventData,ResetFilter] = useContext(EventsShowContext);
    const [SearchFilter, setSearchFilter] = React.useState([]);

    const searchQuery = (e) => {
        e.preventDefault();
        // setSearch(e.target.value)
        dispatch({
            type: "SEARCH",
            payload: { Type: "SEARCH", searchQuery: e.target.value },
        });
        
        console.log(state?.search);
    };
    const handelSubmit = (e) => {
        e.preventDefault();
        fetchEventData();
    };

    
    const onChangeFilterPopup=(e)=>{
        let name =e.target.name;
        let value =e.target.value;
        dispatch({type:"ON_CHANGE_POPUP",payload:{Type:"ON_CHANGE_POPUP",[name]:value}})
    }
    const handleFilterPopUpSubmit=(e)=>{
        e.preventDefault();
        fetchEventData();
        $('#filter-popup').modal('hide');

    }
    console.log(state, "home page top filter popup ");
    return (
        <>
            <div className="event-filter-bx">
                <div className="container">
                    <div className="e-f-c-in">
                        <form onSubmit={handelSubmit}>
                            <div className="lft-search-filter">
                                <div className="search-box">
                                    <input
                                        onChange={searchQuery}
                                        className="form-control"
                                        placeholder="Search..."
                                        type="text"
                                        value={state?.searchQuery}
                                    />
                                    <button
                                        className="btn search-btn"
                                        disabled={state?.searchQuery ? false : true}
                                        type="submit"
                                    >
                                        {" "}
                                        <i className="av av-search-icon"></i>{" "}
                                    </button>
                                </div>
                                <div className="fillter-btn">
                                   {state?.searchQuery?<button
                                        type="button"
                                        className="btn"
                                        data-toggle="modal"
                                        data-target="#filter-popup"
                                    >
                                        {" "}
                                        <i className="av av-filter-icon"></i>
                                    </button>:""}
                                </div>
                                {/* <div className="filter-tags-list">
                                        <ul className="ul-row-col">
                                            {Reset.map((res,index)=>                                        
                                                <li key={index}>
                                                    <div className="fiter-tag"><span>Tutorial {res}</span><a className="close-f-tag" href="#"><i className="av av-close-icon" aria-hidden="true"></i></a></div>
                                                </li>
                                            )}                                           
                                        </ul>
                                    </div> */}
                                {state?.cost >0 ||
                                state?.eventType != "" ||
                                state?.categories>0 ||
                                state?.subCategories>0 ? (
                                    <div className="reset-btn">
                                        <button
                                            type="button"
                                            onClick={(e) => {
                                                ResetFilter(e);
                                            }}
                                            className="btn link-btn"
                                        >
                                            <i className="av av-reset-icon"></i>{" "}
                                            Reset
                                        </button>
                                    </div>
                                ) : (
                                    ""
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <FilterPopup handelSubmit={handleFilterPopUpSubmit} handelOnChange={onChangeFilterPopup}/>
        </>
    );
};
export default TopFilter;

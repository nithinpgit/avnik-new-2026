import React from "react";
import SearchFilter from "../../User/FileManager/Components/SearchFilter";
import { useContext } from "react";
import EventsShowContext from "../Home/EventsShowContext/EventsShowContext";
import { ApiService } from "../../ApiServer/ApiService";
const FilterPopup = (props) => {
    const [state, dispatch] = useContext(EventsShowContext);
    
    const getChildCategories = (id) => {
        ApiService.childCategories({ parentId: id })
            .then((res) => {
                if (res.data.status === 200) {
                    dispatch({
                        type: "getCategories",
                        payload: {
                            Type: "getCategories",
                            childCategories: res.data.data,
                        },
                    });
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const onChangeParentHandle = (e) => {
        // console.log(e.target.name);
        
        getChildCategories(e.target.value);
        dispatch({
            type: "CHANGE_CATEGORIES",
            payload: {
                Type: "CHANGE_CATEGORIES",
                categories: e.target.value,
                subCategories: "SubCategory",
            },
        });
    };
    return (
        <div
            className="modal right fade default-popup side-popup filter-popup"
            id="filter-popup"
            tabIndex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog">
                <form onSubmit={props.handelSubmit}>
                    <div className="modal-content">
                        <button
                            type="button"
                            className="close"
                            data-dismiss="modal"
                            aria-label="Close"
                        >
                            <i className="av av-close-icon"></i>{" "}
                        </button>
                        <div className="modal-header">
                            <h2 className="modal-title" id="exampleModalLabel">
                                Filter
                            </h2>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <label
                                            className="form-label"
                                            htmlFor="inputState"
                                        >
                                           Cost  &nbsp;&nbsp;&nbsp;  $0 - ${state?.cost}
                                        </label>
                                        <input
                                            className="form-control"
                                            type="range"
                                            placeholder="Range Filter"
                                            min="0"
                                            max="1000"
                                            name="cost"
                                            onChange={props?.handelOnChange}
                                            //  aria-label="input"
                                            value={state?.cost}
                                            // value={state?.cost}
                                        />
                                    </div>
                                </div>
                                {/* <div className="col-md-12">
                                <div className="form-group">
                                    <label className="form-label" htmlFor="inputState">From Date - To Date</label>
                                    <input className="form-control" type="input" placeholder="Date Range Selection" aria-label="input" />                                    
                                </div>
                            </div> */}
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label
                                            className="form-label"
                                            htmlFor="inputState"
                                        >
                                            Category
                                        </label>
                                        <div className="custom-select-bx">
                                            <select
                                                onChange={onChangeParentHandle}
                                                className="form-control custom-select-bx"
                                                defaultValue={state?.categories}
                                                value={state?.categories}
                                            >
                                                <option
                                                    disabled={true}
                                                    selected={true}
                                                    value=""
                                                >
                                                    Category
                                                </option>
                                                {state?.parentCategories.map(
                                                    (res) => (
                                                        <option
                                                            key={res.id}
                                                            value={res.id}
                                                        >
                                                            {res.name}
                                                        </option>
                                                    )
                                                )}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label
                                            className="form-label"
                                            htmlFor="inputState"
                                        >
                                            Sub Category
                                        </label>
                                        <div className="custom-select-bx">
                                            <select
                                                onChange={(e) =>
                                                    dispatch({
                                                        type: "EVENT_TYPE",
                                                        payload: {
                                                            Type: "EVENT_TYPE",
                                                            subCategories:
                                                                e.target.value,
                                                        },
                                                    })
                                                }
                                                className="form-control custom-select-bx"
                                                value={state?.subCategories}
                                                defaultValue={state?.subCategories}
                                            >
                                                <option
                                                    disabled={true}
                                                    value=""
                                                    selected={true}
                                                >
                                                    SubCategory
                                                </option>
                                                {state?.childCategories.map(
                                                    (res) => (
                                                        <option
                                                            key={res.id}
                                                            value={res.id}
                                                        >
                                                            {res.name}
                                                        </option>
                                                    )
                                                )}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <label
                                            className="form-label"
                                            htmlFor="inputState"
                                        >
                                            Type
                                        </label>
                                        <div className="custom-select-bx">
                                            <select
                                                className="form-control custom-select-bx"
                                                onChange={props?.handelOnChange}
                                                value={state?.eventType}
                                                // defaultValue={state?.eventType}
                                                name="eventType"
                                            >
                                    
                                                <option
                                                    // defaultValue
                                                    selected={state?.eventType!=''}
                                                    value=""
                                                >
                                                    All
                                                </option>
                                                <option value="Webinars" selected={state?.eventType=="Webinars"?true:false}>
                                                    Webinars
                                                </option>
                                                <option value="Appointments" selected={state?.eventType=="Appointments"?true:false}>
                                                    Appointments
                                                </option>
                                                <option value="Discussion" selected={state?.eventType=="Discussion"?true:false}>
                                                    Discussion
                                                </option>
                                                <option value="Training" selected={state?.eventType=="Training"?true:false}>
                                                    Training
                                                </option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <div className="apply-btn">
                                <button
                                    type="submit"
                                    className="btn default-btn"
                                >
                                    Apply
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};
export default FilterPopup;

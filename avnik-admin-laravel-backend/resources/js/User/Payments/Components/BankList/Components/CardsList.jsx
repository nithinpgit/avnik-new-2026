import React from "react";

const CardsList = (props) => {
    return (
        <>
            <li key={props?.id} className="default-active">
                <div className="b-c-box">
                    <p>
                        <img src="images/visa-img.jpg" alt="" />{" "}
                        <span>{props?.card?.brand}</span>
                    </p>{" "}
                    <strong>******** {props?.card?.last4}</strong>
                    {/* <div className="default-status-btn">
                        <span className="btn status-btn awaiting-status">
                            PRIMARY
                        </span>
                    </div>{" "} */}
                    <button type="button" onClick={()=>props.deleteCard(props?.id)} className="btn link-btn">
                        {" "}
                        <i className="av av-delete-icon"></i>
                    </button>
                </div>
            </li>
        </>
    );
};

export default CardsList;

import React from 'react';
import ReactStars from "react-rating-stars-component";
const StarRating = ({value,onChange}) => {
    const Rating = {
        size: 20,
        count: 5,
        color: "black",
        activeColor: "red",
        value: value,
        a11y: true,
        isHalf: true,
        emptyIcon: <i className="rating__icon rating__icon--star fa fa-star" style={{color:'#a3a19c'}}></i>,
        halfIcon: <i className="rating__icon rating__icon--star fa fa-star-half" ></i>,
        filledIcon:<i className="rating__icon rating__icon--star fa fa-star" ></i>,
        onChange: newValue => {
            onChange(newValue);
        }
      };
    return (
        <>
            <ReactStars {...Rating} />
        </>
    );
}

export default StarRating;

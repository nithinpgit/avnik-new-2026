import React from 'react';

const DefaultStars = ({value}) => {
   let ratingInt=parseFloat(value);


    if(ratingInt==0){
        return <><i className="fa fa-star-o" aria-hidden="true"></i><i className="fa fa-star-o" aria-hidden="true"></i><i className="fa fa-star-o" aria-hidden="true"></i><i className="fa fa-star-o" aria-hidden="true"></i><i className="fa fa-star-o" aria-hidden="true"></i></>   
    }
    if(ratingInt<1){
        return <><i className="fa fa-star-half-full" aria-hidden="true"></i><i className="fa fa-star-o" aria-hidden="true"></i><i className="fa fa-star-o" aria-hidden="true"></i><i className="fa fa-star-o" aria-hidden="true"></i><i className="fa fa-star-o" aria-hidden="true"></i></>
       }
       if(ratingInt>=1&&ratingInt<1.5){
        return <><i className="fa fa-star" aria-hidden="true"></i><i className="fa fa-star-o" aria-hidden="true"></i><i className="fa fa-star-o" aria-hidden="true"></i><i className="fa fa-star-o" aria-hidden="true"></i><i className="fa fa-star-o" aria-hidden="true"></i></>

       }
       if(ratingInt>1&&ratingInt<=1.5){
        return<><i className="fa fa-star" aria-hidden="true"></i><i className="fa fa-star-half-full" aria-hidden="true"></i><i className="fa fa-star-o" aria-hidden="true"></i><i className="fa fa-star-o" aria-hidden="true"></i><i className="fa fa-star-o" aria-hidden="true"></i></>
       }
       if(ratingInt>1.5&&ratingInt<=2){
        return<><i className="fa fa-star" aria-hidden="true"></i><i className="fa fa-star" aria-hidden="true"></i><i className="fa fa-star-o" aria-hidden="true"></i><i className="fa fa-star-o" aria-hidden="true"></i><i className="fa fa-star-o" aria-hidden="true"></i></>

       }
       if(ratingInt>2&&ratingInt<=2.5){
        return<><i className="fa fa-star" aria-hidden="true"></i><i className="fa fa-star" aria-hidden="true"></i><i className="fa fa-star-half-full" aria-hidden="true"></i><i className="fa fa-star-o" aria-hidden="true"></i><i className="fa fa-star-o" aria-hidden="true"></i></>
       }
       if(ratingInt>2.5&&ratingInt<=3){
        return<><i className="fa fa-star" aria-hidden="true"></i><i className="fa fa-star" aria-hidden="true"></i><i className="fa fa-star" aria-hidden="true"></i><i className="fa fa-star-o" aria-hidden="true"></i><i className="fa fa-star-o" aria-hidden="true"></i></>

       }
       if(ratingInt>3&&ratingInt<=3.5){
        return<><i className="fa fa-star" aria-hidden="true"></i><i className="fa fa-star" aria-hidden="true"></i><i className="fa fa-star" aria-hidden="true"></i><i className="fa fa-star-half-full" aria-hidden="true"></i><i className="fa fa-star-o" aria-hidden="true"></i></>

       }
       if(ratingInt>3.5&&ratingInt<=4){
        return<><i className="fa fa-star" aria-hidden="true"></i><i className="fa fa-star" aria-hidden="true"></i><i className="fa fa-star" aria-hidden="true"></i><i className="fa fa-star" aria-hidden="true"></i><i className="fa fa-star-o" aria-hidden="true"></i></>
       }
       if(ratingInt>4&&ratingInt<=4.5){
        return<><i className="fa fa-star" aria-hidden="true"></i><i className="fa fa-star" aria-hidden="true"></i><i className="fa fa-star" aria-hidden="true"></i><i className="fa fa-star" aria-hidden="true"></i><i className="fa fa-star-half-full" aria-hidden="true"></i></>
 
       }
       if(ratingInt>4.5&&ratingInt<=5){
        return<><i className="fa fa-star" aria-hidden="true"></i><i className="fa fa-star" aria-hidden="true"></i><i className="fa fa-star" aria-hidden="true"></i><i className="fa fa-star" aria-hidden="true"></i><i className="fa fa-star" aria-hidden="true"></i></>
    }

}

export default DefaultStars;

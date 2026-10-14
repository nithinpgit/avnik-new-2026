import React from 'react';

const ReviewRatingNumber = (rating) => {
   let ratingInt=parseFloat(rating);
   if(ratingInt==0){
    return 0;
   }
   if(ratingInt<1){
    return 0.5;
   }
   if(ratingInt>=1&&ratingInt<1.5){
    return 1;
   }
   if(ratingInt>1&&ratingInt<=1.5){
    return 1.5;
   }
   if(ratingInt>1.5&&ratingInt<=2){
    return 2;
   }
   if(ratingInt>2&&ratingInt<=2.5){
    return 2.5;
   }
   if(ratingInt>2.5&&ratingInt<=3){
    return 3;
   }
   if(ratingInt>3&&ratingInt<=3.5){
    return 3.5;
   }
   if(ratingInt>3.5&&ratingInt<=4){
    return 4;
   }
   if(ratingInt>4&&ratingInt<=4.5){
    return 4.5;
   }
   if(ratingInt>4.5&&ratingInt<=5){
    return 5;
   }

}

export default ReviewRatingNumber;

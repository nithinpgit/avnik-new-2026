import React,{Component, useState} from 'react';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
 
const AvnikSlider=(props)=> {
    
        return (
                <>
                        <OwlCarousel 
                        {...props}
                         >   
                              {props.children} 
                        </OwlCarousel>
                        

                </>
            );
    
}
export default AvnikSlider;
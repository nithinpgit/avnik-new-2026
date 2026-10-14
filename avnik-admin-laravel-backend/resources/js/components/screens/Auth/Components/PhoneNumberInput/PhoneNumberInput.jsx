import React, { useState } from 'react';
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'

const PhoneNumberInput = (props) => {
    return (
        <>
            <PhoneInput
                placeholder="Enter phone number"
                value={props.value}
                onChange={props.onChange}
            />            
        </> 
    );
}

export default PhoneNumberInput;

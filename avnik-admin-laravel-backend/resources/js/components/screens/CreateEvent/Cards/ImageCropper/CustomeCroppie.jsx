import React, { useEffect } from 'react';
import Croppie from "croppie"
var c;
const CropperModal = ({ options, size, onCrop, value, buttonText, buttonClass, buttonPreloader }) => {
    setTimeout(() => {
        const slider = document.querySelector('.cr-slider');
        slider.step = 0.001;
        slider.min = 0;
        slider.max = 2;
    }, 100);
    useEffect(() => {
        var croppie = document.getElementById('croppie-container');

        c = new Croppie(croppie, options);

        return () => {
            // if (c) {
            c.destroy();
            // }
        };
    }, [])
    useEffect(() => {
        if (value?.length > 0) {
            handleCropping(value)
        }
    }, [value])
    const rotate = (deg) => {
        c.rotate(deg)
    }
    const handleCropping = (input) => {
        const reader = new FileReader();
        const file = input[0];
        reader.readAsDataURL(file);
        reader.onload = () => {
            c.bind({ url: reader.result });
        };
        reader.onerror = function (error) {
            console.log("Error: ", error);
        };
    }
    const handleCropper = (e) => {
        e.preventDefault();
        if (value?.length > 0) {
            c.result({ type: "blob", format: "jpeg", size: size }).then(base64 => {
                var file = new File([base64], `${(Math.random() + 1).toString(36).substring(7) + new Date().getTime()}.jpeg`);
                onCrop(file)
            });
            c.result('base64').then(base64 => {
                console.log(base64, 'base64 result');
            });
        }
    }

    return (
        <>
            <form onSubmit={handleCropper} id='croppie'>
                <div className="form-group">
                    <div className='r-l-rotate-btns'>
                        <div className={`croppie-box ${value?.length > 0 ? 'd-block' : 'd-none'}`}>
                            <div id="croppie-container"></div>
                        </div>
                    </div>
                    <div className='r-l-rotate-btns'>
                        <div className={`${value?.length > 0 ? 'd-block' : 'd-none'}`}>
                            <button type="button" className={buttonClass || "btn btn-default rotate-btn"} disabled={value?.length > 0 ? false : true} onClick={() => rotate(90)}>
                                <i className="fa fa-rotate-left"></i>
                            </button>
                            <button type="button" className={buttonClass || "btn btn-default rotate-btn"} disabled={value?.length > 0 ? false : true} onClick={() => rotate(-90)}>
                                <i className="fa fa-rotate-right"></i>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="both-btns">
                    <ul className="ul-list">
                        <li><button type="submit" disabled={value?.length > 0 ? false : true} className={buttonClass || "btn btn-default"}>{buttonPreloader ? <span className='button-pre-loading'>wait...</span> : buttonText || 'Crop'}</button></li>
                    </ul>
                </div>

            </form>
        </>
    );
}
export default CropperModal;
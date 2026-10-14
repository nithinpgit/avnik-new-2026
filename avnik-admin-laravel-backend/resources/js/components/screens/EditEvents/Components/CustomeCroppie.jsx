import React, { useContext, useEffect, useRef, useState } from 'react';
import Croppie from 'croppie';
import 'croppie/croppie.css';
import GlobalContext from '../../../../Global/Context/GlobalContext';

const CropperModal = ({ options, size, onCrop, value, buttonText, buttonClass, buttonPreloader }) => {
    const [globalState] = useContext(GlobalContext);
    const croppieRef = useRef(null);
    const containerRef = useRef(null);
    const [isInitialized, setIsInitialized] = useState(false);
    setTimeout(() => {
        const slider = document.querySelector('.cr-slider');
        slider.step = 0.001;
        slider.min = 0;
        slider.max = 2;
    }, 100);
    // Initialize Croppie
    useEffect(() => {
        const initializeCroppie = () => {
            if (containerRef.current && !croppieRef.current) {
                try {
                    croppieRef.current = new Croppie(containerRef.current, {
                        viewport: { width: 200, height: 200 },
                        boundary: { width: 300, height: 300 },
                        enableExif: true,
                        ...options
                    });
                    setIsInitialized(true);
                } catch (error) {
                    console.error('Error initializing Croppie:', error);
                    setIsInitialized(false);
                }
            }
        };

        // Delay initialization to ensure DOM is ready
        const timer = setTimeout(initializeCroppie, 100);

        return () => {
            clearTimeout(timer);
        };
    }, [globalState?.EventEditId, options]);

    // Cleanup Croppie on unmount or dependency changes
    useEffect(() => {
        return () => {
            if (croppieRef.current) {
                try {
                    croppieRef.current.destroy();
                } catch (error) {
                    console.warn('Error destroying Croppie:', error);
                }
                croppieRef.current = null;
                setIsInitialized(false);
            }
        };
    }, [globalState?.EventEditId]);

    // Handle image binding when value changes
    useEffect(() => {
        if (value?.length > 0 && isInitialized && croppieRef.current) {
            handleCropping(value);
        }
    }, [value, isInitialized]);
    const rotate = (deg) => {
        if (croppieRef.current && isInitialized) {
            try {
                croppieRef.current.rotate(deg);
            } catch (error) {
                console.error('Error rotating image:', error);
            }
        }
    };

    const handleCropping = (input) => {
        if (!croppieRef.current || !isInitialized) {
            console.warn('Croppie not initialized yet');
            return;
        }

        const reader = new FileReader();
        const file = input[0];
        
        reader.readAsDataURL(file);
        console.log(file, 'file111111');
        
        reader.onload = () => {
            if (croppieRef.current && isInitialized) {
                try {
                    croppieRef.current.bind({ url: reader.result });
                } catch (error) {
                    console.error('Error binding image to Croppie:', error);
                }
            }
        };
        
        reader.onerror = function (error) {
            console.log("Error: ", error);
        };
    };

    const handleCropper = (e) => {
        e.preventDefault();
        
        if (!croppieRef.current || !isInitialized) {
            console.warn('Croppie not initialized');
            return;
        }

        if (value?.length > 0) {
            try {
                croppieRef.current.result({ type: "blob", format: "jpeg", size: size }).then(base64 => {
                    var file = new File([base64], `${(Math.random() + 1).toString(36).substring(7) + new Date().getTime()}.jpeg`);
                    onCrop(file);
                }).catch(error => {
                    console.error('Error getting cropped result:', error);
                });

                croppieRef.current.result('base64').then(base64 => {
                    console.log(base64);
                }).catch(error => {
                    console.error('Error getting base64 result:', error);
                });
            } catch (error) {
                console.error('Error in handleCropper:', error);
            }
        }
    };

    return (
        <>
            <form onSubmit={handleCropper} id='croppie'>
                <div className="form-group"> 
                <div className='r-l-rotate-btns'>          
                        <div className={`croppie-box ${value?.length > 0 ? 'd-block' : 'd-none'}`}>
                            <div ref={containerRef}></div>
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
                        <li><button type="submit" disabled={value?.length > 0 ? false : true} className={buttonClass || "btn btn-default"}>{buttonPreloader?<span className='button-pre-loading'>wait...</span>:buttonText || 'Crop'}</button></li>
                    </ul>
                </div>

            </form>
        </>
    );
}
export default CropperModal;
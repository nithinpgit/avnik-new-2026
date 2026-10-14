import React from 'react';
import { FileManagerPath } from '../../../../ApiServer/UrlService';
const FilePreview = () => {
    return (
        <>
            <div className="attached-file-box">
                <div className="attached-files-list-in">
                    <ul className="cmn-ul-list">
                        <li>
                            <div className="event-detail-bx">
                                <div className="wishlist-icon"> <a href="#" className="btn link-btn"><i className="av av-close-icon"></i></a> </div>
                                <div className="event-img"> <img src={`${FileManagerPath}/public/assets/images/product-img.jpg`} alt="" /> </div>
                            </div>
                        </li>
                        <li>
                            <div className="event-detail-bx">
                                <div className="wishlist-icon"> <a href="#" className="btn link-btn"><i className="av av-close-icon"></i></a> </div>
                                <div className="event-img"> <img src={`${FileManagerPath}/public/assets/images/product-img.jpg`} alt="" /> </div>
                            </div>
                        </li>
                        <li>
                            <div className="add-more-attach-btn">
                                <button className="btn default-btn"><i className="av av-plus-icon"></i></button>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
}

export default FilePreview;

import React, { useContext, useState } from 'react';
import QuickStartContext from '../Constants/QuickStart/QuickStartContext';

const QuickStartModel = () => {
    const [Url, setUrl] = useState(JSON.parse(localStorage.getItem('_qm')));
    setInterval(() => {
        setUrl(JSON.parse(localStorage.getItem('_qm')));
    }, 1000);

    const CopyToClipBoard = () => {
        var copyText = document.querySelector("#copy-input-text");
        copyText.select();
        document.execCommand("copy");
        if (copyText.value) {
            toastr["success"]('URL Copy')
        } else {
            toastr["error"]('URL Not Copy')
        }
    }
    // return (
    //         <div className="modal fade default-popup confirm-message-popup" id="quick_meet_modal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    //             <div className="modal-dialog" role="document">
    //                 <div className="modal-content">
    //                     <div className="modal-header">
    //                         <button type="button" className="close" data-dismiss="modal" aria-label="Close">
    //                             <span aria-hidden="true"><i className="av av-close-icon"></i></span>
    //                         </button>
    //                     </div>
    //                     <div className="modal-body">
    //                         <div className="message-m-box">
    //                             <div className="message-with-icon">
    //                                 <span className="info-icon"><i className="av av-info-icon"></i></span>
    //                             </div>
    //                             <div className="col-12">
    //                                         <label className="form-label">Copy Link</label>
    //                                         <div className="form-group">
    //                                             <div className="meeting-room-link">
    //                                                 <input type="text" placeholder="" id="copy-input-text" onChange={() => console.log('Sorry you cant change the url')} value={window.location.origin+`/join/?rm=${Url}`} className="form-control" />
    //                                                 <button type="button" className="btn default-btn" onClick={() =>CopyToClipBoard(window.location.origin+`/join/?rm=${Url}`)
    //                                                     } title="Click To Copy" className="btn cmn-btn">Copy URL</button>
    //                                             </div>
    //                                         </div>
    //                             </div>
    //                             <a href={window.location.origin+`/join/?rm=${Url}`} target="_blank" className="btn default-btn">Start Now</a>
    //                         </div>
    //                     </div>
    //                     <div className="modal-footer">

    //                     </div>
    //                 </div>
    //             </div>
    //         </div>

    // );
    return (
        <>
            <div className="modal fade default-popup confirm-message-popup quick-start-meet-popup show" id="quick_meet_modal" tabIndex="-1" aria-labelledby="exampleModalLabel"  aria-modal="true" role="dialog"><div className="modal-dialog" role="document"><div className="modal-content"><button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true"><i className="av av-close-icon"></i></span></button>
                <div className="modal-header">
                    <h2 className="modal-title">Quick Meet</h2>
                </div>
                <div className="modal-body">
                    <div className="quick-start-bx">
                        <label className="form-label">Send Meeting Room Link</label>
                        <div className="form-group">
                            <div className="meeting-room-link">
                                <input type="text" placeholder="" id="copy-input-text" className="form-control" onChange={() => console.log('Sorry you cant change the url')} value={window.location.origin+`/join/?rm=${Url}`} />
                                <button type="button" className="btn cmn-btn" onClick={() =>CopyToClipBoard(window.location.origin+`/join/?rm=${Url}`)}  title="Click To Copy"><i className="av av-copy-icon"></i></button>
                            </div>
                        </div>
                       <a href={window.location.origin+`/join/?rm=${Url}`} target="_blank" className="btn default-btn">Start Now</a>
                    </div>
                </div>
            </div>
            </div>
            </div>
        </>
    )
}
export default QuickStartModel;
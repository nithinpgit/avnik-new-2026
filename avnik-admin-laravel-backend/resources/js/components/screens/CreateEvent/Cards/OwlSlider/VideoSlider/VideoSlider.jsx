import React from 'react'

export default function VideoSlider(props) {
    return (
        <div className="item" style={{width: '38%',
            padding: '5px'}}>

                        <div className="insert-file-bx">
                            <div className="file-uploaded-outer">
                                <video  controls><source style={{height:'100px'}} src={props.path} type="video/mp4" /></video>
                            </div>
                            <span  className="btn link-btn" onClick={(event)=>props.DeleteCallBack(event,props.id)}><i className="av av-close-icon"></i></span>
                        </div>
        </div>
    )
}

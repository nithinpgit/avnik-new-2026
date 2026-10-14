import React from 'react'

export default function ImageSlider(props) {
    return (
        <div className="item">
             <div className="insert-file-bx">
                <div className="file-uploaded-outer"><img src={props.path} style={{height:'100px'}} alt={props.name} /></div>
                    <span  className="btn link-btn" onClick={(event)=>props.DeleteCallBack(event,props.id)}><i className="av av-close-icon"></i></span>
                </div>
        </div>
    )
}

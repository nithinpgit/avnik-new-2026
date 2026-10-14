import React from 'react'

export default function Videos(props) {
    
    return (
        <div>
            <video controls><source src={props.video} type={props.type} /></video>
        </div>
    )
}

export const owlCarouselVideo1='../../../../assets/images/event-video.mp4';

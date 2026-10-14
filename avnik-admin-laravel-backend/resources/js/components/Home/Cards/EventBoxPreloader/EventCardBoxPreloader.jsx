import React, { Component } from 'react'
import Skeleton from 'react-loading-skeleton'

export default class EventCardBoxPreloader extends Component {
    
    
    render() {
        let index=[];
        for(let i=0; i<10; i++){
            index.push(i)
        }
        return (
            <>
            {index.map((res,index)=>{
                return(
                    <div key={index} className="event-row">
                <div className="event-col">
                    <div className="event-detail-bx">
                        <div className="wishlist-icon"> </div>
                        <div className="event-img"> 
                            <Skeleton width={270} height={200} />
                         </div>
                        <div className="event-s-info">
                            <Skeleton count={4}  />
                        </div>
                    </div>
                </div>
            </div>
                )
            })}
            </>
        )
    }
}

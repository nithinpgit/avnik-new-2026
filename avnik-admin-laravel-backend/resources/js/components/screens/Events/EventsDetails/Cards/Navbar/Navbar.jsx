import React, { Component } from 'react'
import Skeleton from 'react-loading-skeleton';
import { NavLink } from 'react-router-dom';

export default class Navbar extends Component {

constructor(props){
    super();

}    
    render() {
        return (
            <div>
                <div className="ah-tab-wrapper">
                    <div className="ah-tab">
                        <span className="ah-tab-item"  data-ah-tab-active={this.props.values.EventNavbarMenu===1?true:false} onClick={()=>{this.props.EventNavbarMenu(1)}} >{this.props.values.eventPreloader?<Skeleton width={100} height={37} duration={2} />:'Detail'}</span>
                        <span className="ah-tab-item"  data-ah-tab-active={this.props.values.EventNavbarMenu===2?true:false} onClick={()=>{this.props.EventNavbarMenu(2)}} >{this.props.values.eventPreloader?<Skeleton width={100} height={37} duration={2} />:'Time Slots'}</span>
                        <span className="ah-tab-item"  data-ah-tab-active={this.props.values.EventNavbarMenu===3?true:false} onClick={()=>{this.props.EventNavbarMenu(3)}} >{this.props.values.eventPreloader?<Skeleton width={100} height={37} duration={2} />:'Review'}</span>
                        <span className="ah-tab-item"  data-ah-tab-active={this.props.values.EventNavbarMenu===4?true:false}  onClick={()=>{this.props.EventNavbarMenu(4)}} >{this.props.values.eventPreloader?<Skeleton width={100} height={37} duration={2} />:'Download'}</span>
                    </div>
                </div>
            </div>
        )
    }
}

import React, { Component } from 'react';
import moment from 'moment';
import { FileManagerPath } from '../../../../ApiServer/UrlService';
class TimeBox extends Component {
  constructor(){
    super();
    this.state={
      seconds:0,
    
    }
  }
  componentDidMount(){
    // this.interval =setInterval(() => {
      this.setState({
        seconds:new Date().getSeconds(),
      }); 
    //  }, 1000);
  }

  componentWillUnmount() {
    clearTimeout(this.interval);
  }

  
    render() {
        return (
            <>
            <div className="timer-box">
            {/* <i className="av av-timer-icon"></i> */}
            <figure className="header-watch-icon"><img src={`${FileManagerPath}/public/assets/images/hourglass-event.svg`} alt="" /></figure>
            <div className="event-countdown"> 
            {/* <a href="#" className="btn default-btn start-end-btn">Start</a> */}
            <a href="ajshg">
              <ul className="cmn-ul-list">
                <li>
                  <div className="c-d-bx"> <span>02</span>
                    <p>Days</p>
                  </div>
                </li>
                <li>
                  <div className="c-d-bx"><span>{new Date().getHours()}</span>
                    <p>Hour</p>
                  </div>
                </li> 
                <li>
                  <div className="c-d-bx"> <span>{new Date().getMinutes()}</span>
                    <p>Min</p>
                  </div>
                </li>
                <li>
                <div className="c-d-bx"> <span>
                  {
                      this.state.seconds
                  }
                </span>
                    <p>Sec</p>
                  </div>
                </li>
              </ul>
              </a>
            </div>
          </div>
 
            </>
        );
    }
}

export default TimeBox;

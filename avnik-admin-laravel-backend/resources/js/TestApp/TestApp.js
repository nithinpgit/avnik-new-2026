import React, { useState, Component, useEffect } from 'react';
// import './test.css';
import moment from 'moment';
import 'moment-timezone';
import DatePicker, { DateObject } from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel";
import FindDateTime from '../components/screens/CreateEvent/Classes/FindDateTime/FindDateTime';
import io from "socket.io-client";
const socket = io("http://localhost:5050");


// import io from 'socket.io-client';
// var socket = io(`https://meet.avnik.com:8080`);


const TestApp = () => {
const [Clock, setCLock] = useState(moment());
const [Room, setRoom] = useState('');
const [Message, setMessage] = useState('');
// const [User, setUser] = useState('');
// const [UserChat, setUserChat] = useState()
// const [BTNContinue, setBTNContinue] = useState(0)
// const [SelectedStartDate, setSelectedStartDate] = useState(['14-12-2022'])
// // "use strict"
// let plane = {
// book(){
// return this
// }
// }
// let book1 = plane.book
// let book2 = plane.book()
// console.log(book1(),book2,'check test')
const localTime = moment.tz('2023-03-25 02:45', 'Asia/Kolkata').tz("America/New_York").format('YYYY-MM-DD HH:mm');
console.log(moment.tz().zoneAbbr(),'localTime')
const Array=[
  {
      "startDateTime": "03-12-2022 11:30:00",
      "endDateTime": "03-12-2022 11:45:00",
      "cost": 0,
      "eventCostType": "free",
      "eventDuration": 60,
      "seats": 1
  },
  {
      "startDateTime": "03-12-2022 11:30:00",
      "endDateTime": "03-12-2022 11:45:00",
      "cost": 0,
      "eventCostType": "free",
      "eventDuration": 15,
      "seats": 1,
      "ChangeTime": {
          "time": "02-12-2022 11:59:08",
          "index": 0,
          "type": "none"
      }
  }
]

useEffect(() => {

// fetch('https://dummyjson.com/posts').then((res)=>res.json()).then((user)=>setUser(user.posts));

  // Array.filter((res)=>moment(moment(res.startDateTime,'DD-MM-YYYY HH:mm:ss').add(15, 'minutes').format('HH:mm:ss'),'HH:mm:ss')
  // Array.map((object,i) => {
    // if(moment(moment(object.endDateTime,'DD-MM-YYYY HH:mm:ss').format('HH:mm:ss'),'HH:mm:ss')>moment(moment(object.startDateTime,'DD-MM-YYYY HH:mm:ss').format('HH:mm:ss'),'HH:mm:ss')&&state.eventTitle){
    //     return   setBTNContinue(i+1);
    // }else{
    //     return  setBTNContinue(0)
    // }
    // console.log(moment(moment(object.endDateTime,'DD-MM-YYYY HH:mm:ss').format('HH:mm:ss'),'HH:mm:ss')>moment(moment(object.startDateTime,'DD-MM-YYYY HH:mm:ss').format('HH:mm:ss'),'HH:mm:ss'))
    // });
    socket.on("connect", (id) => {
      socket.on('onReceiveSendToAllAVF', (chatObj) => {
        console.log('listeningMSG',chatObj);
      })
      console.log('listening',id);
      socket.on('disconnect', (reason) => {
      
        console.log('Disconnect')
    
      })
    });
}, [socket])
useEffect(() => {
  fetch('https://ipapi.co/json/')
  .then(function(response) {
    return response.json();
  })
  .then(function(myJson) {
    console.log(myJson.timezone,myJson)
  });
}, [])
// console.log(Array.filter((res)=>moment(moment(res.endDateTime,'DD-MM-YYYY HH:mm:ss').format('HH:mm:ss'),'HH:mm:ss')>moment(moment(res.startDateTime,'DD-MM-YYYY HH:mm:ss').format('HH:mm:ss'),'HH:mm:ss')))
// console.log(Array.filter((res)=>moment(moment(res.startDateTime,'DD-MM-YYYY HH:mm:ss').format('HH:mm:ss'),'HH:mm:ss')>=moment(moment(res.startDateTime,'DD-MM-YYYY HH:mm:ss').format('HH:mm:ss'),'HH:mm:ss')))
// console.log(Array.filter((res)=>moment(moment(res.endDateTime,'DD-MM-YYYY HH:mm:ss').format('HH:mm:ss'),'HH:mm:ss')<=moment(moment(res.startDateTime,'DD-MM-YYYY HH:mm:ss').format('HH:mm:ss'),'HH:mm:ss')))

// moment(moment(object.startDateTime,'DD-MM-YYYY HH:mm:ss').format('HH:mm:ss'),'HH:mm:ss')&&state.eventDurationSlots.filter((res)=>moment(moment(res.endDateTime,'DD-MM-YYYY HH:mm:ss').add(15, 'minutes').format('HH:mm:ss'),'HH:mm:ss')>
// moment(moment(object.startDateTime,'DD-MM-YYYY HH:mm:ss').format('HH:mm:ss'),'HH:mm:ss'))
  // let data = {room:'345435435345'};
  

  const sendChat = (chatObj) => {
    if(Room)
    return socket.emit("sendToAllAVF", {room_id:Room,message:Message});
    alert('enter room id');
  }
  const join =(obj)=>{
    socket.emit("joinChatRoomAVF",Room);
  }
  const chat = (e) => {
    sendChat(Chat);
  } 
  // setInterval(() => {
  //   setCLock(moment());
  // }, 1000);
  console.log(moment.tz.guess(),moment().day(),'sdfsdf')
  // console.log(moment(moment("17-12-2022 03:30:00",'DD-MM-YYYY HH:mm:ss').format('DD-MM-YYYY')+moment(moment(2,'h').format('h')+moment("17-12-2022 03:30:00",'mm:ss').format('mm:ss')).format('DD-MM-YYYY h:mm:ss A')).format('DD-MM-YYYY HH:mm:ss'));
  return (
    <>
     <div>
     <input type="text" onChange={(e)=>setRoom(e.target.value)} placeholder='enter room id'/>
     <button onClick={join}>Join Room</button>

     <input type="text" onChange={(e)=>setMessage(e.target.value)}/>
     <button onClick={sendChat}>send</button>
     <p></p>
    {/* <DatePicker
      disableDayPicker
      format="hh:mm A"
      plugins={[
        <TimePicker />
      ]} 
      onChange={(e)=>
        console.log(e.format())
      }
      
      value={moment()}
    />

<Calendar/> */}
     {/* <DatePicker 
     minDate={new Date()}
     mapDays={({ date }) => {
    if (moment(date.format(),'YYYY-MM-DD').format('DD-MM-YYYY')==="15-12-2022") return {
      disabled: true,
      style: { color: "#ccc" },
      onClick: () => toastr['error']("start date are disabled")
    }
  }} 
  //     plugins={[
  //       <TimePicker position="bottom" />,
  //     <DatePanel markFocused />
  // ]}
  //  multiple
    //  onSubmit={dates => {

      // let Dates = [];
      // dates.map((res) => {
      //     Dates.push(moment(res).format('DD-MM-YYYY'));
      // });
      // setSelectedStartDate(Dates);
      // dispatch({ type: 'SelectedStartDate', payload: { Type: 'SelectedStartDate', SelectedStartDate: Dates, SelectedEndDate: Dates, eventRepeatBy: 'MultipleDate', repeatNumber: 1 } });



      // }}
      //  minDate={new Date('2022-12-14')}
      // {/*  value={moment().format('DD-MM-YYYY')} */}
       {/* /> */}
     </div>
    </>
  );
};

export default TestApp;

function Calendar() {
  // Set initial date state to current date
  const [date, setDate] = useState(new Date());

  // Get the number of days in the current month
  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  // Get the day of the week for the first day of the month
  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  // Create an array of days in the current month
  const daysInMonth = Array.from({ length: getDaysInMonth(date) }, (_, i) => i + 1);

  // Create an array of empty spaces for days before the first of the month
  const emptySpaces = Array.from({ length: getFirstDayOfMonth(date) }, () => '');

  // Combine the empty spaces with the days of the month
  const calendarDays = [...emptySpaces, ...daysInMonth];

  // Create an array of weeks for the calendar
  const weeksInMonth = Array.from({ length: Math.ceil(calendarDays.length / 7) }, (_, i) => {
    return calendarDays.slice(i * 7, (i + 1) * 7);
  });

  return (
    <div>
      <h1>{date.toLocaleString('default', { month: 'long', year: 'numeric' })}</h1>
      <table>
        <thead>
          <tr>
            <th>Sun</th>
            <th>Mon</th>
            <th>Tue</th>
            <th>Wed</th>
            <th>Thu</th>
            <th>Fri</th>
            <th>Sat</th>
          </tr>
        </thead>
        <tbody>
          {weeksInMonth.map((week, i) => (
            <tr key={i}>
              {week.map((day, j) => (
                <td key={j}>{day}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}


// import AllEventsDetails from '../ApiServer/AllEventsDetails';
// class TestApp extends React.Component {
// constructor(){
//   super()
//   this.state={
//     events:[],
//     pagination:[],
//     Page:'',
//     Type:'all',
//     input:'',
//   }

//   this.RefreshButton=this.RefreshButton.bind(this);
// }

//   async componentDidMount(){

//     const  AllEvents={
//       Token:localStorage.getItem('accessToken'),
//       Page:this.state.Page,
//       Type:this.state.type,

//     }

//     const res =await AllEventsDetails.GetAllEventsDetails(AllEvents);
//     this.setState({
//           events:res.data.EventData.data,
//           pagination:res.data
//         }) 

//    toastr["success"](res.data.message)
//    console.log(this.state.events);

//   }

//   async RefreshButton(){

//     const UrlData = this.state.pagination.EventData;
//     if(UrlData.next_page_url!=null){
//       const current_Page = UrlData.current_page;
//       const nextPageURL = UrlData.next_page_url.split('?page=');
//        const nextPage =parseInt(nextPageURL[1]);  
//        const  AllEvents={
//         Token:localStorage.getItem('accessToken'),
//         Page:`page=${nextPage}`,
//         Type:this.state.type
//        }
//         const res =await AllEventsDetails.GetAllEventsDetails(AllEvents);      

//         this.setState({

//           pagination:res.data,

//           events:[...old,res.data.EventData.data]

//         })

//         console.log(res);
//         console.log(this.state.events);
//       }else{
//         return toastr["error"]("Sorry no more events")

//       }
//     }

//   render() {
//       const{events}=this.state;
// return (

//     <div>
//       {events.length>0?events.map((res,index)=>{

//           return <input type="text" key={index} name="inputText" onChange={e=>this.setState({input:e.target.value})} value={this.state.input}/>

//       }):''}
//       <button className="btn btn-primary" onClick={this.RefreshButton} > Refresh Data</button>
//     </div>
//     );
//   }
// }
// export default TestApp;



//   var images = ["http://www.trazeetravel.com/wp-content/uploads/2015/10/Big-Major-Cay-Bahamas-%C2%A9-Katie-Smith-Dreamstime-33201195-e1444248381801-1000x399.jpg", "https://i.pinimg.com/originals/9b/70/69/9b7069440538e120d7005af3b18d08bf.jpg", "https://media.cntraveler.com/photos/56a7a68878d099fc1224f308/master/pass/big-major-cay-pig-cr-getty.jpg", "http://www.slate.com/content/dam/slate/blogs/atlas_obscura/2014/06/09/the_swimming_pigs_of_big_major_cay_in_the_bahamas/7875531868_9f9ec85b6b_o.jpg.CROP.promo-large2.jpg", "https://i.ytimg.com/vi/W-PBFMECvTE/maxresdefault.jpg", "https://static.pexels.com/photos/109009/squirrel-grey-brown-fur-109009.jpeg", "https://img-aws.ehowcdn.com/877x500p/photos.demandstudios.com/getty/article/223/249/488872871.jpg", "https://img.huffingtonpost.com/asset/5834c55a1700002600e7bf13.jpeg?ops=scalefit_720_noupscale", "https://data.whicdn.com/images/10429808/large.jpg", "http://www.catster.com/wp-content/uploads/2015/06/8-Cats-sweat-through-paws-shutterstock_207995587.jpg", "https://fmlainsights.lexblogplatformthree.com/wp-content/uploads/sites/311/2011/04/catpaw.jpg", "https://i.ytimg.com/vi/W-PBFMECvTE/maxresdefault.jpg"];

//   class TestApp extends React.Component {
//     constructor(props) {
//       super(props);

//     }

//   render() {
//     return(
//           <div>
//             {moment().format('YYYY/MM/DD')}
//           </div>
//           )
//   };

// }
// export default TestApp;
// ReactDOM.render(<CitiesSlider slides={slides} />, document.querySelector('#app'));

// export default class TeasTApp extends React.Component {
//   constructor() {
//     super();
//     this.state = {
//       shareholders: [{ name: 'Charles' }, { name: 'David' }],
//     };
//   }

//   handleShareholderNameChange(idx,evt){

//     const newShareholders = this.state.shareholders.map((shareholder, sidx) => {
//         if (idx !== sidx) return shareholder;
//         return { ...shareholder, name: evt.target.value };
//       });

//     this.setState({ shareholders: newShareholders });
//   }

//   handleSubmit(evt){
//     const { name, shareholders } = this.state;
//     alert(`Incorporated: ${name} with ${shareholders.length} shareholders`);
//   }

//   handleAddShareholder(){
//     this.setState({ shareholders: this.state.shareholders.concat([{ name: '' }]) });
//   }

//   handleRemoveShareholder(idx){
//     this.setState({ shareholders: this.state.shareholders.filter((s, sidx) => idx !== sidx) });
//   }

//   render() {    
//     return (
//       <form onSubmit={this.handleSubmit}>
//         <h4>Shareholders</h4>

//         {this.state.shareholders.map((shareholder, idx) => (
//           <div className="shareholder" key={idx}>
//               <input
//                 type="text"
//                 placeholder={`Shareholder #${idx + 1} name`}
//                 value={shareholder.name}
//                 onChange={(evt)=>this.handleShareholderNameChange(idx,evt)}
//               />

//             <button type="button" onClick={()=>this.handleRemoveShareholder(idx)} className="small">-</button>

//           </div>
//         ))}
//         <button type="button" onClick={()=>this.handleAddShareholder} className="small">Add Shareholder</button>
//         <button>Incorporate</button>
//       </form>
//     )
//   }
// }
// export default class TestApp extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { fields: [""] };
//     this.onClickButtonAdder = this.onClickButtonAdder.bind(this);
//     this.onClickButtonSubmit = this.onClickButtonSubmit.bind(this);
//   }

//   onClickButtonAdder(event) {
//     event.preventDefault();
//     this.setState({
//       fields: ["", ...this.state.fields]
//     });
//   }

//   onClickFormGroupButton(index) {
//     let fields = [...this.state.fields];
//     fields.splice(index, 1);
//     this.setState({ fields });
//   }

//   onChangeFormGroupInput(index, event) {
//     let fields = [...this.state.fields];
//     fields[index] = event.target.value;
//     this.setState({ fields });
//   }

//   onClickButtonSubmit(event) {
//     event.preventDefault();
//     const filteredValues = this.state.fields.filter(value => value);
//     alert(filteredValues);
//   }
//   OnInputTimePickerPopUp(index){

//           // <SelectTime index={index} />

//   }

//   render() {
//     const isFormGroupDeletionAllowed =
//       this.state.fields.length > 1 ? true : false;

//     return (
//       <form className="dynamicForm">
//         <div className="dynamicForm__buttonWrapper">
//           {/* <FormButton
//             click={this.onClickButtonAdder}
//             type="ghost"
//             innerHtml="Add Field"
//           /> */}
//           {/* <FormButton click={this.onClickButtonSubmit} innerHtml="Submit" /> */}
//         </div>

//         {this.state.fields.map((value, index) => (
//           <FormGroup
//             inputChange={this.onChangeFormGroupInput.bind(this, index)}
//             buttonClick={index===0?this.onClickButtonAdder:this.onClickFormGroupButton.bind(this, index)}
//             // buttonDisabled={index === 0 ? !isFormGroupDeletionAllowed : undefined}
//             value={value}
//             inputClick={this.OnInputTimePickerPopUp.bind(this,index)}
//             key={index}
//             index={index}
//           />
//         ))}
//       </form>
//     );
//   }
// }

// // function FormButton(props) {
// //   let buttonType = props.type;
// //   let buttonModifierClassName = "";

// //   if (buttonType) {
// //     buttonType = `${buttonType[0].toUpperCase()}${buttonType.slice(1)}`; // capitalize
// //     buttonModifierClassName = `dynamicForm__button--is${buttonType}`;
// //   }

// //   return (
// //     <button
// //       className={`dynamicForm__button ${buttonModifierClassName}`}
// //       onClick={props.click}
// //     >
// //       {props.innerHtml}
// //     </button>
// //   );
// // }


// function FormGroup(props) {

//  useEffect(() => {
//   // var twelveHour = $('.timepicker-12-hr').wickedpicker();
//   //   // start Time Picker         
//   //     let valStartTimePicker=this;
//   //     $('.timepicker-12-hr').on('change',function(){
//   //     var startPicker=$(this).val();
//   //     valStartTimePicker.startTimePicker(startPicker,props.input);
//   //   });

//  }, [])
//   return (

//     <>
//      <div className="row " >
//      <div className="col-12 col-sm-4">
//          <div className="form-group">
//              <label className="form-label" htmlhtmlFor="inputState">Start Time</label>
//              <input  className="dynamicForm__itemInput form-control "
//               type="text"
//               value={props.value}
//               onChange={props.inputChange}
//               onClick={props.inputClick}

//               />
//          </div>
//      </div>
//      <div className="col-12 col-sm-4">
//          <div className="form-group">
//              <label className="form-label" htmlhtmlFor="inputState">&nbsp;</label>
//              <button 
//              className="dynamicForm__itemButton btn default-btn js-btn-prev"
//              type="button"
//              onClick={props.buttonClick}
//              disabled={props.buttonDisabled}
//              tabIndex="-1"
//              >{props.index==0?"Add Time":'Remove'}</button>
//          </div>
//      </div>
//      <div className="col-12 col-sm-4">
//      <SelectTime index={props.index} />

//      </div>
//  </div>
//  </>
//   );
// }

// class SelectTime extends React.Component{
// constructor(){
//   super()

//     this.state={
//             hours:moment().format('hh'),
//             minutes:moment().format('mm'),
//             format:moment().format('A'),
//     }

// }

// increment(num,count){
// let countNumber=num  

//   // if(countNumber<count){
//     countNumber+1
//   // }

//   console.log(countNumber);

// }

// decrement(num,count){

//     let countNumber=num  
//     if(countNumber<count){
//       countNumber-1
//     }

//     console.log(countNumber);

// }

// ChangeToggle(e){

//     this.setState({
//       format:e.target.value
//     })

// }

// handelTime(){

// }

//  render(){
//    console.log(moment().format('hh:mm'));
//   return (

//       <>
//       <div className="card">
//       <div className="card-body">
//             <div className="row">
//               <div className="col-md-3">
//                   <div className="row">
//                   <i className="fa fa-arrow-up"></i>
//                   </div>
//                   <div className="form-group">
//                     <input type="number"  onChange={this.handelTime} value={this.state.hours}/>   
//                   </div>
//                   <div className="row">
//                     <i className="fa fa-arrow-down"></i>
//                   </div>
//               </div>
//               <span>:</span>
//               <div className="col-md-3">
//                 <div className="row">
//                     <i className="fa fa-arrow-up" onClick={()=>this.increment(this.state.minutes,59)}></i>
//                     </div>
//                     <div className="form-group">
//                       <input type="number"  onChange={this.handelTime} value={this.state.minutes}/>   
//                     </div>
//                     <div className="row">
//                       <i className="fa fa-arrow-down" onClick={()=>this.decrement(this.state.minutes,0)}></i>
//                   </div>
//               </div>
//               <div className="col-md-3">
//                     <div className="row">
//                          <i className="fa fa-arrow-up" onClick={(e)=>this.ChangeToggle(e)}></i>
//                     </div>
//                     <div className="form-group">
//                         <span>{this.state.format}</span>
//                     </div>
//                     <div className="row">
//                       <i className="fa fa-arrow-down" onClick={(e)=>this.ChangeToggle(e)}></i>
//                     </div>
//               </div>
//             </div>
//         </div>
//       </div>

//     </>
//   );

//  }

// }


// import 'html-duration-picker';

// export default class TestApp extends Component{

// constructor(){
//   super();
//     this.state={
//          Minutes:0,
//          Hours:0,
//     }
// }

// Minutes(Minutes){

//   console.log(Minutes,"Minutes");

// }

// Hours(Hours){

//   console.log(Hours,"Hours");

// }

// onKeyDown(min){

//   this.setState({Minutes:parseInt(min)});
//   console.log(min,"onkeyDown")

// }

// onKeyUp(min){

//   console.log(min,"onKeyUp");

// }
// componentDidMount(){
//   let i=0;
//   let sum =0;
//   console.log(sum,i);

//   while(i<100){
//   console.log(sum,i);

//     sum=sum+i;
//   console.log(sum,i);

//     sum=i+sum;
//     console.log(sum,i);

//     i+=1;
//     console.log(sum,i);

//   }
//   console.log(sum);
// }
// getDifferenceInDays(date1, date2){
//   const diffInMs = Math.abs(date2 - date1);
//   return diffInMs / (1000 * 60 * 60 * 24);
// }
// componentDidMount(){

// const date1 = new Date('12/30/2020');
// const date2 = new Date('1/1/2021');


// var startDate = moment(moment(), "DD.MM.YYYY");
// var endDate = moment("25.12.2021", "DD.MM.YYYY");
// console.log(startDate<endDate);
// var result = endDate.diff(startDate, 'days');

// console.log(this.getDifferenceInDays(date2, date1),result);

// }

// render(){

// let duration ='01:00';

// let StartTime=['00:00','13:45'];

// StartTime.map((res)=>{
//   console.log(moment(res ,"h:mm A").add(moment.duration(duration)).format('HH:mm'));
//   console.log(moment('18-12-2020',moment(res ,"h:mm A").add(moment.duration(duration)).format('HH:mm')));
// })

// let Days=[{day:0},{day:1},{day:2},{day:3},{day:4},{day:5},{day:6}];

//     Days.map((res)=>{
//         console.log(moment.utc().days(res.day).format('MM-DD-YYYY'));
//     });
//    let weekDays=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
//     weekDays.map((res)=>{
//       console.log(moment().day(res).week(2).format("MM-DD-YYYY"))
//     })
//     console.log([...Array(24)])
// console.log(moment().format('DD-MM-YYYY'),moment().add(3,'weeks').format('DD-MM-YYYY'));
// console.log(moment().add(15,'days').format('MM-DD-YYYY'),moment.utc().format('MM-DD-YYYY'))
// console.log(moment().days(2+7))

//     return(
//       <>
//         <div className="card">
//             <div className="card-body">
//               <div className='row'>
//                   <div className="col-6">
//                       <div className="form-group">

//                         <input type="text" onKeyDown={()=>this.onKeyDown(this.state.Minutes-1)}  onKeyUp={()=>this.onKeyUp(this.state.Minutes+1)} value={this.state.Minutes}/>
//                           {/* <input type="text" onChange={(e)=>console.log(e)} className="form-control html-duration-picker" /> */}

//                       </div>
//                   </div>
//               </div>
//             </div>
//         </div>
//       </>
//     );
//   }
// }



// import React, { useRef, useState, useEffect } from "react";

// import styled from "styled-components";

// const StyledContainer = styled.div`
//   position: relative;
//   border: 1px solid #c7c7c7;
//   height: 128px;
//   width: 256px;
//   display: flex;
//   align-items: center;
//   box-shadow: 0px 0px 16px 0px rgba(255, 255, 255, 0.1);
// `;

// const StyledList = styled.div`
//   width: 100%;
//   height: 96px;
//   overflow-y: scroll;

//   scroll-snap-type: y mandatory;
//   -ms-overflow-style: none;

//   &::-webkit-scrollbar {
//     width: 0 !important;
//   }
// `;

// const StyledTrack = styled.div`
//   width: 33%;
//   flex-grow: 1;
//   height: 128px;
//   overflow-y: hidden;
//   border-right: ${props => (props.border ? "1px solid #c7c7c7" : "")};
// `;

// const StyledNumber = styled.div`
//   position: relative;
//   height: 96px;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   scroll-snap-align: center;
//   background-color: #00456a;
//   color: white;

//   &::after {
//     content: "";
//     background-color: white;
//     position: absolute;
//     height: 8px;
//     width: 8px;
//     bottom: -4px;
//     border-radius: 100%;
//     z-index: 5;
//   }
// `;

// const StyledHeader = styled.div`
//   height: 32px;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   border-bottom: 1px solid #c7c7c7;
//   background-color: #f9f9f9;
// `;

// const DurationTrack = ({ numbers, qualifier, border, onChange }) => {
//   const list = useRef(null);
//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries, observer) => {
//         entries.forEach(entry => {
//           if (!entry.isIntersecting) {
//             return;
//           }
//           onChange(Number.parseFloat(entry.target.textContent));
//         });
//       },
//       { threshold: 0.75 }
//     );
//     [...list.current.children].forEach(child => {
//       //console.log("child", child);
//       observer.observe(child);
//     });
//   }, []);

//   const renderNumberJSX = () => {
//     return numbers.map((number, i) => (
//       <StyledNumber key={qualifier + number}>{number}</StyledNumber>
//     ));
//   };

//   return (
//     <StyledTrack border={border}>
//       <StyledHeader>{qualifier}</StyledHeader>
//       <StyledList ref={list}>{renderNumberJSX()}</StyledList>
//     </StyledTrack>
//   );
// };

// const DurationInput = () => {
//   const [duration, setDuration] = useState(0);
//   const [days, setDays] = useState(0);
//   const [hours, setHours] = useState(0);
//   const [minutes, setMinutes] = useState(0);

//   useEffect(() => {
//     const value = days * 1440 + hours * 60 + minutes;
//     setDuration(value);
//   }, [days, hours, minutes]);

//   return (
//     <>
//       <div>{duration} minutes</div>
//       <StyledContainer>
//         <DurationTrack
//           numbers={[...Array(100).keys()]}
//           border
//           qualifier="day(s)"
//           onChange={value => setDays(value)}
//         />
//         <DurationTrack
//           numbers={[...Array(24).keys()]}
//           border
//           qualifier="hour(s)"
//           onChange={value => setHours(value)}
//         />
//         <DurationTrack
//           numbers={[...Array(60).keys()]}
//           qualifier="min(s)"
//           onChange={value => setMinutes(value)}
//         />
//       </StyledContainer>
//     </>
//   );
// };

// export default DurationInput;


// class TestApp extends React.Component {
//   constructor() {
//     super()
//     this.myRef = React.createRef()
//     this.state = {scrollTop: 0}
//     this.onScroll=this.onScroll.bind(this);
//   }

//   onScroll(){
//     const scrollY = window.scrollY //Don't get confused by what's scrolling - It's not the window
//     const scrollTop = this.myRef.current.scrollTop;
//     console.log(this.myRef,`onScroll, window.scrollY: ${scrollY} myRef.scrollTop: ${scrollTop}`)
//     this.setState({
//       scrollTop: scrollTop
//     })
//   }

//   render() {
//     const {
//       scrollTop
//     } = this.state
//     return (
//       <div
//         ref={this.myRef}
//         onScroll={this.onScroll}
//         style={{
//           border: '1px solid black',
//           // width: '600px',
//           height: '263px',
//           overflow: 'scroll',
//         }} >

//             <p>ScrollTop is {scrollTop}</p>
//             <p>ScrollTop is {scrollTop}</p>
//             <p>ScrollTop is {scrollTop}</p>
//             <p>ScrollTop is {scrollTop}</p>
//             <p>ScrollTop is {scrollTop}</p>
//             <p>ScrollTop is {scrollTop}</p>
//             <p>ScrollTop is {scrollTop}</p>
//             <p>ScrollTop is {scrollTop}</p>
//             <p>ScrollTop is {scrollTop}</p>
//             <p>ScrollTop is {scrollTop}</p>
//             <p>ScrollTop is {scrollTop}</p>
//             <p>ScrollTop is {scrollTop}</p>
//             <p>ScrollTop is {scrollTop}</p>
//             <p>ScrollTop is {scrollTop}</p>
//             <p>ScrollTop is {scrollTop}</p>
//             <p>ScrollTop is {scrollTop}</p>
//             <p>ScrollTop is {scrollTop}</p>
//             <p>ScrollTop is {scrollTop}</p>
//             <p>ScrollTop is {scrollTop}</p>
//             <p>ScrollTop is {scrollTop}</p>

//       </div>
//     )
//   }
// }

// export default TestApp;


// const CARD_OPTIONS = {

// };

// const CardField = ({onChange}) => (
//   <div className="FormRow">

//     {/* <CardElement options={CARD_OPTIONS} onChange={onChange} /> */}

//     <CardNumberElement  className="form-control " onChange={onChange} options={CARD_OPTIONS}/>
//     <CardExpiryElement className="form-control" onChange={onChange} options={CARD_OPTIONS}/>
//     <CardCvcElement className="form-control" onChange={onChange} options={CARD_OPTIONS}/>
//   </div>
// );

// const Field = ({
//   label,
//   id,
//   type,
//   placeholder,
//   required,
//   autoComplete,
//   value,
//   onChange,
// }) => (
//   <div className="FormRow">
//     <label htmlFor={id} className="FormRowLabel">
//       {label}
//     </label>
//     <input
//       className="FormRowInput"
//       id={id}
//       type={type}
//       placeholder={placeholder}
//       required={required}
//       autoComplete={autoComplete}
//       value={value}
//       onChange={onChange}
//     />
//   </div>
// );

// const SubmitButton = ({processing, error, children, disabled}) =>(<button
//     className={`SubmitButton ${error ? 'SubmitButton--error' : ''}`}
//     type="submit"
//     disabled={processing || disabled}
//   >
//     {processing ? 'Processing...' : children}
//   </button>
// );

// const ErrorMessage = ({children}) => (
//   <div className="ErrorMessage" role="alert">
//     <svg width="16" height="16" viewBox="0 0 17 17">
//       <path
//         fill="#FFF"
//         d="M8.5,17 C3.80557963,17 0,13.1944204 0,8.5 C0,3.80557963 3.80557963,0 8.5,0 C13.1944204,0 17,3.80557963 17,8.5 C17,13.1944204 13.1944204,17 8.5,17 Z"
//       />
//       <path
//         fill="#6772e5"
//         d="M8.5,7.29791847 L6.12604076,4.92395924 C5.79409512,4.59201359 5.25590488,4.59201359 4.92395924,4.92395924 C4.59201359,5.25590488 4.59201359,5.79409512 4.92395924,6.12604076 L7.29791847,8.5 L4.92395924,10.8739592 C4.59201359,11.2059049 4.59201359,11.7440951 4.92395924,12.0760408 C5.25590488,12.4079864 5.79409512,12.4079864 6.12604076,12.0760408 L8.5,9.70208153 L10.8739592,12.0760408 C11.2059049,12.4079864 11.7440951,12.4079864 12.0760408,12.0760408 C12.4079864,11.7440951 12.4079864,11.2059049 12.0760408,10.8739592 L9.70208153,8.5 L12.0760408,6.12604076 C12.4079864,5.79409512 12.4079864,5.25590488 12.0760408,4.92395924 C11.7440951,4.59201359 11.2059049,4.59201359 10.8739592,4.92395924 L8.5,7.29791847 L8.5,7.29791847 Z"
//       />
//     </svg>
//     {children}
//   </div>
// );

// const ResetButton = ({onClick}) => (
//   <button type="button" className="ResetButton" onClick={onClick}>
//     <svg width="32px" height="32px" viewBox="0 0 32 32">
//       <path
//         fill="#FFF"
//         d="M15,7.05492878 C10.5000495,7.55237307 7,11.3674463 7,16 C7,20.9705627 11.0294373,25 16,25 C20.9705627,25 25,20.9705627 25,16 C25,15.3627484 24.4834055,14.8461538 23.8461538,14.8461538 C23.2089022,14.8461538 22.6923077,15.3627484 22.6923077,16 C22.6923077,19.6960595 19.6960595,22.6923077 16,22.6923077 C12.3039405,22.6923077 9.30769231,19.6960595 9.30769231,16 C9.30769231,12.3039405 12.3039405,9.30769231 16,9.30769231 L16,12.0841673 C16,12.1800431 16.0275652,12.2738974 16.0794108,12.354546 C16.2287368,12.5868311 16.5380938,12.6540826 16.7703788,12.5047565 L22.3457501,8.92058924 L22.3457501,8.92058924 C22.4060014,8.88185624 22.4572275,8.83063012 22.4959605,8.7703788 C22.6452866,8.53809377 22.5780351,8.22873685 22.3457501,8.07941076 L22.3457501,8.07941076 L16.7703788,4.49524351 C16.6897301,4.44339794 16.5958758,4.41583275 16.5,4.41583275 C16.2238576,4.41583275 16,4.63969037 16,4.91583275 L16,7 L15,7 L15,7.05492878 Z M16,32 C7.163444,32 0,24.836556 0,16 C0,7.163444 7.163444,0 16,0 C24.836556,0 32,7.163444 32,16 C32,24.836556 24.836556,32 16,32 Z"
//       />
//     </svg>
//   </button>
// );

// const CheckoutForm = () => {
//   const stripe = useStripe();
//   const elements = useElements();
//   const [error, setError] = useState(null);
//   const [cardComplete, setCardComplete] = useState(false);
//   const [processing, setProcessing] = useState(false);
//   const [paymentMethod, setPaymentMethod] = useState(null);
//   const [billingDetails, setBillingDetails] = useState({
//     email: '',
//     phone: '',
//     name: '',  
//   });
//   const [eventDetails, setEventDetails]=useState({
//         email:'',
//         phone:'',
//         amount:'',
//         eventId:'',
//         eventSlotId:'',
//   });


//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     if (!stripe || !elements) {
//       // Stripe.js has not loaded yet. Make sure to disable
//       // form submission until Stripe.js has loaded.

//       return;
//     }


//     if (error) {
//       elements.getElement('card').focus();
//       return;
//     }

//     if (cardComplete) {
//       setProcessing(true);
//     }

//     const payload = await stripe.createPaymentMethod({
//       type: 'card',
//       card: elements.getElement(CardNumberElement),
//       // billing_details: billingDetails,
//     });



//     if (payload.error) {
//       setError(payload.error);
//     } else {
//       setPaymentMethod(payload.paymentMethod);
//       const PostData={
//         stripeToken:payload.paymentMethod.id,
//         eventId:17,
//         slotId:203,
//       }
//     const {status,data} = await StripePaymentServices.chargesPaymentService(PostData);

//     if(status==200){
//       setProcessing(false);
//     }
//       console.log(data,'handleSubmit');
//     }

//   };

//   const reset = () => {
//     setError(null);
//     setProcessing(false);
//     setPaymentMethod(null);
//     setBillingDetails({
//       email: '',
//       phone: '',
//       name: '',
//     });
//   };

//   return paymentMethod ? (
//     <div className="Result">
//       <div className="ResultTitle" role="alert">
//         Payment successful
//       </div>
//       <div className="ResultMessage">
//         Thanks for trying Stripe Elements. No money was charged, but we
//         generated a PaymentMethod: {paymentMethod.id}
//       </div>
//       <ResetButton onClick={reset} />
//     </div>
//   ) : (
//     <form className="Form" onSubmit={handleSubmit}>
//       <fieldset className="FormGroup">
{/* <Field
          label="Name"
          id="name"
          type="text"
          placeholder="deepak kumar"
          required
          autoComplete="name"
          value={billingDetails.name}
          onChange={(e) => {
          setBillingDetails({...billingDetails, name: e.target.value});
          }}
        />
        <Field
          label="Email"
          id="email"
          type="email"
          placeholder="deepak@gmail.com"
          required
          autoComplete="email"
          value={billingDetails.email}
          onChange={(e) => {
            setBillingDetails({...billingDetails, email: e.target.value});
          }}
        />
        <Field
          label="Phone"
          id="phone"
          type="tel"
          placeholder="(+91) 843-920-8890"
          required
          autoComplete="tel"
          value={billingDetails.phone}
          onChange={(e) => {
          setBillingDetails({...billingDetails, phone: e.target.value});
          }}
        /> */}
{/* </fieldset>
      <fieldset className="FormGroup">
        <CardField
          onChange={(e) => {
            setError(e.error);
            setCardComplete(e.complete);
          }}
        />
      </fieldset>
      {error && <ErrorMessage>{error.message}</ErrorMessage>}
      <SubmitButton processing={processing} error={error} disabled={!stripe}>
        Pay $25
      </SubmitButton>
    </form>
  );
}; */}

// const ELEMENTS_OPTIONS = {
//   fonts: [
//     {
//       cssSrc: 'https://fonts.googleapis.com/css?family=Roboto',
//     },
//   ],
// };

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
// const stripePromise = loadStripe('pk_test_BXAJTXJXWiKc7v2qDY35Stzk00GzQ1hnW4');

// const TestApp = (props) => {
// console.log(props);
// const [time ,setTime]=useState('00:00');
// console.log(time);
//   return (
//   <div className="AppWrapper">
//       {/* <Elements stripe={stripePromise} options={ELEMENTS_OPTIONS}>
//         <CheckoutForm />
//       </Elements> */}
//      <TimeField className="form-control" value={time} onChange={(event,time)=>setTime(time)} style={{minWidth:'100px'}}/>
//   </div>
//   );

// };
// class TestApp extends Component {
  // constructor() {
  //   super();
  //   this.state = {
  //     categories: [
  //       {id: 1, value: "PHP"},
  //       {id: 2, value: "Laravel"},
  //       {id: 3, value: "Angular"},
  //       {id: 4, value: "React"}
  //     ],
  //     checkedItems: new Map()
  //   };

  //   this.handleChange = this.handleChange.bind(this);
  //   this.handleSubmit = this.handleSubmit.bind(this);
  // }

  // handleChange(event) {
  //       var isChecked = event.target.checked;
  //       var item = event.target.value;
  //        console.log(event.target.checked);
  //       this.setState(prevState => ({ checkedItems: prevState.checkedItems.set(item, isChecked) }));
  // }

  // handleSubmit(event) {
  //   console.log(this.state);
  //   event.preventDefault();
  // }

  // render() {
  //   return (
  //     <div>
  //       <h1>React Multiple Checkbox Example - ItSolutionStuff.com</h1>

  //       <form onSubmit={this.handleSubmit}>

  //         {
  //           this.state.categories.map(item => (
  //             <li key={item.id}>
  //               <label>
  //                 <input
  //                   type="checkbox"
  //                   value={item.id}
  //                   onChange={this.handleChange}
  //                 /> {item.value}
  //               </label>
  //             </li>
  //           ))
  //         }

  //         <br/>
  //         <input type="submit" value="Submit" />
  //       </form>
  //     </div>
  //   );
  // }
//   constructor(){
//     super();
//     this.state = {
//         hobbies:[]
//     }

//     this.handleInputChange = this.handleInputChange.bind(this);
// }

// handleInputChange(event) {
//     const target = event.target;
//     var value = target.value;

//     if(target.checked){
//         this.state.hobbies[value] = value;   
//     }else{
//         this.state.hobbies.splice(value, 1);
//     }
//     console.log(this.state.hobbies)
// }

// submit(){
//     console.log(this.state.hobbies)
// }

// render(){
//     return(
//         <div>
//             <div className="row">
//                 <div className="col-md-6 offset-md-3">
//                     <br /><br />
//                     <h3>React Multiple Checkbox</h3><br />

//                     <div className="form-row">
//                         <div className="form-group col-md-6">
//                             <label>Hobbies :</label><br />
//                             <div className="form-check form-check-inline">
//                                 <input className="form-check-input" type="checkbox" name="hobbies" id="inlineCheckboxh1" value="1" onChange={this.handleInputChange} />
//                                 <label className="form-check-label" htmlFor="inlineCheckboxh1">Reading</label>
//                             </div>
//                             <div className="form-check form-check-inline">
//                                 <input className="form-check-input" type="checkbox" name="hobbies" id="inlineCheckboxh2" value="2" onChange={this.handleInputChange} />
//                                 <label className="form-check-label" htmlFor="inlineCheckboxh2">Developing</label>
//                             </div>
//                             <div className="form-check form-check-inline">
//                                 <input className="form-check-input" type="checkbox" name="hobbies" id="inlineCheckboxh3" value="3" onChange={this.handleInputChange} />
//                                 <label className="form-check-label" htmlFor="inlineCheckboxh3">Desiging</label>
//                             </div>
//                         </div>
//                     </div>

//                     <div className="form-row">
//                         <div className="col-md-12 text-center">
//                             <button type="submit" className="btn btn-primary" onClick={()=>this.submit()}>Submit</button>
//                         </div>
//                     </div>

//                 </div>
//             </div>
//         </div>
//     )  
// }
// }

// export default TestApp;








// const TestApp = () => {
//   const [formData, setFormData] = useState("");
//   const [checked, setChecked] = useState([]); // categories
//   const [categories, setCategories] = useState([
//     { _id: "5d7c7653427efd4400201e0e", name: "JavaScript", slug: "javascript" },
//     { _id: "5d7c7662427efd4400201e11", name: "VueJs", slug: "vuejs" },
//     { _id: "5d7c79df427efd4400201e1e", name: "Firebase", slug: "firebase" }
//   ]);

//   useEffect(() => {
//     setFormData(new FormData());
//   }, []);

//   const handleToggle = c => () => {
//     // return the first index or -1
//     const clickedCategory = checked.indexOf(c);
//     const all = [...checked];

//     if (clickedCategory === -1) {
//       all.push(c);
//     } else {
//       all.splice(clickedCategory, 1);
//     }
//     console.log(all);
//     setChecked(all);
//     formData.set("categories", all);
//   };

//   const showCategories = () => {
//     return categories.map((c, i) => (
//       <li key={i} className="list-unstyled">
//         <input
//           onChange={handleToggle(c._id)}
//           type="checkbox"
//           className="mr-2"
//         />
//         <label className="form-check-label">{c.name}</label>
//       </li>
//     ));
//   };

//   return (
//     <div>
//       <h2>Categories</h2>
//       {showCategories()}
//       <h2>Form Data</h2>
//       {JSON.stringify(...formData)}
//     </div>
//   );
// };

// export default TestApp;


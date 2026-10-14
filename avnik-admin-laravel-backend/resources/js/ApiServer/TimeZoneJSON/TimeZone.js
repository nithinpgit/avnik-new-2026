


var moment = require('moment-timezone');

let tz=moment.tz.guess();

const TimeZon=moment().tz(tz);
const TimeZone=tz;

// const TimeZoneOffset=TimeZon;  

const TimeZoneOffset=moment().tz(TimeZone).format('Z');

export default TimeZone;
export {TimeZoneOffset};
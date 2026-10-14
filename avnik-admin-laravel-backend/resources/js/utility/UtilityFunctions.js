import moment from "moment";

function showHideDiv(ele) {
    var srcElement = document.getElementById(ele);
    var srcElementClass=document.getElementsByClassName('group-users-show-bx');
    if (srcElement != null) {
        if (srcElement.style.display == "block") {
            srcElement.style.display = "none";
        } else {
            srcElement.style.display = "block";
        }
        // console.log(srcElementClass.style.display,'srcElementClass')
        return false;
    }
}

function timeConverter(value, string) {
    var Duration = "0h 0min";

    if (string) {
        let Hour =
            value.split(":")[0] > 1
                ? parseInt(value.split(":")[0]) + " h"
                : parseInt(value.split(":")[0]) > 0
                ? ` ${parseInt(value.split(":")[0])}` + " h"
                : "";
        let Minutes =
            value.split(":")[1] > 1
                ? ` ${parseInt(value.split(":")[1])}` + ` min`
                : parseInt(value.split(":")[1]) > 0
                ? ` ${parseInt(value.split(":")[1])}` + ` min`
                : "";
        Duration = Hour + Minutes;
        return Duration;
    } else {
        var seconds = value;
        var duration = moment.duration(seconds, "minutes");
        var formatted = duration.format("hh:mm:ss");
        return formatted;
    }
}
function convertMinutes  (minutes) {
    if (minutes === null || minutes == 0 || isNaN(minutes)) return "Undefined";
    let h = Math.trunc(minutes / 60);
    let m = minutes % 60;
  
    let hDisplay = h > 0 ? h + (h === 1 ? " Hr " : " Hr ") : "";
    let mDisplay = m > 0 ? m + (m === 1 ? " Min " : " Min ") : "";
  
    return hDisplay + mDisplay;
  }
  function secondsToHms(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const formattedHours = hours.toString().padStart(1, '0');
    const formattedMinutes = minutes.toString().padStart(1, '0');
    return formattedHours>0?`${formattedHours} Hr ${formattedMinutes} Min`:`${formattedMinutes} Min`;
  }
  
function isValidURL(string) {
    if (typeof string !== "string" || string.trim() === "") {
        return false;
    }

    var res = string.match(
        /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
    );
    return res !== null;
}

function eventDetailsUrl(eventId, eventToken, slotId) {
    if (eventId && eventToken && slotId) {
        return `/event?token=${eventToken}&event=${eventId}&slot=${slotId}`;
    } else {
        return `/event?token=${eventToken}&event=${eventId}`;
    }
}
function FindHoursMinutes(minutes) {
    //create duration object from moment.duration
    var duration = moment.duration(minutes, "minutes");
    //calculate hours
    var hh =
        duration.years() * (365 * 24) +
        duration.months() * (30 * 24) +
        duration.days() * 24 +
        duration.hours();
    //get minutes
    var mm = duration.minutes();

    //return total time in hh:mm format
    return hh + ":" + mm;
}
function millisecondsConvert(ms) {
    const days = Math.floor(ms / (24 * 60 * 60 * 1000));
    const daysms = ms % (24 * 60 * 60 * 1000);
    const hours = Math.floor(daysms / (60 * 60 * 1000));
    const hoursms = ms % (60 * 60 * 1000);
    const minutes = Math.floor(hoursms / (60 * 1000));
    const minutesms = ms % (60 * 1000);
    const sec = Math.floor(minutesms / 1000);
    return days + ":" + hours + ":" + minutes + ":" + sec;
}
function Redirect401Login(error){
    if(error?.request?.status==401){
        window.location="/login";
    }
}
export {
    Redirect401Login,
    showHideDiv,
    secondsToHms,
    isValidURL,
    timeConverter,
    eventDetailsUrl,
    FindHoursMinutes,
    millisecondsConvert,
    convertMinutes
};

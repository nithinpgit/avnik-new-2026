import moment from 'moment'; 
import config from './config';
import blankAvatar from '@src/assets/images/avatars/avatar-blank.png'
function formatSizeUnits(bytes){
    if (bytes >= 1073741824) { bytes = (bytes / 1073741824).toFixed(2) + " GB"; }
    else if (bytes >= 1048576)    { bytes = (bytes / 1048576).toFixed(2) + " MB"; }
    else if (bytes >= 1024)       { bytes = (bytes / 1024).toFixed(2) + " KB"; }
    else if (bytes > 1)           { bytes = bytes + " bytes"; }
    else if (bytes == 1)          { bytes = bytes + " byte"; }
    else                          { bytes = "0 bytes"; }
    return bytes;
  }
  function showHideDiv(ele){
    var srcElement = document.getElementById(ele);
    if (srcElement != null) {
      if (srcElement.style.display === "block") {
        srcElement.style.display = 'none';
      }
      else {
        srcElement.style.display = 'block';
      }
      return false;
    }
  }
  function getTimeFromMins(mins) {
    
    if (mins >= 24 * 60 || mins < 0) {
        throw new RangeError("Valid input should be greater than or equal to 0 and less than 1440.");
    }
    var h = mins / 60 | 0,
        m = mins % 60 | 0;
    return moment.utc().hours(h).minutes(m).format("hh:mm A");
}
function getTimeFromHours(a){
  var hours = Math.trunc(a/60);
  var minutes = a % 60;
 return hours;
}
function getTimeFromMinutes(a){
  var hours = Math.trunc(a/60);
  var minutes = a % 60;
 return minutes;
}
function getFileExtension(filename){
  return filename.split('.').pop();
}
function joinUrl(base, path) {
  if (!path) return base
  if (/^https?:\/\//i.test(String(path))) return String(path)
  return `${String(base).replace(/\/+$/, '')}/${String(path).replace(/^\/+/, '')}`
}

function setCustomProfileAvatar(image,sImage){
  var imageURl=blankAvatar;
  if(image){
    imageURl= joinUrl(config.baseUrlFront, image);
  }else if(sImage){
    imageURl=sImage
  }
  return imageURl;
}
  export {setCustomProfileAvatar,getFileExtension,formatSizeUnits,showHideDiv,getTimeFromMins,getTimeFromHours,getTimeFromMinutes};

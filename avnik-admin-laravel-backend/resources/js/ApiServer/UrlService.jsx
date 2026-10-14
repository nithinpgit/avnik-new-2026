import { assetUrl, getApiBase, getFileManagerBase, getLegacyLocalOrigin } from './assetUrl'

let apiDomain = getApiBase()
let FileManagerPath = `${getFileManagerBase()}/`
let DefaultProfilePicture = assetUrl('public/assets/images/avatar.png')

if (process.env.NODE_ENV === 'production') {
  if (window.location.origin === 'http://localhost:8000') {
    apiDomain = `${window.location.origin}/`
    FileManagerPath = `${getLegacyLocalOrigin()}/`
    DefaultProfilePicture = assetUrl('public/assets/images/avatar.png', getLegacyLocalOrigin())
  }
} else if (window.location.origin === 'http://localhost:8000') {
  apiDomain = `${window.location.origin}/`
  FileManagerPath = `${getLegacyLocalOrigin()}/`
  DefaultProfilePicture = assetUrl('public/assets/images/avatar.png', getLegacyLocalOrigin())
}

class UrlService {
  // authorization url
  static loginUrl() { 
    return apiDomain + 'api/login'; 
  }
  static registerUrl() {
      return apiDomain + 'api/register';
  }
  static forgotPasswordUrl(props) {

      return apiDomain + 'api/forgot-password/reset';

  }
  static resetPasswordUrl(props) {

    return apiDomain + 'api/rest-password/reset';
  
  }

  // auth User Details 
  static getUserDetailsUrl(props) {
    
      return apiDomain + 'api/user/'+props.email;
  }
  static authUserDetailsUrl(){
    return apiDomain + 'api/user';
  }

// event managing url
  static allEventsUrl(props){

    return apiDomain + `api/events/all?${props}`;

  }

/*  Event Urls
* event create
* event File Upload  
* 
*
*    
 */ 
    static createEventUrl(props){
      return apiDomain + 'api/events';
    }
    
/*  
* End Event Urls
*    
 */

/*
* File manger Urls
*
*/
static singleFileUploadUrl(){
  
  return apiDomain+'api/fileManager/singleFileStore';
  
}

static deleteSingleFileUrl(){
  
  return apiDomain+'api/fileManager/deleteSingleFile';

}
static deleteMultipleFileUrl(){
  
  return apiDomain+'deleteMultipleFile';
}
static multipleFileUploadUrl(){
  return apiDomain+'api/fileManager';
}
static authUserFileUrl(props){

  return apiDomain+`${props}`;

}
//fetch Event By ID 
static eventByIdUrl(props){
  
  return apiDomain+`api/events/${props}`;

}
// add and remove to favorite
static addRemoveToFavoriteUrl(){
  return apiDomain+`api/favorite`;
} 
static ProfileDetailsById(){
   
  return apiDomain+`profile/${props.productId}`;
  
}
// File Manager URLS
static DuplicateFilesUrl(){

  return apiDomain+`api/fileManager/duplicate`;

}
static FileManagerCopyUrl(){

  return apiDomain+`api/fileManager/copy`;
}
static FileManagerMoveUrl(){

  return apiDomain+`api/fileManager/move`;
}

static FileManagerDownloadUrl(){

  return apiDomain + `api/fileManager/download`;

}

static FileManagerRenameUrl(){

    return apiDomain+`api/fileManager/rename`;

}

static CreateMeetingUrl(){

  return apiDomain+`api/meetingRoom`;
  
}
// eventHandling URLS
static eventHandlingUrls(){
   return apiDomain+`api/eventHandling/eventDelete`;
}

//Payments Handling 

static stripePaymentsUrls(){
  return  apiDomain+`api/payments`;
}   
  
}

export default UrlService;
export { assetUrl, FileManagerPath, DefaultProfilePicture, apiDomain };

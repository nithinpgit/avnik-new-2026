let DOMAIN        = '';
let ASSET_DOMAIN   = '';
let API_BASE_URL  = '';
let APP_LOGO      = 'images/logo.svg';
let appName = 'Avnik';
if(window.location.href.indexOf('localhost') > -1 ){
    // appName = 'local';
}
switch (appName) {
case 'Liberate':
    DOMAIN = 'https://liberate.avniksofttech.com:8443';
    ASSET_DOMAIN   = 'https://liberate.avniksofttech.com/join';
    API_BASE_URL = '/rest/api/';
    APP_LOGO      = 'images/logo.svg';
break;
case 'Avnik':
    DOMAIN = 'https://meet.avnik.com:8080';
    ASSET_DOMAIN   = 'https://meet.avnik.com/join';
    API_BASE_URL = '/api/';
    APP_LOGO      = 'images/logo.svg';
break;
default:
    // DOMAIN = '';
    DOMAIN = 'https://meet.avnik.com:8080';
    ASSET_DOMAIN   = '';
    API_BASE_URL = '/api/';
    APP_LOGO      = 'images/logo.svg';
break;
}

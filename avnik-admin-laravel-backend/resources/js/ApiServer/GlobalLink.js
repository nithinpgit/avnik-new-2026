import { assetUrl, getApiBase, getFileManagerBase, getLegacyLocalOrigin } from './assetUrl'

let apiDomain = getApiBase()
let FileManagerPath = `${getFileManagerBase()}/`

if (process.env.NODE_ENV === 'production') {
  if (window.location.origin === 'http://localhost:8000') {
    apiDomain = `${window.location.origin}/`
    FileManagerPath = `${getLegacyLocalOrigin()}/`
  }
} else if (window.location.origin === 'http://localhost:8000') {
  apiDomain = `${window.location.origin}/`
  FileManagerPath = `${getLegacyLocalOrigin()}/`
}

class GlobalLink {

static FileManagerPathURL(path = '') {
    return assetUrl(path, FileManagerPath.replace(/\/+$/, ''))
}

static ApiDomainPathURL(){
    
    return apiDomain;
}

static UserProfileId(ProfileId){
   
  return `profile/${ProfileId}`;
  
}



}

export default GlobalLink;
export { assetUrl, FileManagerPath, apiDomain };

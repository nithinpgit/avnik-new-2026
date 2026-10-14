import React from 'react';
import axios from 'axios';
import UrlService from '../UrlService';
import Auth from '../../Routes/Auth';
class fileManagerService{


  async singleFileUploadService(props){

    try{
      const response= await axios.post(UrlService.singleFileUploadUrl(),props,
      {headers:{
        'Content-Type': 'multipart/form-data',
        'Accept':'application/json',
        authorization:`Bearer ${Auth.getAccessToken()}`,
      },
      onUploadProgress: (progressEvent) => {
        if (progressEvent.lengthComputable) {
           let ProgressBar=parseInt(Math.round((progressEvent.loaded*100)/progressEvent.total));
        }
      }
      
    });
    return response;
    }catch(error){
      return false;
    }
  }
  async multipleFileUploadService(props){
    try{
      const response= await axios.post(UrlService.multipleFileUploadUrl(),props,
        {headers:{
            'Content-Type': 'multipart/form-data',
            'Accept':'application/json',
             authorization:`Bearer ${Auth.getAccessToken()}`,
        }}
      );

      return response;
      
    }catch(error){
        return false;
    }
  }

// Fetch Auth User Files 
  async authUserFileService(props){
    try{

      const response= await axios.get(UrlService.authUserFileUrl(props.url),
        {headers:{
            'Accept':'application/json',
             authorization:`Bearer ${Auth.getAccessToken()}`,
        }}
      );
      return response;
    }catch(error){
      return false;
    }
  }

// 
async deleteSingleFileService(props){
  try{
    const response= await axios.post(UrlService.deleteSingleFileUrl(),props,
      {headers:{
          'Accept':'application/json',
          authorization:`Bearer ${Auth.getAccessToken()}`,
      }}
    );
    return response;
  }catch(error){
    return false;
  }
}

async DuplicateFileService(props){
  try{
    const response = await axios.post(UrlService.DuplicateFilesUrl(),props,
      {headers:{
          'Accept':'application/json',
          authorization:`Bearer ${Auth.getAccessToken()}`,
      }}
    );
    return response;
  }catch(error){
    return false;
  }
}
async CopyFileService(props){
  try{
    const response = await axios.post(UrlService.FileManagerCopyUrl(),props,
      {headers:{
          'Accept':'application/json',
          authorization:`Bearer ${Auth.getAccessToken()}`,
      }}
    );
    return response;
  }catch(error){
    return false;
  }
}
async MoveFileService(props){
  try{
    const response = await axios.post(UrlService.FileManagerMoveUrl(),props,
      {headers:{
          'Accept':'application/json',
          authorization:`Bearer ${Auth.getAccessToken()}`,
      }}
    );
    return response;
  }catch(error){
    return false;
  }
}
async DownloadFileService(props){
  
  try{

      const response = await axios.post(UrlService.FileManagerDownloadUrl(),props,
         
          {headers:{
              'Accept':'application/json',
              authorization:`Bearer ${Auth.getAccessToken()}`,
          }}

      );

    return response;

  }catch(error){
    
      return false;
  
  }
}
async RenameFileService(props){
  try{
    const response = await axios.post(UrlService.RenameFilesUrl(),props,
      {headers:{
          'Accept':'application/json',
          authorization:`Bearer ${Auth.getAccessToken()}`,
      }}
    );
    return response;
  }catch(error){
    return false;
  }
}
async deleteMultipleFileService(props){
  try{
    const response= await axios.post(UrlService.deleteMultipleFileUrl(),props,
      {headers:{
          'Accept':'application/json',
          authorization:`Bearer ${Auth.getAccessToken()}`,
      }}
    );
    return response;
  }catch(error){
    return false;
  }
}

FileUploadProgress(progress){

  console.log(progress,"progress");
  return progress;

}

}

export default new fileManagerService();
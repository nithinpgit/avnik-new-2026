import React from 'react';
import { Link } from 'react-router-dom';
import { isValidURL } from '../../../../utility/UtilityFunctions';

const Message = ({Message,Time,ClassName,userName,name,isFile,file,fileType,fileName}) => {
    return (
        <>
            {
            isFile
            ?fileType=="jpg"||fileType=="png"||fileType=="gif"||fileType=="jpeg"
            ?<SendImageFile Message={Message} file={file} fileName={fileName} fileType={fileType} Time={Time} ClassName={ClassName} userName={userName} name={name}/>
            :<SendFile Message={Message} file={file} fileName={fileName} fileType={fileType} Time={Time} ClassName={ClassName} userName={userName} name={name}/>
            :<SimpleMessage Message={Message} Time={Time} ClassName={ClassName} userName={userName} name={name}/>  
            }    
        </>
    );
}
const SimpleMessage=({Message,Time,ClassName,userName,name})=>{
    const safeMessage = typeof Message === "string" ? Message : "";

    return(
        <>
        <li className={ClassName}>
            <div className='chat-inside'>
                {name?<Link to={`/profile/${userName}`}>
                    <span className="g-m-name">{name}</span>
                </Link>:''}     
                <div>{isValidURL(safeMessage)?<a href={safeMessage} target="_blank" rel="noreferrer">{safeMessage}</a>:(safeMessage || "-")}</div>
                <time>{Time}</time>
                </div>
            </li>
        </>
    );
}

const SendFile = ({Message,Time,ClassName,userName,name,isFile,file,fileType,fileName}) => {
    return (
        <>
            <li className={ClassName + ` img`}>
            <div className='chat-inside'>
            {name?<Link to={`/profile/${userName}`}>
                    <span className="g-m-name">{name}</span>
                </Link>:''}
                <div>
                    <button className="chat-download-btn">
                        <div className="file-type-title-icon">
                            <span className="file-type-name">{fileType}</span>
                            <strong>{fileName} <i className="av av-download-icon"></i></strong>
                        </div>
                    </button>
                </div>
                <time>{Time}</time>
                </div>
            </li>
        </>
    );
}
const SendImageFile = ({Message,Time,ClassName,userName,name,isFile,file,fileType,fileName}) => {
    return (
        <>
            <li className={ClassName + ` img`}>
            <div className='chat-inside'>
            {name?<Link to={`/profile/${userName}`}>
                    <span className="g-m-name">{name}</span>
                </Link>:''}
                <div>
                    <img src={file} alt={fileName} width={200}/>
                    {Message?<span className="caption">{Message}</span>:''}                    
                </div>
                <time>{Time}</time>
                </div>
            </li>
        </>
    );
}

const ShowChatDate = () => {
    return (
        <>
            <li className="chat-date"> <span>Today</span></li>
        </>
    );
}


export { SendFile,Message, SendImageFile ,ShowChatDate};

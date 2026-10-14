import React, { Component } from 'react';

class FileManagerUpload extends Component {

    render() {

        return (
            <>
                <div className="modal fade default-popup upload-files-popup" id="upload-files-popup" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <form>
                            <div className="modal-content">
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close"> <i className="av av-close-icon"></i></button>
                                <div className="modal-header">
                                    <h2 className="modal-title">Upload Files</h2>
                                </div>
                                <div className="modal-body">

                                    <div className="upload-paid-files">
                                        <div className="file-upload">
                                            <input name="file" onChange={(e) => this.props.FileUploadHandling(e)} className="file-input" type="file" multiple />
                                            <img src="../assets/images/upload-files-icon.svg" alt="" />
                                            <div className="card-subtitle">Add a Files (maximum file size 20mb)</div>
                                        </div>
                                    </div>
                                    {this.props.UploadFormFiles.length>0?this.props.UploadFormFiles.map((res,index) => {
                                        return (
                                            <div className="upload-files-list" key={index}>
                                                <div className="u-p-files-list uploading-file-bx">
                                                    <div className="custom-table">
                                                        <div className="table-row">
                                                            <div className="cell title-editable" data-title="Name">
                                                            <div className="file-type-title-icon"><span className="file-type-name">{res.fileType}</span> <strong>{res.fileName}</strong></div>
                                                            </div>
                                                            <div className="cell file-progress-editable" data-title="Action">
                                                                <div className="progress">
                                                                    <div className="progress-bar" style={{ width: `${this.props.Progress}%` }}></div>
                                                                </div>
                                                                <button type="button" className="btn default-btn cricle-icon-btn"><i className="av av-close-icon"></i></button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    }):''}

                                </div>
                                {this.props.FileUploaded?
                                <div className="modal-footer">
                                    <div>
                                        <button type="button" className="btn btn-default btn-sm" data-dismiss="modal">Close</button>
                                    </div>
                                </div>:''}
                            </div>
                        </form>
                    </div>
                </div>
            </>
        );
    }
}

export default FileManagerUpload;


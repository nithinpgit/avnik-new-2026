import React, { Component } from 'react';

class Folder extends Component {
    render() {
        return (
            <>
                <div className="c-table-row fm-folder-row" defaultValue="Show/Hide" onClick={this.props.showHideDiv('fm-row-option-1')}>
                    <div className="cell fm-ck-editable" data-title="Select">
                        <div className="message-time">
                            <div className="checkbox custom">
                                <label>
                                    <input type="checkbox" defaultChecked />
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="cell fm-file-name-editable" data-title="File Name">
                        <div className="cmn-new-toggle">
                            <div className="file-type-title-icon"><span className="av av-tools-icon"></span><strong>Hip Hop Tutorial</strong></div>
                            <div id="fm-row-option-1" className="new-toggle-dropdown" style={{ display: 'none' }}>
                                <ul>
                                    <li><a href="#" className="dropdown-item"><i className="av av-download-icon"></i> Download</a></li>
                                    <li><a href="#" className="dropdown-item"><i className="av av-copy-icon"></i> Copy</a></li>
                                    <li><a href="#" className="dropdown-item"><i className="av av-controls-icon"></i> Move</a></li>
                                    <li><a href="#" className="dropdown-item"><i className="av av-share-icon"></i> Share</a></li>
                                    <li><a href="#" className="dropdown-item"><i className="av av-pencil-icon"></i> Rename</a></li>
                                    <li><a href="#" className="dropdown-item"><i className="av av-delete-icon"></i> Delete</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="cell fm-date-time-editable" data-title="Date & Time">
                        <div className="c-table-text">17 June 2020  04:45 PM  </div>
                    </div>
                    <div className="cell fm-size-editable" data-title="Size">
                        <div className="c-table-text">789 KB</div>
                    </div>
                    <div className="cell fm-type-editable" data-title="Type">
                        <div className="c-table-text">Saved File</div>
                    </div>
                    <div className="cell fm-source-editable" data-title="Source">
                        <div className="message-delete-btn">Purchased</div>
                    </div>
                </div>
            </>
        );
    }
}

export default Folder;

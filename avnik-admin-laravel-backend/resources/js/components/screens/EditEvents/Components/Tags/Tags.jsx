import React, { useContext } from 'react';
import ReactDOM from 'react-dom';
import TagsInput from 'react-tagsinput';
import EditEventContext from '../../EditEventContext/EditEventContext';

const Tags =()=>{
   
 const [state,dispatch] = useContext(EditEventContext);
   function handleChange(tags) {
    dispatch({type:'eventTags',payload:{Type:'eventTags',event_tags:tags}});
      }
     
    function handleChangeInput(tag) {
        dispatch({type:'eventTag',payload:{Type:'eventTag',eventTag:tag}});
      }
        const { event_tags,eventTag} = state;
        
        return (
            <>
                <div className="col-12 col-sm-12">
                   <div className="form-group add-tag-group">
                   <span className="label-small-h">Add Tags</span>
                         <TagsInput
                            value={event_tags}
                            onChange={handleChange}
                            inputValue={eventTag}
                            addKeys={[9, 13,188]}
                            onChangeInput={handleChangeInput}
                            onlyUnique={true}
                            maxTags={15}
                        />
                        <span className="float-left label-small-h">{event_tags?.length}</span>
                        <span className="float-right label-small-h">max 15</span>
                      {/* <input type="text" className="form-control" placeholder="Tags" name="tags" /> */}
                   </div>                
                </div>
            </>
        );
    
}

export default Tags;

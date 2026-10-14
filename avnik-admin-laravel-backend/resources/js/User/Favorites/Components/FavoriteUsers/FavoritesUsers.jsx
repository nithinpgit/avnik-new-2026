import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import UserFavoriteContext from '../../Context/UserFavoriteContext/UserFavoriteContext';

const FavoritesUsers = (props) => {
    const userFavoriteContext = useContext(UserFavoriteContext);
    return (
        <>
            <div className="c-table-row">
                <div className="cell favorite-icon-editable" data-title="Favorite">
                <div className="favorite-icon-btn">
                        <a href={void (0)} onClick={()=>props.action({userId:props.toUser})} class="favme av av-favorite-solid-icon active" style={{color:'rgb(242, 50, 52)'}}></a>
                </div>
                </div>
                <div className="cell fav-event-details-editable" data-title="Event Details">
                    <div className="message-user-bx" >
                        <Link to={`/profile/${props.username}`}>
                            <figure className="cmn-profile-pic" title={props.name}>
                                <img src={props.profilePicture} alt={props.name} />
                            </figure>
                            <span>{props.name}</span>
                        </Link>
                    </div>
                </div>
                <div className="cell fav-location-editable" data-title="Event Date">
                    <div className="c-table-textt">{props.country}</div>
                </div>
            </div>
        </>
    );
}

export default FavoritesUsers;

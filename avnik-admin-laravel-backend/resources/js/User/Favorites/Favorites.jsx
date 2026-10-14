
import Axios from 'axios';
import React, { Component, useContext, useReducer, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ApiService } from '../../ApiServer/ApiService';
import { FileManagerPath } from '../../ApiServer/UrlService';
import CurrentUser from '../../components/UserContext/CurrentUserContext/CurrentUser';
import Auth from '../../Routes/Auth';
import moment from 'moment';
import FavoriteEvents from './Components/FavoriteEvents/FavoriteEvents';
import FavoritesUsers from './Components/FavoriteUsers/FavoritesUsers';
import UserFavoriteContext from './Context/UserFavoriteContext/UserFavoriteContext';
import {FavoriteListSkeleton} from '../../components/SkeletonLoading/SkeletonLoading'
import reducer from './Reducer/FavoritesReducer';
import OnScrollLoader from '../../components/Comman/OnScrollLoader';
import useDebounce from '../../components/Hooks/UseDebounce/UseDebounce';
const initialState = {
    favorites: [],
    searchQuery: '',
    FilterBy: 'All',
    change: 0,
    preloader:true,
    onScroll:false,
}



const Favorites = (props) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [searchTerm, setSearchTerm] = useState("");
    const debouncedSearchTerm = useDebounce(searchTerm, 1000);

    const currentUser = useContext(CurrentUser);
    
    var self=this;
    useEffect(() => {
        fetchData();
            $(window).scroll(function() {  
                if($(window).scrollTop() + $(window).height()== $(document).height()) {
                     handleChange();
                }
             });
    }, []);

    useEffect(() => {
        fetchData();
    }, [state.FilterBy, debouncedSearchTerm]);

    const fetchData=()=>{
        let data = {
            searchQuery: debouncedSearchTerm,
            filterBy: state.FilterBy,
        }
        ApiService._fetchFavorites(data).then((res) => {
            if (res.data.status == 200) {
                dispatch({type:'GET_FAVORITES_INIT',payload:res?.data?.data?.data})
                dispatch({type:'PRELOADER',payload:false})
                self=res.data.data
            }
            if (res.data.status === 'failed') {
                dispatch({type:'PRELOADER',payload:false})

                toastr["error"](res.data.message);
            }
            console.log(res)
        }).catch((error) => {
            dispatch({type:'PRELOADER',payload:false})

            toastr["error"](error.message);
        })
    }
    function handleChange(){

        if(self.next_page_url!=null){
            dispatch({type:'ON_SCROLL',payload:true});
            let data = {
                filterBy: state.FilterBy,
                searchQuery: state.searchQuery,
                nextPage:self.current_page+1,
            }
            ApiService._fetchFavorites(data).then((res) => {
                if (res.data.status == 200) {
                    dispatch({type:'GET_FAVORITES',payload:res?.data?.data?.data})
                    self=res.data.data,
                    dispatch({type:'ON_SCROLL',payload:false});
                }
                if (res.data.status === 'failed') {
                    toastr["error"](res.data.message);
                   
                    dispatch({type:'ON_SCROLL',payload:false});
                }
                console.log(res)
            }).catch((error) => {
                toastr["error"](error.message);
               
                dispatch({type:'ON_SCROLL',payload:false});
            })
        }else{
            dispatch({type:'ON_SCROLL',payload:false});
        }
    }
    const unFavorite=(obj)=>{
        let data=obj
        let update=[]; 
        ApiService._favorite(data).then((res)=>{
            if(res.data.status==200){
                toastr["success"](res.data.message);
               
                if(data?.eventId){
                    update= state.favorites.filter((e)=>e.event_id!=data.eventId);  
                 
                    dispatch({type:'GET_FAVORITES_INIT',payload: update});
                }
                if(data?.userId){
                    update= state.favorites.filter((e)=>e.to_user!=data.userId);
                    dispatch({type:'GET_FAVORITES_INIT',payload: update})
                }
            }
            if(res.data.status=="failed"){
                toastr["error"](res.data.message);
    
            }
        }).catch((error)=>{
            toastr["error"](error.message);
        })
    }
    const searchHandle = (e) => {
        e.preventDefault();
    }

    const handleSearchChange = (searchValue) => {
        setSearchTerm(searchValue);
        dispatch({type:"SEARCH_QUERY_TEXT",payload:{Type:"SEARCH_QUERY_TEXT",searchQuery:searchValue}});
    }
   
    const UserFavoriteValue = [state, dispatch];
    return (
        <>
            <UserFavoriteContext.Provider value={UserFavoriteValue}>
                <div className="ah-tab-content" data-ah-tab-active={props.Active}>
                    <div className="favorites-content-sec">
                        <div className="cmn-rit-top-heading-sec message-top-bx">
                            <div className="float-left">

                            </div>
                            <form onSubmit={searchHandle}>
                                <div className="inbox-rit-search">
                                    <div className="flex-container">
                                        <div style={{ flexGrow: '5' }}  className="flex-select-bx">
                                            <select className="form-control custom-select-bx"  onChange={(e)=>dispatch({type:"SEARCH_QUERY_NEW",payload:{Type:"SEARCH_QUERY_NEW",FilterBy:e.target.value}})} defaultValue={state?.FilterBy}>
                                                <option value="All" >All</option>
                                                <option value="Events">Events</option>
                                                <option value="Users">Users</option>
                                            </select>
                                        </div>
                                        <div style={{ flexGrow: '5' }} className="flex-input-bx">
                                            <div className="cmn-search-bx">
                                                <input className="form-control" type="text" onChange={(e)=>handleSearchChange(e.target.value)} value={searchTerm} placeholder="Search" aria-label="Search" />
                                                <button className="btn link-btn" type="submit"><i className="av av-search-icon"></i></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>

                        </div>
                        <div className="message-list inbox-events-list">
                            <div className="u-p-files-list">
                                <div className="custom-table">
                                    {state.preloader?<FavoriteListSkeleton   />:state.favorites?.length>0? state.favorites.map((res) =>
                                    res?.my_favorite_users?.user_profile?
                                    <FavoritesUsers action={unFavorite} toUser={res?.to_user}  profilePicture={res?.my_favorite_users?.user_profile?.profile_picture ? FileManagerPath + res?.my_favorite_users?.user_profile?.profile_picture : `${FileManagerPath}/public/assets/images/avatar.png`} country={res?.my_favorite_users?.user_profile?.country||'N/A'} name={res?.my_favorite_users?.name} username={res?.my_favorite_users?.username}  key={res.id} />
                                    :
                                    <FavoriteEvents action={unFavorite} eventTitle={res.my_favorite_events?.event_title} eventCreatedAt={res?.created_at} eventUpdatedAt={res?.updated_at} rememberToken={res.my_favorite_events?.remember_token} eventId={res?.my_favorite_events?.id} eventFiles={res.my_favorite_events?.event_files ? JSON.parse(res.my_favorite_events?.event_files) : []} key={res.id} />
                                    ):<div className="text-center mt-5">No Favorites added yet</div>}
                                    {state.onScroll?<FavoriteListSkeleton   />:''}
                                </div>
                            </div>
                        </div>
                        <OnScrollLoader active={state?.onScroll}/>
                    </div>
                </div>
            </UserFavoriteContext.Provider>
        </>
    );

}

export default Favorites;

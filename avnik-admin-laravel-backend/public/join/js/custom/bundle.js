/*                        AVNIK.COM
 *********************************************************
 * @licstart  The following is the entire license notice for the
 * code in this page.
 *
 * Copyright (C) 2021  Avnik
 *
 The code in this page is not free, taking this code and altering for any other project is legally not allowed
 *
 * @licend
 */
let connected = false;
let userList = {};
let joinUser = false;
let initialDataLoaded = false;
let meetingStatusUpdated = false;
function connectToSocket() {
    socket = io.connect(DOMAIN, {
        transports: ['websocket'],
        reconnection: true,
        reconnectionDelay: 5000,
        reconnectionAttempts: Infinity
        // path: '/libsocket'
    });

    socket.on("connect", function(id) {
        console.log("Function = >connect | Data =>"+id)
        connected = true;
        joinUserMeeting();
        if(recorder){
            let data = {};
            data.room = room;
            socket.emit('getInitialData', JSON.stringify(data))
        }
    });
    socket.on('disconnect', function(reason) {

    });

    socket.on('onOldPresenterRemoved', function(reason) {
        console.log("Function = >onOldPresenterRemoved | Data =>"+reason)
        showModal("Multiple Presenters", "User with presenter login has been logged in from somwhere else.This session will disconnect in a moment...", '', '');
        setTimeout(() => {
            window.location.href = '/home';
        }, 3000);

    });
    socket.on('onGhostRemoved', function(reason) {
        console.log("Function = >onGhostRemoved | Data =>"+reason)
        showModal("Multiple Login", "User with same userid logged in to the "+eventType+" from somewhere else.This session will disconnect in a moment.....", '', '');
        setTimeout(() => {
            window.location.href = '/home';
        }, 3000);

    });
    socket.on('onInitialData', function(data) {
        console.log("Function = >onInitialData | Data =>"+data)
    });
    socket.on('closeMe', function(data) {
        console.log("Function = >closeMe | Data =>"+data)
        data = JSON.parse(data);
        if (data.recordId == recorderId) {
            saveRecordingEntry(recorderId);
            setTimeout(()=>{
                window.close();
            },3000);
        }
    });
    socket.on('onYoutubeShare', function(data) {
        console.log("Function = >onYoutubeShare | Data =>"+data)
        if(!userAllowed(false)){
            return;
        }
        data = JSON.parse(data);
        if (player) {
            player.loadVideoById(data.fileUrl);
            $('#youtube-share').show();
            player.playVideo();
            removeVideo();
            currentContenBlock = 'youtube';
            $('.y-share').addClass('active-menu');
            // removepresentationInAction();
        }
        hideLoader();
        $('#right-cam-parent').removeClass('shw-rside');
        currentContenBlock = 'youtube';
        resetConference();
        if(mode == 'presenter' || havePower){
            $('.content-close-btn').show();
        }
    });
    socket.on('onInitialChat', function(data) {
        console.log("Function = >onInitialChat | Data =>"+data)
        chatDictionary = JSON.parse(data);
        for (let key in chatDictionary) {
            for (let i = 0; i < chatDictionary[key].length; i++) {
                if (chatDictionary[key][i].sender == userId) {
                    chatDictionary[key][i].me = true;
                } else {
                    chatDictionary[key][i].me = false;
                }

            }
        }
        if (chatDictionary.hasOwnProperty('public')) {
            loadChatFromDictionary('public');
        }
        setTimeout(() => {
            $("#chatUl").scrollTop($("#chatUl").prop("scrollHeight"));
        }, 2000);

    });
    socket.on('onReceiveSendToAll', function(data) {
        if(JSON.parse(data).method !== 'speaking'){
            console.log("Function = >onReceiveSendToAll | Data =>"+data)
        }
        
        data = JSON.parse(data);
        if (data.room != room) {
            return;
        }
        if (data.clientId == myClientId) {
            return;
        }
        if(userAllowed(data.method)){
            
            manageOnReceiveSendToAll(data)
        }
        
    });
    socket.on('onUserRemoved', function(data) {
        // console.log("Function = >onUserRemoved | Data =>"+data)
        data = JSON.parse(data);
        pushNotification(data.avatar, data.userName + ' has left the session');
        $('#' + data.clientId + '_user').remove();
        $('#' + data.clientId).remove();
        layout1();
        if(data.mode === 'presenter'){
            hostAvailable = false;
        }
        $('#user-' + data.clientId).remove();
    });
    removeGhosts = (data) =>{
        $(".usersli").each(function() {
            let id = $(this).attr('id');
            let elementExist = false;
            for (let key in data) {
                userObj = data[key];
                if(userObj.clientId+'_user' === id){
                    elementExist = true;
                }

            }
            if(!elementExist){
                $('#'+id).remove();
            }
        })
    }
    
    socket.on('onPresenterLiveData', function(userObj) {
        userObj = JSON.parse(userObj)
        if(mode !== 'presenter' ){
            if(userObj.time){
                console.log('UPDATING TIME : '+userObj.time);
                meetingTime = userObj.time;
                updateTimerDisplay();
            }
            if(userObj.meetingStatus && meetingStatus !== userObj.meetingStatus){
                console.log('UPDATING MEETING STATUS : '+userObj.meetingStatus);
                if(meetingStatus !=='Ended'){
                    meetingStatus = userObj.meetingStatus;
                }
                changeMeetingBasedOnStatus(meetingStatus);
            }
            if(userObj.totalDuration !== totalDuration){
                console.log('UPDATING TOTAL DURATION : '+userObj.totalDuration);
                totalDuration = parseInt(userObj.totalDuration)
            }
        }

    });
    let refreshCount = 0;
    socket.on('onUserListRefresh', function(data) {
        refreshCount++;
        lastPingtime = new Date();
        data = JSON.parse(data);
        userList = data;
        var userCount = 0;
        hostAvailable = false;
        removeGhosts(data);
        for (let key in data) {
            userObj = data[key]
            if (userObj.userName != 'recorder13453') {
                // console.info(userObj.userName+'|'+userObj.clientId)
                if (userObj.mode == 'presenter') {
                    hostAvailable = true;
                    $('.pra-name').html(userObj.userName);
                    $('#host-name-val').html(userObj.userName.charAt(0).toUpperCase() + '' + userObj.userName.charAt(1).toUpperCase())
                    $('#continue-btn').removeClass('disabled')
                    $('#continue-btn').removeAttr('title')
                    $('.waithost').html('');
                } else {
                    let videoObjUi = renderVideoUi(userObj);
                   //  console.warn(videoObjUi)
                    if(videoObjUi){
                        console.warn('render ui')
                        if(conferenceMode){
                            $('#conference').append(videoObjUi)
                            layout1();
                            setTimeout(layout1,500);
                        }else{
                            $('#userList').append(videoObjUi);
                        }
                        let clientId = userObj.clientId;
                        if(streamObjectMap[clientId]){
                            $('#' + clientId).get(0).srcObject = streamObjectMap[clientId].stream;
                            $('#' + clientId).prop('muted', false);
                            if(clientId === myClientId){
                                if(!camEnabled){
                                    $('#' + clientId + '-parent').hide();
                                    $('#' + clientId + '-avatar').show();
                                }else{
                                    $('#' + clientId + '-parent').show();
                                    $('#' + clientId + '-avatar').hide();
                                }
                            }else{
                                if(!userObj.myCamAllowed || !userObj.camEnabled){
                                    $('#' + clientId + '-parent').hide();
                                    $('#' + clientId + '-avatar').show();
                                }else{
                                    $('#' + clientId + '-parent').show();
                                    $('#' + clientId + '-avatar').hide();
                                }
                            }
                            
                        }
                    }
                    userCount++;
                }
                if (userObj.clientId != myClientId) {
                    let pvlist = loadPrivateChatList(userObj);
                    if(pvlist){
                        $('#pv-chat-users-ul').append(pvlist);
                    }
                }
                if($('#' + userObj.clientId + '_user')){
                    $('#' + userObj.clientId + '_user').removeClass('duplicate-user');
                }
                if($('#user-' + userObj.clientId)){
                    $('#user-' + userObj.clientId).removeClass('duplicate-user');
                }
                changeUserPropertiesWihleRefreshingLIst(userObj)
                // onKeyupUserSearch();
            }
            
        }
        $('#part-count').html(userCount)
        if(userCount > 1){
            //$('#pvtabli').removeClass('hide')
            //$('.pvli').removeClass('hide')
        }else{
            //$('#pvtabli').addClass('hide')
            //$('.pvli').addClass('hide')
        }
        //$('[data-toggle="tooltip"]').tooltip();
        //console.info('-----------------------------------')
    });

    socket.on('syncUserList', function(data) {
        /*
        console.log("Function = >syncUserList | Data =>"+data)
        data = JSON.parse(data);
        if (data.havePower) {
            if (document.getElementById(data.clientId + '_givepower')) {
                document.getElementById(data.clientId + '_givepower').style.display = 'none';
                document.getElementById(data.clientId + '_revokepower').style.display = 'block';
            }
        } else {
            if (document.getElementById(data.clientId + '_givepower')) {
                document.getElementById(data.clientId + '_givepower').style.display = 'block';
                document.getElementById(data.clientId + '_revokepower').style.display = 'none';
            }
        }
        */
    });
    socket.on('initialData', function(data) {
        console.log("Function = >initialData | Data =>"+data)
        /*
        if(localStorage.getItem('wbdata-'+roomSlotId)){
            whiteboardArray = JSON.parse(localStorage.getItem('wbdata-'+roomSlotId));
            loadWhiteboardData();
        }
        */
        data = JSON.parse(data);
        for (let key in data) {
            processInitialData(key, data[key])
        }
        changeFunctionalityBasedOnRoomProperty();
        
    });
}
userAllowed = (method)=>{
    let userAllow = true;
    if(!allowed){
        if(method !== 'allowReply'){
            userAllow = false;
        }
    }

    return userAllow;


}
changeUserPropertiesWihleRefreshingLIst = (user) =>{
    //{"room":"60435621fea7fa70b01b78d4","userId":"120150527","clientId":"132526264","userName":"User 1668","mode":"viewer","avatar":"../join/images/av1.jpeg","camEnabled":false,"micEnabled":false,"recorder":false,"havePower":false,"myCamAllowed":true,"myMicAllowed":true,"forceAllow":true}
    if(user.havePower){
        if (document.getElementById(user.clientId + '_givepower')) {
            document.getElementById(user.clientId + '_givepower').style.display = 'none';
            document.getElementById(user.clientId + '_revokepower').style.display = 'block';
        }
    }else{
        if (document.getElementById(user.clientId + '_givepower')) {
            document.getElementById(user.clientId + '_givepower').style.display = 'block';
            document.getElementById(user.clientId + '_revokepower').style.display = 'none';
        }
    }

    if(user.myMicAllowed){
        $('#yourmicon'+user.clientId).show();
        $('#yourmicoff'+user.clientId).hide();
    }else{
        $('#yourmicon'+user.clientId).hide();
        $('#yourmicoff'+user.clientId).show();
    }
    if(user.myCamAllowed){
        $('#yourcamon'+user.clientId).show();
        $('#yourcamoff'+user.clientId).hide();
    }else{
        $('#yourcamon'+user.clientId).hide();
        $('#yourcamoff'+user.clientId).show();
    }
}
onBlockConfirm = (userId) =>{
    sendToAll({
        method: 'allowReply',
        receiverId: userId,
        status: false
    })
    $('#accept-deny-popup').modal("hide");
    if($('#isblockUser').prop("checked") === true){
        $.ajax({
            url: API_BASE_URL+"meetingRoom/block",
            headers: {
                'Accept': 'application/json',
                authorization: 'Bearer ' + accessToken
            },
            data: {
                roomId: roomSlotId,
                userId: userId,
                block: true
            },
            method: "PUT",
            success: function(d) {
                showNotification('Blocked successfully', false, 3000)
                $('#isblockUser').prop("checked",false)
            },
            error: function(error) {
                showNotification('Unable to block at this time', true, 3000)
                $('#isblockUser').prop("checked",false)
            }
        });
    }
}
onBlock = (userId) => {
    showModal('<figure class="exit-user-img"><img src="images/exit-user-img.svg"/><figure>','You sure you want to exit this user?','<div class="checkbox custom"><label> <input id="isblockUser" type="checkbox"> Block this user from entering the room again </label></div><button onclick="onBlockConfirm(\''+userId+'\')" data-dismiss="modal" type="button" class="btn cmn-btn">Exit</button>', '')
    $('#accept-deny-popup').modal('hide')
}
var disableBoard = (name) =>{
    if(havePower){
        $('#whiteboard').addClass('disablewbUsing');
        $('#wb-using').show();
        $('#wb-using').html(name+' is using whiteboard');
        if(window.whiteboardTimeout){
            clearTimeout(window.whiteboardTimeout)
        }
        window.whiteboardTimeout = setTimeout(() => {
            $('#whiteboard').removeClass('disablewbUsing');
            $('#wb-using').hide();
        }, 2000);
    }
}
let allowUserPopBlock = false;
let allowUserCue = [];
onAllowUser = (userId) => {
    allowUserPopBlock = false;
    if(allowUserCue.length > 0){
        if ($('#autoAccept').prop("checked") === true) {
            recursiveAllowAll();
        }else{
            setTimeout(onAllowUserPopup,3000,allowUserCue.pop());
        }
    }
    sendToAll({
        method: 'allowReply',
        receiverId: userId,
        status: true
    })
    $('#accept-deny-popup').modal("hide");
}
onDenyUser = (userId) => {
    allowUserPopBlock = false;
    if(allowUserCue.length > 0){
        if ($('#autoAccept').prop("checked") === true) {
            recursiveAllowAll();
        }else{
            setTimeout(onAllowUserPopup,3000,allowUserCue.pop());
        }
        
    }
    sendToAll({
        method: 'allowReply',
        receiverId: userId,
        status: false
    })
    $('#accept-deny-popup').modal("hide");
}
recursiveAllowAll = () =>{
    if(allowUserCue.length > 0){
        onAllowUser(allowUserCue.pop().userId);
        recursiveAllowAll();
    }
}
var acceptChange = () =>{
    if ($('#autoAccept').prop("checked") === true) {
        $('#autoacceptswitch').addClass('acceptall')
        $('#autoaccept-tooltip').attr('aria-label','Auto accept is on')
    } else {
        $('#autoacceptswitch').removeClass('acceptall')
        $('#autoaccept-tooltip').attr('aria-label','Auto accept is off')
        
        
    }
}
var onAutoAccept = ()=>{
    if ($('#autoAccept').prop("checked") === true) {
        $('#autoAccept').prop("checked",false);
        
        $('#autoacceptswitch').removeClass('acceptall')
        $('#autoaccept-tooltip').attr('aria-label','Auto accept is off')
    } else {
        $('#autoAccept').prop("checked",true)
        $('#autoacceptswitch').addClass('acceptall')
        $('#autoaccept-tooltip').attr('aria-label','Auto accept is on')
        
    }
}
var onAllowUserPopup = (data)=>{
    if(allowUserPopBlock === true){
        allowUserCue.push(data)
        showNotification('Multiple users knoking the session, will put then in cue ',false,4000);
        return;
    }
    allowUserPopBlock = true;
    $('#block-btn').html('<button type="button" class="btn link-btn" onclick="onBlock(\'' + data.userId + '\')"> Block</button>');
    $('#block-name-avtr').html(data.userName.charAt(0).toUpperCase())
    $('#allow-name').html(data.userName + ' wants to joint his meeting');
    $('#allow-btn').html('<button type="button" class="btn bdr-btn" onclick="onDenyUser(\'' + data.userId + '\')"> Deny </button>');
    $('#deny-btn').html('<button onclick="onAllowUser(\'' + data.userId + '\')" type="button" class="btn cmn-btn"> Admit </button>');
    $('#accept-deny-popup').modal({
        backdrop: 'static',
        keyboard: false
    })
    playAudio(1);
}

var manageOnReceiveSendToAll = (data) => {
    if (data.clientId == myClientId && !data.forceAllow) {
        return;
    }
    if (dev) {
        if (data.method != 'meetingStatus') {
            //console.log('Send To All Param : ' + JSON.stringify(data))
        }
    }

    switch (data.method) {
        case 'onPaymentSuccess':
            if(mode === 'presenter'){ 
                $('#paying-message-popup').modal('hide')
                pushNotification(data.userName,data.userName+' has been paid '+data.cost+'$');
                showNotification(data.userName+' has been paid '+data.cost+'$',false,3000)
                if(mode === 'presenter'){
                    showTour('Click play button to resume '+eventType,'top','90px','auto','75px','auto','startmeeting-tour',false)
                    
                }
            }
        break;
        case 'waitForHostToPay':
            
        break;
        case 'startRec':
          showNotification('Recording has been started by host',false,3000);
          $('#rec-indi').show();
        break;
        case 'stopRec':
            showNotification('Recording has been stopped by host',false,3000);
            $('#rec-indi').hide();
        break;
        case 'onWbUsing':
          disableBoard(data.name);
        break;
        case 'controlMic':
            if(data.receiverId === myClientId){
                myMicAllowed = data.status;
                if(data.status){
                    if(micEnabled){
                        publicationGlobal.unmute('audio')
                        showNotification('Host enabled your audio publishing, now everyone can hear you.', false, 5000)
                    }
                    
                }else{
                    publicationGlobal.mute('audio')
                    showNotification('Host disabled your audio publishing, no one can hear you !', false, 8000)
                }
                syncUserList();
            }  
        break;
        case 'controlCam':
            if(data.receiverId === myClientId){
                myCamAllowed = data.status;
                if (publicationGlobal) {
                    if(data.status){
                        publicationGlobal.unmute('video')
                        showNotification('Host enabled your video publishing', false, 5000)
                    }else{
                        publicationGlobal.mute('video')
                        showNotification('Host disabled your video publishing, no one can see you !', false, 8000)
                    }
                }
                syncUserList();
            }else{
                if(data.status){
                    if(userList[data.receiverId].camEnabled){
                        document.getElementById(data.receiverId + '-parent').style.display = 'block';
                        document.getElementById(data.receiverId + '-avatar').style.display = 'none';
                    }
                }else{
                    document.getElementById(data.receiverId + '-parent').style.display = 'none';
                    document.getElementById(data.receiverId + '-avatar').style.display = 'block';
                } 
            }
            
            
            
        break;
        case 'paymentRequest':
            if(recorder){
                return
            }
            totalDuration = totalDuration+parseInt(data.time)
            extendedDurationId = data.extendedDurationId;
            // alert(extendedDurationId)
            if(data.cost > 0){
                $('#extendtme').html(toHHMM(data.time));
                $('#extncost').html(data.cost);
                $('.total-amount-pay').html(data.cost);
                $('.extendtme').html(toHHMM(data.time));
                $('#host-wait-modal').hide();
                $('#do-you-accept-btn').modal({backdrop:'static',keyboard:false})
                $('#paymentleave').show();
                amountToPay = data.cost;
                setTimeout(()=>{
                    paymentStatus = 'waiting';
                    extendNotificationActive = true;
                    showHostPanelMessage('Host has been extended '+toHHMM(data.time)+'. Pay $'+data.cost+' to continue in this session otherwise you will be exited when the session resumes.' );
                }, 1500);
            }else{
                showNotification(eventType+' duration has been extended,'+eventType+' will start soon.',false,3000)
                $('#host-wait-modal').hide();
                paymentStatus = 'free';
                extendNotificationActive = true;
                showHostPanelMessage('Host has been extended '+toHHMM(data.time)+'.'+eventType+' will continue when host resumes.' );
            }
            
            break;
        case 'requestPvMeeting':
            if(recorder){
                return
            }
            if (data.receiverId === myClientId) {
                showModal('Private Meeting', data.senderName + ' has requested private meeting with you, Are you sure to allow ?', '<button type="button" class="btn cmn-btn" onclick="onPvRequestAccepted(\'' + data.senderId + '\',\'cammic\')" data-dismiss="modal"> Accept With Audio & Video </button> <button type="button" class="btn cmn-btn" onclick="onPvRequestAccepted(\'' + data.senderId + '\',\'mic\')" data-dismiss="modal"> Accept With Audio Only </button>  <button onclick="onRejectPvMeeting(\'' + data.senderId + '\')" type="button" class="btn cmn-btn red-btn" data-dismiss="modal">Rejecct</button> ', '')
            }
            break;
        case 'rejectPvMeeting':
            if (data.receiverId === myClientId) {
                showModal('Private Meeting', data.senderName + ' has rejected your requested for private meeting', '<button type="button" class="btn cmn-btn" data-dismiss="modal"> Ok </button>')
            }
            break;
        case 'acceptPvMeeting':
            if (data.receiverId === myClientId) {
                showModal('Private Meeting', data.senderName + ' has accepted your request for private meeting', '<button type="button" class="btn cmn-btn" onclick="onPrivateMeetingAccepted(\'' + data.senderId + '\',\'cammic\')" data-dismiss="modal"> Join With Audio & Video </button> <button type="button" class="btn cmn-btn" onclick="onPrivateMeetingAccepted(\'' + data.senderId + '\',\'mic\')" data-dismiss="modal"> Join With Audio Only </button>', 'enter-name-popup')
            }
            break;
        case 'stopPvMeeting':
            if (data.receiverId === myClientId) {
                onPrivateMeetingStopped(data.senderId);
                showModal('Private Meeting', 'Private meeting has been stopped', '<button type="button" class="btn cmn-btn" data-dismiss="modal"> Ok </button>', '')
            } else {
                skipLoader = true;
                publishStream();
            }
            break;

        case 'onRoomPropertyChanged':
            roomProperty = data.roomProperty;
            changeFunctionalityBasedOnRoomProperty();
            if (data.type === 'cam') {
                if (roomProperty.cameraOffAllFlag) {
                    showNotification('Host disabled your video publishing, no one can see you !', false, 8000)
                } else {
                    showNotification('Host enabled your video publishing', false, 5000)
                }
            }
            if (data.type === 'mic') {
                if (roomProperty.micOffAllFlag) {
                    showNotification('Host disabled your audio publishing, no one can hear you !', false, 8000)
                } else {
                    showNotification('Host enabled your audio publishing, now everyone can hear you.', false, 5000)
                }
            }
            break;


        case 'allowReply':
            if (mode === 'viewer' && data.receiverId === userId) {
                if (data.status) {
                    if(!allowed){
                        allowed = true;
                        onContinue();
                        $('.accepthost').hide();
                        $('#host-info-btn').modal("hide");
                        $('#continue-btn').removeClass('wait-disable');
                        let data = {};
                        data.room = room;
                        socket.emit('getInitialData', JSON.stringify(data))
                    }
                } else {
                    $('#host-info-btn').modal("hide");
                    showModal('Message', 'The host has denied you in the ' + eventType+' room', '', '')
                    setTimeout(() => {
                        window.location.href = '/home';
                    }, 4000);
                }


            }
            break;
        case 'onAllowOrDeny':
            if (mode === 'presenter') {
                if ($('#autoAccept').prop("checked") === true) {
                    onAllowUser(data.userId);
                } else {
                    
                    onAllowUserPopup(data);
                }

            }
            break;
        case 'speaking':
            if(mode === 'viewer'){
                if(!allowed){
                    return;
                }
            }
            if ((data.private && Object.keys(privateUsers).length > 0) || (data.private == false && Object.keys(privateUsers).length === 0)) {
                if (data.mode === 'presenter') {
                    showSpeakingIndication('host', data.average, data.userName)
                } else {
                    showSpeakingIndication(data.clientId, data.average, data.userName)
                }
            }

            break;

            
        case 'onMeetingExpire':
            meetingStatus ='paused';
            meetingTime = data.meetingTime;
            totalDuration = data.totalDuration;
            updateTimerDisplay();
            onExpareMeeting();
            meetingTimeOver = true
                
        break;
        case 'meetingStatus':
            meetingStatus = data.status;
            meetingTime = data.time;
            updateTimerDisplay();
            meetingStatusUpdated = true;
            if (meetingStatus === 'Ended') {
                showNotification(eventType+' has been ended',true,5000)
                setTimeout(() => {
                    if(!recorder){
                        if(quickMeet){
                            showModal("Message",eventType+" has been ended","")
                            setTimeout(() => {
                                window.location.href = '/home';
                            }, 3000);
                        }else{
                            $('#review-tips-popup').modal('show')
                        }
                        onReconnect();
                         //window.location.href = '/home';
                    }else{
                        let data = {};
                        data.recordId = recorderId;
                        data.room = room;
                        socket.emit('stopRecording', JSON.stringify(data));
                    }
                }, 3000);
                showHostPanelMessage('Session has been ended , Thankyou');
            } else if (meetingStatus === 'started') {
                    if(paymentStatus === 'waiting'){
                        unPublishStream();
                        conference = null;
                        showNotification('You are not payed yet, You will be exited in some moment');
                        setTimeout(() => {
                            window.location.href = '/home';
                        }, 3000);
                    }else{
                        $('#host-wait-modal').hide();
                        meetingTimeOver = false;
                        autoStartMicAndCam();
                        hideHostPanelMessage();

                    }
                   
            } else if (meetingStatus === 'paused') {
                if(mode === 'presenter'){
                    showHostPanelMessage(eventType+' is in paused state');
                }else{
                    showHostPanelMessage('Host paused the '+eventType+', Please wait until he resume');
                    
                }
                changeMeetingBasedOnStatus(meetingStatus);
                pauseMeetingInAction();
            }
            break;
        case 'caption':
            showCaption(data.text, data.userName)
            break;
        case 'mp4Seek':
            mp4SyncLocked = true;
            document.getElementById('mp4Video').currentTime = parseInt(data.time)
            releaseMp4SyncLock();
            break;
        case 'mp4Play':
            mp4SyncLocked = true;
            document.getElementById('mp4Video').play();
            document.getElementById('mp4Video').currentTime = parseInt(data.time)
            currentContenBlock = 'video';
            releaseMp4SyncLock();
            break;
        case 'mp4Pause':
            mp4SyncLocked = true;
            document.getElementById('mp4Video').pause();
            document.getElementById('mp4Video').currentTime = parseInt(data.time)
            releaseMp4SyncLock();
            break;
        case 'removeVideo':
            removeVideo();
            controlContentCloseButton()
            break;
        case 'loadVideo':
            loadVideoInaction(data.url);
            break;
        case 'loadPresentation':
            $('.pagen').val('1');
            currentSlide = 1;
            loadPresentationInaction(data.url,data.totalpages);
            break;
        case 'removePresentation':
            removepresentationInAction();
            controlContentCloseButton()
            break;
        case 'presentationSWitch':
            if (currentPresentation != data.url) {
                loadPresentationInaction(data.url,data.totalpages);
            }
            gotToPage(data.page)
            break;
        case 'onZoom':
            onZoom(data.percentage);
        break;
        case 'onMoveSlide':
            data.x = (data.x/data.px) * $(".slide-parent").width();
            data.y = (data.y/data.py) * $(".slide-parent").height();
            $(".slide-parent").scrollTop(data.x);
            $(".slide-parent").scrollLeft(data.y);
            let topToChange = (data.x/$(".slide-parent").height()) * $("#whiteboard").height();
            let leftToChange = (data.y/$(".slide-parent").width()) * $("#whiteboard").width();
            $("#whiteboard").scrollTop(topToChange);
            $("#whiteboard").scrollLeft(leftToChange);
        break;
        
        case 'removeyoutube':
            removeYoutube();
            controlContentCloseButton()
            break;
        case 'youtubePlayOrSeek':
            youTubeSyncLock = true;
            player.seekTo(parseInt(data.time), true);
            player.playVideo();
            releaseYoutubeSyncLock();
            break;
        case 'youtubePause':
            youTubeSyncLock = true;
            player.pauseVideo();
            releaseYoutubeSyncLock();
            break;
        case 'conferenceModeSwitch':
            conferenceMode = data.conferenceMode;
            if (conferenceMode) {
                switchToConference();
                //removeYoutube();
            } else {
                resetConference();
            }

            break;
        case 'whiteboardData':
            let wbShapeArray = recalculateCoordinate(data.wbData) 
            if(data.fullBoard){
                delete whiteboardArray[whiteboardPageIndex] ;
                clearBoard();
            }
            let fullData = getFullWbDataFromLastShape(wbShapeArray);
            if (data.clearAll == 1) {
                fullData.shapes = [];
                delete whiteboardArray[whiteboardPageIndex];
            }else{
                whiteboardArray[whiteboardPageIndex] = fullData;
            }
            loadWhiteboardData();
            break;
        case 'chat':
            data.me = false;
            if (data.receiver == 'public') {
                putChatOnDict(data, 'public')
                loadChat(data)
            } else {
                if (data.receiver == userId) {
                    putChatOnDict(data, data.sender)
                    if (data.sender == selectedChatUser) {
                        loadChat(data)
                    }
                }
            }
            if (document.getElementById('chat-par-cont').style.display === 'none') {
                $('#showChat > .chat-mgs-dot').show();
                if(!chatSoundMuted){
                    playAudio(.3);
                }
                
            }
            if(data.receiver !== 'public'){
                let playsndd = false;
                if(!$('#pvtabli').hasClass('active')){
                    $('.person-chat > .chat-message-show').show();
                    playsndd = true;
                }
                if(data.sender !== selectedChatUser){
                    console.log('#user-'+data.sender+' > a > div > .chat-message-show')
                    $('.user-'+data.sender+' > a > div > .chat-message-show').show();
                    playsndd = true;
                    
                }
                if(playsndd){
                    playAudio(.3)
                }
            }

            break;
        
        case 'presentRequest':
            if (mode === 'presenter') {
                showNotification(data.userName + ' has requested to present.', false, 3000)
            }
            break;

        case 'removeUser':
            if (data.sendToId == myClientId) {
                showModal('Message', 'You have been removed by presenter', '<button type="button" class="btn cmn-btn" data-dismiss="modal"> Ok </button>','')
                setTimeout(() => {
                    window.location.href = '/home';
                }, 3000);
            }
            break;
        case 'givePresentingPower':
            if (data.sendToId == myClientId) {
                givePresentingPower();
                showModal('Message', 'Host has given you the permission to present and access to tools.', '<button type="button" class="btn cmn-btn" data-dismiss="modal"> Ok </button>','')
                syncUserList()
                // showTour('Now you can use this controls','bottom','30px','auto','auto','70px','bottomcontrol-tour',10000);
                showTour('Now you can use whitebord tools','left','80px','auto','10px','auto','wbcontrol-tour',10000);
            }
            break;
        case 'revokePresentingPower':
            if (data.sendToId == myClientId) {
                revokePresentingPower();
                showModal('Message', 'Your presenting power has been revoked.', '<button type="button" class="btn cmn-btn" data-dismiss="modal"> Ok </button>','')
            }
            break;



        default:
            break;
    }
}

var sendToAll = (data) => {
    if (mode === 'viewer') {
        if (data.method === 'conferenceModeSwitch') {
            return;
        }
    }
    data.room = room;
    data.username = userName;
    data.clientId = myClientId;
    socket.emit('sendToAll', JSON.stringify(data))
}

var joinUserMeeting = () => {
    if (connected && apiResponded) {
        joinUser = true;
        let data = {};
        data.room = room;
        data.userId = userId;
        data.mode = mode;
        data.recorder = recorder;
        socket.emit('join', JSON.stringify(data))
        setTimeout(executeAfterSocketJoin, 2000);
    }
}
var syncUserList = () => {
    if (connected === true && apiResponded && allowed) {
        let data = {};
        data.room = room;
        data.userId = userId;
        data.clientId = myClientId;
        data.userName = userName;
        data.mode = mode;
        data.avatar = avatar;
        data.camEnabled = camEnabled;
        data.micEnabled = micEnabled;
        data.recorder = recorder;
        data.havePower = havePower;
        data.myCamAllowed = myCamAllowed;
        data.myMicAllowed = myMicAllowed;
        if(mode === 'presenter'){
            data.time = meetingTime;
            data.meetingStatus = meetingStatus;
            data.totalDuration = totalDuration;
           // data.meetingState = {conferenceMode:conferenceMode};
        }
        data.mp4CurrentTime = document.getElementById('mp4Video').currentTime;
        data.youtubeCurrentTime = 0;
        if(player){
            data.youtubeCurrentTime = player.getCurrentTime();
        }
        
        socket.emit('syncUserList', JSON.stringify(data));
    }
}
setInterval(syncUserList, 5000);

var executeAfterSocketJoin = () =>{
    // alert(currentDurationFromApi+'//'+meetingTime)
        if(currentDurationFromApi > meetingTime){
            meetingTime = currentDurationFromApi;
            meetingStatus = currentStatusFromApi;
        }
        changeMeetingBasedOnStatus(meetingStatus)
}
var changeMeetingBasedOnStatus = (data) =>{
    initialDataLoaded = true;
    if (data === 'started') {
        if (mode === 'presenter') {
            $('#continue-btn').removeClass('disabled')
            $('.waithost').hide();
            $('#continue-btn').removeAttr('title')
            startMeeting();
        } else {
            $('.waithost').hide();
        }
        hideHostPanelMessage();
        meetingStartUi();
        if(!meetingTimeOver){
            $('#host-wait-modal').hide();
        }

    } else if (data === 'paused') {
        if(!extendNotificationActive && !meetingTimeOver){
            if(mode === 'presenter'){
                showHostPanelMessage(eventType+' is in paused state, Please resume once you start your presentation');
            }else{
                showHostPanelMessage('Host paused the '+eventType+', Please wait until host resumes');
            }
        }
        if(mode === 'presenter'){
            $('#meeting-started-block').removeClass('hide')
            $('#meeting-stoped-block').addClass('hide')
        }
        meetingPauseUi();
    }else if(data === 'ended'){
        if(mode === 'presenter'){
            showHostPanelMessage(eventType+' has been already ended, please schedule a new one');
        }else{
            showHostPanelMessage('This '+eventType+' has been ended, you will be exited from this page soon');
        }
        setTimeout(() => {
            window.location.href = '/home';
        }, 3000)
    }else{
        if(mode === 'presenter'){
            showTour('Click play button to start meeting','top','90px','auto','75px','auto','startmeeting-tour',false)

            showHostPanelMessage(eventType+' not started yet, Click play button on the left to start timer.');
        }else{
            showHostPanelMessage(eventType+' not started yet, Please wait host will start soon');
        }
        meetingPauseUi();
    }
    updateTimerDisplay();
}
var processInitialData = (key, data) => {
    switch (key) {
        case 'serverWhiteboardArray':
            if(data){
              let wbdataFullArray = data.wbData;
               for(let ind in wbdataFullArray){
                   if(wbdataFullArray[ind]){
                      
                     let wbShapeArray = recalculateCoordinate(wbdataFullArray[ind]) 
                     let fullData = getFullWbDataOnIntialLoad(wbShapeArray);
                     whiteboardArray[ind] = fullData;
                   }
               }
               setTimeout(loadWhiteboardData,2000);
            }
        break;
        case 'recording':
            if(data){
                recordingStarted = true;
                recordId = data;
                showNotification("Recording is on progress", false, 3000);
                if(mode === 'presenter'){
                    $('.recon').show();
                    $('.recoff').hide();
                }else{
                    $('#rec-indi').show();
                }
                $('.recording-top-btn').addClass('playing-recording');
            }
        break;
        case 'currentPresentation':
            loadPresentationInaction(data.url,data.totalpages)
            gotToPage(data.currentPage);
            setTimeout(onZoom,1000,data.percentage)
            zoomVal = 1 * (data.percentage/100);
            parseFloat(zoomVal.toFixed(2))
            if(mode === 'presenter'){
                $('.content-close-btn').show();
            }
            break;
            
        case 'currentVideo':
            loadVideoInaction(data.url);
            setTimeout((data) => {
                if(data.state === 'pause'){
                    document.getElementById('mp4Video').pause();
                }
                if(parseInt(data.time) > 0){
                    document.getElementById('mp4Video').currentTime = parseInt(data.time)
                }
            }, 1000,data);
        break;
        case 'currentYoutube':
            if (player) {
                player.loadVideoById(data.id);
                $('#youtube-share').show();
                player.playVideo();
                removeVideo();
                currentContenBlock = 'youtube';
                $('.y-share').addClass('active-menu');
            }
            hideLoader();
            $('#right-cam-parent').removeClass('shw-rside');
            currentContenBlock = 'youtube';
            resetConference();
            if(mode == 'presenter' || havePower){
                $('.content-close-btn').show();
            }
            setTimeout((data) => {
                if(data.time){
                    if(player){
                        player.seekTo(parseInt(data.time), true);
                    }
                }
                if(data.paused){
                    if(player){
                        player.pauseVideo();
                    }
                }
            }, 1000,data);
            break;
        case 'meetingStatus':
            changeMeetingBasedOnStatus(data);
            break;
        case 'time':
        
            if (window.location.href.indexOf('localhost') === -1) {
                meetingTime = data;
                updateTimerDisplay();
            }
            break;
        case 'roomProperty':
            //alert(JSON.stringify(data))
            roomProperty = data;
            break;
        case 'conferenceMode':
            conferenceMode = data;
            if(conferenceMode){
                setTimeout(switchToConference,5000);
            }
            
        break;
        default:
            break;
    }
}
 /*                        AVNIK.COM
 *********************************************************
 * @licstart  The following is the entire license notice for the
 * code in this page.
 *
 * Copyright (C) 2021  Avnik
 *
 The code in this page is not free, taking this code and altering for any other project is legally not allowed
 *
 * @licend
 * Build 31 jan 2022
 */
 var generateUUID = () => {
    var uuid = (Math.floor(Math.random() * 100000000) + 100000000).toString().substring(1);
    uuid = '1' + uuid;
    return uuid;
}
let testingLive = false;

let room = 'FS';
let userName = 'Guest';
let userId = '0';
let mode = 'viewer';
let havePower = false;
let validation = '';
let eventDateTime = false;
let eventType = 'meeting';
let allowed = false;
let chatSoundMuted = false;

let avatar = '';
let selectedChatUser = 'public';
let chatDictionary = {};
let lastChatedUser;
let lastChatId;
let lastChatedTab;
let firstTimePublish = true;
let player;
let currentVideoId;
let youtubeIdClientIdMap = {};
let currentPresentation;
let currentVideo;
let recorderId;
let hostId;
let recordingStarted = false;
let meetingStarted = false;
let meetingStatus = false;
let meetingTime = 0;

let camEnabled = true;
let micEnabled = true;;
let captionEnabled = true;
let videoPresent = false;
let audioPresent = false;
let camAvailable = false;
let micAvailable = false;
let selectedCamera = false;
let selectedMic = false;
let allowNotification = true;
let mixedStreamId;
let subscriptionForMixedStream;
let currentContenBlock = '';
let docFiles = ['doc', 'docx', 'xls', 'ppt', 'pptx'];
let images = ['jpeg', 'png', 'jpg'];
let videos = ['mp4', 'webm', 'mpeg'];
let startedTranslation = false;
let accessToken;
let apiResponded = false;
let presentationHtml = '';
let youtubeHtml = '';
let hostAvailable = false;
let roomProperty = {
    cameraOffAllFlag: false,
    micOffAllFlag: false,
    userCamStatus: {},
    userMicStatus: {},
    isPrivateMeetEnabled: false
};
let videoOffArray = [];
let speaktimeout = {};
let privateUsers = {};
let subscirptionLocal = {};
let skipLoader = false;
let spakeingSendBlock = false;
let allowCamMicForViewer = false;
let appType = 'meeting';
let userListType = 'grid';
let eventId = '';;
let slotId = '';
let myCamAllowed = true;
let myMicAllowed = true;
let commonCounter = 0;
let disconnected = false
let mediaServerDisconnected = false;
const APP_TYPE = {WEBINAR:'Webinar',MEETING:'Group',TRAINING:'Class',APPOINTMENT:'Appointments'}
let lastPingtime = false;
let totalDuration = 3600 * 8;
let paymentStatus = false;
let amountToPay = 0;
let extendNotificationActive = false;
let initialPaymentRequired = false;
let extendedDurationId = false;
let forceStopcam = false;
let forceStopmic = false;
let currentSlide = 1;
let currentTotalSlides = 1;
let zoomVal = 1;
let maxZoom = 4;

let mouseDownBoardX = false;
let mouseDownBoardY = false;
let selectedTool = {};
let micIndicationFound = false;
let hostNotAvailbeDuration = 0;
let streamObjectMap = {};
//let extendByMeArray = [{time: 1800,cost: 5}, {time: 3600,cost: 8}];
let extendByMeArray = [{time: 60,cost: 5}, {time: 90,cost: 8}];
let extendType = 'extendYou';
let extendedSeconds = 0;
let starRating = 0;
let tipPaymentStatus = false;

//  mic indicator
var audioContext = null;
var source = null;
var analyser = null;
var scriptNode = null;
var micActivityLock = false;
var sessionKey = '_cu';
var tokenKey   = '_tk';
var pracId = 0;
var eventBookingId = 0;
var reviewProcessStarted = false;
var meetingTimeOver = false;
var initialConnection = false;
var quickMeet = false;
var mp4SyncLocked = false;
var youTubeSyncLock = false;



/**
 * current data from api
 */
let currentDurationFromApi = 0;
let currentStatusFromApi = false;
//localStorage.setItem('userData',JSON.stringify({name:"deepak yadav",id:"1"}))
if(appName === 'Avnik'){
    sessionKey = 'userData';
    tokenKey   = 'accessToken';
}
if (localStorage.getItem(sessionKey) && !dev) {
    let userSession = localStorage.getItem(sessionKey);
    accessToken = localStorage.getItem(tokenKey);
    userSession = JSON.parse(userSession)
    userName = userSession.name;
    userId = userSession.id.toString();
} else {
    if (!dev && !testingLive) {
        let redirectParam = {};
        redirectParam.url = window.location.href;
        redirectParam.time = new Date();
        localStorage.setItem('redirectUrl',JSON.stringify(redirectParam));
        window.location.href = '/login';
    }
    if(testingLive){
        console.log('Local data = '+localStorage.getItem(sessionKey))
    }
}

if (getParameterByName('rm')) {
    roomSlotId = getParameterByName('rm')
    if (dev) {
        room = getParameterByName('rm');
    }
    let inviteLink = window.location.href.split('/join/');
    if(dev){
        inviteLink = inviteLink[0] + '/join/?rm=' + roomSlotId+'&mode=viewer&dev=1';
    }else{
        inviteLink = inviteLink[0] + '/join/?rm=' + roomSlotId;
    }
    $('#inviteLink').val(inviteLink);

} else {
    validation += 'room ';
}
if (getParameterByName('mode')) {
    mode = getParameterByName('mode');
    userName = getParameterByName('mode');
    userId = generateUUID();
    if (mode === 'viewer') {
        userName = 'User ' + (generateUUID().substr(0, 4));
    }
    if (getParameterByName('name')) {
        userName = getParameterByName('name');
    }

}


if (recorder) {
    userName = "recorder13453";
    mode = "viewer";
    userId = generateUUID();
    recorderId = getParameterByName('recordId')
    hostId = getParameterByName('userId')
    allowed = true;
    function startTabCapture() {
        try{
            chrome.runtime.sendMessage('odhdihnmellgigiofejepeogbengofib', {
                actionName: 'start',
                presentationID: recorderId,
                accountToken: recorderId,
                options: {}
            }, function(resp) {

            });
        }catch(e){
            
        }
    }
} else {
    if (validation) {
        alert('INVALID URL FOLLOWING PARAMETERS NOT FOUND ' + validation)
    }
}

let myClientId = generateUUID(); // id generated for identify this browser client
let conference;
let shareScreen = false;
let mediaStream;
let localStream;
let publicationGlobal;

//screen
let localScreenStream;
let screenMediaStream;
let publicationGlobalScreen;
let screenShareEnable = false;
let screenSubscirptionLocal;
//whiteboard
let lc;
let whiteboardArray = [];
let whiteboardPageIndex = 0;
let serverWhiteboardArray = {};
// ice server for establishing webrtc connection
var conf = {
    rtcConfiguration: {
        iceServers: [{
            urls: "stun:meet.avnik.com:3478"
        }, {
            urls: ["turn:meet.avnik.com:3478?transport=udp"],
            credential: "turn",
            username: "turn"
        }]
    }
};
let initAlready = false;
var translator;
let lastname = '';
loadAppConfiguraiton = () =>{
    document.title = appName;
    $('.app-logo').attr('src',APP_LOGO);
    $('#ppt-form').attr('action',DOMAIN+'/upload');
    $('#mp4-form').attr('action',DOMAIN+'/upload-file');
    $('#whiteboard-image').attr('action',DOMAIN+'/upload-file');
    $('#chat-file-form').attr('action',DOMAIN+'/upload-file');
    switch (appName) {
        case 'Liberate':
            document.querySelector("link[rel~='icon']").href = 'images/favicon.png';
        break;
        case 'Avnik':
            document.querySelector("link[rel~='icon']").href = 'images/favicon-avnik.png';
        break;
        default:

        break;
    }

    
}
$(document).ready(() => {
    onDomListeners();
    loadAppConfiguraiton();
   //   showTour('Now you can use this controls','bottom','30px','auto','auto','40px','test-tour',60000);
    // $('#on-cost-request-btn').modal('show')
    // $('#welcome-loader').hide();
    
    for(let i=0;i<=12;i++){
        $('#hours-ext').append('<option value="'+i+'">'+(i < 10 ? ('0'+i):i)+' hrs</option>');
    }
    for(let j = 0; j <= 60 ; j=j+5){
        $('#miutes-ext').append('<option value="'+j+'">'+(j < 10 ? ('0'+j):j)+' min</option>');
    }
    for(let k in extendByMeArray){
        let formated = secondsToDhms(parseInt(extendByMeArray[k].time));
        let extT = '00 Hrs 00 Min';
        if(!formated[1]){
            extT = formated[2]+' Min'; 
        }else{
            if(!formated[2]){
                extT = formated[1]+' Hrs';
            }else{
                extT = formated[1]+' Hrs '+formated[2]+' Min';
            }
        }
        $('#extByMeSelect').append('<option value="'+extendByMeArray[k].time+'_'+extendByMeArray[k].cost+'">$'+extendByMeArray[k].cost+' for '+extT+'</option>');
    }
    // return;
    setInterval(commonTimer, 1000);
    if (userName == 'Guest') {
        hideLoader();
        showModal("Enter Your Name", "<input id='userNameInp' maxlength='30' class='y-input enter-name-input' placeholder='Enter your name..' />", '<button onclick="onEnterName()"  type="button" class="ladda-button animate-btn zoom-out"><span class="label">Continue</span> <span class="spinner"></span></button>','');
    } else {
        authenticate();
    }
    if (recorder) {
        $('.host-vide').html('<video class="av2bg" id="host-video" autoplay></video>');
        setTimeout(startTabCapture, 3000);
    }
    $('#grpuchata').trigger('click')

    document.addEventListener('fullscreenchange', exitHandler);
    document.addEventListener('webkitfullscreenchange', exitHandler);
    document.addEventListener('mozfullscreenchange', exitHandler);
    document.addEventListener('MSFullscreenChange', exitHandler);
    
    $('#whiteboard').mouseenter(function(e) {
        if(selectedTool.name === 'select'){
            if(document.getElementById('presentation').style.display !== 'none'){
                $('#whiteboard').addClass('grab')
            }
           
        }
    });
    $('#whiteboard').mouseleave(function(e) {
        if(selectedTool.name === 'select'){
            $('#whiteboard').removeClass('grab')
        }
    });
    $('#whiteboard').mousedown(function(e) {
        $(this).data('mousedown', true);
        mouseDownBoardX = e.pageX;
        mouseDownBoardY = e.pageY;
    });
    $('#whiteboard').mouseup(function() {
        $(this).data('mousedown', false);
        mouseDownBoardX = false;
        mouseDownBoardY = false;
    });

    $('#whiteboard').mousemove(function(e) {
        if($(this).data('mousedown') && selectedTool.name === 'select' && currentContenBlock == 'presentation') {

            let xChange = mouseDownBoardX - e.pageX;
            xChange = xChange * .05;
            let yChange = mouseDownBoardY - e.pageY;
            yChange = yChange * .05;
            var YValueChangedInSlide = $(".slide-parent").scrollTop() + yChange;
            var XValueChangedInSlide = $(".slide-parent").scrollLeft() + xChange;
            $(".slide-parent").scrollTop($(".slide-parent").scrollTop() + yChange);
            $(".slide-parent").scrollLeft($(".slide-parent").scrollLeft() + xChange);

            if(mode === 'presenter' || havePower){
                sendToAll({
                    method: 'onMoveSlide',
                    x: $(".slide-parent").scrollTop() + yChange,
                    y: $(".slide-parent").scrollLeft() + xChange,
                    px: $(".slide-parent").width(),
                    py:  $(".slide-parent").height()

                });
            }
            //console.log(YValueChangedInSlide)
            let topToChange = (YValueChangedInSlide/$(".slide-parent").height()) * $("#whiteboard").height();
            let leftToChange = (XValueChangedInSlide/$(".slide-parent").width()) * $("#whiteboard").width();
            $("#whiteboard").scrollTop(topToChange);
            $("#whiteboard").scrollLeft(leftToChange);

        }
    });

    if(recorder){
        $('#welcome-loader').hide();
        $('#body').append('<div class="power-label">Powered by Avniksofttech</div>');
    }
    

})
var onDomListeners = () =>{
    $('.whiteboard').click(wbclick)

    $('.whiteboard').mouseup(sendBoard)
    $('.whiteboard').on("touchend",sendBoard);
    $('.click75').click(leaveMeeting);
    
    $('.click74').click(()=>{
        window.location.href = '/home';
    });
    $('.click72').click(releaseCam);
    $('.click71').click(removeContent);
    $('.click70').click(switchOrRestConference);
    $('.click69').click(opensidevidpanel);
    $('.click68').click(onEnlargeUser.bind('tutor-video'));
    $('.click64').click(onAutoAccept);
    $('.click63').click(onClosevideosmallpanel);
    $('.click65').click(chatOpenClicked);
    $('.click62').click(muteOrUnmuteChatSound);
    $('.click61').click(onSelectPublicChat);

    $('.click60').click(onPvTabSelected);
    $('.click59').click(closeChat);
    $('.click58').click(sendChat.bind(this,false));
    $('.click57').click(onBackPvList);
    $('.click56').click(pvFileuplClick);
    $('.click55').click(sendChat.bind(this,false));
    $('.click54').click(toggleWbTools);
    $('.click53').click(showHideShapeDrop);
    $('.click52').click(onUndoBoardClick);
    $('.click51').click(onRdoBoardClick);

    $('.click50').click(saveBoardToLocal);
    $('.click49').click(clearBoardClick);
    $('.click46').click(settingsOpenClk);
    $('.click45').click(sendPresentingRequest);
    $('.click44').click(startMeeting);
    $('.click43').click(startMeeting);
    $('.click42').click(pauseMeeting);
    $('.click41').click(endMeetingClick);
    $('.click40').click(leaveMeeting);

    $('.click39').click(startOrStopRecording);
    $('.click38').click(bottomControlOptionToggle);
    $('.click37').click(startOrStopScreenshare);
    $('.click36').click(onSharePresentation);
    $('.click35').click(onShareYoutube);
    $('.click34').click(onZoomIn);
    $('.click33').click(onZoomOut);
    $('.click32').click(onPrevious);
    $('.click31').click(onNext);
    $('.click30').click(onFullScreen);

    $('.click29').click(enableOrDisableCam);
    $('.click28').click(enableOrDisableMic);
    $('.click27').click(onTurnOnOffAllCam);
    $('.click26').click(onTurnOnOffAllMic);
    $('.click23').click(selectStart.bind(this,1));
    $('.click22').click(selectStart.bind(this,2));
    $('.click21').click(selectStart.bind(this,3));
    $('.click20').click(selectStart.bind(this,4));

    $('.click19').click(selectStart.bind(this,5));
    $('.click18').click(onSubmitReview);
    $('.click17').click(endMeeting);
    $('.click16').click(openExtDurPop);
    $('.click15').click(endMeeting);
    $('.click14').click(sendPaymentRequest);
    $('.click13').click(onPayentPop);
    $('.click12').click(showHideDiv.bind('add-card'));
    $('.click11').click(openExtDurPop);
    $('.click10').click(leaveMeetingWithoutRating);

    $('.click9').click(onPaymentConfirm);
    $('.click8').click(copyInput.bind(this,'inviteLink'));
    $('.click7').click(playSound);
    $('.click6').click(onPaymentConfirm);
    $('.click5').click(openPaymentBeforeStart);
    $('.click4').click(onContinueButtonClicked);
    $('.click3').click(onCamMicChanged);
    $('.click1').click(onBackPvList);
    $('#btnpaysettings').click(onPayentPop);
    $('#notification-dd').click(()=>{

        $('.count-status-dot').hide();
        $('.count-status-dot').html('0')
    })

    

    $('.change1').change(acceptChange)
    $('.change2').change(changeMuteNot)
    $('.change3').change(clickColor)
    $('.change4').change(start)
    $('.change5').change(start)
    $('.change6').change(start)

    $('.keyup1').keyup(onKeyupUserSearch)
    $('.keyup2').keyup(chatInputKeyUp)
    $('.keyup3').keyup(onKeyupUserSearch)
    $('.keyup4').keyup(chatInputKeyUp)



    
    
    
 }
// request permission on page load
document.addEventListener('DOMContentLoaded', function() {
    if (!Notification) {
     //alert('Desktop notifications not available in your browser. Try Chromium.');
     return;
    }
   
    if (Notification.permission !== 'granted')
     Notification.requestPermission();
   });
   
   
var notifyMe = (title,content) => {
    if (Notification) {
        if (Notification.permission !== 'granted')
            Notification.requestPermission();
        else {
            var notification = new Notification(title, {
            icon: 'https://liberate.avniksofttech.com/join/images/logo.svg',
            body: content,
            });
            /*
            notification.onclick = function() {
            window.open('http://stackoverflow.com/a/13328397/1269037');
            };
            */
        }
    }
}
function exitHandler() {
    if (!document.fullscreenElement && !document.webkitIsFullScreen && !document.mozFullScreen && !document.msFullscreenElement) {
        
        $('#exit-fs').addClass('hide')
        $('#enable-fs').removeClass('hide')
    }
} 
let SpeechRecognition;
if (window.SpeechRecognition) {
    SpeechRecognition = window.SpeechRecognition
}
if (window.webkitSpeechRecognition) {
    SpeechRecognition = window.webkitSpeechRecognition
}
if (SpeechRecognition) {

    recognition = new SpeechRecognition()
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US'
}
// translation start here
let startTranslator = () => {
    if (!startedTranslation) {
        handleListen();
        startedTranslation = true;

    }
}

handleListen = () => {
    if (recognition) recognition.stop();
    if (recognition) {
        recognition.start()
        recognition.onend = () => {
            recognition.start()
        }
    }

    if (recognition) {
        recognition.onstart = () => {
            //console.log("Listening!")
        }
        recognition.onresult = event => {
            for (let i = event.resultIndex; i < event.results.length; i++) {
                const transcript = event.results[i][0].transcript;
                if (event.results[i].isFinal) {
                    if (micEnabled) {
                        onCompleteTranscript(transcript)
                    }

                }
            }
        }
        recognition.onerror = event => {
            //console.log("Error occurred in recognition: " + event.error)
        }

    }
}
let onCompleteTranscript = (text) => {
    if (micEnabled) {
        showCaption(text, userName);
        var moduleData = {};
        moduleData.method = 'caption';
        moduleData.text = text;
        moduleData.userName = userName;
        sendToAll(moduleData);
    }
}

var showCaption = (text, name) => {
    if (captionEnabled) {
        let captionText = $('.caption').html();
        if (lastname != name) {
            captionText = captionText + '<p>' + name + ' : ' + text + '</p>';
        } else {
            captionText = captionText + '<p>' + text + '</p>';
        }
        $('.caption').html(captionText);
        $(".caption").scrollTop($(".caption").prop("scrollHeight"));
        $(".caption").show();
        lastname = name
    } else {
        $(".caption").hide();
    }
}
let enableOrDisableCaption = () => {
    if (captionEnabled) {
        captionEnabled = false;
        showNotification("Closed caption disabled succesfully", false, 3000)
        $('.close-caption-tool').removeClass('ptoolactive')
    } else {
        captionEnabled = true;
        showNotification("Closed caption enabled succesfully", false, 3000)
        $('.close-caption-tool').addClass('ptoolactive')
    }
}
let onEnterName = () => {
    if ($('#userNameInp').val()) {
        userName = $('#userNameInp').val();
        $('#myModal').modal('hide')
        authenticate();
    } else {
        $('#userNameInp').addClass('error');
    }


}
const isToday = (someDate) => {
    const today = new Date()
    return someDate.getDate() == today.getDate() &&
        someDate.getMonth() == today.getMonth() &&
        someDate.getFullYear() == today.getFullYear()
}
let authenticate = () => {
    $.ajax({
        url: API_BASE_URL+"meetingRoom",
        headers: {
            'Accept': 'application/json',
            authorization: 'Bearer ' + accessToken
        },
        data: {
            roomId: roomSlotId,
            userId: userId
        },
        method: "POST",
        success: function(d) {
            //alert(JSON.stringify(d))
            processAuthenticationData(d)
        },
        error: function(error) {
            //alert(JSON.stringify(error))
            // startTranslator();
            if (dev) {
                apiResponded = true;
                joinUserMeeting();
                if (mode === 'presenter') {
                    camEnabled = true;
                    micEnabled = true;
                } else {
                    if(eventType === APP_TYPE.WEBINAR){
                        camEnabled = false;
                        micEnabled = false;
                    }else{
                        camEnabled = true;
                        micEnabled = true;
                    }
                    if(recorder){
                        camEnabled = false;
                        micEnabled = false;
                    }
                    //$('#on-cost-payment-btn').modal('show')
                   // $('#welcome-loader').hide();
                     
                    //generateWelcomeScreen();
                }
                if(getOS() === 'Android' || true){
                    //camEnabled = false;
                    //micEnabled = false;
                }
                generateSettingsPopup()
                changeAppBasedOnAppTime(APP_TYPE.MEETING);
                setViewBasedOnMode(mode)
                initializeApp();
                changeAppBasedOnAppTime(APP_TYPE.MEETING);
                
            } else {

                if(error.message){
                    showModal('Message', error.message,'','')
                }else{
                    showModal('Un Authorized', 'You are not authorized to enter this meeting','<button onclick="redirectToHome()" data-dismiss="modal" type="button" class="btn .cmn-btn">Exit</button>','')
                }
                
                $('#welcome-loader').hide();
                /*
                setTimeout(() => {
                    if(!testingLive){
                         window.location.href = '/home';
                    }
                }, 3000);
                */
            }


        }
    });

}

let redirectToHome = () =>{
    window.location.href = '/home';
}

// webinar meet training appointment
let changeAppBasedOnAppTime = (type) =>{
    appType = type;
    switch (type) {
        case APP_TYPE.WEBINAR:
            $('.camera-all-on-off-tool').remove();
            $('.all-mic-on-off-tool').remove();
            if(mode === 'viewer'){
                camEnabled = false;
                micEnabled = false;
                $('.camera-on-off-tool').remove();
                $('.mic-on-off-tool').remove();
                $('.left-share-toos').remove();
            }
            userListType = 'list';
            break;
        case APP_TYPE.MEETING:
            allowCamMicForViewer = true;
        break;
        case APP_TYPE.TRAINING:
            allowCamMicForViewer = true;
        break;
        case APP_TYPE.APPOINTMENT:
            $('.invite-btn').remove();
            allowCamMicForViewer = true;
            $('.camera-all-on-off-tool').remove();
            $('.all-mic-on-off-tool').remove();
            $('.camera-on-off-tool').removeClass('disableclick')
            $('.camera-on-off-tool').removeClass('hide-viewer')
            $('.mic-on-off-tool').removeClass('disableclick')
            $('.mic-on-off-tool').removeClass('hide-viewer')
    
        break;

    
        default:
            break;
    }
}
let openPaymentBeforeStart = () =>{
    //$('#host-info-btn').hide();
    $('#paymentleave').show();
    $('#on-cost-payment-btn').modal({backdrop:'static',keyboard:false})
}
let processAuthenticationData = (result) => {
    if (result.status === 200) {
        apiResponded = true;
        joinUserMeeting();
        roomData = result.data
        room = roomData.meetingRoomId;
        if(!dev){
            mode = roomData.mode;
        }
        

        if (mode === 'presenter') {
            camEnabled = true;
            micEnabled = true;
        } else {
            if(eventType === APP_TYPE.WEBINAR){
                camEnabled = false;
                micEnabled = false;
            }else{
                camEnabled = true;
                micEnabled = true;
            }
        }
        generateSettingsPopup()
        if(roomData.eventCreatedUser){
            pracId = roomData.eventCreatedUser.id;
        }
        eventBookingId = roomData.eventBookingId;
        if(roomData.quickMeet === true){
               quickMeet = true;
               roomData.eventType = 'meet'
               $('#info-but-btn').remove();
               totalDuration = 3600*24;
               if(roomData.eventTimeSlot){
                slotId   =  roomData.eventTimeSlot.id;
                eventId  =  roomData.eventTimeSlot.eventId;
                currentStatusFromApi = roomData.eventTimeSlot.currentStatus;
                currentDurationFromApi = roomData.eventTimeSlot.currentDuration;
               }
               $('.on-cost-request-tool').remove();
          }else{
                $('#event_desc').html(roomData.eventDescription);
                $('#event_category').html(roomData.eventCategory+' / '+roomData.eventSubCategory);
                $('#event_duration').html(toHHMMSS(roomData.eventTimeSlot.duration*60 +':00'));
                $('#event-start-time').html(' ' +  new Date(roomData.eventTimeSlot.startDateTime.replace(' ', 'T')).toLocaleDateString('en-US', {weekday: 'short', day: 'numeric', month: 'short', year: 'numeric'})+' @ '+ new Date(roomData.eventTimeSlot.startDateTime.replace(' ', 'T')).toLocaleTimeString('en-US', {hour: 'numeric', minute: '2-digit', hour12: true})  + ' ');
                $('#rem-seat').html(' ' + roomData.eventTimeSlot.totalSeats + ' ');
                $('#tot-seat').html(' ' + parseInt(roomData.eventTimeSlot.totalSeats) - parseInt(roomData.eventTimeSlot.bookedSeats) + ' ');
                $('#cost').html(roomData.eventTimeSlot.cost>0?`$${roomData.eventTimeSlot.cost} /hour`:"Free");
                $('#event-type').html(roomData.eventType);
                $('#avg_rating').html(roomData.eventCreatedUser.avgRating);

                totalDuration =  parseInt(hmsToSecondsOnly(roomData.eventTimeSlot.duration+':00'));
                if(roomData.extendedDuration){
                    let extendedDuration = parseInt(roomData.extendedDuration);
                    totalDuration = totalDuration + extendedDuration;
                    $('.extendtme').html(toHHMM(extendedDuration));
                }
                
                // alert(totalDuration)
                roomData.eventType = roomData.eventType === 'meet' ? 'meeting':roomData.eventType;
                changeAppBasedOnAppTime(roomData.eventType.toLowerCase());
                

                let dt = roomData.eventTimeSlot.startDate;
                let split = dt.split('-');
                dt = split[1] + '-' + split[0] + '-' + split[2] + ' ' + roomData.eventTimeSlot.startTime
                eventDateTime = new Date(dt)
                if (isToday(eventDateTime)) {
                    $('#date-today').html(' Today @ ' + roomData.eventTimeSlot.startTime + ' ');
                } else {
                    $('#date-today').html(' ' + eventDateTime.toLocaleString('default', {
                        month: 'short'
                    }) + ' @ ' + roomData.eventTimeSlot.startTime + ' ');
                }
                slotId   =  roomData.eventTimeSlot.id;
                eventId  =  roomData.eventTimeSlot.eventId;
                
                currentStatusFromApi = roomData.eventTimeSlot.currentStatus;
                currentDurationFromApi = roomData.eventTimeSlot.currentDuration;
                if (roomData.eventImages.length > 0) {
                    $('#event-img').attr('src', roomData.eventImages[0].fileUrl)
                }
                if(roomData.eventCreatedUser.profile?.profile_picture){
                    $('#user_profile').attr('src', roomData.eventCreatedUser.profile?.profile_picture)
                }
                $('#creater').html(roomData.eventCreatedUser.name)
                if(roomData.extendedDurationId && mode !== 'presenter'){
                    extendedDurationId = roomData.extendedDurationId;
                }
                if((parseInt(roomData.remainingCost) > 0 || roomData.booked === false) && roomData.mode !== 'presenter'){
                        initialPaymentRequired = true;
                        $('#settings-but-btn').hide();
                        selectSettingsTab('info');
                        amountToPay = roomData.remainingCost;
                        //$('#host-info-btn').modal('hide');
                        //openPaymentBeforeStart();
                        $('.total-amount-pay').html(amountToPay);
                        paymentStatus = 'waiting';
                        extendNotificationActive = true;
                        initStripe();
                        showHostPanelMessage('You are not yet payed for this '+eventType+'.Please pay and continue' );
                        $('#pay-mod-close').remove();
                        $('#continue-btn').remove();
                        $('#continue-btn-after').remove();
                        /**added for avnik */
                        if(amountToPay === 0 && roomData.booked === false){
                        
                            document.getElementById('event-not-booked').style.display = 'block';
                            document.getElementById('btnbooksettings').style.display ='block';
                        }else{
                            document.getElementById('btnpaysettings').style.display ='block';
                            if(!extendedDurationId){
                                if(parseInt(currentDurationFromApi) > 0){
                                    document.getElementById('normal-event-already-start').style.display = 'block';
                                    $('.completed-time').html(toHHMM(parseInt(currentDurationFromApi)));
                                    $('.total-time').html(toHHMM(parseInt(totalDuration)));
                                }else{
                                    document.getElementById('normal-event-not').style.display = 'block';
                                }
                                
                            }else{
                                if(currentStatusFromApi === 'paused'){
                                    document.getElementById('extended-event-not').style.display = 'block';
                                    $('.completed-time').html(toHHMM(parseInt(currentDurationFromApi)));
                                    $('.total-time').html(toHHMM(parseInt(totalDuration)));
                                }else{
                                    document.getElementById('extend-event-already-start').style.display = 'block';
                                    $('.completed-time').html(toHHMM(parseInt(currentDurationFromApi)));
                                    $('.total-time').html(toHHMM(parseInt(totalDuration)));
                                    
                                    
                                }
                            }
                        }
                        connectToSocket();
                         /**added for avnik end*/
                        return;
                }
        }
        setViewBasedOnMode(mode)
        changeAppBasedOnAppTime(roomData.eventType.toLowerCase());
        initializeApp();
        updateTimerDisplay();
    } else {
        showModal('Message', result.message,'','')
        $('#welcome-loader').hide();

        setTimeout(() => {
            if(!testingLive){
                  window.location.href = '/home';
            }
        }, 3000);
    }
}
let initializeApp = () => {
    if (initAlready) {
        return;
    }
    initAlready = true;
    conference = new Owt.Conference.ConferenceClient(conf);
    loadWhiteboard();
    initWbImageUpload();
    initChatFileUpload();
    initPresentationUpload();
    initVideoUpload();
    connectToSocket();
    if (mode == 'presenter') {
        avatar = '../join/images/av1.jpeg';
    } else {
        avatar = '../join/images/av1.jpeg';
    }
    layouContainer();
}
var endMeetingClick = () =>{
    $('#closeEndPop').show();
    $('#end-pop-head').html('Do you want to end now ?');
    $('#end-pop-content').html('');
    $('#normalEnd').show();
    $('#durationover').hide();
    $('#closeEndPop').show();
    $('#end-meeting-btn').modal({
        backdrop:'static',
        keyboard:false
    })
}
var endMeeting = () => {
    meetingStatus = 'Ended';
    let data = {
        method: 'meetingStatus',
        clientId: myClientId,
        status: meetingStatus,
        time: meetingTime
    };
    sendToAll(data);
    updateCurrentMeetingStauts();
    //showModal("<b>Welcome</b>", "<h4>"+eventType+" has been ended successfully.</h4>", '','');
    setTimeout(() => {
            window.location.href = '/home';
           onReconnect();
    }, 2000);
    showHostPanelMessage('Session has ended');
    showNotification(eventType+' has ended successfully.')
    if(recordingStarted){
        stopRecording();
    }
/*
    $('#review-tips-popup').modal({
        backdrop: 'static',
        keyboard: false
    })
    */
    
}
onSubmitReview = () =>{
    if(starRating !== 0){
        reviewProcessStarted = true;
        let tipAmount = $('input[name="tipamount"]:checked').val();
        amountToPay = tipAmount;
        if(tipAmount > 0){
            $('.payment-desc').html('Make a payment of $'+tipAmount+' as a tip')
            tipPaymentStatus = 'progress';
            $('.total-amount-pay').html(tipAmount);
            $('#review-tips-popup').modal('hide');
            onPayentPop();
        }else{
            saveReviewApi();
        }
        
    }else{
        showNotification('Ratting and feedback requred before leaving the '+eventType,true,3000)
    }
    
}
var saveReviewApi = () =>{
    showLoader()
    $.ajax({
        url: API_BASE_URL+"submitReview",
        headers: {
            'Accept': 'application/json',
            authorization: 'Bearer ' + accessToken
        },
        data: {
             prac_id: pracId,
             tip: amountToPay,
             rating: starRating,
             comment:$('#review-comment').val(),
             booking_id:eventBookingId,
             tip_stripe_id:currentPaymentToken
             
        },
        method: "PUT",
        success: function(result) {
            if (result.status === 200) {
                showNotification(result.message,false,3000)
                setTimeout(() => {
                    window.location.href = '/home';
                }, 3000);

            }else{
                showNotification(result.message,true,3000)
                hideLoader();
            }
        },
        error: function(){
            showNotification('Review api is not developed on avnik, unable to save review',true,3000);
            setTimeout(() => {
                window.location.href = '/home';
            }, 3000)
        }
    });
}
var showEndOrExtendPop = () =>{
    $('#end-pop-head').html('Do you want to extend this session ?');
    $('#end-pop-content').html('The duration for this session has been ended, Please extend the duration or end the '+eventType);
    $('#normalEnd').hide();
    $('#durationover').show();
    $('#closeEndPop').hide();
    $('#end-meeting-btn').modal({
        backdrop:'static',
        keyboard:false
    })
}
var startMeeting = () => {
    if(meetingTime >= totalDuration){
        if(mode === 'presenter'){
            showNotification(eventType+' duration has been ended, Please stop or extend the session.',true,3000);
        }
        showEndOrExtendPop()
        return;
    }
    meetingStatus   = 'started';
    meetingTimeOver = false
    meetingStartUi();
    if (mode === 'presenter') {
        $('#meeting-started-block').removeClass('hide')
        $('#meeting-stoped-block').addClass('hide')
        let data = {
            method: 'meetingStatus',
            clientId: myClientId,
            status: meetingStatus,
            time: meetingTime
        };
        sendToAll(data);
        hideHostPanelMessage();
        autoStartMicAndCam();
        
        $('.startmeeting-tour').hide();
    }
    updateCurrentMeetingStauts();
    
}
var meetingStartUi = () =>{
    $('#pausebtn').removeClass('hide')
    $('#playbtn').addClass('hide')
}
var meetingPauseUi = () =>{
    $('#pausebtn').addClass('hide')
    $('#playbtn').removeClass('hide')
}
var pauseMeetingInAction = ()=>{
        forceStopPublishing();
        if(recordingStarted && mode === 'presenter'){
            stopRecording();
        }
        updateCurrentMeetingStauts();
}
var forceStopPublishing = ()=>{
        if(camEnabled && micEnabled){
            micEnabled = false;
            camEnabled = false;
            disableMicUi();
            disableCamUi();
            forceStopcam = true;
            forceStopmic = true;
            publishStream();
        }else if (camEnabled) {
            camEnabled = false;
            disableCam();
            forceStopcam = true;
        }else if (micEnabled) {
            micEnabled = false;
            disableMic();
            forceStopmic = true;
        }
}
var pauseMeeting = () => {
    if (mode === 'presenter') {
        let data = {
            method: 'meetingStatus',
            clientId: myClientId,
            status: 'paused',
            time: meetingTime
        };
        sendToAll(data);
        showHostPanelMessage('Session is in paused state, Please resume once you start your presentation');
        pauseMeetingInAction();
    }
    meetingStatus = 'paused';
    meetingPauseUi();
}
var onKeyupUserSearch = () => {
    $("#userList li").each(function() {
        if($(this).data('name')){
            if ($(this).data('name').indexOf($('#user-search').val()) > -1) {
                $(this).show();
            } else {
                $(this).hide();
            }
        }
        if ($('#user-search').val() == '') {
            $(this).show();
        }
    })
}
secondsToDhms = (seconds) => {
    seconds = Number(seconds);
    var d = Math.floor(seconds / (3600 * 24));
    var h = Math.floor(seconds % (3600 * 24) / 3600);
    var m = Math.floor(seconds % 3600 / 60);
    var s = Math.floor(seconds % 60);

    var dDisplay = d > 0 ? d + (d == 1 ? "" : "") : "";
    var hDisplay = h > 0 ? h + (h == 1 ? "" : "") : "";
    var mDisplay = m > 0 ? m + (m == 1 ? "" : "") : "";
    var sDisplay = s > 0 ? s + (s == 1 ? "" : "") : "";
    return [dDisplay, hDisplay, mDisplay, sDisplay]
}
var saveRecordingEntry = (recordId) =>{
    $.ajax({
        url: API_BASE_URL+"saveRecordings",
        headers: {
            'Accept': 'application/json'
        },
        data: {
            roomId: room,
            fileName: recordId,
            userId:hostId
        },
        method: "POST",
        success: function(d) {
            //alert('Recording Saved Successfully')
            // showNotification('Blocked successfully', false, 3000)
        },
        error: function(error) {
            //alert('unable to save recording at this time')
            // showNotification('Unable to block at this time', true, 3000)
        }
    });
}
var updateTimerDisplay = () =>{
    $('.timer-bx').html(toHHMMSS((totalDuration - meetingTime) < 0 ? 0 : (totalDuration - meetingTime)))
}
var commonTimer = () => {
    commonCounter++;
    if(commonCounter % 15 === 0){
        updateCurrentMeetingStauts();
        if(hostAvailable){
            hostNotAvailbeDuration = 0;
        }else{
            hostNotAvailbeDuration = hostNotAvailbeDuration+15;
            if(hostNotAvailbeDuration >= 15){
                if(recorder == true){
                    // alert('sending stop recording='+recorderId+'//'+room)
                    let data = {};
                    data.recordId = recorderId;
                    data.room = room;
                    socket.emit('stopRecording', JSON.stringify(data));
                }else{
                    if(mode !== 'presenter' && !initialPaymentRequired){
                        if(meetingStatus === 'started'){
                            pauseMeetingInAction();
                            meetingStatus = 'paused'
                        }
                       showNotification('Host not available in the session',true,3000);
                    }
                }
            }
        }
    }
    if (meetingStatus == 'started') {
        if(allowed){
            //if(mode === 'presenter'){
             meetingTime++;
             updateTimerDisplay();
            //}
        }
        if(mode === 'presenter'){
            $('.recording-pres').show();
        }
    }else{
        $('.recording-pres').hide();
    }
    /*
    if (eventDateTime) {
        let remainingSecconds = eventDateTime - new Date();
        //console.log('event time = '+eventDateTime);
        if (remainingSecconds > 0) {
            remainingSecconds = parseInt(remainingSecconds / 1000)
            let formated = secondsToDhms(remainingSecconds);
            for (let k in formated) {
                if (parseInt(formated[k]) < 10) {
                    formated[k] = '0' + formated[k].toString();
                }
            }
            $('#days').html(formated[0]);
            if(!formated[0]){
                $('#dayslis').remove();
            }
            $('#hours').html(formated[1]);
            $('#minutes').html(formated[2]);
            $('#seconds').html(formated[3]);
        } else {
            $('.event-countdown').html('<h2>' + $('#event-type').html() + ' Already Started</h2>');
        }
    }
    */
    if(commonCounter % 10 == 0){
        if(screenShareEnable){
            showNotification('Your screen is sharing to everyone',false,3000)

            // notifyMe('Screen Share','Your screen is sharing on Avnik')
        }
        
    }
    if(commonCounter % 5 === 0 ){
        if(micEnabled && continueClicked){
            if(!micIndicationFound){
                showNotification('Your microphone cannot accessible, Please check your browser settings',true,5000)
            }
        }
        if(mediaServerDisconnected){
              disconnected = true;
        }else if(lastPingtime){
            if(((new Date() - lastPingtime ) / 1000) > 10 ){
                disconnected = true;
            }
        }
        if(disconnected && meetingStatus !== 'Ended'){
            if(((new Date() - lastPingtime ) / 1000) <= 10 ){
                disconnected = false;
                mediaServerDisconnected = false;
                showNotification('Successfully reconnected',false,4000);
                onReconnect();
            }else{
                showNotification('You have been disconnected, Trying to reconnect...',true,4000);
                if(screenShareEnable){
                    setTimeout(stopScreenShare,2000);
                }
            }
        }
        
    }

    if(meetingTime >= totalDuration){
        if(!meetingTimeOver){
            onExpareMeeting();
            meetingTimeOver = true;
            if(mode === 'presenter'){
                sendToAll({
                    method: 'onMeetingExpire',
                    meetingTime : meetingTime,
                    totalDuration:totalDuration,
                });
                document.getElementById('mp4Video').pause();
                if(player){
                    player.pauseVideo();
                }
            }
        }
        
    }
}
var onExpareMeeting = ()=>{

    pauseMeetingInAction();
    meetingStatus = 'paused';

    meetingPauseUi();
    if(mode === 'presenter'){
        extendNotificationActive = true;
        showHostPanelMessage('The allowed duration for this '+eventType+' has been ended,'+eventType+' will be in paused state until you extend the session.');
        showEndOrExtendPop();
    }else{
        extendNotificationActive = true;
        showHostPanelMessage('The allowed duration for this session has been ended, Please wait until host extend the session.');
        $('#host-wait-modal').show();
        $('#host-wait-modal').removeClass('fade')

    }
}
var autoStartMicAndCam = () =>{
    if(forceStopcam && forceStopmic){
        enableCamAndMic();
    }else if(forceStopmic){
        micEnabled = true;
        enableMic();
    }else if(forceStopcam){
        camEnabled = true;
        enableCam();
    }
}
var updateCurrentMeetingStauts = () =>{
    if(mode === 'presenter' && !testingLive){
        $.ajax({
            url: API_BASE_URL+"meetingRoom",
            headers: {
                'Accept': 'application/json',
                authorization: 'Bearer ' + accessToken
            },
            data: {
                roomId: roomSlotId,
                userId: userId,
                currentDuration:meetingTime,
                currentStatus:meetingStatus
            },
            method: "PUT",
            success: function(d) {
                // showNotification('Blocked successfully', false, 3000)
            },
            error: function(error) {
                // showNotification('Unable to block at this time', true, 3000)
            }
        });
    }
}
var toHHMMSS = (secs) => {
    var sec_num = parseInt(secs, 10)
    var hours = Math.floor(sec_num / 3600)
    var minutes = Math.floor(sec_num / 60) % 60
    var seconds = sec_num % 60

    return [hours, minutes, seconds]
        .map(v => v < 10 ? "0" + v : v)
        .join(":")
}
var toHHMM = (secs) => {
    var sec_num = parseInt(secs, 10)
    var hours = Math.floor(sec_num / 3600)
    var minutes = Math.floor(sec_num / 60) % 60

    return [hours, minutes]
        .map(v => v < 10 ? "0" + v : v)
        .join(":")
}
onCamMicChanged = () => {
    releaseCam();

    publishStream();
    $('#host-info-btn').modal("hide");
}
let continueClicked = false;
onContinueButtonClicked = () => {
    if (mode === 'presenter') {
        allowed = true;
        onContinue();
    } else {
        if (hostAvailable) {
            if(meetingStatus === 'started' || true){
                sendToAll({
                    method: 'onAllowOrDeny',
                    userId: userId,
                    userName: userName
                });
                //showModal('Message', 'Once host accept you could able to enter the ' + eventType)
                //$('#host-info-btn').modal("hide");
                $('.waithost').hide();
                $('.accepthost').show();
                $('.accepthost').html('Please wait for the host to accept you in the ' + eventType+' room');
                //$('#continue-btn').addClass('wait-disable')
            }else{
                $('.waithost').show();
                $('.waithost').html(eventType+' not yet started');
            }
            
        } else {
            $('.waithost').show();
            $('.waithost').html('Host has not entered the ' + eventType+' yet.');
        }
    }
    if(getOS() === 'iOS' || getOS() === 'Android'){
        // makeFullScreen();
    }
}
onContinue = () => {
    if (continueClicked) {
        return;
    }
    if (mode === 'viewer') {
        if (!hostAvailable) {
            return;
        }
    }
    //$('#settings-open').trigger('click')
    $('#host-info-btn').modal("hide");
    continueClicked = true;
    showLoader('Connecting...',true);
    createTokenAndConnect();
    if (camEnabled) {
        enableCamUi();
    } else {
        disableCamUi();
    }
    if (micEnabled) {
        enableMicUi();
    } else {
        disableMicUi();
    }
    if((meetingStatus === 'paused' || !meetingStatus )){
        if(camEnabled){
            forceStopcam = true;
        }
        if(micEnabled){
            forceStopmic = true;
        }
        camEnabled = false;
        micEnabled = false;
        disableCamUi();
        disableMicUi();
    }

    $('.settings-close').removeClass('hide')
    releaseCam();

}
var onReconnect = () =>{
    unPublishStream();
    conference.clearEventListener('serverdisconnected', (event) => {
    });
    conference.clearEventListener('streamadded', (event) => {
    });
    conference.leave();
    conference = null;
    if(meetingStatus !== 'Ended'){
        conference = new Owt.Conference.ConferenceClient(conf);
        createTokenAndConnect();
    }else{
        socket.disconnect();
        $('#userList').html('')
    }
}
var testFun = () =>{
    
    
}
var createTokenAndConnect = () =>{
    createToken(room, 'user', 'presenter', (response) => {
        var token = response;
        conference.join(token).then(resp => {
            initialConnection = true;
            mediaServerDisconnected = false;
            playInitialStreams(resp.remoteStreams);
            publishStream();
            conference.addEventListener('streamadded', (event) => {
                let stream = event.stream;
                if (stream.source.audio === 'mixed' || stream.source.video === 'mixed') {
                    subscribeAndRenderVideo(stream, true);
                } else {
                    subscribeAndRenderVideo(stream, false);
                }
            });
            conference.addEventListener('serverdisconnected', (event) => {
                mediaServerDisconnected = true;
            });
            

            hideLoader();
            $('.settings-close').removeClass('hide')
            $('#continue-btn').remove();
            $('#continue-btn').remove();
            $('#continue-btn-after').show();
            $('.waithost').remove();
            

        });
    });
}

/** joninig to the conference room **/

var joinConference = () => {

    /*
    
    */
}
var generateWelcomeScreen = () => {
    if (!recorder) {
        showModal("<b>Welcome</b>", "<h4>You have been successfully logged in to the conference system.If you want to present please send a raise hand request to the host by clicking third icon from top right end.</h4>", '<button type="button" class="ladda-button animate-btn zoom-out" data-dismiss="modal"><span class="label">Ok</span> <span class="spinner"></span><</button>','');
    }
}
var settingsOpenClk = () =>{
    $('#cam-mic-op-ul').remove();
    start();
}
var generateSettingsPopup = () => {
    if(recorder){
        createTokenAndConnect();
    }else{
        let settingsHtml = '';
        if(appType !== APP_TYPE.WEBINAR || mode === 'presenter'){
            settingsHtml += '<ul id="cam-mic-op-ul" class="cmn-ul-list">';
            settingsHtml += '<li>';
            settingsHtml += '<div class="radio custom">';
            settingsHtml += '<label>';
            settingsHtml += '<input ' + (camEnabled ? "checked" : "") + ' type="radio" value="cam" name="av" onchange="camMicSettingsChange()">';
            settingsHtml += 'Webcam Only';
            settingsHtml += '</label>';
            settingsHtml += '</div>';
            settingsHtml += '</li>';
            settingsHtml += '<li>';
            settingsHtml += '<div class="radio custom">';
            settingsHtml += '<label>';
            settingsHtml += '<input ' + (micEnabled ? "checked" : "") + ' type="radio" name="av" value="mic" onchange="camMicSettingsChange()">';
            settingsHtml += 'Enable Mic Only';
            settingsHtml += '</label>';
            settingsHtml += '</div>';
            settingsHtml += '</li>';
            settingsHtml += '<li>';
            settingsHtml += '<div class="radio custom">';
            settingsHtml += '<label>';
            settingsHtml += '<input ' + (camEnabled && micEnabled ? "checked" : "") + ' type="radio" name="av" value="cammic" onchange="camMicSettingsChange()">';
            settingsHtml += 'Enable Webcam &amp; Mic';
            settingsHtml += '</label>';
            settingsHtml += '</div>';
            settingsHtml += '</li>';
            settingsHtml += '<li>';
            settingsHtml += '<div class="radio custom">';
            settingsHtml += '<label>';
            settingsHtml += '<input ' + (!camEnabled && !micEnabled ? "checked" : "") + ' type="radio" value="nothing" name="av" onchange="camMicSettingsChange()">';
            settingsHtml += 'None';
            settingsHtml += '</label>';
            settingsHtml += '</div>';
            settingsHtml += '</li>';
            settingsHtml += '</ul>';
        }
        $('.webcam-radio-btns').html(settingsHtml)
        //$('#settings-open').trigger('click')
        $('#host-info-btn').modal({
            backdrop: 'static',
            keyboard: false
        })
        setTimeout(() => {
            $('#welcome-loader').hide();
        }, 1000);

        start();
    }
    /*
    return;
    var settingsHtml  = '<div class="row">';
    settingsHtml += '<div class="col-sm-6 col-md-6 col-lg-6">';
    settingsHtml += '<div class="form-group">';
    settingsHtml += '<figure class="event-lft-img">';
    settingsHtml += '<video id="videoElement" muted autoplay playsinline style="height:300px; width:335px;" poster="images/avtar.png" alt="">';
    settingsHtml += '</figure>';
    settingsHtml += '</div>';
    settingsHtml += '</div>';

    settingsHtml += '<div class="col-sm-6 col-md-6 col-lg-6">';

    settingsHtml += '<div class="form-group audio_section_top">';
    settingsHtml += '<label class="form-label" for="inputState">Camera</label>';
    settingsHtml += '<div class="icon-input-box camera-input">';
    settingsHtml += '<div class="custom-select-bx">';
    settingsHtml += '<select id="videoSelect" onchange="start()" class="form-control">';
    settingsHtml += '<option selected="" value="">-Select-</option>';
    settingsHtml += '</select>';
    settingsHtml += '</div>';
    settingsHtml += '<i class="mr-webcam-on-icon video_icon"></i>';
    settingsHtml += '</div>';
    settingsHtml += '</div>';

     settingsHtml += '<div class="form-group">';
    settingsHtml += '<label class="form-label" for="inputState">Microphone</label>';
    settingsHtml += '<div class="icon-input-box">';
    settingsHtml += '<div class="custom-select-bx">';
    settingsHtml += '<select id="audioInputSelect" onchange="start()" class="form-control">';
    settingsHtml += '<option selected="" value="">-Select-</option>';
    settingsHtml += '</select>';
    settingsHtml += '</div>';
    settingsHtml += '<i class="mr-mic-on-icon video_icon"></i>';
    settingsHtml += '</div>';
    settingsHtml += '</div>';


    settingsHtml += '<div class="form-group audio_section">';
    settingsHtml += '<label class="form-label" for="inputState">Audio</label>';
    settingsHtml += '<div class="icon-input-box">';
    settingsHtml += '<div class="custom-select-bx">';
    settingsHtml += '<select id="audioOutputSelect" onchange="start()" class="form-control">';
    settingsHtml += '<option selected="" value="">-Select-</option>';
    settingsHtml += '</select>';
    settingsHtml += '</div>';
    settingsHtml += '<i class="mr-audio-output-icon video_icon"></i>';
    settingsHtml += '</div>';
    settingsHtml += '</div>';
  
    settingsHtml += '</div>';
    settingsHtml += '</div>';
    settingsHtml += '<div class="form-group hide">';
    settingsHtml += '<label class="form-label" for="inputState">Audio Output</label>';
    settingsHtml += '<div class="icon-input-box">';
    settingsHtml += '<div class="custom-select-bx">';
    settingsHtml += '<select id="" onchange="start()" class="form-control">';
    settingsHtml += '<option selected="" value="">-Select-</option>';
    settingsHtml += '</select>';
    settingsHtml += '</div>';
    settingsHtml += '<span class="input-icon input_icon_mobile" data-placeholder=""></span>';
    settingsHtml += '</div>';
    settingsHtml += '</div>';
    settingsHtml += '<button onclick="playSound()" id="playsnd" class="btn gray-btn play-test-sound">Play Test Sound</button>';
    settingsHtml += '</div>';
    settingsHtml += '</div>';
    settingsHtml += '</div>';
    settingsHtml += '<div class="webcam-radio-btns">';
    if(mode === 'presenter'){
    settingsHtml += '<ul class="cmn-ul-list">';
    settingsHtml += '<li>';
    settingsHtml += '<div class="radio custom">';
    settingsHtml += '<label>';
    settingsHtml += '<input '+(camEnabled ? "checked":"")+' type="radio" value="cam" name="av" onchange="camMicSettingsChange()">';
    settingsHtml += 'Webcam Only';
    settingsHtml += '</label>';
    settingsHtml += '</div>';
    settingsHtml += '</li>';
    settingsHtml += '<li>';
    settingsHtml += '<div class="radio custom">';
    settingsHtml += '<label>';
    settingsHtml += '<input '+(micEnabled ? "checked":"")+' type="radio" name="av" value="mic" onchange="camMicSettingsChange()">';
    settingsHtml += 'Enable Mic Only';
    settingsHtml += '</label>';
    settingsHtml += '</div>';
    settingsHtml += '</li>';
    settingsHtml += '<li>';
    settingsHtml += '<div class="radio custom">';
    settingsHtml += '<label>';
    settingsHtml += '<input '+(camEnabled && micEnabled ? "checked":"")+' type="radio" name="av" value="cammic" onchange="camMicSettingsChange()">';
    settingsHtml += 'Enable Webcam &amp; Mic';
    settingsHtml += '</label>';
    settingsHtml += '</div>';
    settingsHtml += '</li>';
    settingsHtml += '<li>';
    settingsHtml += '<div class="radio custom">';
    settingsHtml += '<label>';
    settingsHtml += '<input '+(!camEnabled && !micEnabled ? "checked":"")+' type="radio" value="nothing" name="av" onchange="camMicSettingsChange()">';
    settingsHtml += 'None';
    settingsHtml += '</label>';
    settingsHtml += '</div>';
    settingsHtml += '</li>';
    settingsHtml += '</ul>';
    }
    settingsHtml += '</div>';
    settingsHtml += '<div class="modal-footer">';
    settingsHtml += '<ul class="cmn-ul-list ok_out_section">';   
    settingsHtml += '<li>';
    settingsHtml += '<button type="button" onclick="onContinue()" class="btn cmn-btn ok_button_section" data-dismiss="modal">Ok</button>';
    settingsHtml += '</li>';
    settingsHtml += '</ul>';
    if(!recorder){
        showModal("Setting",settingsHtml,'');
    }
    start();
    */
}
muteOrUnmuteChatSound = () =>{
    chatSoundMuted = !chatSoundMuted;
    if(chatSoundMuted){
        $('#chat-snd-on-icon').addClass('hide')
        $('#chat-snd-off-icon').removeClass('hide')
    }else{
        $('#chat-snd-on-icon').removeClass('hide')
        $('#chat-snd-off-icon').addClass('hide')
    }

}
playSound = () => {
    if ($('#playsnd').html() === 'Play Test Sound') {
        $('#playsnd').html('Stop Test Sound')
        var snd = document.getElementById("audio");
        snd.play();
    } else {
        stopSound();
    }

}
stopSound = () => {
    $('#playsnd').html('Play Test Sound')
    var snd = document.getElementById("audio");
    snd.pause();
}
camMicSettingsChange = () => {
    micEnable = false;
    camEnabled = false;
    var radioValue = $("input[name='av']:checked").val();
    switch (radioValue) {
        case 'cam':
            camEnabled = true;
            enableCamUi();
            break;
        case 'mic':
            micEnabled = true;
            enableMicUi();
            break;
        case 'cammic':
            camEnabled = true;
            micEnabled = true;
            enableCamUi();
            enableMicUi();
            break;
        default:
            camEnabled = false;
            micEnabled = false;
            disableCamUi();
            disableMicUi();
            break;
    }
    start();
}

function gotDevices(deviceInfos) {
    let audioInputSelect = document.getElementById('audioInputSelect')
    let videoSelect = document.getElementById('videoSelect')
    let audioOutputSelect = document.getElementById('audioOutputSelect')
    var selectors = [audioInputSelect, videoSelect, audioOutputSelect];
    // Handles being called several times to update labels. Preserve values.
    var values = selectors.map(function(select) {
        return select.value;
    });
    selectors.forEach(function(select) {
        while (select.firstChild) {
            select.removeChild(select.firstChild);
        }
    });
    if (deviceInfos) {
        for (var i = 0; i !== deviceInfos.length; ++i) {
            var deviceInfo = deviceInfos[i];
            var option = document.createElement('option');
            if (deviceInfo.kind === 'audioinput') {
                var audioLabal = deviceInfo.label;
                option.value = deviceInfo.deviceId;
                if (audioLabal.length > 22) {
                    audioLabal = audioLabal.substring(0, 22) + '...';
                }
                option.text = audioLabal ||
                    'microphone ' + (audioInputSelect.length + 1);
                audioInputSelect.appendChild(option);
                audioPresent = true;
                if(selectedMic === false){
                    selectedMic = deviceInfo.deviceId;
                }
            } else if (deviceInfo.kind === 'audiooutput') {
                
                var audioLabal = deviceInfo.label;
                if (audioLabal.length > 22) {
                    audioLabal = audioLabal.substring(0, 22) + '...';
                }
                option.text = audioLabal || 'speaker ' +
                    (audioOutputSelect.length + 1);
                option.value = deviceInfo.deviceId;
                audioOutputSelect.appendChild(option);
                
                speekerPresent = true;
            } else if (deviceInfo.kind === 'videoinput') {
                var infolabal = deviceInfo.label;
                if (infolabal) {
                    if (infolabal.length > 4) {
                        videoPresent = true;
                    }
                    if (infolabal.length > 22) {
                        infolabal = infolabal.substring(0, 22) + '...';
                    }
                }

                option.text = infolabal || 'camera ' + (videoSelect.length + 1);
                option.value = deviceInfo.deviceId;
                videoSelect.appendChild(option);
                if(selectedCamera === false){
                    selectedCamera = deviceInfo.deviceId;
                }
            } else {
                /////console.log('Some other kind of source/device: ', deviceInfo);
            }
        }

    }
    selectors.forEach(function(select, selectorIndex) {
        if (Array.prototype.slice.call(select.childNodes).some(function(n) {
                return n.value === values[selectorIndex];
            })) {
            select.value = values[selectorIndex];
        }
    });

    if (videoPresent) {
        camAvailable = true;
    }
    if (audioPresent) {
        micAvailable = true;
    }
    if (camAvailable) {
        camObj = {
            device: 'camera',
            resolution: 'sif',
            deviceId: selectedCamera
        };
    }
    if (micAvailable) {
        micObj = {
            deviceId: selectedMic
        };
    }
}
var handleError = (error) => {
    showNotification(error,true,5000)
}
gotStream = (stream) => {
    try {

        window.stream = stream;
        let videoElement = document.getElementById('videoElement');
        videoElement.srcObject = stream;
        videoElement.play();
        micLevelIndicator(stream)
        return navigator.mediaDevices.enumerateDevices();
    } catch (err) {
        showNotification(err,true,5000)
    }
}
releaseCam = () =>{
    if (window.stream) {
        window.stream.getTracks().forEach(function(track) {
            track.stop();
        });
        
    }
    //document.getElementById('videoElement').srcObject = null;
}
var start = () => {
    releaseCam();
    let audioInputSelect = document.getElementById('audioInputSelect')
    let videoSelect = document.getElementById('videoSelect')
    var audioSource = audioInputSelect.value;
    var videoSource = videoSelect.value;

    var constraintsSettings = {
        audio: {
            deviceId: audioSource ? {
                exact: audioSource
            } : undefined
        },
        video: {
            deviceId: videoSource ? {
                exact: videoSource
            } : undefined
        }
    };
    if(!camEnabled){
        constraintsSettings.video = false;
    }
    if(!micEnabled){
       // constraintsSettings.audio = false;
    }
    try {
        navigator.mediaDevices.getUserMedia(constraintsSettings).
        then(gotStream).then(gotDevices).catch(handleError);
    } catch (err) {
        showNotification(err,true,3000)
    }

    if (audioSource) {
        selectedMic = audioSource;
    }
    if (videoSource) {
        selectedCamera = videoSource;
    }
}



micLevelIndicator = (stream) => {
    try {
        
        audioContext = new AudioContext;
        source = audioContext.createMediaStreamSource(stream);
        analyser = audioContext.createAnalyser();
        scriptNode = audioContext.createScriptProcessor(2048, 1, 1);

        var volume = audioContext.createGain();
        source.connect(volume);
        volume.gain.value = 0; //turn off the speakers
        volume.connect(audioContext.destination);


        analyser.smoothingTimeConstant = 0.3;
        analyser.fftSize = 1024;
        analyser.minDecibels = -90;
        analyser.maxDecibels = -10;

        source.connect(analyser);
        source.onended = () => {
            source.disconnect(scriptNode);
            scriptNode.disconnect(audioCtx.destination);
        }

        analyser.connect(scriptNode);
        scriptNode.connect(audioContext.destination);
        scriptNode.onaudioprocess = () => {
            if(!micActivityLock){
                processAudioActivity();
                micActivityLock = true;
                clearTimeout(window.activitytier)
                window.activitytier = setTimeout(()=>{
                    micActivityLock = false;
                },2000)
            }
            
        }

    } catch (e) {
        alert('error='+e)
    }

}
var processAudioActivity = () =>{
            var array = new Uint8Array(analyser.frequencyBinCount);
            analyser.getByteFrequencyData(array);
            var values = 0;

            var length = array.length;
            for (var i = 0; i < length; i++) {
                values += array[i];
            }
            var average = (values / length);
            average = average * 6;
            micIndicationFound = true;
            if (average > 100) {
                average = 100;
            }
            if (average > 40) {
                showSpeakingIndication(5, average, false)
                if(mode === 'viewer'){
                    if(!allowed){
                        return;
                    }
                }
                if (micEnabled && (!roomProperty.micOffAllFlag || mode === 'presenter')) {
                    let private = false;
                    if (Object.keys(privateUsers).length > 0) {
                        private = true;
                    }
                    let data = {
                        method: 'speaking',
                        clientId: myClientId,
                        mode: mode,
                        userName: userName,
                        average: average,
                        private: private
                    };
                    if(!spakeingSendBlock){
                        spakeingSendBlock = true;
                        if(window.speakingSendTimeout){
                            clearTimeout(window.speakingSendTimeout)
                        }
                        window.speakingSendTimeout = setTimeout(() => {
                            spakeingSendBlock = false;
                        }, 2000);
                        sendToAll(data);
                        
                    }
                    
                    if (mode === 'presenter') {
                        showSpeakingIndication('host', average, userName)
                    } else {
                        showSpeakingIndication(myClientId, average, userName)
                    }
                }


            }
}
var showSpeakingIndication = (id, average, userName) => {
    if (document.getElementById(id + 'a1')) {
        //document.getElementById(id+'a1').style.opacity = '0';
        //document.getElementById(id+'a2').style.opacity = '0';
        document.getElementById(id + 'a3').style.opacity = '0';
        if (average > 0 && average < 50) {
            document.getElementById(id + 'a1').style.opacity = '1';
        }
        if (average >= 50 && average <= 70) {
            document.getElementById(id + 'a1').style.opacity = '1';
            document.getElementById(id + 'a2').style.opacity = '1';
        }
        if (average > 70) {
            document.getElementById(id + 'a1').style.opacity = '1';
            document.getElementById(id + 'a2').style.opacity = '1';
            document.getElementById(id + 'a3').style.opacity = '1';
        }
    }
    if (speaktimeout[id]) {
        clearTimeout(speaktimeout[id])
    }
    speaktimeout[id] = setTimeout(() => {
        if (document.getElementById(id + 'a1')) {
            document.getElementById(id + 'a1').style.opacity = '0';
            document.getElementById(id + 'a2').style.opacity = '0';
            document.getElementById(id + 'a3').style.opacity = '0';
        }
        $('#speakerbox').hide();
    }, 2000);
    if(userName){
        //$('#current-speaker').html(userName)
       // $('#speakerbox').show();
    }
    
}
/**
 * function for playing all initialy available streams
 * @param {array of all initial stream object} streams 
 */
var playInitialStreams = (streams) => {
    //alert(streams.length)
    for (const stream of streams) {
        if (stream.source.audio !== 'mixed') {
            subscribeAndRenderVideo(stream, false);
        } else {
            subscribeAndRenderVideo(stream, true);
        }
    }
}
allow = () => {
    document.getElementById('remoteAudio').play();
    document.getElementById('host-video').play();
    $(".av1bg").each(function() {
        $(this).play();
    });
}
/**
 * function for playing a given stream object
 * @param {stream object to be played on the video tag} stream 
 */
var subscribeAndRenderVideo = (stream, isMixed) => {
    if (isMixed) {
        mixedStreamId = stream.id;
        conference.subscribe(stream, {
            audio: {
                codecs: [{
                    name: 'opus'
                }]
            },
            video: false
        }).then((subscription) => {
            subscriptionForMixedStream = subscription;
            document.getElementById('remoteAudio').srcObject = stream.mediaStream;
            subscription.addEventListener('error', (err) => {
                //console.log('Subscription error: ' + err.error.message);
            })
            subscription.addEventListener('ended', (err) => {

            })
            /*
            setTimeout(() =>{
                let video = document.getElementById('remoteAudio');
                var promise = video.play();
                if (promise !== undefined) {
                promise.then(_ => {
                    //console.log('video playing ok...')
                }).catch(error => {
                    //console.log(error)
                    showModal('Confirm','Please click allow button to enable browser permission to play audio?','<button onclick="allow()" data-dismiss="modal" type="button" class="btn btn-link waves-effect">Allow</button> <button data-dismiss="modal" type="button" class="btn btn-link waves-effect">Cancel</button>')
                });
                }
             },1000);
             */
        });
    } else {
        var streamAttributes = stream.attributes;
        if (streamAttributes) {
            if (streamAttributes.clientId == myClientId) {
                return;
            }
        } else {
            return;
        }
        if (streamAttributes.isScreen) {
            if(screenSubscirptionLocal){
                screenSubscirptionLocal.stop();
            }
            if(screenShareEnable){
                stopScreenShare();
                showModal('Message','Some one started screenshare so Your screen share has been stopped')
            }
            conference.subscribe(stream, {
                    video: true,
                    audio: false
                })
                .then((subscription) => {
                    screenSubscirptionLocal = subscription;
                    $('#screen_patent').html('<video id="screenVideo" muted playsinline autoplay></video>')
                    $('#screenVideo').get(0).srcObject = stream.mediaStream;
                    $('#screen_patent').removeClass('hide');

                }, (err) => { //console.log('subscribe failed', err);
                });
            stream.addEventListener('ended', () => {
                $('#screen_patent').html('');
                $('#screen_patent').addClass('hide');
            });

        } else {
            let option = {
                video: true,
                audio: false
            }
            let pvUsers = streamAttributes.privateUsers;
            if (Object.keys(pvUsers).length > 0 || Object.keys(privateUsers).length > 0) {
                if (!pvUsers[myClientId]) {
                    if (streamAttributes.mode == 'presenter') {
                        $('#host-video').hide();
                        $('#host-avatar').show();
                        pushNotification(streamAttributes.userName, streamAttributes.userName + ' has joined the session');
                    } else {
                        $('#userList').append(renderVideoUi(streamAttributes));
                        if (conferenceMode) {
                            switchToConference();
                        }
                        $('#' + streamAttributes.clientId + '-parent').hide();
                        $('#' + streamAttributes.clientId + '-avatar').show();
                        changeFunctionalityBasedOnRoomProperty();

                    }
                    $('#pv-chat-users-ul').append(loadPrivateChatList(streamAttributes));
                    return;
                } else {
                    option.audio = true;
                }
            }

            if (stream.settings.video.length == 0) {
                option.video = false;
            }
            //console.log('request option : '+JSON.stringify(option))
            if (!option.video) {
                if (streamAttributes.mode == 'presenter') {
                    $('#host-video').hide();
                    $('#host-avatar').show();
                    $('#pre-vid-chat-par').removeClass('hide')
                    $('#pre-vid-chat-par').html('<a onclick="onPvChatFromUserList(\'' + streamAttributes.userId + '\',\'' + streamAttributes.userName + '\')" class="av-toggle-btn" href="javaScript:void(0);" id="toggle-avnik"><i class="mr-chat-icon"></i></a>');
                    pushNotification(streamAttributes.userName, streamAttributes.userName + ' has joined the session');
                } else {
                    $('#userList').append(renderVideoUi(streamAttributes));
                    if (conferenceMode) {
                        switchToConference();
                    }
                    $('#' + streamAttributes.clientId + '-parent').hide();
                    $('#' + streamAttributes.clientId + '-avatar').show();
                    changeFunctionalityBasedOnRoomProperty();

                }
                $('#pv-chat-users-ul').append(loadPrivateChatList(streamAttributes));
                return;
            }
            conference.subscribe(stream, option)
                .then((subscription) => {
                    subscirptionLocal[streamAttributes.clientId] = subscription;
                    if (streamAttributes.mode == 'presenter') {
                        $('#host-video').show();
                        $('#host-avatar').hide();
                        $('#host-video').get(0).srcObject = stream.mediaStream;
                        $('.host-name').html(streamAttributes.userName)
                        $('#host-video').prop('muted', false);
                        $('#pre-vid-chat-par').removeClass('hide')
                        $('#pre-vid-chat-par').html('<a onclick="onPvChatFromUserList(\'' + streamAttributes.userId + '\',\'' + streamAttributes.userName + '\')" class="av-toggle-btn" href="javaScript:void(0);" id="toggle-avnik"><i class="mr-chat-icon"></i></a>');
                        pushNotification(streamAttributes.userName, streamAttributes.userName + ' has joined the session');
                        /*
                            let video = document.getElementById('host-video');
                            var promise = video.play();
                            if (promise !== undefined) {
                            promise.then(_ => {
                                //console.log('video playing ok...')
                            }).catch(error => {
                                showModal('Confirm','Please click allow button to enable browser permission to play audio?','<button onclick="allow()" data-dismiss="modal" type="button" class="btn btn-link waves-effect">Allow</button> <button data-dismiss="modal" type="button" class="btn btn-link waves-effect">Cancel</button>')
                            });
                            
                        }*/
                    } else {
                        let clientId = streamAttributes.clientId;
                        streamObjectMap[clientId] = {stream:stream.mediaStream,camEnabled:streamAttributes.myCamAllowed};
                        $('#userList').append(renderVideoUi(streamAttributes));
                        $('#' + streamAttributes.clientId).get(0).srcObject = stream.mediaStream;
                        $('#' + streamAttributes.clientId).prop('muted', false);
                        if (conferenceMode) {
                            switchToConference();
                        }
                        $('#' + streamAttributes.clientId + '-parent').show();
                        $('#' + streamAttributes.clientId + '-avatar').hide();
                        document.getElementById(streamAttributes.clientId + '-parent').classList.remove('logichide')
                        changeFunctionalityBasedOnRoomProperty();
                        if(userList[clientId]){
                            if(!userList[clientId].myCamAllowed){
                                $('#' + streamAttributes.clientId + '-parent').hide();
                                $('#' + streamAttributes.clientId + '-avatar').show();
                            }
                        }
                        //$('[data-toggle="tooltip"]').tooltip();
                    }
                    $('#pv-chat-users-ul').append(loadPrivateChatList(streamAttributes));


                }, (err) => { //console.log('subscribe failed', err);
                });
            stream.addEventListener('ended', () => {
                //removeUi(stream.id);
                //$('#'+streamAttributes.clientId+'_user').remove();
                //$('#user-'+streamAttributes.clientId).remove();
                if(streamAttributes.mode === 'presenter'){
                    $('#host-video').hide();
                    $('#host-avatar').show();
                    
                }
                let clientId = streamAttributes.clientId;
                if(streamObjectMap[clientId]){
                    delete streamObjectMap[clientId];
                }
                
            });
        }
    }
}
var getTwoLetter = (userName) =>{
    if(userName){
        return userName.charAt(0).toUpperCase() + '' + userName.charAt(1).toUpperCase();
    }else{
        return 'A';
    }
    
}
var onEnlargeUser = (id) =>{
    //alert(id)
    return;
    let alreadyEnlarged = false;
    if($('#'+id).hasClass('OT_big')){
        alreadyEnlarged = true;
    }
    $('.layoutchild').removeClass('OT_big')
    if(!alreadyEnlarged){
        $('#'+id).addClass('OT_big');
    }
    if(!conferenceMode){
        switchToConference();
    }
    layout1();
}
var onPlayVideo = (clientId) =>{
    
}
var renderVideoUi = (streamAttributes) => {
    // onclick="revokePresentingPowerToClient(\'' + streamAttributes.clientId + '\')"

    if ($('#' + streamAttributes.clientId + '_user').length) {
        return false;
    }
    let me = false;
    let videoOthersClass = '';
    let avatarOthersClass = '';
    let videoHtml = '';
    if (streamAttributes.clientId == myClientId) {
        me = true;
        videoOthersClass = 'video-users-me';
        avatarOthersClass = 'avatar-users-me'
    } else {
        pushNotification(streamAttributes.userName, streamAttributes.userName + ' has joined the session');
        videoOthersClass = 'video-users';
        avatarOthersClass = 'avatar-users'
    }
    if(userListType === 'list'){
        videoHtml = '<li  data-name="' + streamAttributes.userName + '" id="' + streamAttributes.clientId + '_user" class="item usersli attendee-parent grid-group-item list-group-item layoutchild">';
    }else{
        videoHtml = '<li  data-name="' + streamAttributes.userName + '" id="' + streamAttributes.clientId + '_user" class="item usersli attendee-parent grid-group-item layoutchild">';
    }
    
    videoHtml += '<div class="PVL-list-video-sec imghvr-hinge-up">';
    videoHtml += '<div class="PVL-list-video">';
    if (mode === 'presenter') {
        videoHtml += '<div class="dropdown cmn-meet-dd">';
        videoHtml += '<button class="btn dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="lm lm-menu-icon"></i></button>';
        videoHtml += '<div class="dropdown-menu" aria-labelledby="dropdownMenuButton">';
        videoHtml += '<ul class="meet-dd-o">';
        if (!me && mode == 'presenter') {
            if(appType !== APP_TYPE.WEBINAR){
                if(streamAttributes.myMicAllowed){
                    videoHtml += '<li id="yourmicon'+streamAttributes.clientId+'" onclick="onControlYourMic(\'' + streamAttributes.clientId + '\',false)"><a><i class="mr-mic-on-icon"></i> Mute Mic</a></li>';
                    videoHtml += '<li style="display:none" id="yourmicoff'+streamAttributes.clientId+'" onclick="onControlYourMic(\'' + streamAttributes.clientId + '\',true)"><a><i class="mr-mic-off-icon"></i> Unmute Mic</a></li>';
                }else{
                    videoHtml += '<li id="yourmicon'+streamAttributes.clientId+'" onclick="onControlYourMic(\'' + streamAttributes.clientId + '\',false)" style="display:none"><a ><i class="mr-mic-on-icon" ></i> Mute Mic</a></li>';
                    videoHtml += '<li id="yourmicoff'+streamAttributes.clientId+'" onclick="onControlYourMic(\'' + streamAttributes.clientId + '\',true)" ><a><i class="mr-mic-off-icon" ></i> Unmute Mic</a></li>';
                }
    
                if(streamAttributes.myCamAllowed){
                    videoHtml += '<li id="yourcamon'+streamAttributes.clientId+'" onclick="onControlYourCam(\'' + streamAttributes.clientId + '\',false)"><a ><i class="mr-webcam-on-icon" ></i> Disable Cam </a></li>';
                    videoHtml += '<li id="yourcamoff'+streamAttributes.clientId+'" onclick="onControlYourCam(\'' + streamAttributes.clientId + '\',true)" style="display:none"><a ><i class="mr-webcam-off-icon" ></i> Enable Cam </a></li>';
                }else{
                    videoHtml += '<li id="yourcamon'+streamAttributes.clientId+'" onclick="onControlYourCam(\'' + streamAttributes.clientId + '\',false)" style="display:none"><a ><i class="mr-webcam-on-icon" ></i> Disable Cam </a></li>';
                    videoHtml += '<li id="yourcamoff'+streamAttributes.clientId+'" onclick="onControlYourCam(\'' + streamAttributes.clientId + '\',true)" ><a ><i class="mr-webcam-off-icon" ></i> Enable Cam </a></li>';
                }
                
                
            }
        }
        if(appType !== APP_TYPE.WEBINAR){
            if(streamAttributes.havePower){
                videoHtml += '<li><a style="display:none"  id="' + streamAttributes.clientId + '_givepower" title="Give Presenting Power" onclick="givePresentingPowerToClient(\'' + streamAttributes.clientId + '\')"><i class="mr-present-icon"></i> Make Presenter</a>';
                videoHtml += '<a class="blok" id="' + streamAttributes.clientId + '_revokepower"  title="Revoke Presenting Power" onclick="revokePresentingPowerToClient(\'' + streamAttributes.clientId + '\')"><i class="mr-present-icon"></i> Remove Presenter</a></li>';
            }else{
                videoHtml += '<li><a id="' + streamAttributes.clientId + '_givepower" title="Give Presenting Power" onclick="givePresentingPowerToClient(\'' + streamAttributes.clientId + '\')"><i class="mr-present-icon"></i> Make Presenter</a>';
                videoHtml += '<a style="display:none" class="blok" id="' + streamAttributes.clientId + '_revokepower"  title="Revoke Presenting Power" onclick="revokePresentingPowerToClient(\'' + streamAttributes.clientId + '\')"><i class="mr-present-icon"></i> Remove Presenter</a></li>';
            }
            
        }
        if(appType !== APP_TYPE.APPOINTMENT && appType != APP_TYPE.WEBINAR){
            videoHtml += '<li id="' + streamAttributes.clientId + '_privateli" class="pvli hides" onclick="startOrStopPrivateMeeting(\'' + streamAttributes.clientId + '\')"><a><i class="mr-invite-icon"></i> <span id="' + streamAttributes.clientId + '_private">Private Meeting</span></a></li>';
        }
        videoHtml += '<li><a onclick="onBlock(\'' + streamAttributes.userId + '\')"><i class="mr-exit-user-icon"></i> Exit User</a></li>';
        //videoHtml += '<li><a onclick="removeUser(\'' + streamAttributes.clientId + '\')"><i class="mr-exit-user-icon"></i> Exit & Blcok</a></li>';//
        videoHtml += '</div>';
        videoHtml += '</div>';
    }
    videoHtml += ' <figure class="cmn-profile-pic"><img src="images/av1.jpeg" alt=""></figure> ';
    if (recorder) {
        videoHtml += '<div id="' + streamAttributes.clientId + '-parent"><video class="av1bg attendee-video" playsinline autoplay id="' + streamAttributes.clientId + '" style="display:block" >this browser does not supported video tag</video></div>';
    } else {
        videoHtml += '<div class="audio-chker-blk">'
        videoHtml += '<div id="' + streamAttributes.clientId + 'a1" class="first-dot"></div>'
        videoHtml += '<div id="' + streamAttributes.clientId + 'a2" class="second-dot"></div>'
        videoHtml += '<div id="' + streamAttributes.clientId + 'a3" class="third-dot"></div>'
        videoHtml += '</div>'
        videoHtml += ' <div onclick="onEnlargeUser(\''+streamAttributes.clientId+'_user\')" id="' + streamAttributes.clientId + '-avatar" class="avatar-parent ' + avatarOthersClass + '">'
        videoHtml += '      <div id="' + streamAttributes.clientId + '-name" class="avatar-inner vertical-center">'
        videoHtml += '      <div class="vertical-center">' + streamAttributes.userName.charAt(0).toUpperCase() + '' + streamAttributes.userName.charAt(1).toUpperCase() + '</div>'
        videoHtml += '</div>'
        videoHtml += '</div>'

        videoHtml += '<div class="part-vid-parent ' + videoOthersClass + '" id="' + streamAttributes.clientId + '-parent"><video onplay="onPlayVideo(\''+streamAttributes.clientId+'\')" onclick="onEnlargeUser(\''+streamAttributes.clientId+'_user\')" class="av1bg attendee-video" muted playsinline autoplay id="' + streamAttributes.clientId + '" style="display:block" >this browser does not supported video tag</video></div>';
    }
    videoHtml += '</div>';
    videoHtml += '  <div class="PVL-list-name"> <span>' + streamAttributes.userName + (me ? ' (me) ' : '') + '</span>';
    videoHtml += '  </div>';
    videoHtml += '</div>';
    videoHtml += '</li>';
    return videoHtml;
}
/**
 * Function for publishing media (cam/mic/screen)
 */
var publishStream = () => {
    if(!initialConnection){
        return;
    }

    unPublishStream();
    if(window.publishStreamTimeout){
        clearTimeout(window.publishStreamTimeout)
    }
    window.publishStreamTimeout = setTimeout(publishStreamInAction,1000);
}

var publishStreamInAction = () =>{
    //console.log('LOGGER : PUBLISHING STARTED')
    if(recorder){
        return;
    }
    if (firstTimePublish) {
        showLoader('',false);
    } else {
        if (camEnabled && !skipLoader) {
            showLoader('',false);
        }
    }
    firstTimePublish = false;
    //console.log('LOGGER : UNPUBLISH EXISTING STREAM')
    let audioConstraints = new Owt.Base.AudioTrackConstraints(Owt.Base.AudioSourceInfo.MIC);
    // videoConstraintsForCamera
    let videoConstraints = new Owt.Base.VideoTrackConstraints(Owt.Base.VideoSourceInfo.CAMERA);
    if (camEnabled == false) {
        videoConstraints = false;
    } else {
         let resol                     = new Owt.Base.Resolution(320,240);
         videoConstraints.resolution   = resol;
        //videoConstraints.frameRate  = 30;
        if (selectedCamera) {
            videoConstraints.deviceId = selectedCamera;
        }
    }
    if (selectedMic) {
        audioConstraints.deviceId = selectedMic;
    }
    //console.log('LOGGER : TRY TO CREATE MEDIA STREAM')
    //creating media stream
    Owt.Base.MediaStreamFactory.createMediaStream(new Owt.Base.StreamConstraints(
        audioConstraints, videoConstraints)).then(stream => {

        //console.log('LOGGER : CREATED MEDIA STREAM')
        mediaStream = stream;
        let streamAttributes = {};
        streamAttributes.userId = userId;
        streamAttributes.clientId = myClientId;
        streamAttributes.userName = userName;
        streamAttributes.mode = mode;
        streamAttributes.avatar = avatar;
        streamAttributes.privateUsers = privateUsers;
        streamAttributes.myCamAllowed = myCamAllowed;
        streamAttributes.myMicAllowed = myMicAllowed;
        streamAttributes.micEnabled = micEnabled;
        streamAttributes.camEnabled = camEnabled;
        
        localStream = new Owt.Base.LocalStream(mediaStream, new Owt.Base.StreamSourceInfo('mic', 'camera'), streamAttributes);

        if (mode == 'presenter') {
            $('#host-video').get(0).srcObject = stream;
            $('.pra-name').html(streamAttributes.userName);
            if (camEnabled) {
                $('#host-video').show();
                $('#host-avatar').hide();
            } else {
                $('#host-video').hide();
                $('#host-avatar').show();
            }
             $('#host-name-val').html(streamAttributes.userName.charAt(0).toUpperCase() + '' + streamAttributes.userName.charAt(1).toUpperCase())

        } else {
            let clientId = streamAttributes.clientId;
            streamObjectMap[clientId] = {stream:stream,camEnabled:camEnabled};
            $('#userList').append(renderVideoUi(streamAttributes));
            $('#' + streamAttributes.clientId).get(0).srcObject = stream;
            
            if (conferenceMode) {
                $('conference').append($('#' + streamAttributes.clientId));
                layout1();
                setTimeout(layout1,500)
            }
            if (camEnabled) {
                $('#' + myClientId + '-parent').show();
                $('#' + myClientId + '-avatar').hide();
            } else {
                $('#' + myClientId + '-parent').hide();
                $('#' + myClientId + '-avatar').show();
            }
        }
        if (conferenceMode) {
            //$('conference').append($('#'+streamAttributes.clientId));
            //layout1();
            switchToConference();
        }
        conference.publish(localStream, {}).then(publication => {

            //console.log('LOGGER : PUBLISHED LOCAL STREAM')
            publicationGlobal = publication;
            if (Object.keys(privateUsers).length === 0) {
                mixStream(room, publication.id, 'common');
            }
            //console.log('LOGGER : STREAM MIXED')
            publication.addEventListener('error', (err) => {
                console.error('LOGGER : LINE 819 MAIN-JS ' + err)
                showNotification(err,true,3000);
            });
            if (micEnabled == false) {
                publicationGlobal.mute('audio')
            }
            changeFunctionalityBasedOnRoomProperty();
            if(!myCamAllowed){
                publicationGlobal.mute('video')
            } 
            if(micEnabled){
                if(!myMicAllowed){
                    publicationGlobal.mute('audio')
                }
            }
            setTimeout(hideLoader, 1000)
            //console.log('LOGGER : HIDDEN PUBLISH LOADER')
        });

    }, err => {
        console.error('LOGGER : LINE 830 MAIN-JS FAILED TO CREATE MEDIA STREAM ' + err)
        if(err === 'NotAllowedError: Permission denied'){
            showModal('Error','Camera and Microphone accessing permission is blocked in your browser settings. Please allow the permission and reload this page.','')
            
        }else{
            showModal('Error','Unable to publish this time, Please note the error for further support | Error : '+err,'')
        }
        setTimeout(hideLoader, 1000)
    });
}
/**
 * For unpublishing stream
 */
function unPublishStream() {
    if (publicationGlobal) {
        unmixStream(room, publicationGlobal.id, 'common');
        publicationGlobal.stop();
        publicationGlobal = null; 
        //console.log('LOGGER : STREAM UNPUBLISHED')
        mediaStream.getTracks().forEach(function(track) {
            track.stop();
        });
    }
}
onControlYourMic = (clientId,status) =>{
     sendToAll({method:'controlMic',receiverId:clientId,status:status});
     document.getElementById('yourmicon'+clientId).style.display = 'block';
     document.getElementById('yourmicoff'+clientId).style.display = 'block';
     if(status){
        document.getElementById('yourmicoff'+clientId).style.display = 'none';
     }else{
        document.getElementById('yourmicon'+clientId).style.display = 'none';
        
        
     }
}
onControlYourCam = (clientId,status) =>{
     sendToAll({method:'controlCam',receiverId:clientId,status:status});
     document.getElementById('yourcamon'+clientId).style.display = 'block';
     document.getElementById('yourcamoff'+clientId).style.display = 'block';
     if(status){
        document.getElementById('yourcamoff'+clientId).style.display = 'none';
        document.getElementById(clientId + '-parent').style.display = 'block';
        document.getElementById(clientId + '-avatar').style.display = 'none';
     }else{
        document.getElementById('yourcamon'+clientId).style.display = 'none';
        document.getElementById(clientId + '-parent').style.display = 'none';
        document.getElementById(clientId + '-avatar').style.display = 'block';
        
        
     }
}
/**
 * For enable or desable my camera
 */

enableOrDisableCam = () => {
    /*
    if(!havePower && !allowCamMicForViewer){
        showRequestPresentMsg();
        return;
    }
    */
    if(meetingTime >= totalDuration){
        if(mode === 'presenter'){
            showNotification('The '+eventType+' duration has been expired, Please extend the session to turn on your camera',true,3000);
        }else{
            showNotification('The '+eventType+' duration has been expired, You can turn on camera only after host extend the session',true,3000);
        }
        
        return;
    }
    if(meetingStatus !== 'started'){
        showNotification('You could not start camera since the '+eventType+' is not started state',false,3000)
        return;
    }
    camEnabled = !camEnabled;
    if (camEnabled) {
        enableCam();
    } else {
        disableCam();
        forceStopcam = false;
    }
    
}
enableCam = () => {
    camEnabled = true;
    publishStream();
    enableCamUi();
    if (roomProperty.cameraOffAllFlag && mode !== 'presenter') {
        showNotification('Host disabled your video publishing', false, 5000)
    }
}
disableCam = () => {
    camEnabled = false;
    publishStream();
    disableCamUi();
}
enableCamAndMic = () => {
    camEnabled = true;
    micEnabled = true;
    publishStream();
    enableCamUi();
    enableMicUi();
}
enableCamUi = () => {

    $('.camEnableBtn').addClass('hide')
    $('.camDisableBtn').removeClass('hide')
}
disableCamUi = () => {
    $('.camEnableBtn').removeClass('hide')
    $('.camDisableBtn').addClass('hide')

}
enableMicUi = () => {
    $('.micEnableBtn').addClass('hide')
    $('.micDisableBtn').removeClass('hide')
}
disableMicUi = () => {

    $('.micEnableBtn').removeClass('hide')
    $('.micDisableBtn').addClass('hide')
}
/**
 * For enable or desable my microphone
 */
enableOrDisableMic = () => {
    /*
    if(!havePower && !allowCamMicForViewer){
        showRequestPresentMsg();
        return;
    }
    */
    if(meetingTime >= totalDuration){
        if(mode === 'presenter'){
            showNotification('The '+eventType+' duration has been expired, Please extend the session to turn on your camera',true,3000);
        }else{
            showNotification('The '+eventType+' duration has been expired, You can turn on camera only after host extend the session',true,3000);
        }
        
        return;
    }
    if(meetingStatus !== 'started'){
        showNotification('You will be able to unmute mic once the '+eventType+' has started',false,3000)
        return;
    }
    micEnabled = !micEnabled;
    if (micEnabled) {
        enableMic();
    } else {
        disableMic();
        $('.caption').html('');
        forceStopmic = false;
    }
}
enableMic = () => {
    micEnabled = true;
    enableMicUi();
    if (publicationGlobal) {
        publicationGlobal.unmute('audio');
        changeFunctionalityBasedOnRoomProperty();
        if(!myMicAllowed){
            publicationGlobal.mute('audio');
        }
        if (roomProperty.cameraOffAllFlag && mode !== 'presenter') {
            showNotification('Host enabled your audio publishing, now everyone can hear you.', false, 5000)
        }
    } else {
        publishStream();
    }
}
disableMic = () => {
    micEnabled = false;
    disableMicUi();
    if (publicationGlobal) {
        publicationGlobal.mute('audio');
    }
}
/**
 * control user cam and mic
 */
var onDisableUserCam = (clientId) => {
    let data = {
        method: 'camControl',
        sendToId: clientId
    };
    sendToAll(data);
}
var onDisableUserMic = (clientId) => {
    let data = {
        method: 'micControl',
        sendToId: clientId
    };
    sendToAll(data);
}
var onCamMicAll = () => {
    let data = {
        method: event.target.value
    };
    sendToAll(data);
}

/**
 * 
 */

var startOrStopScreenshare = () => {
    if (!havePower) {
        showRequestPresentMsg();
        return;
    }
    if (screenShareEnable) {
        stopScreenShare();
    } else {
        if(meetingStatus !== 'started'){
            showNotification('You could not share screen since the '+eventType+' is not started',false,3000)
            return;
        }
        publishScreen();
    }
}
/**
 * Function for publishing media (cam/mic/screen)
 */
var publishScreen = () => {
    let audioConstraints = false;
    // videoConstraintsForCamera
    let videoConstraints = new Owt.Base.VideoTrackConstraints(Owt.Base.VideoSourceInfo.SCREENCAST);
    // setting screen resolution 
    let resol = new Owt.Base.Resolution(screen.width * 1.1, screen.height * 1.1);
    videoConstraints.resolution = resol;
    videoConstraints.frameRate = 5;
    //creating media stream
    Owt.Base.MediaStreamFactory.createMediaStream(new Owt.Base.StreamConstraints(
        audioConstraints, videoConstraints)).then(stream => {
        screenMediaStream = stream;
        let streamAttributes = {};
        streamAttributes.clientId = myClientId;
        streamAttributes.userName = userName;
        streamAttributes.mode = mode;
        streamAttributes.isScreen = true;
        localScreenStream = new Owt.Base.LocalStream(screenMediaStream, new Owt.Base.StreamSourceInfo('screen-cast', 'screen-cast'), streamAttributes);
        $('#screen_patent').html('<h2 class="scrnnotif" style="text-align:center;">Your screen is now sharing with all attendees</h2>') //<video id="screenVideo" muted playsinline autoplay></video>

        //$('#screenVideo').get(0).srcObject = stream;
        //$("#screenVideo").css({top: 'calc(50vh - '+(screen.height / 8 )+'px)', left: 'calc(50vw - '+(screen.width / 8 )+'px)', width: (screen.width / 4 )+'px' , height: (screen.height / 4 )+'px' , position:'absolute'})
        conference.publish(localScreenStream, {}).then(publication => {
            publicationGlobalScreen = publication;
            screenShareEnable = true;
            showNotification('Your screen is sharing to all',false,3000)
            //resetConference();
            $('.screen-button').addClass('active-menu');
            stream.getVideoTracks()[0].onended = function() {
                stopScreenShare();
            };
            publication.addEventListener('error', (err) => {
                //console.log('Publication error: ' + err.error.message);
            });
            publication.addEventListener('ended', (err) => {
                stopScreenShare();
            });
            $('.screen-button').addClass('active-menu');
        });

    }, err => {
        console.error('Failed to create MediaStream, ' +
            err);
    });
}
/**
 * function to stop
 */
var stopScreenShare = () => {
    if (publicationGlobalScreen) {
        publicationGlobalScreen.stop();
        if (screenMediaStream) {
            screenMediaStream.getVideoTracks().forEach(function(track) {
                track.stop();
            });
        }
        screenShareEnable = false;
        $('.screen-button').removeClass('active-menu');
        publicationGlobalScreen = null;
        try {
            $('#screen_patent').html('');
        } catch (e) {

        }
        localScreenStream = null;
        showNotification('Your screen share has been stopped',false,3000)
    }
}
loadWhiteboard = () => {
    lc = LC.init(
        document.getElementById('whiteboard-area')
    );
    lc.setColor('background', 'rgb(255 255 255 / 0%)')
    lc.setColor('primary', '#000')
    lc.setColor('secondary', 'rgb(255 255 255 / 0%)')
    lc.trigger('setStrokeWidth', 5);

    var tools = [{
            name: 'select',
            el: document.getElementById('tool-move'),
            tool: new LC.tools.SelectShape(lc)
        },
        {
            name: 'pencil',
            el: document.getElementById('tool-pencil'),
            tool: new LC.tools.Pencil(lc)
        }, {
            name: 'eraser',
            el: document.getElementById('tool-eraser'),
            tool: new LC.tools.Eraser(lc, {
                strokeWidth: 20
            })
        },
        {
            name: 'text',
            el: document.getElementById('tool-text'),
            tool: new LC.tools.Text(lc)
        },
        {
            name: 'dashed',
            el: document.getElementById('tool-dashed'),
            tool: function() {
                dashed = new LC.tools.Line(lc);
                dashed.isDashed = true;
                return dashed;
            }()
        },
        {
            name: 'line',
            el: document.getElementById('tool-line'),
            tool: new LC.tools.Line(lc)
        },
        {
            name: 'rectangle',
            el: document.getElementById('tool-rectangle'),
            tool: new LC.tools.Rectangle(lc)
        },
        {
            name: 'ellipse',
            el: document.getElementById('tool-ellipse'),
            tool: new LC.tools.Ellipse(lc)
        },


    ];


    var activateTool = function(t) {
        selectedTool = t;
        if (t.name == 'eraser') {
            t.tool.strokeWidth = 25;
        } else {
            t.tool.strokeWidth = 5;
        }
        lc.setTool(t.tool);
        tools.forEach(function(t2) {
            if (t2.el) {
                if (t == t2) {
                    //t2.el.style.color = '#145388';
                    t2.el.classList.add("active");
                } else {
                    t2.el.classList.remove('active')
                    //t2.el.style.backgroundColor = 'transparent';
                }
            }
        });
        if(t.name == 'rectangle' || t.name == 'ellipse' || t.name == 'line' || t.name == 'dashed'){
            $('#shape-drop').hide();
            $('#selected-shape').attr('class','mr-rectangle-icon')
            if(t.name == 'ellipse'){
                $('#selected-shape').attr('class','mr-ellipse-icon')
            }
            if(t.name == 'line'){
                $('#selected-shape').attr('class','mr-solid-line-icon')
            }
            if(t.name == 'dashed'){
                $('#selected-shape').attr('class','mr-dashed-line-icon')
            }
            
        }
    }

    tools.forEach(function(t) {
        t.el.style.cursor = "pointer";
        t.el.onclick = function(e) {
            if(!havePower){
                if( t.name !== 'select'){
                    showRequestPresentMsg();
                }
                return;
            }
            e.preventDefault();
            activateTool(t);
        };
    });
    activateTool(tools[0]);
}
var clearBoardClick = () =>{
    if(!havePower){
        showRequestPresentMsg();
        return;
    }
    clearBoard();
    sendBoard();
}
var wbclick = () =>{
    $('#shape-drop').hide();
}
var showHideShapeDrop = () =>{
    $('#shape-drop').toggle();
}
/**
 * function to clear whiteboard
 */
var clearBoard = () => {
    
    lc.clear();
}
/**
 * function to undo last whiteboard action
 */
 var onUndoBoardClick = () => {
    if(!havePower){
        showRequestPresentMsg();
        return;
    }
    onUndoBoard();
    sendFullBoard();
}
var onRdoBoardClick = () => {
    if(!havePower){
        showRequestPresentMsg();
        return;
    }
    onRdoBoard();
    sendBoard();
}
var onUndoBoard = () => {
    if(!havePower){
        showRequestPresentMsg();
        return;
    }
    lc.undo();
}
var onRdoBoard = () => {
    if(!havePower){
        showRequestPresentMsg();
        return;
    }
    lc.redo();
}
var saveBoardToLocal = () => {
    let ct = 0;
    $("canvas").each(function(i) {
        ct++;
        if (ct == 2) {
            var rawImageData = this.toDataURL("image/png;base64");
            var link = document.createElement("a");
            link.download = 'whiteboard';
            link.href = rawImageData;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            delete link;
            return;
            // rawImageData = rawImageData.replace("image/png", "image/octet-stream");
            // alert(rawImageData); return;
            document.location.href = rawImageData;
            return;
            var img = this.toDataURL("image/png");
            document.getElementById('wb-download').href = img;
            setTimeout(() => {
                $('#wb-download').trigger('click')
            }, 2000)

        }
    });
}
/**
 * function to send whiteboard data to all participants
 */
var sendBoard = () => {
    if(!havePower){
        // showRequestPresentMsg();
        return;
    }
    /*
    if(meetingStatus !== 'started'){
        showNotification('Unable to share the whiteboard data since the '+eventType+' is not started',false,3000)
        return;
    }
    */
    sendToAll({method:'onWbUsing',name:userName})
    setTimeout(() => {
        var dt = lc.getSnapshot();
        let data = {};
        data.method = 'whiteboardData';
        data.wbData = getLastUpdatedData(dt);
        console.log('data = '+JSON.stringify(data.wbData))
        data.clearAll = 0;
        if (dt.shapes.length == 0) {
            data.clearAll = 1;
            delete whiteboardArray[whiteboardPageIndex];
        }else{
            whiteboardArray[whiteboardPageIndex] = dt;
        }
        sendToAll(data)

        let fullBoardData = getFullBoardData(dt);
        serverWhiteboardArray[whiteboardPageIndex] = fullBoardData;
        if(data.clearAll == 1){
            if(serverWhiteboardArray[whiteboardPageIndex]){
                delete serverWhiteboardArray[whiteboardPageIndex];
            }
        }
        let payload = JSON.stringify({wbData:serverWhiteboardArray,room:room});
        socket.emit('updateWhiteboardData', payload);
        
        //localStorage.setItem('wbdata-'+roomSlotId,JSON.stringify(whiteboardArray))

    }, 1000)
}
var sendFullBoard = () => {
    if(!havePower){
        // showRequestPresentMsg();
        return;
    }
    sendToAll({method:'onWbUsing',name:userName})
    setTimeout(() => {
        var dt = lc.getSnapshot();
        let data = {};
        data.method = 'whiteboardData';
        data.wbData = getFullBoardData(dt);
        data.clearAll = 0;
        data.fullBoard = true;
        console.log('data = '+JSON.stringify(data.wbData))
        whiteboardArray[whiteboardPageIndex] = dt;
        sendToAll(data)
        //localStorage.setItem('wbdata-'+roomSlotId,JSON.stringify(whiteboardArray))

    }, 1000)
}
var getFullBoardData = (fullDataOrig) => {
    var wbwidth = $('#whiteboard').width();
    var wbheight = $('#whiteboard').height();
    var fullData = fullDataOrig.shapes;
    let newShapes = [];
    for (let index in fullData) {
        let shapeObj = fullData[index]
        shapeObj.senderWbHeight = wbheight;
        shapeObj.senderWbWidth = wbwidth;
        newShapes.push(shapeObj);
    }
    return newShapes;
}
/**
 * function to get last updated whiteboard object
 */
var getLastUpdatedData = (fullDataOrig) => {
    let exstingShapeIds = {};
    if (whiteboardArray[whiteboardPageIndex]) {
        let existingFullData = whiteboardArray[whiteboardPageIndex].shapes;
        for (let existingIndex in existingFullData) {
            let existingShapeObj = existingFullData[existingIndex]
            exstingShapeIds[existingShapeObj.id] = existingShapeObj;
        }
    }
    var wbwidth = $('#whiteboard').width();
    var wbheight = $('#whiteboard').height();
    var fullData = fullDataOrig.shapes;
    let newShapes = [];
    for (let index in fullData) {
        let shapeObj = fullData[index]
        if (exstingShapeIds.hasOwnProperty(shapeObj.id)) {
            if (shapeObj.className == 'LinePath') {
                if (exstingShapeIds[shapeObj.id].data.pointCoordinatePairs[0][0] != shapeObj.data.pointCoordinatePairs[0][0]) {
                    shapeObj.senderWbHeight = wbheight;
                    shapeObj.senderWbWidth = wbwidth;
                    newShapes.push(shapeObj);
                }

            } else {
                if ((exstingShapeIds[shapeObj.id].data.x + exstingShapeIds[shapeObj.id].data.y) != (shapeObj.data.x + shapeObj.data.y)) {
                    shapeObj.senderWbHeight = wbheight;
                    shapeObj.senderWbWidth = wbwidth;
                    newShapes.push(shapeObj);
                }

            }
        } else {
            shapeObj.senderWbHeight = wbheight;
            shapeObj.senderWbWidth = wbwidth;
            newShapes.push(shapeObj);
        }
    }
    return newShapes;
}
/**
 * function get entire objects at receiver side 
 */
 var getFullWbDataOnIntialLoad = (lastShape) => {
     
    var dt = lc.getSnapshot();
    if (lastShape.length > 0) {
        for (let index in lastShape) {
            let newshape = lastShape[index];
            let shapeFound = false;
            for (let index2 in dt.shapes) {
                existShape = dt.shapes[index2];
                if (newshape.id == existShape.id) {
                    dt.shapes[index2] = newshape;
                    shapeFound = true;
                }
            }
            if (shapeFound == false) {
                dt.shapes.push(newshape);
            }
        }
        
    }
    return dt;
}
var getFullWbDataFromLastShape = (lastShape) => {
    if (whiteboardArray[whiteboardPageIndex]) {
        var dt = whiteboardArray[whiteboardPageIndex];
    } else {
        var dt = lc.getSnapshot();
    }
    if (lastShape.length > 0) {
        for (let index in lastShape) {
            let newshape = lastShape[index];
            let shapeFound = false;
            for (let index2 in dt.shapes) {
                existShape = dt.shapes[index2];
                if (newshape.id == existShape.id) {
                    dt.shapes[index2] = newshape;
                    shapeFound = true;
                }
            }
            if (shapeFound == false) {
                dt.shapes.push(newshape);
            }
        }
    }
    return dt;
}
/**
 * function load whiteboard data from dictionary 
 */
var loadWhiteboardData = () => {
    if(whiteboardArray[whiteboardPageIndex]){
        let fullData = whiteboardArray[whiteboardPageIndex];
        lc.loadSnapshot(fullData);
    }else{
        clearBoard();
    }
    //localStorage.setItem('wbdata-'+roomSlotId,JSON.stringify(whiteboardArray))
}
/**
 * function recalculate object size based on screen size
 */
var recalculateCoordinate = (wbdata) => {
    var shapeArray = wbdata;
    var newShapeArray = [];
    if (shapeArray) {
        for (var i = 0; i < shapeArray.length; i++) {
            var shapeObj = shapeArray[i];
            if (!shapeObj.reCalculated) {
                if (shapeObj.className == 'LinePath') {
                    var pointCodArray = shapeObj.data.pointCoordinatePairs;
                    var newPointCodArray = [];
                    for (var j = 0; j < pointCodArray.length; j++) {
                        var points = pointCodArray[j];
                        var newX = recalculateX(points[0], shapeObj.senderWbWidth);
                        var newY = recalculateY(points[1], shapeObj.senderWbHeight) - 15;
                        points = [];
                        points.push(newX);
                        points.push(newY);
                        newPointCodArray.push(points);
                    }
                    shapeObj.data.pointCoordinatePairs = newPointCodArray;

                    // reset next point array

                    var smoothPointCodArray = shapeObj.data.smoothedPointCoordinatePairs;
                    var newSmoothPointCodArray = [];
                    for (var j = 0; j < smoothPointCodArray.length; j++) {
                        var points = smoothPointCodArray[j];
                        var newX = recalculateX(points[0], shapeObj.senderWbWidth);
                        var newY = recalculateY(points[1], shapeObj.senderWbHeight);
                        points = [];
                        points.push(newX);
                        points.push(newY);
                        newSmoothPointCodArray.push(points);
                    }
                    shapeObj.data.smoothedPointCoordinatePairs = newSmoothPointCodArray;
                }
                if (shapeObj.className == 'Ellipse' || shapeObj.className == 'Rectangle' || shapeObj.className == 'Text') {
                    shapeObj.data.x = recalculateX(shapeObj.data.x, shapeObj.senderWbWidth);
                    shapeObj.data.width = recalculateX(shapeObj.data.width, shapeObj.senderWbWidth);
                    shapeObj.data.y = recalculateY(shapeObj.data.y, shapeObj.senderWbHeight);
                    shapeObj.data.height = recalculateY(shapeObj.data.height, shapeObj.senderWbHeight);
                }
                if (shapeObj.className == 'Line') {
                    shapeObj.data.x1 = recalculateX(shapeObj.data.x1, shapeObj.senderWbWidth);
                    shapeObj.data.x2 = recalculateX(shapeObj.data.x2, shapeObj.senderWbWidth);
                    shapeObj.data.y1 = recalculateY(shapeObj.data.y1, shapeObj.senderWbHeight);
                    shapeObj.data.y2 = recalculateY(shapeObj.data.y2, shapeObj.senderWbHeight);
                }
                if (shapeObj.className == 'Image') {
                    shapeObj.data.x = recalculateX(shapeObj.data.x, shapeObj.senderWbWidth);
                    shapeObj.data.y = recalculateY(shapeObj.data.y, shapeObj.senderWbHeight);
                    shapeObj.data.width = recalculateX(shapeObj.data.width, shapeObj.senderWbWidth);
                    shapeObj.data.height = recalculateY(shapeObj.data.height, shapeObj.senderWbHeight);
                }
            }
            shapeObj.reCalculated = true;
            newShapeArray.push(shapeObj);
        }
    }
    wbdata.shapes = newShapeArray;
    return wbdata;
}
var recalculateX = (xVal, senderWbWidth) => {
    var wbWidthHere = $('#whiteboard').width();
    var newX = (xVal / senderWbWidth) * wbWidthHere;
    return newX;

}
var recalculateY = (yVal, senderWbHeight) => {
    var wbHeightHere = $('#whiteboard').height();
    var newY = (yVal / senderWbHeight) * wbHeightHere;
    newY = newY;
    return newY;
}
/**
 * whitebaord image upload
 */
var initWbImageUpload = () => {
    $("#add-image").click(function() {
        if(!havePower){
            showRequestPresentMsg();
            return;
        }
        $('#whiteboard-image-file').trigger('click');
    });
    $('#whiteboard-image-file').fileupload({
        dataType: 'JSON',
        add: function(e, data) {
            var split_filename = data.files[0].name.split(".");
            var file_extension = split_filename[split_filename.length - 1].toLowerCase();
            var filesizeMb = (data.files[0].size) / (1024 * 1024);
            var sezeerror = '';
            if (file_extension == 'jpg' || file_extension == 'png' || file_extension == 'gif' || file_extension == 'jpeg') {
                if (filesizeMb > 25) {
                    sezeerror = 'File size should be less than 25 mb';
                }
            } else {
                sezeerror = "Please upload images";
            }
            if (sezeerror != '') {
                //alert(sezeerror)
                showNotification(sezeerror,true,3000)
            } else {
                jqXHR = data.submit();
            }
        },
        progressall: function(e, data) {
            var progress = parseInt(data.loaded / data.total * 100, 10);
            showNotification('Uploading image :' + progress + '% completed', false, false);
        },
        success: function(d) {
            //alert(JSON.stringify(d))
            var img = d.name;
            addImage(img);
            showNotification('Image successfully uploaded',false,3000)
        }

    })
    var addImage = (image) => {
        var Scale = 1;
        var img = new Image();
        //img.src = '/uploads/' + image;
        img.src = ASSET_DOMAIN+'/uploads/'+ image
        img.crossOrigin = "Anonymous";
        img.onload = function() {
            var imgWidth = img.naturalWidth;
            var wbwidth = $('#whiteboard').width();
            var wbheight = $('#whiteboard').height();
            var newImgHeight = (wbheight / wbwidth) * imgWidth;
            if (wbheight - newImgHeight < 200) {
                Scale = ((wbheight - 250) / newImgHeight);
            }
            let y = 100;
            lc.saveShape(LC.createShape('Image', {
                x: 150,
                y: y,
                image: img,
                scale: Scale
            }))
            sendBoard();
            //$('#tool-move').trigger('click');
        }
    }
}
/**
 * for setting color for shape and pen
 */
var clickColor = () => {
    var colorVal = $('.picker').val();
    lc.setColor('primary', colorVal);
}
let conferenceMode = false;
var switchOrRestConference = () => {
    conferenceMode = !conferenceMode;
    if (conferenceMode) {
        switchToConference();
        //removeYoutube();
        //removeVideo();
    } else {
        $('#right-cam-parent').removeClass('shw-rside');
        resetConference();
    }
    sendToAll({
        method: 'conferenceModeSwitch',
        conferenceMode: conferenceMode
    });

}
var layouContainer = () => {
    var layoutEl1 = document.getElementById("conference");
    layout1 = initLayoutContainer(layoutEl1,{
        maxRatio: 3/4,             // The narrowest ratio that will be used (default 2x3)
        minRatio: 9/16,            // The widest ratio that will be used (default 16x9)
        /*
        fixedRatio: 3/4,         // If this is true then the aspect ratio of the video is maintained and minRatio and maxRatio are ignored (default false)
        */
        scaleLastRow: true,        // If there are less elements on the last row then we can scale them up to take up more space
        alignItems: 'center',      // Can be 'start', 'center' or 'end'. Determines where to place items when on a row or column that is not full
        bigClass: "OT_big",        // The class to add to elements that should be sized bigger
        bigPercentage: 0.8,        // The maximum percentage of space the big ones should take up
        bigFixedRatio: false,      // fixedRatio for the big ones
        bigScaleLastRow: true,     // scale last row for the big elements
        bigAlignItems: 'center',   // How to align the big items
        smallAlignItems: 'center', // How to align the small row or column of items if there is a big one
        maxWidth: Infinity,        // The maximum width of the elements
        maxHeight: Infinity,       // The maximum height of the elements
        smallMaxWidth: Infinity,   // The maximum width of the small elements
        smallMaxHeight: Infinity,  // The maximum height of the small elements
        bigMaxWidth: Infinity,     // The maximum width of the big elements
        bigMaxHeight: Infinity,    // The maximum height of the big elements
        bigMaxRatio: 3/2,          // The narrowest ratio to use for the big elements (default 2x3)
        bigMinRatio: 9/16,         // The widest ratio to use for the big elements (default 16x9)
        bigFirst: true,            // Whether to place the big one in the top left (true) or bottom right (false).
                                   // You can also pass 'column' or 'row' to change whether big is first when you are in a row (bottom) or a column (right) layout
        animate: true,             // Whether you want to animate the transitions using jQuery (not recommended, use CSS transitions instead)
        window: window,            // Lets you pass in your own window object which should be the same window that the element is in
        ignoreClass: 'OT_ignore',  // Elements with this class will be ignored and not positioned. This lets you do things like picture-in-picture
        onLayout: null,            // A function that gets called every time an element is moved or resized, (element, { left, top, width, height }) => {} 
        }
      ).layout;
    var resizeTimeout;
    window.onresize = function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
            layout1();
        }, 20);
    }
}

var onClosevideosmallpanel = () =>{
    $('.mid-parent').removeClass('conf-midparent')
}
var opensidevidpanel = () =>{
    $('.mid-parent').addClass('conf-midparent')
}

var switchToConference = () => {
    $('#conference').append($('#tutor-video'))
    $('#right-cam-parent').removeClass('shw-rside');
    /*
    $('.attendee-video').each(function(index, value) {
      $('#conference').append(this)
    });
    */
    $('.attendee-parent').each(function(index, value) {
        this.classList.remove('list-group-item');
        $('#conference').append(this)
    });
    $('#list').trigger('click');
    $('.view-icons').hide();
    

    $('.conference-switch').addClass('active-menu');
    conferenceMode = true;
    $('.t-rit-c-btns').addClass('right20')
    $('.mid-parent').removeClass('conf-midparent')
    $('#conference').show();
    layout1();
    setTimeout(layout1,500)
    //onFullScreen()

}

var resetConference = () => {

    $('#participant').prepend($('#tutor-video'))
    $('.conference-switch').removeClass('active-menu');
    $('#tutor-video').removeAttr("style");
    /*
    $('.attendee-video').each(function(index, value) {
        $(this).removeAttr("style");
      $('#'+this.id+'-parent').append(this)
    });
    */
    $('.attendee-parent').each(function(index, value) {
        $(this).removeAttr("style");
        $('#userList').append(this)
    });
    $('#grid').trigger('click');
    $('.view-icons').show();
    $('.close_control_btn').trigger('click')
    conferenceMode = false;
    $('.t-rit-c-btns').removeClass('right20')
    $('.mid-parent').addClass('conf-midparent')
    $('#conference').hide();
    //toggleFullScreen(document.getElementById('fullareawb'),true);

}
/*
var switchToConference = ()=>{
      $('#conference').append($('#tutor-video'))
      $('#right-cam-parent').removeClass('shw-rside');
      $('.attendee-video').each(function(index, value) {
        $('#conference').append(this)
      });
      $('#list').trigger('click');
      $('.view-icons').hide();
      layout1();

      $('.conference-switch').addClass('active-menu');
      conferenceMode = true;
     
}

var resetConference = ()=>{
    $('#participant').prepend($('#tutor-video'))
    $('.conference-switch').removeClass('active-menu');
    $('#tutor-video').removeAttr("style");
    $('.attendee-video').each(function(index, value) {
        $(this).removeAttr("style");
      $('#'+this.id+'-parent').append(this)
    });
    $('#grid').trigger('click');
    $('.view-icons').show();
    conferenceMode = false;
   
}
*/

chatInputKeyUp = (e) => {
    var code = (e.keyCode ? e.keyCode : e.which);
    if (code == 13) {
        sendChat(false);
        e.preventDefault();
    }
}


searchDocKeyup = (e) => {
    onSerchDoc();
    e.preventDefault();
}
onSerchDoc = () => {
    $("#presentation-ul li").each(function() {
        if ($(this).data('name').indexOf($('#searchinpdoc').val()) > -1) {
            $(this).show();
        } else {
            $(this).hide();
        }
        if ($('#searchinpdoc').val() == '') {
            $(this).show();
        }
    })
}
searchVidKeyup = (e) => {
    onSerchVid();
    e.preventDefault();
}
onSerchVid = () => {
    $("#youtube-ul1 li").each(function() {
        if ($(this).data('name').indexOf($('#searchinpvid').val()) > -1) {
            $(this).show();
        } else {
            $(this).hide();
        }
        if ($('#searchinpvid').val() == '') {
            $(this).show();
        }
    })
}
searchKeyup = (e) => {
    onSerchChatUser();
    e.preventDefault();
}
onSerchChatUser = () => {
    $("#pv-chat-users-ul li").each(function() {
        if ($(this).data('name').indexOf($('#searchUserInp').val()) > -1) {
            $(this).show();
        } else {
            $(this).hide();
        }
        if ($('#searchUserInp').val() == '') {
            $(this).show();
        }
    })
}
/**
 * Function for sending chat
 */
sendChat = (url) => {
    let chatObj = {};
    chatObj.method = 'chat';
    chatObj.me = true;
    chatObj.link = url;
    if (selectedChatUser == 'public') {
        chatObj.message = $('#chatInput').val();
    } else {
        chatObj.message = $('#pvChatInput').val();
    }

    chatObj.userId = userId;
    chatObj.userName = userName;
    chatObj.chatId = generateUUID();
    chatObj.receiver = selectedChatUser;
    chatObj.sender = userId;
    chatObj.avatar = avatar;
    if ($('#chatInput').val().trim().length > 0 || url) {
        loadChat(chatObj);
        sendToAll(chatObj)
    }else{
        $('#chatInput').val('');
        $('#pvChatInput').val('');
        return;
    }
    putChatOnDict(chatObj, selectedChatUser)
    $('#chatInput').val('');
    $('#pvChatInput').val('');
}
putChatOnDict = (chatObj, key) => {
    //console.log('put on dict = '+JSON.stringify(chatObj)+'//'+key);
    let chatList = [];
    if (chatDictionary.hasOwnProperty(key)) {
        chatList = chatDictionary[key]
    }
    chatList.push(chatObj);
    chatDictionary[key] = chatList;
}
loadChatFromDictionary = (key) => {
    let chatArray = [];
    if (chatDictionary[key]) {
        chatArray = chatDictionary[key];
    }
    $('#chatListPv').html('')
    lastChatedUser = '';
    for (let i = 0; i < chatArray.length; i++) {
        loadChat(chatArray[i]);
    }
}
extention = (filename) => {
    return filename.substr(filename.lastIndexOf('.') + 1)
}
/**
 * 
 * Function for loading chat
 */
loadChat = (chatObj) => {
    let chatHtml = '';
    let chatHtmlRepleated = '';
    if (chatObj.link) {
        chatHtml += '<li  class="chat-popup-user ' + (chatObj.me ? "me" : "other") + '">';
        if (!chatObj.me) {
            chatHtml += '     <div class="chat-img"><img src="' + chatObj.avatar + '" alt="user" /></div>';
        }
        chatHtml += '<div class="chat-content">';
        chatHtml += '     <div id="' + chatObj.chatId + '" class="chat-pop-message file-share">';
        chatHtml += '          <div class="CPM-box"> ';
        if (!chatObj.me) {
            chatHtml += '              <i class="ih3">' + chatObj.userName + '</i>';
        }
        chatHtml += '             <span data-toggle="tooltip" data-placement="left" title="June 6th, 3:46 PM">';
        chatHtml += '                 <img src="' + (videos.indexOf(extention(chatObj.link)) > -1 ? 'images/video.png' : (docFiles.indexOf(extention(chatObj.link)) > -1 ? 'images/doc.png' : (images.indexOf(extention(chatObj.link)) > -1 ? chatObj.link : 'images/unknown.png'))) + '" alt=""/>';
        chatHtml += '                <div class="CPM-file-hover">';
        chatHtml += '                    <ul>';
        chatHtml += '                        <li>';
        chatHtml += '                             <a href="' + chatObj.link + '" target="_blank"><button class="CPMF-btn" title="View"><i class="mr-zoom-in-icon"></i></button></a>';
        chatHtml += '                        </li>';
        if (chatObj.me) {

            chatHtml += '                        <li>';
            chatHtml += '                            <button class="CPMF-btn"  title="Delete"><i class="mr-delete-icon"></i></button>';
            chatHtml += '                        </li>';
        }
        chatHtml += '                        <li>';
        chatHtml += '                           <a href="' + chatObj.link + '" download target="_blank"> <button class="CPMF-btn"  title="download"><i class="mr-download-icon"></i></button></a>';
        chatHtml += '                        </li>';
        chatHtml += '                    </ul>';
        chatHtml += '                </div>';
        chatHtml += '            </span> ';
        chatHtml += '        </div>';
        chatHtml += '        </div>';
        chatHtml += '</div>';
        chatHtml += '</li>';

        chatHtmlRepleated += '          <div class="CPM-box"> ';
        chatHtmlRepleated += '             <span data-toggle="tooltip" data-placement="left" title="June 6th, 3:46 PM">';
        chatHtmlRepleated += '                 <img src="' + (videos.indexOf(extention(chatObj.link)) > -1 ? 'images/video.png' : (docFiles.indexOf(extention(chatObj.link)) > -1 ? 'images/doc.png' : (images.indexOf(extention(chatObj.link)) > -1 ? chatObj.link : 'images/unknown.png'))) + '" alt=""/>';
        chatHtmlRepleated += '                <div class="CPM-file-hover">';
        chatHtmlRepleated += '                    <ul>';
        if (chatObj.me) {
            chatHtmlRepleated += '                        <li>';
            chatHtmlRepleated += '                            <button class="CPMF-btn" title="View"><i class="av av-zoom-in-icon"></i></button>';
            chatHtmlRepleated += '                        </li>';
            chatHtmlRepleated += '                        <li>';
            chatHtmlRepleated += '                            <button class="CPMF-btn"  title="Delete"><i class="av av-delete-icon"></i></button>';
            chatHtmlRepleated += '                        </li>';
        }
        chatHtmlRepleated += '                        <li>';
        chatHtmlRepleated += '                             <a href="' + chatObj.link + '" download target="_blank"> <button class="CPMF-btn"  title="download"><i class="av av-download-icon"></i></button></a>';
        chatHtmlRepleated += '                        </li>';
        chatHtmlRepleated += '                    </ul>';
        chatHtmlRepleated += '                </div>';
        chatHtmlRepleated += '            </span> ';
        chatHtmlRepleated += '        </div>';

    } else {
        if (chatObj.me) {
            chatHtml += '<li  class="chat-popup-user me">';
            chatHtml += '   <div class="chat-content">';
            chatHtml += '       <div id="' + chatObj.chatId + '" class="chat-pop-message togather">';
            chatHtml += '           <div class="CPM-box"> <span data-toggle="tooltip" data-placement="left" title="June 6th, 3:45 PM">' + linkify(chatObj.message) + '</span> </div>';
            chatHtml += '      </div>';
            chatHtml += '   </div>';
            chatHtml += '</li>';

            chatHtmlRepleated += '           <div class="CPM-box"> <span data-toggle="tooltip" data-placement="left" title="June 6th, 3:45 PM">' + linkify(chatObj.message) + '</span> </div>';
        } else {
            chatHtml += '<li class="chat-popup-user other">';
            chatHtml += '     <div class="chat-img"><img src="' + chatObj.avatar + '" alt="user" /></div>';
            chatHtml += '    <div class="chat-content">';
            chatHtml += '        <div id="' + chatObj.chatId + '" class="chat-pop-message togather">';
            chatHtml += '            <div class="CPM-box"><i class="ih3">' + chatObj.userName + '</i> <span  data-toggle="tooltip" data-placement="right" title="June 6th, 3:41 PM">' + linkify(chatObj.message) + '</span> </div>';
            chatHtml += '        </div>';
            chatHtml += '    </div>';
            chatHtml += ' </li>';

            chatHtmlRepleated += '            <div class="CPM-box"><i class="ih3">' + chatObj.userName + '</i> <span  data-toggle="tooltip" data-placement="right" title="June 6th, 3:41 PM">' + linkify(chatObj.message) + '</span> </div>';


        }
    }
    if (lastChatedUser == chatObj.userId && !chatObj.link && lastChatedTab == chatObj.receiver) {
        $('#' + lastChatId).append(chatHtmlRepleated);
    } else {
        if (chatObj.receiver == 'public') {
            $('#chatUl').append(chatHtml);
        } else {
            $('#chatListPv').append(chatHtml);
        }

        lastChatId = chatObj.chatId;
    }
    lastChatedUser = chatObj.userId;
    lastChatedTab = chatObj.receiver;
    if (chatObj.link) {
        lastChatedUser = 0;
    }
    $("#chatUl").scrollTop($("#chatUl").prop("scrollHeight"));
    $("#chatListPv").scrollTop($("#chatListPv").prop("scrollHeight"));

}
let linkify = (inputText) => {
    var replacedText, replacePattern1, replacePattern2, replacePattern3;

    //URLs starting with http://, https://, or ftp://
    replacePattern1 = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
    replacedText = inputText.replace(replacePattern1, '<a href="$1" target="_blank">$1</a>');

    //URLs starting with "www." (without // before it, or it'd re-link the ones done above).
    replacePattern2 = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
    replacedText = replacedText.replace(replacePattern2, '$1<a href="http://$2" target="_blank">$2</a>');

    //Change email addresses to mailto:: links.
    replacePattern3 = /(([a-zA-Z0-9\-\_\.])+@[a-zA-Z\_]+?(\.[a-zA-Z]{2,6})+)/gim;
    replacedText = replacedText.replace(replacePattern3, '<a href="mailto:$1">$1</a>');

    return replacedText;
}
/**
 * For loading private chat list
 */
var loadPrivateChatList = (user) => {
    if ($('#user-' + user.clientId).length) {
        return false;
    }
    let privateChatUsersHtml = '';
    privateChatUsersHtml += '<li onclick="onPvUserSelect(\'' + user.userId + '\',\'' + user.userName + '\')" data-name="' + user.userName + '" class="pvusers usersliPvChat user-'+user.userId+'" id="user-' + user.clientId + '">';
    privateChatUsersHtml += '<a href="javascript:void(0)">';
    privateChatUsersHtml += '<div class="avatar-circle">'+getTwoLetter(user.userName)+'<span class="chat-message-show chat-mgs-dot" style="display: none;">&nbsp;</span></div>';
    privateChatUsersHtml += '<div class="chat-user-cont-box"><div class="chat-user-cont">';
    privateChatUsersHtml += '<span>' + user.userName + ' <small class="text-message"></small></span>';
    privateChatUsersHtml += ' </div>';
    privateChatUsersHtml += '</div>';
    privateChatUsersHtml += '</a>';
    privateChatUsersHtml += '</li>';
    return (privateChatUsersHtml);
};
var onPvUserSelect = (userId, userName) => {
    selectedChatUser = userId;
    $('#pvChatList').show();
    $('#pvsearch').addClass('invisible');
    loadChatFromDictionary(selectedChatUser);
    $('#selectChatUsrName').html('<span class="pvuserhead"><i class="mr-undo-icon"></i> ' + userName + '</span>');
    $("#chatListPv").scrollTop($("#chatListPv").prop("scrollHeight"));
    $('.user-'+userId+' > a > div > .chat-message-show').hide();
    
}
var onPvChatFromUserList = (userId, userName) => {
    $('#showChat').trigger('click');
    $('#pvchatSelect').trigger('click');
    onPvUserSelect(userId, userName);
    //s$('#right-cam-parent').removeClass('shw-rside');
}
var closeChat = () => {
    $('#showChat').trigger('click')
}
var chatOpenClicked = () => {
    $('#showChat > .chat-mgs-dot').hide();
    
    //$('#chat-par-cont').toggle();
}
var onSelectPublicChat = () => {
    selectedChatUser = 'public';
    $('#pvChatList').hide();
    $("#chatUl").scrollTop($("#chatUl").prop("scrollHeight"));
}
var onPvTabSelected = () => {
    $('#selectChatUsrName').html('User');
    $('#pvsearch').removeClass('invisible');
    $('.person-chat > .chat-message-show').hide();
}
var pvFileuplClick = () => {
    $('#chat-file').trigger('click');
}
var onBackPvList = () => {
    
    $('#pvChatList').hide();
    $('#pvsearch').removeClass('invisible');
    $('#selectChatUsrName').html('User');
    selectedChatUser = 'public';
    
}
/**
 * push notifications
 */
pushNotification = (userName, content) => {
        if (allowNotification) {
            playAudio(.3);
            
        }
        let id = generateUUID();
        let notificationHtml = '<li class="noti-bx" id="' + id + '">';
        notificationHtml += '<div class="cmn-profile-pic"><div class="avatar-circle big-avt">'+getTwoLetter(userName)+'</div></div>';
        notificationHtml += '<div class="notification-content-area">';
        notificationHtml += '<div class="notification-content">' + content + '</div>';
        notificationHtml += '<div class="notification-time"> 17 June 2020  04:45 PM  </div>';
        notificationHtml += '<div class="noti_accept_part">';
        notificationHtml += '<button class="noti_accept hide" type="button"><i class="av av-check-bold-icon"></i></button>';
        notificationHtml += '<button onclick="removeNot(\'' + id + '\')" class="noti_accept noti_reject" type="button"><i class="mr-close-icon"></i></button>';
        notificationHtml += '</div>';
        notificationHtml += '</div>';
        notificationHtml += '</li>';
        $('#pushNotifList').append(notificationHtml);
        $('.chat-message-show noti-msg-dot').show();
        if(!$('.notification-dd').hasClass('open')){
            $('.count-status-dot').show();
            $('.count-status-dot').html(parseInt($('.count-status-dot').html())+1)
        }
        
    
}
onNotificationClicked = () => {
    $('.noti-msg-dot').hide();
}
removeNot = (id) => {
    $('#' + id).remove();
}
changeMuteNot = () => {
    allowNotification = !$('#switch').is(':checked');
    showNotification((allowNotification ? 'Unmuted' : 'Muted') + " notification sound", false, 3000)
}


/**
 * whitebaord image upload
 */
var initChatFileUpload = () => {
    $('#chat-file').fileupload({
        dataType: 'JSON',
        add: function(e, data) {
            var split_filename = data.files[0].name.split(".");
            var file_extension = split_filename[split_filename.length - 1].toLowerCase();
            var filesizeMb = (data.files[0].size) / (1024 * 1024);
            var sezeerror = '';
            if (file_extension != 'exe') {
                if (filesizeMb > 100) {
                    sezeerror = 'File size should be less than 100 mb';
                }
            } else {
                sezeerror = "Invalid file";
            }
            if (sezeerror != '') {
                showNotification(sezeerror,true,3000)
            } else {
                jqXHR = data.submit();
            }
        },
        progressall: function(e, data) {
            var progress = parseInt(data.loaded / data.total * 100, 10);
            showNotification('Uploading file :' + progress + '% completed', false, false);
        },
        success: function(d) {
            //alert(JSON.stringify(d))
            var img = d.name;
            uploadedChatFile = ASSET_DOMAIN+'/uploads/' + img;
            sendChat(uploadedChatFile);
            showNotification('File successfully uploaded',false,3000)
        }
    })
}

/**
 * 
 * For sharing youtube video 
 */
var onShareYoutube = () => {
    if (!havePower) {
        showRequestPresentMsg();
        return;
    }
    /*if ($('.y-share').hasClass('add')) {
        removeYoutube();
        removeVideo();
        sendToAll({
            method: 'removeVideo'
        });
        sendToAll({
            method: 'removeyoutube'
        });
    } else {*/
        let docForm = ' <div class="av-default-tabs spacing-adjust">';
        docForm += '    <div class="ah-tab-wrapper">';
        docForm += '        <div class="ah-tab">';
        docForm += '            <a id="upldtb" onclick="selectUploadTab()" class="ah-tab-item" data-ah-tab-active="true" href="javascript:void(0);">Upload</a>';
        docForm += '            <a id="chtb" onclick="selectChooseTab()" class="ah-tab-item" href="javascript:void(0);">Choose</a>';
        docForm += '        </div>';
        docForm += '    </div>';
        docForm += '    <div class="ah-tab-content-wrapper">';
        docForm += '   <div id="uploadtabcontent" class="ah-tab-content videotab" data-ah-tab-active="true">';
        docForm += '<div class="share-file-upload-btn upload_video_out_box"><div class="upload-button" onclick="videoUploadTrigger()"><i class="upload-icon-img"><img src="images/upload-files-icon.svg" alt=""></i><div class="add-file-size-text"><span>Upload Video</span><p>Upload Video (Format:mp4)</p></div></div></div>';
        docForm += '<div class="or-divider"> <span>OR</span> </div><div class="video-url-input-bx"><div class="video-share-input-bx"> <input class="y-input video-share-input input_section" placeholder="Paste youtube URL here"/><button class="btn cmn-btn save-video-btn" onclick="onShareYoutubeID()" class="YShareBtn">Share</button></div></div><div style="display:none" id="video-upload-prog-parent" class="file-upload-status upload_section" data-title="Action"> <div class="uploading-share-box"><strong class="uploading-heading">Uploading...</strong>  <div class="loader-inside">  <i class="upload-file-icon mr-file-ext-icon"></i><div class="progress"> <div id="video-up-progbar" class="progress-bar" style="width:0%"></div></div></div></div></div>';
        docForm += '<div class="s-f-l-outer" style="display:none"><ul id="youtube-ul" class="share-files-list">';
        docForm += '</ul></div>';
        docForm += '</div>';
        docForm += '<div id="choosetabcontent" class="ah-tab-content videotab scroll-shadows-one">';       
        docForm += '<div class="uploaded-search-files"><div class="btn-input"> <input onkeyup="searchVidKeyup()" id="searchinpvid" type="email" class="form-control" placeholder="Search File" value=""><button class="btn input-btn" type=""><i class="lm lm-search-icon"></i></button> </div> <ul id="youtube-ul1" class="share-files-list">';
        docForm += '</ul></div>';      
        docForm += '</div>';
        docForm += '</div>';

        showModal('Share Video', docForm, '', 'share-video-popup')
        //alert(docForm)
        getSavedFiles();
   // }
}
var videoUploadTrigger = () => {
    $('#mp4-file').trigger('click')
}
var initVideoUpload = () => {

    $('#mp4-file').fileupload({
        dataType: 'JSON',
        add: function(e, data) {
            var split_filename = data.files[0].name.split(".");
            var file_extension = split_filename[split_filename.length - 1].toLowerCase();
            var filesizeMb = (data.files[0].size) / (1024 * 1024);
            var sezeerror = '';
            if (file_extension == 'mp4') {
                if (filesizeMb > 50) {
                    sezeerror = 'File size should be less than 50 mb';
                }
            } else {
                sezeerror = "Please upload a valid mp4 file";
            }
            if (sezeerror != '') {
                showNotification(sezeerror, true, 3000);
            } else {
                jqXHR = data.submit();
                document.getElementById('video-upload-prog-parent').style.display = 'flex';
            }
        },
        progressall: function(e, data) {
            var progress = parseInt(data.loaded / data.total * 100, 10);
            showNotification('Uploading video :' + progress + '% completed', false, false);
            document.getElementById('video-up-progbar').style.width = progress + '%';
        },
        success: function(d) {
            document.getElementById('video-upload-prog-parent').style.display = 'none';
            showNotification('Video uploaded successfully.', false, 3000);
            getSavedFiles();
            let documentSrc = '/uploads/' + d.name;
            $.ajax({
                url: DOMAIN + "/save-file",
                data: {
                    room: room,
                    fileNameOrg: d.org_name,
                    fileNameUnique: d.name,
                    type: 'mp4video',
                    status: '1'
                },
                method: "POST",
                success: function(d) {
                    getSavedFiles();
                }
            });
            loadVideo(d.name);
            $('#myModal').modal('hide');
            //loadPresentation(documentSrc);
            //console.log(documentSrc);
        }
    })
}
let mp4player;
var loadVideo = (videoUrl) => {
    if(meetingStatus !== 'started'){
        showNotification('you cannot share video since the '+eventType+' is not started',false,3000)
        return;
    }
    sendToAll({
        method: 'loadVideo',
        url: videoUrl
    });
    
    loadVideoInaction(videoUrl);
    
    
}

var releaseYoutubeSyncLock = () =>{
    if(window.youtubeSyncLockTimeout){
        clearTimeout(window.youtubeSyncLockTimeout);
    }
    window.youtubeSyncLockTimeout = setTimeout(()=>{
        youTubeSyncLock = false;
    },3000)
}
var releaseMp4SyncLock = () =>{
    if(window.mp4SyncLockTimeout){
        clearTimeout(window.mp4SyncLockTimeout);
    }
    window.mp4SyncLockTimeout = setTimeout(()=>{
        mp4SyncLocked = false;
    },3000)
}
var addMp4VideoListeners = (videoUrl)=>{
    if(mp4player){
        mp4player.removeEventListener("play");
        mp4player.removeEventListener("pause");
        mp4player.removeEventListener("mp4Seek");
    }
    mp4player = document.getElementById('mp4Video');
    
    mp4player.addEventListener("play", function() {
        if(!mp4SyncLocked && havePower){
            sendToAll({
                method: 'mp4Play',
                url: videoUrl,
                time: mp4player.currentTime
            });
        }
        
    });
    mp4player.addEventListener("pause", function() {
        if(!mp4SyncLocked && havePower){
            sendToAll({
                method: 'mp4Pause',
                url: videoUrl,
                time: mp4player.currentTime
            });
        }
    });
    mp4player.onseeking = function() {
        if(!mp4SyncLocked && havePower){
            sendToAll({
                method: 'mp4Seek',
                url: videoUrl,
                time: mp4player.currentTime,
                
            });
        }
    };
    
}
var loadVideoInaction = (videoUrl) => {
    currentVideo =  ASSET_DOMAIN+'/uploads/'+ videoUrl;
    document.getElementById('mp4Video').src = currentVideo;
    document.getElementById('mp4Video').play();
    $('#mp4video-parent').show();
    
    //$('#right-cam-parent').removeClass('shw-rside');
    removeYoutube();
    currentContenBlock = 'video';
    $('.y-share').addClass('active-menu');
    if(mode == 'presenter' || havePower){
        $('.content-close-btn').show();
    }
    addMp4VideoListeners(videoUrl);
}
var removeVideo = () => {
    document.getElementById('mp4Video').src = 'null';
    $('#mp4video-parent').hide();
    
    $('.y-share').removeClass('active-menu');
}

function onShareYoutubeID() {
    var url = $('.video-share-input').val();
    $('.video-share-input').removeClass('error')
    if (url) {
        var videoId = getYoutubeId(url);
        if (videoId) {
            $('.video-share-input').val('');
            onPlayAndShareYoutube(videoId);
            $.ajax({
                url: DOMAIN + "/save-youtube",
                data: {
                    room: room,
                    id: videoId
                },
                method: "POST",
                success: function(d) {
                    getSavedFiles();
                }
            });
            $('#myModal').modal('hide')
        }

    } else {
        $('.video-share-input').addClass('error')
    }

}
var onPlayAndShareYoutube = (videoId) => {
    
    currentVideoId = videoId
    $(".video-share-input").val("");
    var data = {};
    data.method = 'onYoutubeSare';
    data.id = videoId;
    sendToAll(data);
    showLoader('',false);
    youtubeIdClientIdMap[currentVideoId] = myClientId;
    currentContenBlock = 'youtube';
    $('.y-share').addClass('active-menu');
}

function getYoutubeId(url) {
    var videoid = url.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/);
    if (videoid != null) {
        $('.video-share-input').removeClass('error');
        return videoid[1];
    } else {
        $('.video-share-input').addClass('error');
        showNotification('Invalid youtube url', true, 3000);
        return false;
    }
}

function onYouTubeIframeAPIReady() {
    var playerVars = {
        'controls': 1,
        'showinfo': 0,
        'loop': 1
    };
    initializeYPlayer(playerVars);
}

function initializeYPlayer(playerVars) {
    player = new YT.Player('youtube-share', {
        width: 600,
        height: 400,
        videoId: currentVideoId,
        playerVars: playerVars,
        events: {
            onReady: initialize,
            onStateChange: onPlayerStateChange
        }
    });
}

function initialize() {

}

function onPlayerStateChange(event) {
    //if (youtubeIdClientIdMap[currentVideoId]) {
    if (havePower && !youTubeSyncLock) {
        if (event.data == YT.PlayerState.PLAYING) {
            var moduleData = {};
            moduleData.method = 'youtubePlayOrSeek';
            moduleData.time = player.getCurrentTime();
            sendToAll(moduleData);
        }
        if (event.data == YT.PlayerState.PAUSED) {
            var moduleData = {};
            moduleData.method = 'youtubePause';
            moduleData.time = player.getCurrentTime();
            sendToAll(moduleData);
        }
    }
}
var removeYoutube = () => {
    $('#youtube-share').hide();
    if (player) {
        try {
            player.pauseVideo();
        } catch (e) {

        }
    }
    $('.y-share').removeClass('active-menu');
}
var onCopyUrl = () => {
    let uid = (Math.floor(Math.random() * 10000) + 10000).toString().substring(1);
    let name = $('#usernameInvite').val();
    if (!name) {
        $('.nameinvparent').addClass('error');
    } else {
        $('#meetingurl').val('https://liberate.avniksofttech.com/join/?room=' + room + '&mode=viewer&userName=' + name + '&userId=' + uid);
        var copyText = document.getElementById('meetingurl');
        copyText.select();
        document.execCommand("copy");
        showModal("Message", "Copied invite url to clipboard", '', '');
        $('.nameinvparent').removeClass('error');
        $('#usernameInvite').val('');
    }

}
/**
 * 
 *For sharing presentation 
 */
/* javascript-obfuscator:disable */ 
var selectUploadTab = () => {
    $('#chtb').removeAttr('data-ah-tab-active')
    $('#upldtb').attr('data-ah-tab-active', 'true')

    $('#choosetabcontent').removeAttr('data-ah-tab-active')
    $('#uploadtabcontent').attr('data-ah-tab-active', 'true')
    $('.s-f-l-outer').hide();
}
var selectChooseTab = () => {
    $('#upldtb').removeAttr('data-ah-tab-active')
    $('#chtb').attr('data-ah-tab-active', 'true')

    $('#uploadtabcontent').removeAttr('data-ah-tab-active')
    $('#choosetabcontent').attr('data-ah-tab-active', 'true')
    $('.s-f-l-outer').show();
}
/* javascript-obfuscator:enabled */ 
var onSharePresentation = () => {
    if (!havePower) {
        showRequestPresentMsg();
        return;
    }
    
        let docForm = '';
        docForm += ' <div class="av-default-tabs spacing-adjust">';
        docForm += '    <div class="ah-tab-wrapper">';
        docForm += '        <div class="ah-tab">';
        docForm += '            <a id="upldtb" onclick="selectUploadTab()" class="ah-tab-item" data-ah-tab-active="true" href="javascript:void(0);">Upload</a>';
        docForm += '            <a id="chtb" onclick="selectChooseTab()" class="ah-tab-item" href="javascript:void(0);">Choose</a>';
        docForm += '        </div>';
        docForm += '    </div>';
        docForm += '    <div class="ah-tab-content-wrapper">';
        docForm += '   <div id="uploadtabcontent" class="ah-tab-content doctab" data-ah-tab-active="true">';
        docForm += '   <div class="share-file-upload-btn upload_page_section"> <div class="upload-button" onclick="pptUploadTrigger()"><i class="upload-icon-img"><img src="images/upload-files-icon.svg" alt=""></i></a><div class="add-file-size-text"><span>Upload Documents</span><p>Add a File (maximum file size 20mb) <br/>[pdf,doc,docx,xls,xlsx,ppt,pptx]</p></div></div></div><div style="display:none" id="prog-file-parent" class="file-upload-status" data-title="Action"><div class="uploading-share-box"><strong class="uploading-heading">Uploading...</strong><div class="loader-inside"> <i class="upload-file-icon mr-file-ext-icon"></i><div class="progress"> <div id="progress-doc" class="progress-bar" style="width:0%"></div></div></div></div></div>';
        
        docForm += '   </div>';
        docForm += '    <div id="choosetabcontent" class="ah-tab-content doctab scroll-shadows-one">';
        docForm += '    <div class="share-contact-group">';
        docForm += '    <div class="form-group hide">';
        docForm += '    <input type="text" placeholder="Search File" value="" class="form-control" />';
        docForm += '    <button class="btn cmn-btn"><i class="mr-search-icon search_icon_mobile_section"></i></button>';
        docForm += '    </div>';
        docForm += '    </div>';
        docForm += '    <div class="uploaded-search-files"><div class="btn-input"> <input onkeyup="searchDocKeyup()" id="searchinpdoc" type="email" class="form-control" placeholder="Search File" value=""><button class="btn input-btn" type=""><i class="lm lm-search-icon"></i></button> </div><ul id="presentation-ul" class="share-files-list">';
        docForm += '    </ul></div>';
        docForm += '    <div class="image-video-list hide">';
        docForm += '    <ul class="cmn-ul-list"><li><input type="checkbox" id="myCheckbox1" /> <label for="myCheckbox1"><img src="images/event-12.jpg" /></label> </li> <li> <input type="checkbox" id="myCheckbox2" /> <label for="myCheckbox2"><img src="images/event-12.jpg" /></label> </li>  </ul >';
        docForm += '    </div>';
        docForm += '    </div>';
        docForm += '</div>';
        showModal('Share Document', docForm, '', 'share-document-popup')
        getSavedFiles();
    
}
var pptUploadTrigger = () => {
    $('#ppt-file').trigger('click')
}
var initPresentationUpload = () => {

    $('#ppt-file').fileupload({
        dataType: 'JSON',
        add: function(e, data) {
            var split_filename = data.files[0].name.split(".");
            var file_extension = split_filename[split_filename.length - 1].toLowerCase();
            var filesizeMb = (data.files[0].size) / (1024 * 1024);
            var sezeerror = '';
            if (['doc', 'docx', 'xls','xlsx', 'ppt', 'pptx', 'pdf'].indexOf(file_extension) > -1) {
                if (filesizeMb > 25) {
                    sezeerror = 'File size should be less than 25 mb';
                }
            } else {
                sezeerror = "Please upload a valid file";
            }
            if (sezeerror != '') {
                showNotification(sezeerror, true, 3000);
            } else {
                jqXHR = data.submit();
                document.getElementById('prog-file-parent').style.display = 'flex';
            }
        },
        progressall: function(e, data) {
            var progress = parseInt(data.loaded / data.total * 100, 10);
            // showNotification('Uploading file :' + progress + '% completed', false, false);

            document.getElementById('progress-doc').style.width = progress + '%';
        },
        success: function(d) {
            document.getElementById('prog-file-parent').style.display = 'none';
            showNotification('Document uploaded successfully.', true, 5000);
            getSavedFiles();
            let documentSrc = '/uploads/' + d.name;
            $.ajax({
                url: DOMAIN + "/save-file",
                data: {
                    room: room,
                    fileNameOrg: d.org_name,
                    fileNameUnique: d.name,
                    type: 'presentation',
                    status: '1',
                    pages:d.pages
                },
                method: "POST",
                success: function(d) {
                    getSavedFiles();
                }
            });
            loadPresentation(d.name,d.pages);
            $('#myModal').modal('hide');
            //loadPresentation(documentSrc);
            //console.log(documentSrc);
        }
    })
}
var loadPresentation = (pdfUrl,totalpages) => {
    //alert(pdfUrl)
    if(meetingStatus !== 'started'){
        showNotification('you cannot share presentation since the '+eventType+' is not started',false,3000)
        return;
    }
    pdfUrl = pdfUrl.split('.').slice(0, -1).join('.')
    if (window.location.href.indexOf('localhost') > -1) {
        pdfUrl = 'test';
        totalpages = 2;
    }
    sendToAll({
        method: 'loadPresentation',
        url: pdfUrl,
        totalpages:totalpages
    });
    $('.pagen').val('1');
    currentSlide = 1;
    loadPresentationInaction(pdfUrl,totalpages);
    
    


}
var loadPresentationInaction = (pdfUrl,totalpages) => {
    currentTotalSlides = totalpages;
    $('#presentation').show();
    $('#right-cam-parent').removeClass('shw-rside');
    let pagesHtml = '';
    if(totalpages == 1){
        pagesHtml += '<img class="slide currentslide page-1" src="'+ASSET_DOMAIN+'/uploads/'+pdfUrl+'/page.png"/>';
    }else{

        for(let i = 1; i<= totalpages; i++){
            if(i === currentSlide){
                pagesHtml += '<img class="slide currentslide page-'+i+'" src="'+ASSET_DOMAIN+'/uploads/'+pdfUrl+'/page-'+(i-1)+'.png"/>';
            }else{
                pagesHtml += '<img class="slide page-'+i+'" src="'+ASSET_DOMAIN+'/uploads/'+pdfUrl+'/page-'+(i-1)+'.png"/>';
            }
            
        }
    }
    $('.slide-parent').html(pagesHtml);
    $('.slide').hide();
    $('.currentslide').fadeIn();
    $('.p-share').addClass('active-menu'); 
    //showLoader('Loading Document',false);
    //setTimeout(hideLoader, 5000)
    //showNotification('Dcocument loading on progress please wait...', false, 3000);

    // stopScreenShare();
    resetConference();
    removeVideo();
    removeYoutube();
    currentContenBlock = 'presentation';
    $('.disabledoctool').removeClass('disable')
    if(mode == 'presenter' || havePower){
        $('.zoom-blk').show();
        $('.content-close-btn').show();
    }
    whiteboardPageIndex = 1;
    clearAllPageWbData();
    loadWhiteboardData();
    $('#tool-move').trigger('click')

}
var clearAllPageWbData = () =>{
    for(let k in whiteboardArray){
        if(whiteboardArray[k]){
            if(k > 0){
                delete whiteboardArray[k]
            }
        }
    }
}
var removeContent = () => {
    if (currentContenBlock === 'presentation') {
        removePresentation();
        $('.content-close-btn').hide();
    } else if (currentContenBlock === 'youtube') {
        removeYoutube();
        if(document.getElementById('presentation').style.display === 'none'){
            $('.content-close-btn').hide();
            currentContenBlock = '';
        }else{
            currentContenBlock = 'presentation'
        }
        sendToAll({
            method: 'removeyoutube'
        });

    } else if (currentContenBlock = 'video') {
        removeVideo();
        if(document.getElementById('presentation').style.display === 'none'){
            $('.content-close-btn').hide();
            currentContenBlock = '';
        }else{
            currentContenBlock = 'presentation'
        }
        sendToAll({
            method: 'removeVideo'
        });
    }

}
var controlContentCloseButton = () =>{
    if (currentContenBlock === 'presentation') {
        $('.content-close-btn').hide();
    } else if (currentContenBlock === 'youtube') {
        if(document.getElementById('presentation').style.display === 'none'){
            $('.content-close-btn').hide();
            currentContenBlock = '';
        }else{
            currentContenBlock = 'presentation'
        }
    } else if (currentContenBlock = 'video') {
        if(document.getElementById('presentation').style.display === 'none'){
            $('.content-close-btn').hide();
            currentContenBlock = '';
        }else{
            currentContenBlock = 'presentation'
        }
    }
}
var removePresentation = () => {
    //let pdfFrame = document.getElementById('pdfFrame');
    //pdfFrame.src = '';
    sendToAll({
        method: 'removePresentation'
    });
    removepresentationInAction();
}
var removepresentationInAction = () =>{
    $('#presentation').fadeOut();
    $('.p-share').removeClass('active-menu');
    $("#whiteboard").scrollLeft(0);
    $("#whiteboard").scrollTop(0)
    //lc.setZoom((1));
    $('.disabledoctool').addClass('disable')
    $('.zoom-blk').hide();
    $('.pagen').val('1');
    currentSlide = 1;
    whiteboardPageIndex  = 0;
    loadWhiteboardData();
    for(let key in whiteboardArray){
        if(key > 0){
            delete whiteboardArray[key]
        }
    }
}
var gotToPage = (page) =>{
    $('.slide').hide();
    $('.page-'+page).fadeIn()
    $('.pagen').val(page);
    currentSlide = page;
    whiteboardPageIndex  = page;
    loadWhiteboardData();
}
function onPageSwitch(page) {
    gotToPage(page);
    sendToAll({
        method: 'presentationSWitch',
        url: currentPresentation,
        page: page
    });
}

var onFullScreen = () => {
    toggleFullScreen(document.getElementById('body'), false);
}

var onNext = () => {
    if (!havePower) {
        showRequestPresentMsg();
        return;
    }
    if(meetingStatus !== 'started'){
        showNotification('you cannot switch pages since the '+eventType+' is not started',false,3000)
        return;
    }
    if(currentSlide < currentTotalSlides){
        currentSlide++;
        onPageSwitch((currentSlide))
    }
    
}
var onPrevious = () => {
    if (!havePower) {
        showRequestPresentMsg();
        return;
    }
    if(meetingStatus !== 'started'){
        showNotification('you cannot switch pages since the '+eventType+' is not started',false,3000)
        return;
    }
    if(currentSlide > 1){
        currentSlide--;
        onPageSwitch((currentSlide))
    }
}

var onZoomIn = () => {
    if(meetingStatus !== 'started'){
        showNotification('you cannot zoom since the '+eventType+' is not started',false,3000)
        return;
    }
    if(zoomVal < maxZoom){
        zoomVal = zoomVal + .2;
        zoomVal = parseFloat(zoomVal.toFixed(2))
        let percentage = parseInt(100 * zoomVal);
        onZoom(percentage)
        sendToAll({
            method: 'onZoom',
            percentage: percentage
        });
       
    }
    
}
var onZoom = (percentage) =>{
        $('.slide').css({'width': percentage+'%'});
        $('.slide').css({'height': percentage+'%'});
        $('.zoomval').html(percentage+'%')
        let scrollHeight =  $(".slide-parent").prop("scrollHeight") - $(".slide-parent").height();
        scrollHeight = scrollHeight / 2;
        if(scrollHeight > 0){
            //$(".slide-parent").scrollTop(scrollHeight);
        }

        let scrollWidth =  $(".slide-parent").prop("scrollWidth") - $(".slide-parent").width();
        scrollWidth = scrollWidth / 2;
        if(scrollWidth > 0){
            $(".slide-parent").scrollLeft(scrollWidth);
           // let leftToChange = (scrollWidth/$(".slide-parent").width()) * $("#whiteboard").width();
           // $("#whiteboard").scrollLeft(leftToChange);
        }
        //clearBoard();
        //lc.setZoom((percentage/100));
/*
        let whitebdWidth = $('#whiteboard-area').width();
        let whitebdHeight = $('#whiteboard-area').height();
        let newWidth  = whitebdWidth * (percentage / 100);
        let newHeight = whitebdHeight * (percentage / 100);
        $('#whiteboard-area').width(newWidth);
        $('#whiteboard-area').height(newHeight);
        // zooming whiteboard
        $("canvas").each(function(elem,i) {
               $(this).width(newWidth);
               $(this).height(newHeight);
        });
        */
}
var onZoomOut = () => {
    if(zoomVal> 1){
        zoomVal = zoomVal - .2;
        zoomVal = parseFloat(zoomVal.toFixed(2))
        let percentage = parseInt(100*zoomVal);
        onZoom(percentage)
        sendToAll({
            method: 'onZoom',
            percentage: percentage
        });
    }

}
var toggleWbTools = () =>{
    $('.wbtoollist').toggle();
}
var bottomControlOptionToggle = () =>{
    $('.bottommenus').toggle();
}
var getSavedFiles = () => {
    $.ajax({
        url: DOMAIN + "/get-files",
        data: {
            room: room
        },
        method: "POST",
        success: function(d) {
            d = JSON.parse(d)
            processSavedFileList(d.results)
            getSavedFilesScheduler()
        }
    });
}
var getSavedFilesScheduler = () => {
    $.ajax({
        url: API_BASE_URL+"fileManager",
        headers: {
            'Accept': 'application/json',
            authorization: 'Bearer ' + accessToken
        },
        method: "GET",
        success: function(d) {
            processSavedFileScheduler(d)
        }
    });
}
var processSavedFileScheduler = (files) => {
    files = files.data.data;
    for (let i = 0; i < files.length; i++) {
        let file = files[i];
        if (file.name.length > 40) {
            file.name = file.name.substring(0, 40) + '...';
        }
        if (file.type === 'pdf') {
            presentationHtml += '<li data-name="'+file.name+'"><div class="doc-name">' + file.name + '</div><div class="file-size hide">3.4 GB</div> <div class="doc-btn-grp"><button data-dismiss="modal" onclick="loadPresentation(\'' + file.file_url + '\','+file.pages+')" class="link-btn"><i class="mr-share-icon" data-cooltipz-dir="lrft" aria-label="Share"></i></button> <button  onclick="deleteFile(\'' + file.id + '\')" class="link-btn" data-cooltipz-dir="lrft" aria-label="Delete"><i class="mr-delete-icon delete_icon_section"></i></button></div></li>'
        } else if (file.type === 'mp4' || file.type === 'webm') {
            youtubeHtml += '<li data-name="'+file.name+'"><div class="doc-name">' + file.name + '</div><div class="file-size hide">3.4 GB</div><div class="doc-btn-grp"><button data-dismiss="modal" onclick="loadVideo(\'' + file.file_url + '\')" class="link-btn" data-cooltipz-dir="lrft" aria-label="Share"><i class="mr-share-icon"></i></button> <button onclick="deleteFile(\'' + file.id + '\')" class="link-btn" data-cooltipz-dir="lrft" aria-label="Delete"><i class="mr-delete-icon delete_icon_section"></i></button></div></li>'
        } else {
            presentationHtml += '<li data-name="'+file.name+'"><div class="doc-name">' + file.name + '</div><div class="file-size hide">3.4 GB</div> <div class="doc-btn-grp"><button class="link-btn"><a href="' + file.file_url + '" target="_blank" download="' + file.name + '"><i class="mr-download-icon"></i></a></button> <button onclick="deleteFile(\'' + file.id + '\')" class="link-btn" data-cooltipz-dir="lrft" aria-label="Delete"><i class="mr-delete-icon delete_icon_section"></i></button></div></li>'
        }
    }
    if (!presentationHtml) {
        presentationHtml = '<h4 class="upload-files-heading">No saved documents found !</h4>';
    }
    if (!youtubeHtml) {
        youtubeHtml = '<div class="no-saved-files-bx"><h4>No saved videos found !</h4></div>';
    }
    $('#presentation-ul, #presentation-ul1').html(presentationHtml);
    $('#youtube-ul, #youtube-ul1').html(youtubeHtml);
}
var processSavedFileList = (files) => {
    presentationHtml = '';
    youtubeHtml = '';
    for (let i = 0; i < files.length; i++) {
        let file = files[i];
        if (file.fileNameOrg.length > 40) {
            file.fileNameOrg = file.fileNameOrg.substring(0, 40) + '...';
        }
        switch (file.type) {
            case 'presentation':
                //let documentSrc = '/uploads/' + file.fileNameUnique;
                presentationHtml += '<li data-name="'+file.fileNameOrg+'"><div class="doc-name">' + file.fileNameOrg + '</div><div class="file-size hide">3.4 GB</div> <div class="doc-btn-grp"><button data-dismiss="modal" onclick="loadPresentation(\'' + file.fileNameUnique + '\','+file.pages+')" class="link-btn"><i class="mr-share-icon"></i></button> <button onclick="deleteFile(\'' + file._id + '\')" class="link-btn"><i class="mr-delete-icon delete_icon_section"></i></button></div></li>'
                break;
            case 'youtube':
                youtubeHtml += '<li data-name="'+file.fileNameOrg+'"><div class="doc-name">' + file.fileNameOrg + '</div><div class="file-size hide">3.4 GB</div><div class="doc-btn-grp"><button data-dismiss="modal" onclick="onPlayAndShareYoutube(\'' + file.fileNameUnique + '\')" class="link-btn"><i class="mr-share-icon"></i></button> <button onclick="deleteFile(\'' + file._id + '\')" class="link-btn"><i class="mr-delete-icon delete_icon_section"></i></button></div></li>'
                break;
            case 'mp4video':
                youtubeHtml += '<li data-name="'+file.fileNameOrg+'"><div class="doc-name">' + file.fileNameOrg + '</div><div class="file-size hide">3.4 GB</div><div class="doc-btn-grp"><button data-dismiss="modal" onclick="loadVideo(\'' + file.fileNameUnique + '\')" class="link-btn"><i class="mr-share-icon"></i></button> <button onclick="deleteFile(\'' + file._id + '\')" class="link-btn"><i class="mr-delete-icon delete_icon_section"></i></button></div></li>'
                break;
            default:
                break;
        }
    }
    if (!presentationHtml) {
        presentationHtml = '<h4 class="upload-files-heading">No saved documents found !</h4>';
    }
    if (!youtubeHtml) {
        youtubeHtml = '<div class="no-saved-files-bx"><h4>No saved videos found !</h4></div>';
    }
    $('#presentation-ul, #presentation-ul1').html(presentationHtml);
    $('#youtube-ul, #youtube-ul1').html(youtubeHtml);
}
var deleteFile = (id) => {
    onDeleteFileConfirm(id);
    //showModal('Message','Are you sure, do you want to delte this file ?','<button onclick="onDeleteFileConfirm(\''+id+'\')" data-dismiss="modal" type="button" class="btn btn-link waves-effect">Share</button> <button data-dismiss="modal" type="button" class="btn btn-link waves-effect">Cancel</button>')
}
var onDeleteFileConfirm = (id) => {
    $.ajax({
        url: DOMAIN + "/delete-file",
        data: {
            id: id
        },
        method: "POST",
        success: function(d) {
            getSavedFiles();
            showNotification("Deleted successfully", false, 3000);
        }
    });
}

let startOrStopRecording = () => {
    recordingStarted = !recordingStarted;
    if (recordingStarted) {
        startRecording();
    } else {
        stopRecording();
    }
}
let startRecording = () =>{
    let data = {};
    recordId = generateUUID();
    data.room = room;
    data.recordId = recordId;
    data.userId = userId;
    socket.emit('startRecording', JSON.stringify(data));
    showNotification("Recording started successfully", false, 3000);
    $('.recording-top-btn').addClass('playing-recording');
    $('.recon').show();
    $('.recoff').hide();
    recordingStarted = true;
    var moduleData = {};
    moduleData.method = 'startRec';
    sendToAll(moduleData);
}
let stopRecording = () =>{
    let data = {};
    data.recordId = recordId;
    data.room = room;
    socket.emit('stopRecording', JSON.stringify(data));
    showNotification("Recording stoped successfully", false, 3000);
    $('.recording-top-btn').removeClass('playing-recording');
    $('.recon').hide();
    $('.recoff').show();
    recordingStarted = false;
    var moduleData = {};
    moduleData.method = 'stopRec';
    sendToAll(moduleData);
}
let testClick = () => {

}
let tourtimeout = {};
let tourId;
var showTour = (msg,arrowPosition,left,right,top,bottom,customClass,timeout) =>{
    tourId = generateUUID();
    let tourHtml = '<div class="triangle-arrow-boxes'+tourId+' '+customClass+'" style="left:'+left+';right:'+right+';top:'+top+';bottom:'+bottom+';position:fixed;z-index:999">';
        if(arrowPosition === 'left'){
            tourHtml+= '<div class="box-1">'+msg;
            tourHtml+= '</div>';
        }
        if(arrowPosition === 'bottom'){
            tourHtml+= '<div class="box-2">'+msg;
            tourHtml+= '</div>';
        }
        if(arrowPosition === 'top'){
            tourHtml+= '<div class="box-3">'+msg;
            tourHtml+= '</div>';
        }
        if(arrowPosition === 'right'){
            tourHtml+= '<div class="box-4">'+msg;
            tourHtml+= '</div>';
        }
        
        tourHtml+= '</div>';
    $('#body').append(tourHtml);
    if(timeout){
        setTimeout((tourId) => {
            $('.triangle-arrow-boxes'+tourId).fadeOut();
        }, timeout,tourId);
    }
    
}
let notCalled = false;
var showNotification = (msg, error, time) => {
    if(!recorder){
        $('.toster').html(msg);
        $('.toster').fadeIn();
        $('.toster').addClass('padnot');
        if (error) {
            $('.toster').addClass('redtost');
        } else {
            $('.toster').removeClass('redtost');
        }
        if (notCalled == false) {
            if (time) {
                if(window.nothide){
                    clearTimeout(window.nothide)
                }
                window.nothide = setTimeout(hideNotification, time);
            }

        }
        if (time) {
            notCalled = true;
        }
    }

}
var showHostPanelMessage  = (msg) =>{
    $('#tutor-pause-msg').html(msg);
    $('#tutor-pause-msg').removeClass('hide')
}
var hideHostPanelMessage = () =>{
    $('#tutor-pause-msg').addClass('hide')
    extendNotificationActive = false;
}
var hideNotification = () => {
    $('.toster').removeClass('padnot');
    $('.toster').hide();
    notCalled = false;
}
mixStream = (room, stream, view) => {
    var jsonPatch = [{
        op: 'add',
        path: '/info/inViews',
        value: view
    }];
    send('PATCH', '/rooms/' + room + '/streams/' + stream, jsonPatch,
        onResponse);
};
unmixStream = (room, stream, view) => {
    var jsonPatch = [{
        op: 'remove',
        path: '/info/inViews',
        value: view
    }];
    send('PATCH', '/rooms/' + room + '/streams/' + stream, jsonPatch,
        onResponse);
};
onResponse = (resp) => {

}
var createToken = (room, user, role, callback, host) => {
    var body = {
        room: room,
        user: user,
        role: role
    };
    send('POST', '/tokens/', body, callback, host);
};
var send = (method, path, body, onRes, host) => {
    path = DOMAIN + path;
    var req = new XMLHttpRequest()
    req.onreadystatechange = () => {
        if (req.readyState === 4) {
            onRes(req.responseText);
        }
    };
    let url = path; //generateUrl(host, path);
    req.open(method, url, true);
    req.setRequestHeader('Content-Type', 'application/json');
    if (body !== undefined) {
        req.send(JSON.stringify(body));
    } else {
        req.send();
    }
};
var generateUrl = (host, path) => {
    let url;
    if (host !== undefined) {
        url = host + path; // Use the host user set.
    } else {
        let u = new URL(document.URL);
        url = u.origin + path; // Get the string before last '/'.
    }
    return url;
}
var showLoader = (text,loader) => {
    $('.loader-label').html(text);
    $('.loader').show();
    $('.loader-small').hide();
    if(loader){
        $('.loader-txt').show();
        $('.loader-small').hide();
    }else{
        $('.loader-txt').hide();
        $('.loader').addClass('opacity-0');
        $('.loader-small').show();
    }
}
var hideLoader = () => {
    $('.loader').hide();
    $('.loader').addClass('opacity-5');

}
var showModal = (title, content, action,modalclass) => {
    if(!recorder){
        if(title === 'Message'){
            modalclass = 'message-popup';
        }
        $('#modal-title').html(title);
        $('#modal-content').html(content);
        if (action) {
            $('#modal-button').html(action);
        }
        $('#myModal').modal({
            backdrop: 'static',
            keyboard: false
        })
        let originalClasses = "modal fade cmn-modal host-info-popup icon_settings_page enter-name-popup";
        $('#myModal').attr('class',originalClasses);
        $('#myModal').attr('class',originalClasses+' '+modalclass);
    }
}
var makeFullScreen = (elem, reset) => {
    elem = document.getElementById('body');
    reset = false;
    // ## The below if statement seems to work better ## if ((document.fullScreenElement && document.fullScreenElement !== null) || (document.msfullscreenElement && document.msfullscreenElement !== null) || (!document.mozFullScreen && !document.webkitIsFullScreen)) {
    if (!reset && (document.fullScreenElement !== undefined && document.fullScreenElement === null) || (document.msFullscreenElement !== undefined && document.msFullscreenElement === null) || (document.mozFullScreen !== undefined && !document.mozFullScreen) || (document.webkitIsFullScreen !== undefined && !document.webkitIsFullScreen)) {
        if (elem.requestFullScreen) {
            elem.requestFullScreen();
        } else if (elem.mozRequestFullScreen) {
            elem.mozRequestFullScreen();
        } else if (elem.webkitRequestFullScreen) {
            elem.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
        } else if (elem.msRequestFullscreen) {
            elem.msRequestFullscreen();
        }
    }

}
var toggleFullScreen = (elem, reset) => {
    // ## The below if statement seems to work better ## if ((document.fullScreenElement && document.fullScreenElement !== null) || (document.msfullscreenElement && document.msfullscreenElement !== null) || (!document.mozFullScreen && !document.webkitIsFullScreen)) {
    if (!reset && (document.fullScreenElement !== undefined && document.fullScreenElement === null) || (document.msFullscreenElement !== undefined && document.msFullscreenElement === null) || (document.mozFullScreen !== undefined && !document.mozFullScreen) || (document.webkitIsFullScreen !== undefined && !document.webkitIsFullScreen)) {
        if (elem.requestFullScreen) {
            elem.requestFullScreen();
        } else if (elem.mozRequestFullScreen) {
            elem.mozRequestFullScreen();
        } else if (elem.webkitRequestFullScreen) {
            elem.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
        } else if (elem.msRequestFullscreen) {
            elem.msRequestFullscreen();
        }
        $('#exit-fs').removeClass('hide')
        $('#enable-fs').addClass('hide')
    } else {
        if (document.cancelFullScreen) {
            document.cancelFullScreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
        $('#exit-fs').addClass('hide')
        $('#enable-fs').removeClass('hide')
    }

}

function copyInput(id) {
    /* Get the text field */
    var copyText = document.getElementById(id);

    /* Select the text field */
    copyText.select();
    copyText.setSelectionRange(0, 99999); /*For mobile devices*/

    /* Copy the text inside the text field */
    document.execCommand("copy");
    if(id === 'inviteLink'){
        $('.click8').html('Link copied');
        setTimeout(()=>{
            $('.click8').html('Copy URL');
        },5000);
    }
}
/**
 * for destroy video on browser close
 */
 leaveMeetingWithoutRating = () =>{
    $('#do-you-accept-btn').modal('hide')
    $('#on-cost-payment-btn').modal('hide')
    $('#host-wait-modal').hide();
    showModal("Message","You will be exited soon","")
    setTimeout(()=>{
        window.location.href = '/home'
    },3000)
   
 }
leaveMeeting = () =>{
    $('#on-cost-payment-btn').modal('hide')
    $('#host-wait-modal').hide();
    showModal('Confirm','Do you want to leave from current session ?','<button onclick="onLeveMeetingConfirm()" data-dismiss="modal" type="button" class="btn cmn-btn">Sure</button> <button data-dismiss="modal" type="button" class="btn bdr-btn">Cancel</button>','')
}
onLeveMeetingConfirm = () =>{
    $('#on-cost-payment-btn').modal('hide')
    $('#host-wait-modal').hide();
    $('#review-tips-popup').modal({
        backdrop: 'static',
        keyboard: false
    })
    //window.location.href = '/home'
}
window.onbeforeunload = (event) => {
    conference.leave()
    publicationGlobal.stop();
}

var setViewBasedOnMode = (mode) => {
    switch (mode) {
        case 'viewer':
            revokePresentingPower();
            $('.remove-viewer').remove();
            $('#continue-btn').show();

            //$('#continue-btn').removeAttr('disabled')
            /*
            if (meetingStatus === 'started') {
                $('#continue-btn').removeClass('disabled')
                $('.waithost').hide();
                $('#continue-btn').removeAttr('title')
                joinUserMeeting();
            } else {
                $('#continue-btn').attr('title', 'Please wait for the host to start the meeting')
                $('#continue-btn').addClass('disabled')
                $('.waithost').show();
            }
            */
            if(eventType !== APP_TYPE.WEBINAR){
                $('.webcam-radio-btns').show();
            }
            
            $('#leave-meet').removeClass('hide')
            break;
        case 'presenter':
            allowed = true;
            havePower = true;
            showForHost();
            $('#continue-btn').show();
            $('.webcam-radio-btns').show();
            $('#continue-btn').removeClass('disabled')
            $('#leave-meeting-par').removeClass('hide')
            $('#leave-meeting-par').html('<a onclick="leaveMeeting()" class="av-toggle-btn" href="javaScript:void(0);" id="toggle-avnik"><i class="mr-exit-user-icon"></i></a>');
            $('#host-name-val').html(userName.charAt(0).toUpperCase() + '' + userName.charAt(1).toUpperCase())
            break;
        default:
            break;
    }
}
var givePresentingPower = () => {
    havePower = true;
    enableWiteboard();
    showForPresenter();
    enableForPresenter();
    $('#mp4Video').attr('controls',true)
    //console.log('current content block while giving power = '+currentContenBlock)
    if(currentContenBlock){
        $('.content-close-btn').show();
    }else{
        $('.content-close-btn').hide();
    }
    if(currentContenBlock == 'presentation'){
        $('.zoom-blk').show();
    }else{
        $('.zoom-blk').hide();
    }
    $('#mp4Video').attr('controls','controls');
    
}
/* javascript-obfuscator:disable */ 
var revokePresentingPower = () => {
    havePower = false;
    disableWiteboard();
    hideForViewer();
    disableForViewer()
    if(!allowCamMicForViewer){
        if(!firstTimePublish){
           // disableCam();
           // disableMic();
        }
        
    }
    $('#mp4Video').removeAttr('controls')
    $('.content-close-btn').hide();
    $('.zoom-blk').hide();
    document.getElementById('mp4Video').removeAttribute('controls')
    
}
/* javascript-obfuscator:enable */ 


var showForHost = () => {
    $('.show-host').removeClass('hide')
}

var hideForViewer = () => {
    $('.hide-viewer').addClass('disableclick')
    $('.show-viewer').removeClass('hide');
    $('.no-mouse').addClass('disable-mouse');
}
var showForPresenter = () => {
    $('.hide-viewer').removeClass('disableclick')
    $('.show-viewer').addClass('hide');
    $('.no-mouse').removeClass('disable-mouse');
}
var disableForViewer = () => {
    $('.disable-viewer-btn').addClass('disable')
}
var enableForPresenter = () => {
    $('.disable-viewer-btn').removeClass('disable')
}
var disableWiteboard = () => {
    $('.disable-board').addClass('disablewb')
    $('.disable-wb').addClass('disable-wb-btn')
}
var enableWiteboard = () => {
    $('.disable-board').removeClass('disablewb')
    $('.disable-wb').removeClass('disable-wb-btn')
}

var showRequestPresentMsg = () => {
    if (!havePower) {
        playAudio(1);
        showNotification('If you wish to present then click on the crown icon on top to request the host for access to controls ',false,5000)
        //showModal('Message', 'If you need to present please request to host by clicking present button on top left ( <i class="mr-present-icon"></i> ).All the presenting tools will enable after host allows.<br/> <b>Presenting Tools : </b>Camera,Microphone,Screen share,whiteboard,document share,video share etc', '<button type="button" class="btn cmn-btn" data-dismiss="modal"> Ok </button>')
    }
}
var sendPresentingRequest = () => {
    var moduleData = {};
    moduleData.method = 'presentRequest';
    moduleData.userName = userName;
    sendToAll(moduleData);
    showModal('Message', 'Presenting request has been sent to the host.', '<button type="button" class="ladda-button animate-btn zoom-out" data-dismiss="modal"><span class="label">Ok</span> <span class="spinner"></span></button>')
}

var removeUser = (clientId) => {
    showModal('Message','Are you sure you want to block this user? Once blocked, the user can not enter this meeting again.','<button onclick="removeUserConfirm(\''+clientId+'\')" data-dismiss="modal" type="button" class="btn .cmn-btn">Yes</button> <button data-dismiss="modal" type="button" class="btn bdr-btn">Cancel</button>', '')
}
var removeUserConfirm = (clientId) => {
    if (mode == 'presenter') {
        let data = {
            method: 'removeUser',
            sendToId: clientId
        };
        sendToAll(data);
    }

}
/* javascript-obfuscator:disable */ 
var givePresentingPowerToClient = (clientId) => {
    if (mode == 'presenter') {
        let data = {
            method: 'givePresentingPower',
            sendToId: clientId
        };
        sendToAll(data);
    }

}

var revokePresentingPowerToClient = (clientId) => {
    if (mode == 'presenter') {
        let data = {
            method: 'revokePresentingPower',
            sendToId: clientId
        };
        sendToAll(data);
    }
}
/* javascript-obfuscator:enable */ 
var selectSettingsTab = (tab) => {
    $('#settings-tab').hide();
    $('#info-tab').hide();
    $('#settings-but-btn').removeAttr('data-ah-tab-active')
    $('#info-but-btn').removeAttr('data-ah-tab-active')
    if (tab === 'settings') {
        $('#settings-tab').show();
        $('#settings-but-btn').attr('data-ah-tab-active', 'true')
    } else {
        $('#info-tab').show();
        $('#info-but-btn').attr('data-ah-tab-active', 'true')
    }
}

var audio = false;
var playAudio = (volume) => {
    if(commonCounter > 5){
        if (!audio) {
            audio = new Audio('sounds/sound.mp3');
            audio.volume = volume;
        }
        try {
            audio.currentTime = 0;
        } catch (e) {

        }
        audio.play();
    }
}

changeFunctionalityBasedOnRoomProperty = () => {
    onChangeAllCamMicView();
    let showCamtour = false
    let showMictour = false
    if (roomProperty.cameraOffAllFlag) {
        if (publicationGlobal && mode !== 'presenter') {
            publicationGlobal.mute('video')

        }
        hideAllViewerVideo();
        if(mode === 'presenter'){
            
            showCamtour = true;
        }
    } else {
        showAllViewerVideo();
        if (publicationGlobal) {
            if (camEnabled) {
                publicationGlobal.unmute('video')
            }
        }
    }

    if (roomProperty.micOffAllFlag) {
        if (publicationGlobal && mode !== 'presenter') {
            publicationGlobal.mute('audio')
        }
        if(mode === 'presenter'){
            showMictour = true;
            
        }
    } else {
        if (publicationGlobal) {
            if (micEnabled && mode !== 'presenter') {
                publicationGlobal.unmute('audio')
            }

        }
    }
    /*
    if(showCamtour && showMictour){
        showTour('All user\'s Camera and Microphone are disabled','bottom','210px','auto','auto','50px','camoffall-tour',false)
    }else if(showCamtour){
        showTour('All user\'s Camera is disabed','bottom','238px','auto','auto','50px','camoffall-tour',false)
    }else if(showMictour){
        showTour('All user\'s Microphone is muted','bottom','285px','auto','auto','50px','camoffall-tour',false)
    }
    */
}
onChangeAllCamMicView = () => {
    $('#cam-on-all').addClass('hide')
    $('#cam-off-all').addClass('hide')
    $('#mic-on-all').addClass('hide')
    $('#mic-off-all').addClass('hide')
    if (roomProperty.cameraOffAllFlag) {
        $('#cam-off-all').removeClass('hide')
    } else {
        $('#cam-on-all').removeClass('hide')
        
    }

    if (roomProperty.micOffAllFlag) {
        $('#mic-off-all').removeClass('hide')
    } else {
        $('#mic-on-all').removeClass('hide')
        
    }
}
onTurnOnOffAllCam = () => {
    if (roomProperty.cameraOffAllFlag) {
        roomProperty.cameraOffAllFlag = false;
        showAllViewerVideo();
    } else {
        roomProperty.cameraOffAllFlag = true;
        hideAllViewerVideo();
    }
    onChangeAllCamMicView();
    sendToAll({
        method: 'onRoomPropertyChanged',
        type: 'cam',
        roomProperty: roomProperty
    })
    $('.camoffall-tour').remove();
}

onTurnOnOffAllMic = () => {
    if (roomProperty.micOffAllFlag) {
        roomProperty.micOffAllFlag = false;
    } else {
        roomProperty.micOffAllFlag = true;
    }
    onChangeAllCamMicView();
    sendToAll({
        method: 'onRoomPropertyChanged',
        type: 'mic',
        roomProperty: roomProperty
    })
    $('.camoffall-tour').remove();
}

hideAllViewerVideo = () => {
    videoOffArray = [];
    $(".video-users").each(function(index) {
        if (document.getElementById($(this).attr('id')).style.display === 'block' || $(this).hasClass('logichide')) {
            videoOffArray.push($(this).attr('id').replace('-parent', ''))
            $(this).addClass('logichide')
        }
        //alert(JSON.stringify(videoOffArray))
        $(this).hide();

    });
    $(".avatar-users").show();
}
showAllViewerVideo = () => {
    for (let key in videoOffArray) {
        if(document.getElementById(videoOffArray[key] + '-parent')){
            document.getElementById(videoOffArray[key] + '-parent').style.display = 'block';
            document.getElementById(videoOffArray[key] + '-avatar').style.display = 'none';
            document.getElementById(videoOffArray[key] + '-parent').classList.remove('logichide')
        }
    }
}
let audioBeforePv = false;
let videoBeforePv = false;
startOrStopPrivateMeeting = (clientId) => {
    if (privateUsers[clientId]) {
        onPrivateMeetingStopped(clientId);
        sendToAll({
            method: 'stopPvMeeting',
            receiverId: clientId,
            senderId: myClientId,
            senderName: userName
        })
    } else {
        showNotification('Requested private meeting, Once accept it will initiate', false, 5000)
        sendToAll({
            method: 'requestPvMeeting',
            receiverId: clientId,
            senderId: myClientId,
            senderName: userName
        })
    }

}
onPrivateMeetingAccepted = (clientId, type) => {
    showNotification('Private meeting started', false, 5000)
    privateUsers[clientId] = true;
    audioBeforePv = micEnabled;
    videoBeforePv = camEnabled;
    if (type === 'mic') {
        micEnabled = true;
        camEnabled = false;
        enableMicUi();
        disableCamUi();
    }
    if (type === 'cammic') {
        micEnabled = true;
        camEnabled = true;
        enableMicUi();
        enableCamUi();
    }
    skipLoader = true;
    publishStream();
    document.getElementById('remoteAudio').muted = true;
    $('#' + clientId + '_private').html('Stop Private Meet');
    $('.pvli').hide();
    $('#' + clientId + '_privateli').show();
    for (let key in subscirptionLocal) {
        if (subscirptionLocal[key]) {
            if (!privateUsers[key]) {
                subscirptionLocal[key].stop();
                $('#' + key + '-parent').hide();
                $('#' + key + '-avatar').show();
            }

        }
    }

}
onPrivateMeetingStopped = (clientId) => {
    privateUsers = {};
    camEnabled = videoBeforePv;
    micEnabled = audioBeforePv;
    if (camEnabled) {
        enableCamUi();
    } else {
        disableCamUi();
    }
    if (micEnabled) {
        enableMicUi();
    } else {
        disableMicUi();
    }
    skipLoader = true;
    publishStream();
    showNotification('Private meeting ended', false, 5000)
    document.getElementById('remoteAudio').muted = false;
    $('#' + clientId + '_private').html('Private Meeting');
    $('.pvli').show();
}
onRejectPvMeeting = (clientId) => {
    sendToAll({
        method: 'rejectPvMeeting',
        receiverId: clientId,
        senderId: myClientId,
        senderName: userName
    })
}
onPvRequestAccepted = (clientId, type) => {
    onPrivateMeetingAccepted(clientId, type);
    sendToAll({
        method: 'acceptPvMeeting',
        receiverId: clientId,
        senderId: myClientId,
        senderName: userName
    })
}

sendPaymentRequest = () =>{
    extendType = $('input[name="extdurradio"]:checked').val();
    if(extendType === 'extendMe'){
        showNotification('Pay to extend feature need api updates on avnik',true,3000)
        return;
    }
    if(extendType === 'extendYou'){
        let time = $('#hours-ext').val() + ':'+ $('#miutes-ext').val()
        let cost = $('.cost-extr').val();
        time = time+':00';
        let timesecond = hmsToSecondsOnly(time);
        if(timesecond >= 60 && cost){
            saveExtendDurationToDb(time,parseInt($('.cost-extr').val()), hmsToSecondsOnly(time),extendType);
            
        }else{
            showNotification('Both time and cost values required',true,3000)
        }
    }else if(extendType === 'extendMe'){
        
        var timecostValue       = $('#extByMeSelect').val();
        let cost                = parseInt(timecostValue.split('_')[1]);
        let time                = parseInt(timecostValue.split('_')[0])
        extendedSeconds         = time
        amountToPay             = cost;
        $('#extendtme').html(toHHMM(extendedSeconds));
        $('#extncost').html(cost);
        $('.total-amount-pay').html(cost);
        $('.extendtme').html(toHHMM(extendedSeconds));
        $('#on-cost-request-btn').modal('hide')
        onPayentPop();
        sendToAll({method:'waitForHostToPay'})
        setTimeout(()=>{
            paymentStatus = 'waiting';
            extendNotificationActive = true;
            showHostPanelMessage('Pay $'+cost+' to continue this session.' );
        }, 1500); 

    }else if(extendType === 'extendFree'){
        saveExtendDurationToDb('01:00',0,60,extendType);
    }
    
}
onPaymentConfirm = () =>{
    if(currentPaymentToken || amountToPay === 0){
        if(reviewProcessStarted){
            saveReviewApi()
        }else{
            if(mode === 'presenter'){
                
                saveExtendDurationToDb(toHHMM(extendedSeconds),amountToPay,extendedSeconds,'extendMe');
                
            }else{
                $('.click9').attr('data-loading')
                $.ajax({
                    url: API_BASE_URL+"payments",
                    headers: {
                        'Accept': 'application/json',
                        authorization: 'Bearer ' + accessToken
                    },
                    data: {
                        stripeToken:currentPaymentToken,
                        eventId: eventId,
                        roomId:roomSlotId ,
                        cost:amountToPay,
                        extendedDurationId:extendedDurationId
                    },
                    method: "PUT",
                    success: function(result) {
                        if (result.status === 200) {
                                showNotification(result.message,false,3000)
                                $('#do-you-accept-btn').modal('hide')
                                paymentStatus = 'success';
                                if(initialPaymentRequired){
                                        $('.loader-label').hide();
                                        showLoader();
                                        setTimeout(() => {
                                            window.location.reload();
                                        }, 2000);
                                }

                                sendToAll({method:'onPaymentSuccess',userName:userName,cost:amountToPay})
                            
                        }else{
                            $('.click9').removeAttr('data-loading')
                            showNotification(result.message,true,3000)
                        }
                        $('#on-cost-payment-btn').modal('hide')
                        initStripe();
                        
                    },
                    error: function(error) {
                        showNotification('Your payment has been failed',true,3000)
                        $('#on-cost-payment-btn').modal('hide')
                        initStripe();
                        
                        //$('#do-you-accept-btn').modal('hide')
                    }
                        
                });
                showNotification('Processing your payment , wait for confirmation',false,3000)
            }
        }
       
    }else{
        showNotification('Invalid card details',true,3000)
    }
    return;
    
}
saveExtendDurationToDb = (time,cost,timesecond,extendType) =>{
    //alert(time+'//'+cost)
    let payload = {
        roomId: roomSlotId,
        userId: userId,
        duration:timesecond,  
        cost:cost
    };
    if(extendType === 'extendMe'){
        payload.host_stripe_id = currentPaymentToken;
    }
    
    $.ajax({
        url: API_BASE_URL+"meetingRoom/extend",
        headers: {
            'Accept': 'application/json',
            authorization: 'Bearer ' + accessToken
        },
        data: payload,
        method: "PUT",
        success: function(result) {
            if (result.status === 200) {
                if(extendType === 'extendYou' || extendType === 'extendFree' ){
                    paymentStatus = false
                    amountToPay = 0;
                    if(cost === 0){
                        extendNotificationActive = true;
                        showHostPanelMessage('The session has been extended for '+toHHMM(timesecond)+'. Please resume session once you are ready' );
                        if(mode === 'presenter'){
                            showTour('Click play button to resume '+eventType,'top','90px','auto','75px','auto','startmeeting-tour',false)
                        }
                    }else{
                        extendNotificationActive = true;
                        showHostPanelMessage('The session has been extended for '+time+'. You will be notified when the users successfully done payment $'+cost+'.' );
                        showNotification('If you resume session then users who do not payed will be kicked out !',true,25000);
                        $('#paying-message-popup').modal({backdrop:'static',keyboard:false})
                    }
                   
                    extendedDurationId = result.data.id;
                    // alert(extendedDurationId)
                    sendToAll({method:'paymentRequest',time:timesecond,cost:cost,extendedDurationId:extendedDurationId})
                    totalDuration = totalDuration + parseInt(timesecond);
                    updateTimerDisplay();
                   
                    extendedSeconds = timesecond
                    $('#on-cost-request-btn').modal('hide')
                    resetCostModal()
                }else{
                    paymentStatus = 'success';
                    extendNotificationActive = false;
                    totalDuration = totalDuration + parseInt(timesecond);
                    updateTimerDisplay();
                    sendToAll({method:'paymentRequest',time:timesecond,cost:0,extendedDurationId:result.data.id})
                    showHostPanelMessage('The '+eventType+' has been extended. Please resume once you are ready' );
                    if(mode === 'presenter'){
                        showTour('Click play button to resume '+eventType,'top','90px','auto','75px','auto','startmeeting-tour',false)
                    }
                    $('#on-cost-payment-btn').modal('hide');
                    showNotification('Your payment was successfull, '+eventType+' extended',false,5000)

                }
            }else{
                showNotification(result.message,true,5000);
                //showModal('Message'.result.message,'','')
                $('#on-cost-request-btn').modal('hide')
                resetCostModal()
            }
            
        },
        error: function(error) {
            if(dev){
                sendToAll({method:'paymentRequest',time:timesecond,cost:cost})
                totalDuration = totalDuration + parseInt(timesecond);
                updateTimerDisplay();
                $('#on-cost-request-btn').modal('hide')
                resetCostModal()
            }else{
                showNotification('Unable to extend this session, you can stop and schecule a new slot',true,5000);
                $('#on-cost-request-btn').modal('hide')
                resetCostModal()
            }
            
        }
    });

}
resetCostModal = () =>{
    $('#hours-ext').val(0);
    $('#miutes-ext').val(0);
    $('.cost-extr').val('');
}
function hmsToSecondsOnly(str) {
    var p = str.split(':'),
        s = 0, m = 1;

    while (p.length > 0) {
        s += m * parseInt(p.pop(), 10);
        m *= 60;
    }

    return parseInt(s);
}
extendDurClick = () =>{
    $('.cost-extr').val('');
}
/**
 * Stripe Payment Gateway
 */
 var elements;
 var cardValid,dateValid,cvvValid;
 var cardNumberElement;
 var currentPaymentToken;
 var cardExpiryElement;
 var cardCvcElement;
 var stripe = Stripe('pk_test_BXAJTXJXWiKc7v2qDY35Stzk00GzQ1hnW4');
onPayentPop = () =>{
    if(amountToPay === 0){
        onPaymentConfirm();
    }else{
        $('#host-info-btn').modal('hide')
        $('#on-cost-payment-btn').modal({backdrop:'static',keyboard:false})
        initStripe();
    }
    
}
initStripe = () =>{
    $('.click9').addClass('disabled')
    $('.click9').removeAttr('data-loading')
    elements = stripe.elements()
    var style = {

      };
      
      cardNumberElement = elements.create('cardNumber', {
        style: style
      });
      cardNumberElement.mount('#card-number-element');
      
      cardExpiryElement = elements.create('cardExpiry', {
        style: style});
      cardExpiryElement.mount('#card-expiry-element');
      
      cardCvcElement = elements.create('cardCvc', {
        style: style});
      cardCvcElement.mount('#card-cvc-element');

      cardNumberElement.on('change', function(event) {
            if (event.complete) {
                cardValid = true;
                createPaymentToken();
                
            } else if (event.error) {
                // show validation to customer
                cardValid = false;
                currentPaymentToken = '';
            }
        });
        cardExpiryElement.on('change', function(event) {
            if (event.complete) {
                dateValid = true;
                createPaymentToken();
                
            } else if (event.error) {
                // show validation to customer
                dateValid = false;
                currentPaymentToken = '';
            }
        });
        cardCvcElement.on('change', function(event) {
            console.log(event)
            if (event.complete) {
                cvvValid = true;
                createPaymentToken();
                
            }else{
                cvvValid = false;
                currentPaymentToken = '';
            }
        });
}
distroyCardForm = () =>{
    console.log(cardExpiryElement)
    /*
    if(cardNumberElement){
        cardNumberElement.destroy();
        cardExpiryElement.destroy();
        cardCvcElement.destroy();
        cardValid = false;
        dateValid = false;
        cvvValid = false;
    }
    */
}
createPaymentToken = () =>{
    if(cardValid && dateValid && cvvValid){
        stripe.createPaymentMethod({type:'card',card:cardNumberElement,billing_details:{name:userName}}).then((result) =>{
            console.log(result)
            currentPaymentToken = result.paymentMethod.id;
            $('.click9').removeClass('disabled');
        })
    }
    
}
selectStart = (val)=>{
    starRating = val;
    setStars(val);
    setTimeout((val) => {
        setStars(val);
    }, 500,val);
    

}
setStars = (val) =>{
    $('.starcomp').removeClass('open');
        let stars = document.getElementsByClassName('starcomp');
        for(let i=0;i<val;i++){
            stars[i].classList.add('open');
        }
}

openExtDurPop = () =>{
    $('#on-cost-request-btn').modal({backdrop:'static',keyboard:false})
    $('#on-cost-payment-btn').modal('hide')
}
/*
console.log = (type, infos) =>{
    if(dev || true){
    var msg = new Date().toISOString();
     // console.info(msg,type);
    }
}
*/
var getOS = () => {
    // return 'iOS';
    var userAgent = window.navigator.userAgent,
        platform = window.navigator.platform,
        macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'],
        windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'],
        iosPlatforms = ['iPhone', 'iPad', 'iPod'],
        os = null;
  
    if (macosPlatforms.indexOf(platform) !== -1) {
      os = 'Mac OS';
    } else if (iosPlatforms.indexOf(platform) !== -1) {
      os = 'iOS';
    } else if (windowsPlatforms.indexOf(platform) !== -1) {
      os = 'Windows';
    } else if (/Android/.test(userAgent)) {
      os = 'Android';
    } else if (!os && /Linux/.test(platform)) {
      os = 'Linux';
    }
  
    return os;
  }     /*                        AVNIK.COM
 *********************************************************
 * @licstart  The following is the entire license notice for the
 * code in this page.
 *
 * Copyright (C) 2021  Avnik
 *
 The code in this page is not free, taking this code and altering for any other project is legally not allowed
 *
 * @licend
 */
$(function() {
    $('#chatInput').emoji({
        listCSS: {
            position: 'absolute',
            border: '1px solid #e6e6e6',
            bottom: '50px',
            right: '7px',
            height: '150px',
            overflow: 'auto'
        }
    });
    $('#pvChatInput').emoji({
        listCSS: {
            position: 'absolute',
            border: '1px solid #e6e6e6',
            bottom: '50px',
            right: '7px',
            height: '150px',
            overflow: 'auto'

        }
    });
    
})
//$('.group-chat-pop-footer').emoji({place: 'after'});


$(".WB-tools-btn").on("click", function() {
    $(".WB-tools-sidebar").slideDown(50), $(".WB-tools-sidebar").toggleClass("shw-rside")
})

$(document).ready(function() {
    var $targets = $('.target');
    $('#WB_buttons .Smallbutton').click(function() {
        var $target = $($(this).data('target')).slideToggle();
        $targets.not($target).hide()
    });
});


$('#WB_buttons .WB-main-btn .Smallbutton').click(function() {
    if ($(this).hasClass('current')) {
        $(this).removeClass('current');
    } else {
        $('#WB_buttons .WB-main-btn .Smallbutton.current').removeClass('current');
        $(this).addClass('current');
    }
});


$(document).ready(function() {
    $('.material-button-toggle').on("click", function() {
        $(this).toggleClass('open');
        $('.option').toggleClass('scale-on');
    });
});

$(document).ready(function() {
    $('#list').click(function(event) {
        event.preventDefault();
        $('#products .item').addClass('list-group-item');
        userListType = 'list';
    });
    $('#grid').click(function(event) {
        event.preventDefault();
        $('#products .item').removeClass('list-group-item');
        $('#products .item').addClass('grid-group-item');
        userListType = 'grid';
    });
});


$(document).ready(function() {
    $('.view-icons .btn.btn-default.btn-sm').click(function() {
        $('.view-icons .btn.btn-default.btn-sm').removeClass("active");
        $(this).addClass("active");
    });
});

$(".dropdown-menu").click(function(e) {
    e.stopPropagation();
});



// kamlesh Js started --> 
// JavaScript Start --> 


$('#toggle-avnik').click(function() {
    $('.toggle-avnik').slideToggle('fast').addClass("show-avnik");
    return false;
});

// JavaScript End --> 
// Controls Option Js Start --> 

$(document).on('click', '.option-btn', function() {
    $(this).toggleClass('open');
    $('.control-center').toggleClass('open');
});

// Controls Option Js End --> 
// Left Side Edit Option Js Start --> 

// Left Side Edit Option Js End --> 
// Toast Notification Js Start --> 

jQuery(document).ready(function() {
    jQuery('.toast__close').click(function(e) {
        e.preventDefault();
        var parent = $(this).parent('.toast');
        parent.fadeOut("slow", function() {
            $(this).remove();
        });
    });
});


// Toast Notification Js End --> 
// On Window Load Setting Popup Open Js Start --> 

$(document).ready(function() {
    $('#wb-load-setting-popup').modal('show');
});

// On Window Load Setting Popup Open Js End --> 
// Host Info Popup Js Start --> 
// Host Info Popup Js End --> 
// Chat Popup Js Start --> 


$(document).ready(function() {
    $('.material-button-toggle').on("click", function() {
        $(this).toggleClass('open');
        $('.option').toggleClass('scale-on');
    });
});
$(document).ready(function() {
    $('#list').click(function(event) {
        event.preventDefault();
        $('#products .item').addClass('list-group-item item usersli');
    });
    $('#grid').click(function(event) {
        event.preventDefault();
        $('#products .item').removeClass('list-group-item');
        $('#products .item').addClass('grid-group-item');
    });
});

$(document).ready(function() {
    $('.view-icons .btn.btn-default.btn-sm').click(function() {
        $('.view-icons .btn.btn-default.btn-sm').removeClass("active");
        $(this).addClass("active");
    });
    document.getElementById('remove').innerHTML = "";
});

// Chat Popup Js End --> 
// Portrait Rotate Js Start --> 

$(window).resize(function() {
    if ($(window).width() < 767) {
        if (screen.availWidth < screen.availHeight) {
            $('#portrait-rotate').show();
        }
        if (screen.availWidth > screen.availHeight) {
            $('#portrait-rotate').hide();
        }
    }
});

// Portrait Rotate Js Start -->
function showHideDiv(ele) {
    var srcElement = document.getElementById(ele);
    if (srcElement != null) {
        if (srcElement.style.display == "block") {
            srcElement.style.display = 'none';
        } else {
            srcElement.style.display = 'block';
        }
        return false;
    }
}


$('.search-toggle').addClass('closed');
$('.search-toggle .search-icon').click(function(e) {
    if ($('.search-toggle').hasClass('closed')) {
        $('.search-toggle').removeClass('closed').addClass('opened');
        $('.search-toggle, .search-container').addClass('opened');
        $('#search-terms').focus();
    } else {
        $('.search-toggle').removeClass('opened').addClass('closed');
        $('.search-toggle, .search-container').removeClass('opened');
    }
});



$(function() {
    var targets = $('[rel~=tooltip]'),
        target = false,
        tooltip = false,
        title = false;

    targets.bind('mouseenter', function() {
        target = $(this);
        tip = target.attr('title');
        tooltip = $('<div id="tooltip"></div>');

        if (!tip || tip == '')
            return false;

        target.removeAttr('title');
        tooltip.css('opacity', 0)
            .html(tip)
            .appendTo('body');

        var init_tooltip = function() {
            if ($(window).width() < tooltip.outerWidth() * 1.5)
                tooltip.css('max-width', $(window).width() / 2);
            else
                tooltip.css('max-width', 340);

            var pos_left = target.offset().left + (target.outerWidth() / 2) - (tooltip.outerWidth() / 2),
                pos_top = target.offset().top - tooltip.outerHeight() - 20;

            if (pos_left < 0) {
                pos_left = target.offset().left + target.outerWidth() / 2 - 20;
                tooltip.addClass('left');
            } else
                tooltip.removeClass('left');

            if (pos_left + tooltip.outerWidth() > $(window).width()) {
                pos_left = target.offset().left - tooltip.outerWidth() + target.outerWidth() / 2 + 20;
                tooltip.addClass('right');
            } else
                tooltip.removeClass('right');

            if (pos_top < 0) {
                var pos_top = target.offset().top + target.outerHeight();
                tooltip.addClass('top');
            } else
                tooltip.removeClass('top');

            tooltip.css({
                    left: pos_left,
                    top: pos_top
                })
                .animate({
                    top: '+=10',
                    opacity: 1
                }, 50);
        };

        init_tooltip();
        $(window).resize(init_tooltip);

        var remove_tooltip = function() {
            tooltip.animate({
                top: '-=10',
                opacity: 0
            }, 50, function() {
                $(this).remove();
            });

            target.attr('title', tip);
        };

        target.bind('mouseleave', remove_tooltip);
        tooltip.bind('click', remove_tooltip);
    });



    var buttons = document.querySelectorAll( '.ladda-button' );
      
      Array.prototype.slice.call( buttons ).forEach( function( button ) {
      
         var resetTimeout;
      
         button.addEventListener( 'click', function() {
            
            if( typeof button.getAttribute( 'data-loading' ) === 'string' ) {
               button.removeAttribute( 'data-loading' );
            }
            else {
               button.setAttribute( 'data-loading', '' );
            }
      
            clearTimeout( resetTimeout );
            resetTimeout = setTimeout( function() {
               button.removeAttribute( 'data-loading' );			
            }, 2000 );
      
         }, false );
      
      } );
         $(document).ready(function () {
             $('.cmn-toggle').on('click', function () {
                 $(this).toggleClass('open');
             });
         });
            function showHideDiv(ele) {
                var srcElement = document.getElementById(ele);
                if (srcElement != null) {
                    if (srcElement.style.display == "block") {
                        srcElement.style.display = 'none';
                    }
                    else {
                        srcElement.style.display = 'block';
                    }
                    return false;
                }
            }
});


      
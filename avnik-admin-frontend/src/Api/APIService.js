

import config from './config'
// import queryString from 'query-string'
import axios from 'axios'
import { Navigate } from 'react-router-dom'
import { authHeader, authNoneHeader} from './authHeader'
import Auth from './Auth'

const baseUrl = config.baseurl

function login(request) {
 return axios.post(baseUrl + config.endpoints.signIn, request, {headers:authHeader()})
}
function userPaymentRefund(Request) {
  return axios.post(baseUrl + config?.endpoints?.userPaymentsRefund, Request, authHeader())
}

function usersList(request) {
 return  axios.post(baseUrl + config.endpoints.usersList, request, {headers:authHeader()})
}
function releasePayment(request) {
 return  axios.post(baseUrl + config.endpoints.releasePayment, request, {headers:authHeader()})
}

function UpdateUserStatus(request) {
 return  axios.post(baseUrl + config.endpoints.UpdateUserStatus, request, {headers:authHeader()})
}
function UpdateUserPassword(request) {
 return  axios.post(baseUrl + config.endpoints.UpdateUserPassword, request, {headers:authHeader()})
}


function allNotification(request) {
 return  axios.post(baseUrl + config.endpoints.notificatoinsAll, request, {headers:authHeader()})
}
function readNotification(request) {
 return  axios.post(baseUrl + config.endpoints.readNotification, request, {headers:authHeader()})
}
function eventsAll(request) {
 return  axios.post(baseUrl + config.endpoints.eventsAll, request, {headers:authHeader()})
}
function adminUserAllEvents(request) {
 return  axios.post(baseUrl + config.endpoints.adminUserAllEvents, request, {headers:authHeader()})
}
function allPractitionerPayments(request) {
 return  axios.post(baseUrl + config.endpoints.allPractitionerPayments, request, {headers:authHeader()})
}

function categoryAdd(request) {
 return  axios.post(baseUrl + config.endpoints.categoryAdd, request, {headers:authHeader()})
}

function updateCategory(request) {
 return  axios.post(baseUrl + config.endpoints.updateCategory, request, {headers:authHeader()})
}
function UpdateAdminPassword(request) {
 return  axios.post(baseUrl + config.endpoints.updateAdminPass, request, {headers:authHeader()})
}
function adminProfileUpdate(request) {
 return  axios.post(baseUrl + config.endpoints.adminProfileUpdate, request, {headers:authHeader()})
}
function adminEventReport(request) {
 return  axios.post(baseUrl + config.endpoints.adminEventReport, request, {headers:authHeader()})
}
function adminUserReport(request) {
 return  axios.post(baseUrl + config.endpoints.adminUserReport, request, {headers:authHeader()})
}
function allPayments(request) {
 return  axios.post(baseUrl + config.endpoints.allPayments, request, {headers:authHeader()})
}
function allTemplate () {
 return  axios.get(baseUrl + config.endpoints.allTemplate, {headers:authHeader()})
}
function addTemplate(request) {
 return  axios.post(baseUrl + config.endpoints.addTemplate, request, {headers:authHeader()})
}
function deleteTemplate(request) {
 return  axios.post(baseUrl + config.endpoints.deleteTemplate, request, {headers:authHeader()})
}
function updateTemplate(request) {
 return  axios.post(baseUrl + config.endpoints.updateTemplate, request, {headers:authHeader()})
}
function templateDetail(request) {
 return  axios.post(baseUrl + config.endpoints.templatedetail, request, {headers:authHeader()})
}
function authUser() {
 return  axios.get(baseUrl + config.endpoints.userInfo, {headers:authHeader()})
}
function resetPassword(request) {
 return  axios.post(baseUrl + config.endpoints.resetPassword, request, {headers:authHeader()})
}
function changePassword(request) {
 return  axios.post(baseUrl + config.endpoints.changePassword, request, {headers:authHeader()})
}
function updatePassword(request) {
 return  axios.post(baseUrl + config.endpoints.updatePassword, request, {headers:authHeader()})
}
function globalLanguages() {
 return  axios.get(baseUrl + config.endpoints.languages, {headers:authHeader()})
}

function categories(request) {
 return  axios.post(baseUrl + config.endpoints.categories, request, {headers:authHeader()})
}
function services() {
 return  axios.get(baseUrl + config.endpoints.services, {headers:authHeader()})
}
function ApplyForPractitioner(request) {
 return  axios.post(baseUrl + config.endpoints.ApplyForPractitioner, request, {headers:authHeader()})
}
function ApplyForPractitionerUploadDocs(request) {
 return  axios.post(baseUrl + config.endpoints.ApplyForPractitionerUploadDocs, request, {headers:authHeader()})
}
function ApplyForPractitionerDeleteDocs(request) {
 return  axios.post(baseUrl + config.endpoints.ApplyForPractitionerDeleteDocs, request, {headers:authHeader()})
}
function UserProfile(request) {
 return  axios.post(baseUrl + config.endpoints.userProfile, request, {headers:authHeader()})
}
// complete Profile steps

function profileImagesUpload(request) {
 return  axios.post(baseUrl + config.endpoints.profileImagesUpload, request, {headers:authHeader()})
}
function delUserImage(request) {
 return  axios.post(baseUrl + config.endpoints.delUserImage, request, {headers:authHeader()})
}
function profileUpdate(request) {
 return  axios.post(baseUrl + config.endpoints.updateProfile, request, {headers:authHeader()})
} 
// 
// Chat Messages API 
function getAllConversations(request) {
 return  axios.post(baseUrl + config.endpoints.conversations, request, {headers:authHeader()})
} 
function saveMessage(request) {
 return  axios.post(baseUrl + config.endpoints.saveMsg, request, {headers:authHeader()})
}
function getAllMessages(request) {
 return  axios.post(baseUrl + config.endpoints.allMsg, request, {headers:authHeader()})
} 
// End Chat API
//
function adminEventsAllSlots(request) {
 return  axios.post(baseUrl + config.endpoints.adminEventsAllSlots, request, {headers:authHeader()})
} 
function adminEventsSlotBookingDetail(request) {
 return  axios.post(baseUrl + config.endpoints.adminEventsSlotBookingDetail, request, {headers:authHeader()})
} 
function adminUserEventsBookings(request) {
 return  axios.post(baseUrl + config.endpoints.adminUserEventsBookings, request, {headers:authHeader()})
} 

// Dashboard data Apis
function eventDetailsById(request) {
 return  axios.post(baseUrl + config.endpoints.eventDetail, request, {headers:authHeader()})
} 

function settingData(request) {
 return axios.post(baseUrl + config.endpoints.settingData, request, {headers:authHeader()})
}
function userSetting(request) {
 return axios.post(baseUrl + config.endpoints.userSetting, request, {headers:authHeader()})
}
// Profile picture upload
function updateProfilePicture(request) {
 return axios.post(baseUrl + config.endpoints.updateProfilePicture, request, {headers:authHeader()})
}
function reportsToggle(request) {
 return axios.post(baseUrl + config.endpoints.reportsToggle, request, {headers:authHeader()})
}
function deactivateAccount(request) {
 return axios.post(baseUrl + config.endpoints.deactivateAccount, request, {headers:authHeader()})
}


// End Profile picture upload 
// 
function logout() {
 localStorage.clear()
 sessionStorage.clear()
 return <Navigate to="/login" />
}
export const APIService = {
 login,
 logout,
 authUser,
 resetPassword,
 changePassword,
 updatePassword,
 categories,
 services,
 ApplyForPractitioner,
 ApplyForPractitionerUploadDocs,
 UserProfile,
 ApplyForPractitionerDeleteDocs,
 profileImagesUpload,
 profileUpdate,
 globalLanguages,
 eventDetailsById,
 settingData,
 userSetting,
 updateProfilePicture,
 delUserImage,
 usersList,
 allPayments,
 allTemplate,
 addTemplate,
 deleteTemplate,
 updateTemplate,
 templateDetail,
 releasePayment,
 UpdateUserStatus,
 UpdateUserPassword,
 readNotification,
 allNotification,
 eventsAll,
 allPractitionerPayments,
 categoryAdd,
 UpdateAdminPassword,
 adminProfileUpdate,
 updateCategory,
 adminEventReport,
 adminUserReport,
 adminUserAllEvents,
 getAllMessages,
 getAllConversations,
 saveMessage,
 adminEventsAllSlots,
 adminEventsSlotBookingDetail, 
 adminUserEventsBookings,
 userPaymentRefund,
 reportsToggle,
 deactivateAccount
   }

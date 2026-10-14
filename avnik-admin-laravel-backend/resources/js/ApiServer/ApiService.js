import Axios from "axios"
import { authHeader } from "./Config"

export const ApiService = {
   _authUser,
   _favorite,
   _fetchFavorites,
   _fetchEventDetails,
   _fetchAllPayments,
   _fetchUserProfileReviews,
   _fetchUserDashboardReviews,
   _fetchEventDetailsReviews,
   _addAndReplyReviews,
   _updateReviews,
   _fetchAllMessages,
   _createChatRoom,
   _UpdateRoom,
   _enterChatRoom,
   _addUserIntoRoom,
   _initiateChat,
   _fetchAllContacts,
   _sendMessage,
   _joiningRequestPop,
   _fetchMyRoom,
   _viewGroupPeoples,
   _moveUserToRoom,
   _createEventRoom,
   _removeUserFromRoom,
   _deleteRoom,
   broadcastingToggle,
   _searchMyContacts,
   _myEvents,
   _eventSlotsDetails,
   _MyEvents,
   _myProfileSlotsDetails,
   _MyUpComingEvents,
   _FileRename,
   _createFolder,
   _deleteMultipleFile,
   _validUsername,
   _fetchUpComingSlots,
   _profileUpcomingEventsSlot,
   parentCategories,
   childCategories,
   deleteEvent,
   deleteEventSlot,
   showEventsProfileCalenders,
   TimeConflictsChecks,
   BookingTimeConflictsChecks,
   _editMyEventsFetch,
   _cancelBooking,
   _getNotifications,
   _getUnreadNotifications,
   _readNotifications,
   _removeBooking,
   _DeleteMyFollowingEvent,
   _CancelMyFollowingEvent,
   _DisableMyFollowingEvent,
   _uploadMultipleFiles,
   _updateEvent,
   EditEventTimeConflictsChecks,
   _eventFileChargesPaymentService,
   _skipStepComplete,
   _confirmEmail,
   _addEventSlots,
   _addBankAccount,
   _addCards,
   _listCustomerCards,
   _DeleteCustomerCards,
   _connectAccountPayout,
   _listBankAccount,
   _deleteBankAccount,
   _updateBankAccount,
   _bankAccountVerification,
   userPaymentRefund
}
function _addBankAccount(Request) {
   return Axios.post('/api/banks/add', Request, authHeader());
}
function userPaymentRefund(Request) {
   return Axios.post('/api/userPayments/refund', Request, authHeader());
}
function _bankAccountVerification(Request) {
   return Axios.post('/api/banks/verified', Request, authHeader());
}
function _deleteBankAccount(Request) {
   return Axios.delete('/api/banks/'+Request, authHeader());
}
function _updateBankAccount(Request) {
   return Axios.post('/api/banks/update',Request, authHeader());
}
function _listBankAccount(Request) {
   return Axios.post('/api/banks/list', Request, authHeader());
}
function _connectAccountPayout(Request) {
   return Axios.post('/api/banks/payouts', Request, authHeader());
}
function _addCards(Request) {
   return Axios.post('/api/cards/add', Request, authHeader());
}
function _listCustomerCards(Request) {
   return Axios.post('/api/cards', Request, authHeader());
}
function _DeleteCustomerCards(Request) {
   return Axios.delete('/api/cards/'+Request, authHeader());
}

function _authUser(){
  return Axios.get('/api/user',authHeader());
}
function _favorite(Request) {
   return Axios.post('/api/favorite', Request, authHeader());
}
function _fetchFavorites(Request) {
   return Axios.post(`/api/favorite/list?page=${Request.nextPage}`, Request, authHeader());
}
function _fetchEventDetails(Request) {
   return Axios.get(`/api/events/${Request}`, authHeader());
}
// validUsername
function _validUsername(Request){
   return Axios.post(`/api/validUsername`, Request, authHeader());
}
// skip-complete
function _skipStepComplete(Request){
   return Axios.post(`/api/skip-step`, Request, authHeader());
}
// skip-complete
function _confirmEmail(Request){
   return Axios.post(`/api/email-conformation`, Request, authHeader());
}
//  Reviews
function _fetchUserProfileReviews(Request) {
   return Axios.post(`/api/reviews/profile?page=${Request.nexPage}`, Request, authHeader());
}
function _fetchEventDetailsReviews(Request) {
   return Axios.post(`/api/reviews/event?page=${Request.nexPage}`, Request, authHeader());
}
function _fetchUpComingSlots(Request) {
   return Axios.post(`/api/events/upComingSlots`, Request, authHeader());
}

function _fetchUserDashboardReviews(Request) {
   return Axios.post(`/api/reviews?page=${Request.nextPage}`, Request, authHeader());
}
function _addAndReplyReviews(Request) {
   return Axios.post(`/api/reviews/add`, Request, authHeader());
}
function _updateReviews(Request) {
   return Axios.put(`/api/reviews`, Request, authHeader());
}
// End
// File Manager
function _FileRename(Request) {
   return Axios.post(`/api/fileManager/rename`, Request, authHeader());
}
function _createFolder(Request) {
   return Axios.post(`/api/fileManager/createFolder`, Request, authHeader());
}
function _deleteMultipleFile(Request) {
   return Axios.post(`/api/fileManager/deleteMultipleFile`, Request, authHeader());
}

// End fileManager
// FIle Stripe Payment 

async function  _eventFileChargesPaymentService (Request) {
   return await Axios.post(`/api/payments/eventFile`, Request, authHeader());
}
// end FIle stripe payment 
// File Upload
 async function _uploadMultipleFiles(Request) {
   return await Axios.post(`'/api/fileManager'`, Request, authHeader());
}
// File Upload End
function _fetchAllPayments(Request) {
   return Axios.post(`/api/userPayments?page=${Request.nextPage}`, Request, authHeader());
}

// chat Apis

function _fetchAllMessages(Request) {
   return Axios.post(`/api/messages?page=${Request?.nextPage}`, Request, authHeader());
}
function _fetchAllContacts(Request) {
   return Axios.post(`/api/contacts?page=${Request?.nextPage}`, Request, authHeader());
}
function _createChatRoom(Request) {
   return Axios.post(`/api/messages/createRoom`, Request, authHeader());
}
function _UpdateRoom(Request) {
   return Axios.post(`/api/messages/UpdateRoom`, Request, authHeader());
}
function _createEventRoom(Request) {
   return Axios.post(`/api/messages/createEventRoom`, Request, authHeader());
}
function _removeUserFromRoom(Request) {
   return Axios.post(`/api/messages/removeUserFromRoom`, Request, authHeader());
}
function _deleteRoom(Request) {
   return Axios.post(`/api/messages/deleteRoom`, Request, authHeader());
}
function _searchMyContacts(Request){
   return Axios.post('/api/messages/searchMyContacts', Request, authHeader())
}
function broadcastingToggle(Request) {
   return Axios.post(`/api/messages/broadcastingToggle`, Request, authHeader());
}
function _fetchMyRoom(Request) {
   return Axios.post(`/api/messages/myGroups?page=${Request.nextPage}`, Request, authHeader());
}

function _moveUserToRoom(Request) {
   return Axios.post(`/api/messages/moveUserRoom`, Request, authHeader());
}
function _viewGroupPeoples(Request) {
   return Axios.post(`/api/messages/viewGroupPeoples`, Request, authHeader());
}
function _enterChatRoom(Request) {
   return Axios.post(`/api/messages/enterRoom?page=${Request?.nextPage}`, Request, authHeader());
}
function _addUserIntoRoom(Request) {
   return Axios.post(`/api/messages/addToRoom`, Request, authHeader());
}
function _getNotifications(Request) {
   return Axios.get(`/api/notifications`, authHeader());
}
function _getUnreadNotifications(Request) {
   return Axios.get(`/api/notifications/unread`, authHeader());
}
function _readNotifications(Request) {
   return Axios.put(`/api/notifications/${Request?.id}/read`,Request ,authHeader());
}
function _initiateChat(Request) {
   return Axios.post(`/api/messages/initiate`, Request, authHeader());
}
function _sendMessage(Request) {
   return Axios.post(`/api/messages/sendMessage`, Request, authHeader());
}
function _myEvents(Request){
   return  Axios.post('/api/events/auth/user/my/events',Request,authHeader());
}
function  _editMyEventsFetch  (Request){
   return Axios.post('/api/events/edit',Request,authHeader());
}
function  _updateEvent(Request){
   return Axios.post('/api/events/update',Request,authHeader());
}
function  _DeleteMyFollowingEvent  (Request){
   return Axios.post('/api/events/delete',Request,authHeader());
}
function  _CancelMyFollowingEvent  (Request){
   return Axios.post('/api/events/cancel',Request,authHeader());
}
function _DisableMyFollowingEvent(Request){
   return Axios.post('/api/events/disable',Request,authHeader());
}
function _eventSlotsDetails(Request){
   return Axios.post('/api/events/detailsSlots',Request,authHeader());
}
function _myProfileSlotsDetails(Request){
   return Axios.post('/api/profile/slotDetails',Request,authHeader());
}
function _profileUpcomingEventsSlot(Request){
   return Axios.post('/api/profile/upcomingEventsSlot',Request,authHeader());
}
function _MyUpComingEvents(Request){

   return Axios.post('/api/events/MyUpComingEvents',Request,authHeader());
}
function _MyEvents(Request){

   return Axios.post('/api/events/my-events',Request,authHeader());
}
// show profile monthly events with pagination
function showEventsProfileCalenders(Request){
   return Axios.post('/api/profile/showEventsProfileCalenders',Request,authHeader());
}
// booking 
function _cancelBooking(Request){
   return Axios.post('/api/booking/cancel',Request,authHeader());
}
function _removeBooking(Request){
   return Axios.post('/api/booking/remove',Request,authHeader());
}
// chat end
// categories all 
function parentCategories(Request){
   return Axios.get('/api/categories',authHeader());
}
function childCategories(Request){
   return Axios.post('/api/categories',Request,authHeader());
}
// delete event and slot 
function deleteEvent(Request){
   return Axios.delete('/api/eventHandling/eventDelete',Request,authHeader());
}
function deleteEventSlot(Request){
   return Axios.delete('/api/eventHandling/eventSlotDelete',Request,authHeader());
}
function TimeConflictsChecks(Request){
   return Axios.post('/api/events/TimeConflictsChecks',Request,authHeader());
}
function _addEventSlots(Request){
   return Axios.post('/api/events/addSlot',Request,authHeader());
}
function EditEventTimeConflictsChecks(Request){
   return Axios.post('/api/events/EditEventTimeConflictsChecks',Request,authHeader());
}
function BookingTimeConflictsChecks(Request){
   return Axios.post('/api/events/BookingTimeConflictsChecks',Request,authHeader());
}
// 
// Joining Request
function _joiningRequestPop(Request) {
   return Axios.get(`api/joiningRequest/${Request}`, authHeader());
}
// End Joining Request


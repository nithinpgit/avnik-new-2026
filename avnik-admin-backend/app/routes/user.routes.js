const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");
const cors = require("cors");
const multer = require('multer');
const { check, body } = require("express-validator");
var path = require('path');

// const upload = multer({
//   dest: '../uploads/user/'
// });

const storage = multer.diskStorage({   
  destination: function(req, file, cb) { 
     cb(null, '../uploads/user/');    
  }, 
  filename: function (req, file, cb) { 
     cb(null , file.originalname);   
  }
});
const storage1 = multer.diskStorage({   
  destination: function(req, file, cb) { 
    //  cb(null, '/var/www/html/storage/uploads/profiles');
     cb(null, path.join(__dirname, '../../../uploads/'));
         
  }, 
  filename: function (req, file, cb) { 
     cb(null , file.originalname);   
  }
});

const upload = multer({
  storage: storage,
  limits : {fileSize : 50000000}
});
const upload1 = multer({
  storage: storage1,
  limits : {fileSize : 50000000}
});

module.exports = function(app) {
  app.use(cors({origin: "*"}));

  // app.get("/api/test/all", controller.allAccess);

  app.get(
    "/api/test/user",
    [authJwt.verifyToken],
    controller.userBoard
  );
  app.post(
    "/api/sendMailTemplate",
    [
      check('to_email', 'Receiver is not valid').not().isEmpty(),
      check('data', 'Data is not valid').not().isEmpty(),
      check('type', 'Type is mandatory').not().isEmpty(),
    ],
    controller.sendMailTemplate
  );
  
  app.post(
    "/api/emailverify",
    [
      check('email', 'Email is not valid').not().isEmpty().isEmail(),
      check('token', 'Token is not valid').not().isEmpty()
    ],
    controller.emailverify
  );
  // $2a$08$EiEu.v6eL9coix2GNmcbtuy7C8z2f.fCfaUxGWT9Q7IfXJ.WGscoG

  app.post(
    "/api/resendEmailVerification",
    [
      check('email', 'Email is not valid').not().isEmpty().isEmail(),
    ],
    controller.resendEmailVerification
  );
  app.get(
    "/api/direct",
    [authJwt.verifyToken],
    controller.direct
  );
  app.post(
    "/api/resetpassword",
    [
      check('email', 'Email is not valid').isEmail()
    ],
    controller.resetpassword
  );
  app.post(
    "/api/changepass",
    [
      check('email', 'Email is not valid').not().isEmpty().isEmail(),
      check('token', 'Token is not valid').not().isEmpty()
    ],
    controller.changepass
  );
  app.post(
    "/api/updatepass",
    [
      check('password', 'Password is not valid').not().isEmpty(),
      check('con_password', 'confirm password is not valid').not().isEmpty(),
      check('con_password').custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error('Password confirmation does not match password');
        }
        return true;
      }),
      check('email', 'Email is mandatory').not().isEmpty(),
      check('token', 'Token is mandatory').not().isEmpty()
    ],
      controller.updatepass
  );
  app.post(
    "/api/profile",
    [authJwt.verifyToken],
    upload.none(),
    [
      check('participentId', 'Participent Id is not valid').not().isEmpty()
    ],
    controller.profile
  );
  app.post(
    "/api/uploadUserImages",
    [authJwt.verifyToken],
    // [
    //   check('is_main', 'Please upload at least one image').not().isEmpty()
    // ],
    upload.array('images', 10),
    controller.uploadUserImages
  );
  app.post(
    "/api/delUserImage",
    [authJwt.verifyToken],
    [
      check('is_main', 'Something went wrong.').not().isEmpty()
    ],
    controller.delUserImage
  );
  app.post(
    "/api/updateProfile",
    [authJwt.verifyToken],
    [
      check('name', 'Name field is Mandatory.').not().isEmpty(),
      check('location', 'Location field is Mandatory.').not().isEmpty(),
      check('language', 'Language field is Mandatory.').not().isEmpty(),
      check('gender', 'Gender field is Mandatory.').not().isEmpty(),
      check('phone', 'Phone field is Mandatory.').not().isEmpty(),
      // check('aboutme', 'Phone field is Mandatory.').not().isEmpty(),
      // check('bio', 'Bio field is Mandatory.').not().isEmpty(),
      check('speciality', 'Speciality field is Mandatory.').not().isEmpty(),
    ],
    controller.updateProfile
  );
  app.post(
    "/api/deactivateAccount",
    [authJwt.verifyToken],
    controller.deactivateAccount
  );

  app.post(
    "/api/home",
    // [authJwt.verifyToken],
    controller.home
  );
  app.post(
    "/api/favourite",
    [authJwt.verifyToken],
    [
      check('pracId', 'Practitioner Id is must.').not().isEmpty()
    ],
    controller.favourite
  );
  app.post(
    "/api/getPaymentDetailForInvoice",
    [authJwt.verifyToken],
    [
      check('payment_id', 'Payment Id is must.').not().isEmpty()
    ],
    controller.getPaymentDetailForInvoice
  );
  app.post(
    "/api/reportUser",
    [authJwt.verifyToken],
    [
      check('pracId', 'Practitioner Id is must.').not().isEmpty(),
      check('reason', 'Select the reason of reporting.').not().isEmpty()
    ],
    controller.reportUser
  );
  
  app.post(
    "/api/eventPay",
    [authJwt.verifyToken],
    controller.eventPay
  );

  app.post(
    "/api/attachCard",
    [authJwt.verifyToken],
    [
      check('paymentMethod_id', 'Strip Payment Method Id is must.').not().isEmpty()
    ],
    controller.attachCard
  );
  
  app.post(
    "/api/detachCard",
    [authJwt.verifyToken],
    [
      check('paymentMethod_id', 'Strip Payment Method Id is must.').not().isEmpty()
    ],
    controller.detachCard
  );
  
  app.post(
    "/api/eventPay",
    [authJwt.verifyToken],
    controller.eventPay
  );
  
  app.post(
    "/api/stripCardList",
    [authJwt.verifyToken],
    controller.stripCardList
  );

  app.post(
    "/api/myBookings",
    [authJwt.verifyToken],
    controller.myBookings
  );

  app.post(
    "/api/bookings",
    [authJwt.verifyToken],
    controller.bookings
  );
  
  app.post(
    "/api/addBankAccount",
    [authJwt.verifyToken],
    [
      check('account_holder_name', 'Account Holder Name is must.').not().isEmpty(),
      check('account_holder_type', 'Account Holder Type is must.').not().isEmpty(),
      check('routing_number', 'Routing Number is must.').not().isEmpty(),
      check('account_number', 'Account Number is must.').not().isEmpty(),
      // check('messages', 'Messages is must.').not().isEmpty()
    ],
    controller.addBankAccount
  );

  app.post(
    "/api/verifyBankAccount",
    [authJwt.verifyToken],
    [
      check('stripe_bank_id', 'Bank Id is must.').not().isEmpty()
    ],
    controller.verifyBankAccount
  );

  app.post(
    "/api/getBankAccounts",
    [authJwt.verifyToken],
    controller.getBankAccounts
  );
  app.post(
    "/api/deleteBankAccount",
    [authJwt.verifyToken],
    [
      check('stripe_bank_id', 'Bank Id is must.').not().isEmpty()
    ],
    controller.deleteBankAccount
  );
  app.post(
    "/api/setDefaultBankAccount",
    [authJwt.verifyToken],
    [
      check('stripe_bank_id', 'Bank Id is must.').not().isEmpty()
    ],
    controller.setDefaultBankAccount
  );
  app.post(
    "/api/getUserPayments",
    [authJwt.verifyToken],
    controller.getUserPayments
  );
  app.post(
    "/api/nonRatedEvent",
    [authJwt.verifyToken],
    controller.nonRatedEvent
  );
  app.post(
    "/api/ratedEvent",
    [authJwt.verifyToken],
    controller.ratedEvent
  );
  app.post(
    "/api/receivedRating",
    [authJwt.verifyToken],
    controller.receivedRating
  );
  app.post(
    "/api/replyRating",
    [authJwt.verifyToken],
    [
      check('ratingId', 'Rating Id is must.').not().isEmpty(),
      check('reply', 'Reply is must.').not().isEmpty()
    ],
    controller.replyRating
  );
    
  app.post(
    "/api/stripeConnect",
    [authJwt.verifyToken],
    controller.stripeConnect
  );
  
  app.post(
    "/api/updateProfilePicture",
    [authJwt.verifyToken],
    upload1.single('image'),
    controller.updateProfilePicture
  );
  
  app.post(
    "/api/stripeApproved",
    [authJwt.verifyToken],
    controller.stripeApproved
  );

  app.post(
    "/api/userProfileReviews",
    [authJwt.verifyToken],
    [
      check('prac_id', 'Practitioner Id is must.').not().isEmpty()
    ],
    controller.userProfileReviews
  );
  

  // Admin Routes

  app.post(
    "/api/approvePractitioner",
    [authJwt.verifyToken, authJwt.isAdmin],
    [
      check('to_be_practitioner', 'User Id is must.').not().isEmpty()
    ],
    controller.approvePractitioner
  );

  
  app.post(
    "/api/disapprovePractitioner",
    [authJwt.verifyToken, authJwt.isAdmin],
    [
      check('not_to_be_practitioner', 'User Id is must.').not().isEmpty()
    ],
    controller.dispprovePractitioner
  );

  app.post(
    "/api/approvePractitionerService",
    [authJwt.verifyToken, authJwt.isAdmin],
    [
      check('service_id', 'Service Id is must.').not().isEmpty(),
    ],
    controller.approvePractitionerService
  );

  app.post(
    "/api/UpdateUserPassword",
    [
      check('user_id', 'User is not valid').not().isEmpty(),
      check('password', 'Password is not valid').not().isEmpty(),
      check('con_password', 'confirm password is not valid').not().isEmpty(),
      check('con_password').custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error('Password confirmation does not match password');
        }
        return true;
      })
    ],
    controller.UpdateUserPassword
  );

  app.post(
    "/api/practitionerList",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.practitionerList
  );

  app.post(
    "/api/allPayments",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.allPayments
  );

  app.post(
    "/api/usersList",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.usersList
  );

  app.post(
    "/api/releasePayment",
    [authJwt.verifyToken, authJwt.isAdmin],
    [
      check('payment_id', 'Payment Id is must.').not().isEmpty()
    ],
    controller.releasePayment
  );

  app.post(
    "/api/practitionerServicesList",
    [authJwt.verifyToken, authJwt.isAdmin],
    [
      check('prac_id', 'Practitioner Id is must.').not().isEmpty()
    ],
    controller.practitionerServicesList
  );

  app.post(
    "/api/practitionerEventsList",
    [authJwt.verifyToken, authJwt.isAdmin],
    [
      check('prac_id', 'Practitioner Id is must.').not().isEmpty()
    ],
    controller.practitionerEventsList
  );
  
  app.post(
    "/api/allPractitionerPayments",
    [authJwt.verifyToken, authJwt.isAdmin],
    [
      check('prac_id', 'Practitioner Id is must.').not().isEmpty()
    ],
    controller.allPractitionerPayments
  );
  app.post(
    "/api/UpdateUserStatus",
    [authJwt.verifyToken, authJwt.isAdmin],
    [
      check('user_id', 'User Id is must.').not().isEmpty(),
      check('status', 'Status is must.').not().isEmpty(),
    ],
    controller.UpdateUserStatus
  );
  
  app.post(
    "/api/userPracPayment",
    [authJwt.verifyToken, authJwt.isAdmin],
    [
      check('payment_id', 'Payment Id is must.').not().isEmpty()
    ],
    controller.userPracPayment
  );

  app.post(
    "/api/adminPracPayment",
    [authJwt.verifyToken, authJwt.isAdmin],
    [
      check('payment_id', 'Payment Id is must.').not().isEmpty()
    ],
    controller.adminPracPayment
  );

  app.post(
    "/api/userPaymentsRefund",
    [authJwt.verifyToken, authJwt.isAdmin],
    [
      check('paymentId', 'payment Id is must.').not().isEmpty(),
      check('percentage', 'percentage is must.').not().isEmpty()
    ],
    controller.userPaymentsRefund
  );
  
  app.post(
    "/api/updateAdminPass",
    [authJwt.verifyToken, authJwt.isAdmin],
    [
      check('oldPassword', 'Old Password is not valid').not().isEmpty(),
      check('password', 'Password is not valid').not().isEmpty(),
      check('con_password', 'confirm password is not valid').not().isEmpty(),
      check('con_password').custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error('Password confirmation does not match password');
        }
        return true;
      })
    ],
      controller.updateAdminPass
  );

  
  app.post(
    "/api/adminProfileUpdate",
    [authJwt.verifyToken, authJwt.isAdmin],
    [
      check('name', 'Name is must.').not().isEmpty()
    ],
    controller.adminProfileUpdate
  );
  
  
  app.post(
    "/api/adminUserReport",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminUserReport
  );

  app.post(
    "/api/adminUserReport/closeReport",
    [authJwt.verifyToken, authJwt.isAdmin],
    [
      check('id', 'Report Id is must.').not().isEmpty()
    ],
    controller.adminToggleReportStatus
  );
  
  app.post(
    "/api/adminEventReport",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminEventReport
  );

  app.post(
    "/api/reportToggle",
    [authJwt.verifyToken, authJwt.isAdmin],
    [
      check('id', 'Report Id is must.').not().isEmpty()
    ],
    controller.adminToggleReportStatus
  );
  
  app.post(
    "/api/adminAllEvents",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminAllEvents
  );
  app.post(
    "/api/adminEventsAllSlots",
    [authJwt.verifyToken, authJwt.isAdmin],
    [
      check('eventId', 'Event Id is must.').not().isEmpty()
    ],
    controller.adminEventsAllSlots
  );
  
  app.post(
    "/api/adminEventsSlotBookingDetail",
    [authJwt.verifyToken, authJwt.isAdmin],
    [
      check('slotId', 'Slot Id is must.').not().isEmpty()
    ],
    controller.adminEventsSlotBookingDetail
  );
  
  app.post(
    "/api/adminUserAllEvents",
    [authJwt.verifyToken, authJwt.isAdmin],
    [
      check('userId', 'User Id is must.').not().isEmpty()
    ],
    controller.adminUserAllEvents
  );
  
  
  app.post(
    "/api/adminUserEventsBookings",
    [authJwt.verifyToken, authJwt.isAdmin],
    [
      check('userId', 'User Id is must.').not().isEmpty()
    ],
    controller.adminUserEventsBookings
  );
  

};

const db = require("../models");
const config = require("../config/auth.config");
// const socketConfig = require("../config/socket.config");
const { decode } = require("jsonwebtoken");
const jwt = require("jsonwebtoken");
var fs = require("fs");
var nodemailer = require('nodemailer');
var bcrypt = require("bcryptjs");
const { validationResult, body } = require("express-validator");
// const multer = require('multer');
var path = require('path');
const Emailtemplates = db.emailTemplates;
const User = db.user;
const User1 = db.user1;
const Userdetail = db.userdetail;
const Practitioner = db.practitioners;
const practitionerServices = db.practitionerServices;
const Practitionerdocs = db.practitionerdocs;
const Services = db.service;
const Categories = db.category;
const Forgetpass = db.forgetpass;
const UserImages = db.userImages;
const FavouritePractitioner = db.favouritePractitioner;
const ReportUser = db.reportUser;
const BookedEvent = db.bookedEvent;
const BookedEvent1 = db.bookedEvent1;
const UserSettings = db.userSettings
const MeetingDetail = db.meetingDetail;
const Recordings = db.recordings;
const Bankaccount = db.bankaccount;
const Payments = db.payments;
const EventReview = db.eventReview;
const Event = db.event;
const Packages = db.packages;
const Notification = db.notifications;
const Emailverify = db.emailVerify;
const UserReport = db.reportUser;
const EventSlot = db.eventSlot;
const { Op } = require("sequelize");
const Stripe = require('stripe');
const { isObject } = require("util");
const { json } = require("body-parser");
const { userPackages, userdetail } = require("../models");
const stripe = Stripe(process.env.STRIPE_SECRET);

const profilePictureSubquery = (tableAlias = 'users') =>
  `(SELECT profile_picture FROM user_profiles WHERE user_fk_id = ${tableAlias}.id LIMIT 1)`;

const legacyImageAttribute = (fileUrl, tableAlias = 'users') => {
  const imageSubquery = profilePictureSubquery(tableAlias);

  return [
    db.sequelize.literal(
      `CASE WHEN COALESCE(${imageSubquery}, '') = '' THEN null ELSE concat('${fileUrl}', ${imageSubquery}) END`
    ),
    'image'
  ];
};

const setLegacyProfileImage = async (userId, filename) => {
  const existingProfile = await Userdetail.findOne({
    where: { user_fk_id: userId }
  });

  if (existingProfile) {
    return existingProfile.update({ profile_picture: filename });
  }

  return Userdetail.create({
    user_fk_id: userId,
    profile_picture: filename
  });
};

const DEACTIVATION_WALLET_THRESHOLD = 50;

const getUpcomingBookingCount = async (userId) => {
  const [result] = await db.sequelize.query(
    `SELECT COUNT(*) AS total
     FROM event_bookings
     WHERE delete_status = '1'
       AND status NOT IN ('cancelled', 'cancelledByHost', 'cancelledByParticipant', 'completed', 'ended')
       AND COALESCE(
         STR_TO_DATE(start_date_time, '%Y-%m-%d %H:%i:%s'),
         STR_TO_DATE(start_date_time, '%Y-%m-%d %H:%i')
       ) > NOW()
       AND (p_user_id = :userId OR h_user_id = :userId)`,
    {
      replacements: { userId },
      type: db.Sequelize.QueryTypes.SELECT
    }
  );

  return parseInt(result.total || 0, 10);
};

const getWalletBalance = async (userId) => {
  const [result] = await db.sequelize.query(
    `SELECT COALESCE(
        SUM(
          GREATEST(
            CAST(amount AS DECIMAL(10,2)) - COALESCE(CAST(refunded_amount AS DECIMAL(10,2)), 0),
            0
          )
        ),
        0
      ) AS walletBalance
     FROM event_payments
     WHERE to_user = :userId
       AND status = 'succeeded'
       AND released = 0`,
    {
      replacements: { userId },
      type: db.Sequelize.QueryTypes.SELECT
    }
  );

  return parseFloat(result.walletBalance || 0);
};

const getUserBankAccount = async (userId) => {
  const [result] = await db.sequelize.query(
    `SELECT id, account_number, account_holder_name, ifsc_code, bank_name, account_status, account_verified_status
     FROM bank_accounts
     WHERE user_fk_id = :userId
     ORDER BY id DESC
     LIMIT 1`,
    {
      replacements: { userId },
      type: db.Sequelize.QueryTypes.SELECT
    }
  );

  return result || null;
};

const sendDeactivationEmail = async (user) => {
  if (!user || !user.email) {
    return;
  }

  return transporter.sendMail({
    from: 'liberate.dev@gmail.com',
    to: user.email,
    subject: 'Account Deactivated',
    html: `Hello ${user.name || 'User'},<br><br>Your account has been deactivated successfully.<br>If you wish to reactivate the account, please login again and follow the reactivation flow.<br><br>Regards<br>Avnik`
  });
};

const transporter = nodemailer.createTransport({
  port: 465,
  host: "smtp.gmail.com",
  auth: {
    // user: 'ankit.enacteservices@gmail.com',
    // pass: 'wtecgywjhqmvxueq',
    user: 'liberate.dev@gmail.com',
    pass: "ibrxffgycwienvip"
  },
  secure: true,
});
//email=ankit.admin@gmail.com&token=$2a$08$uZ.VgUd96yeAlFKxFNUcU.z.V4j6iIhtXe/iqaPsbDZDZ7/xh9Sbm"
exports.changepass = (req, res) => {
  // return console.log(config.baseUrl);
  // return console.log(req.headers.authorization);
  var token = req.body.token;
  Forgetpass.findOne({
    where: {
      token: token,
      email: req.body.email
    }
  })
    .then(forgetpass => {
      console.log(forgetpass);
      if (forgetpass) {
          res.status(200).send({
            status: 200,
            message: "Data fetched",
            success: true,
            data: { 'email': forgetpass.email }
          });
      } else {
        res.status(201).send({
          status: 201,
          message: "Link expired",
          success: false
        });
      }
    }).catch(err => {
      res.status(500).send({
        status: 500,
        success: false,
        message: err.message
      });
    });
};

exports.resetpassword = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(201).send({ status: 201, message: "Something went wrong.", success: false, data: errors.array() });
  }

  User.findOne({
    where: {
      email: req.body.email
    }
  }).then(email_data => {
    // console.log(email_data)
    if (email_data) {
      Forgetpass.create({
        email: req.body.email,
        token: bcrypt.hashSync(req.body.email, 8)
      })
        .then(forgetpass => {
          // return console.log(req.headers.host);
          var resetUrl = "https://abc.com/change-password?email=" + forgetpass.email + "&token=" + forgetpass.token;
          // var resetUrl = req.headers.host+'/api/changepass?token='+forgetpass.token;
          const mailData = {
            from: 'avnik@mailinator.com',  // sender address
            to: req.body.email,   // list of receivers
            subject: 'Reset Password',
            html: '<b>Click on reset password to set new password. <br/> <a href=' + resetUrl + '>Reset Password</a> <br/> <p>' + resetUrl + '</p>',
          };
          transporter.sendMail(mailData, function (err, info) {
            if (err)
              console.log(err)
            else
              console.log(info);
          });
          res.status(200).send({ status: 200, message: "Reset password mail has been sent.", success: true, data: { 'email': req.body.email, 'url': resetUrl } });
        })
        .catch(err => {
          res.status(500).send({ status: 500, success: false, message: err.message });
        });
    } else {
      res.status(201).send({ status: 201, message: "Email not registered with us", success: false });
    }
  }).catch(err => {
    res.status(500).send({ status: 500, success: false, message: err.message });
  })


};
exports.userDetail = (req, res) => {
  // req.headers && req.headers.authorization
  if (req.headers && req.headers.authorization) {
    jwt.verify(req.headers.authorization.split(' ')[1], config.secret, (err, decoded) => {
      if (err) {
        return res.status(401).send({
          status: 401,
          success: false,
          message: "Unauthorized!"
        });
      }
      userId = decoded.id;
    });
  };
  // User.findByPk(userId)
  User.findByPk(userId, {
    attributes: {
      include: [
        [db.sequelize.literal("(SELECT AVG(rating) FROM event_reviews WHERE prac_id = "+userId+")"), 'avgRating'],
      ]
    },
    include: [
      {
        model: Practitioner,
      },
      {
        model: Userdetail,
        attributes: ['profile_picture']
      },
      {
        model: UserImages
      }
    ]
  })
    .then(user => {
      var avgRating = 0
      if(user.avgRating){
        avgRating = user.avgRating 
      }
      var prac_res_data = '';
      // var authorities = [];
      var authorities = "";
      user.getRoles().then(roles => {
        for (let i = 0; i < roles.length; i++) {
          // authorities.push(roles[i].name);
          authorities = roles[i].name
        }
        if (user.is_practitioner == "1") {
          user.getPractitioner().then(prac_data => {
            prac_res_data = prac_data;
            // return console.log(roles);
          });
        }


        setTimeout(() => {

          res.status(200).send({
            status: 200,
            success: true,
            data: {
              email: user.email,
              name: user.name,
              roles: authorities,
              image: (user.user_profile && user.user_profile.profile_picture) ? "/user/" + user.user_profile.profile_picture : '',
              signup_step: user.signup_step,
              email_verified: user.email_verified,
              social_token: user.social_token,
              language: user.language,
              location: user.location,
              id: user.id,
              is_parctitioner: user.is_practitioner,
              social_image: user.social_image,
              gender: user.gender,
              phone: user.phone,
              commission: user.commission,
              practitioner: prac_res_data,
              speciality: user.speciality,
              modality: user.modality,
              category: user.category,
              strip_account: user.strip_account,
              strip_verified: user.strip_verified,
              avgRating: avgRating
              // accessToken: req.headers.authorization.split(' ')[1]
            }
          });
        }, 1000)
      });
    })
    .catch(err => {
      res.status(500).send({ status: 500, success: false, message: err.message });
    });
}

exports.profile = (req, res) => {
  // req.headers && req.headers.authorization
  if (req.headers && req.headers.authorization) {
    jwt.verify(req.headers.authorization.split(' ')[1], config.secret, (err, decoded) => {
      if (err) {
        return res.status(401).send({
          status: 401,
          success: false,
          message: "Unauthorized!"
        });
      }
      userId = decoded.id;
    });
  };
  // console.log(userId)
  var uId = ''
  uId = userId
  if(req.body.id){
    uId = req.body.id
  }
  User.findOne({
    include: [
      {
        model: Userdetail
      }
    ],
    where: {
      id: uId,
      status: 'active'
    }
  }).then(user => {
    if (!user) {
      return res.status(404).send({ status: 404, success: false, message: "Profile doesn't exist." });
    }
    // var dataarray = {
    //   id: user.id,
    //   email: user.email,
    //   name: user.name,
    //   email_verified_status: user.email_verified_status,
    //   // image: (user.image) ? "/user/" + user.image : '',
    //   // address: user.location,
    //   phone: (user.role == 'admin') ? user.phone:'',
    //   // userImages: user.user_images,
    // }
    res.status(200).send({ status: 200, success: true, message: 'Data fetched', data: user });
  }).catch(err => {
    res.status(500).send({ status: 500, success: false, message: err.message });
  })
}

exports.deactivateAccount = async (req, res) => {
  const confirmDeactivation = req.body.confirm_deactivation === true ||
    req.body.confirm_deactivation === '1' ||
    req.body.confirm === true ||
    req.body.confirm === '1';

  try {
    const user = await User.findOne({
      where: {
        id: req.userId
      }
    });

    if (!user) {
      return res.status(404).send({ status: 404, success: false, message: 'User not found.' });
    }

    if (user.status !== 'active') {
      return res.status(200).send({
        status: 200,
        success: true,
        message: 'Your account is already deactivated.'
      });
    }

    const upcomingBookingCount = await getUpcomingBookingCount(req.userId);

    if (upcomingBookingCount > 0) {
      return res.status(201).send({
        status: 201,
        success: false,
        message: 'You have active bookings. Cancel those upcoming event before you can deactivate account.',
        data: {
          upcoming_booking_count: upcomingBookingCount
        }
      });
    }

    const walletBalance = await getWalletBalance(req.userId);
    const bankAccount = await getUserBankAccount(req.userId);

    if (!confirmDeactivation) {
      return res.status(200).send({
        status: 200,
        success: true,
        message: 'Are you sure you wish to deactivate your account?',
        data: {
          requires_confirmation: true,
          wallet_balance: walletBalance,
          upcoming_booking_count: 0,
          auto_transfer_on_deactivation: walletBalance > DEACTIVATION_WALLET_THRESHOLD && !!bankAccount
        }
      });
    }

    const transaction = await db.sequelize.transaction();

    try {
      let walletTransferStatus = 'wallet_below_threshold';
      let releasedPayments = 0;

      if (walletBalance > DEACTIVATION_WALLET_THRESHOLD) {
        if (bankAccount) {
          const [updatedRows] = await Payments.update(
            { released: 1 },
            {
              where: {
                to_user: req.userId,
                status: 'succeeded',
                released: 0
              },
              transaction
            }
          );

          releasedPayments = updatedRows;
          walletTransferStatus = updatedRows > 0 ? 'transferred_to_bank' : 'no_pending_wallet_balance';
        } else {
          walletTransferStatus = 'bank_not_added_wallet_retained';
        }
      }

      await db.sequelize.query(
        `UPDATE users
         SET status = 'inactive', account_status = 0
         WHERE id = :userId`,
        {
          replacements: { userId: req.userId },
          transaction
        }
      );

      await db.sequelize.query(
        `UPDATE events
         SET status = 0, is_active = 0, event_visible = 0
         WHERE user_fk_id = :userId`,
        {
          replacements: { userId: req.userId },
          transaction
        }
      );

      await db.sequelize.query(
        `UPDATE event_time_slots ets
         INNER JOIN events e ON e.id = ets.event_fk_id
         SET ets.status = 'disabled'
         WHERE e.user_fk_id = :userId`,
        {
          replacements: { userId: req.userId },
          transaction
        }
      );

      await transaction.commit();

      sendDeactivationEmail(user).catch((mailErr) => {
        console.log(mailErr);
      });

      return res.status(200).send({
        status: 200,
        success: true,
        message: 'Account deactivated successfully.',
        data: {
          wallet_balance: walletBalance,
          wallet_transfer_status: walletTransferStatus,
          released_payments: releasedPayments,
          bank_added: !!bankAccount
        }
      });
    } catch (err) {
      await transaction.rollback();
      return res.status(500).send({ status: 500, success: false, message: err.message });
    }
  } catch (err) {
    return res.status(500).send({ status: 500, success: false, message: err.message });
  }
}

exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};


exports.resendEmailVerification = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(201).send({ status: 201, message: "Something went wrong.", success: false, data: errors.array() });
  }

  // User.findOne({
  //   where: { email: req.body.email, email_verified: '0'}
  // }).then(userData => {
  //   return res.status(200).send(userData)
  // }).catch(err => {
  //   return res.status(500).send({ status: 500, success: false, message: err.message, code: 563 });
  // });  

  User.findOne({
    where: { email: req.body.email, email_verified: '0'}
  }).then(userData => {
    if(userData){
      var tokenVerify= bcrypt.hashSync(req.body.email, 8)
      var verifyUrl = req.headers.host+"/emailVerification?email=" + userData.email + "&token=" + tokenVerify;
      Emailverify.update({
        token: tokenVerify
      },{
        where: {
          email: req.body.email
        }
      })
      const mailData = {
        from: 'liberate.dev@gmail.com',  // sender address
        to: userData.email,   // list of receivers
        subject: 'Email Verification',
        html: "Hello<br>Please click on the link below to confirm your email.<br><a href='"+verifyUrl+"'>Confirm Email</a><br>Regards<br>Liberate"
      };
      console.log(mailData.html)
      transporter.sendMail(mailData, function (err, info) {
        if(err)
          console.log(err)
        else
          console.log(info);

          res.status(200).send({ status: 200, success: true, message: "Link sent on email!" });
      });
    }else{
      res.status(500).send({ status: 500, success: false, message: "link invalid!" });
    }
  }).catch(err => {
    res.status(500).send({ status: 500, success: false, message: err.message, code: 563 });
  });  
    
};

exports.emailverify = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(201).send({ status: 201, message: "Something went wrong.", success: false, data: errors.array() });
  }
  Emailverify.findOne({
    where: { email: req.body.email, token: req.body.token}
  }).then(emailVerifyData => {
    if(emailVerifyData){
      var d1 = new Date();
      var d2 = new Date(emailVerifyData.createdAt);
      if ((d1 - d2) < 604800000) {
        User.findOne({
          where: { email: req.body.email, email_verified: '0'}
        }).then(userData => {
          if(userData){
            User.update({
              email_verified: '1'
            },{
              where: { id: userData.id}
            }).then(verified => {
              if(verified == 1){
                Emailverify.destroy({
                  where: {
                    email: req.body.email
                  }
                })
                res.send({ status: 200, success: true, message: "Email Verified!" });
              }else{
                res.send({ status: 200, success: true, message: "Something went wrong." });
              }
            }).catch(err => {
              res.status(500).send({ status: 500, success: false, message: err.message });
            });
          }else{
            res.status(500).send({ status: 500, success: false, message: "link invalid!" });
          }
        }).catch(err => {
          res.status(500).send({ status: 500, success: false, message: err.message, code: 568 });
        });      
      } else {
        return res.status(201).send({
          status: 201,
          message: "Link expired",
          success: false
        });
      }
    }else{
      return res.status(201).send({
        status: 201,
        message: "No data found!",
        success: false
      });
    }
  }).catch(err => {
    res.status(500).send({ status: 500, success: false, message: err.message, code:585 });
  });
};

checkToken = (req, res, next) => {
  if (req.headers && req.headers.authorization) {
    jwt.verify(req.headers.authorization.split(' ')[1], config.secret, (err, decoded) => {
      if (err) {
        return res.status(401).send({
          status: 401,
          success: false,
          message: "Unauthorized!"
        });
      }
      console.log(decoded.id);
      userId = decoded.id;
      return userId;

      next();
      // return res.send({
      //   userId: decoded.id
      // });
    });
  };
}

exports.updatepass = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(201).send({ status: 201, message: "Something went wrong.", success: false, data: errors.array() });
  }
  var token = req.body.token;
  Forgetpass.findOne({
    where: {
      token: token,
      email: req.body.email
    }
  })
    .then(forgetpass => {
      if (forgetpass) {
        User.update({
          password: bcrypt.hashSync(req.body.password, 8)
        },
        {
          where: {
            email: forgetpass.email,
          }
        }).then(user => {
          Forgetpass.destroy({
            where: {
              email: forgetpass.email
            }
          })
          res.send({ status: 200, success: true, message: "Password updated successfully!" });
        })
        .catch(err => {
          res.status(500).send({ status: 500, success: false, message: err.message });
        });
        
      } else {
        res.status(201).send({
          status: 201,
          message: "Link expired",
          success: false
        });
      }
    }).catch(err => {
      res.status(500).send({
        status: 500,
        success: false,
        message: err.message
      });
    });

}

exports.sendMailTemplate = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(201).send({ status: 201, message: "Something went wrong.", success: false, data: errors.array() });
  }
  
    Emailtemplates.findOne({
      where: { type: req.body.type}
    }).then(emailTemplate => {
      // console.log(emailTemplate)
        
    // var testData = '{"{{AV_userName}}":"Ankit Test","{{AV_contact}}":"9876543210","{{AV_email}}":"test@mailinator.com"}';
    var testData = req.body.data;
    testData = JSON.parse(testData);
    var bodyStr = emailTemplate.body;
    for(var attributename in testData){
      const string = bodyStr;
      bodyStr = string.replace(attributename, testData[attributename])
    }
    const mailData = {
      from: 'avnik@mailinator.com',  // sender address
      to: req.body.to_email,   // list of receivers
      subject: req.body.type,
      html: bodyStr,
    };
    transporter.sendMail(mailData, function (err, info) {
      if(err){
        return res.status(500).send({ status: 500, success: false, message: err.message, code: 504 });
      }else{``
        // console.log(info)
        return res.status(200).send({ status: 200, success: true, message: 'Email has been sent successfully', data: info });
      }
    });
    
  }).catch(err => {
    return res.status(500).send({ status: 500, success: false, message: err.message, code: 512 });
  });

}

exports.uploadUserImages = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(201).send({ status: 201, message: "Something went wrong.", success: false, data: errors.array() });
  }
  if (req.headers && req.headers.authorization) {
    jwt.verify(req.headers.authorization.split(' ')[1], config.secret, (err, decoded) => {
      if (err) {
        return res.status(401).send({
          status: 401,
          success: false,
          message: "Unauthorized!"
        });
      }
      userId = decoded.id;
    });
  };

  var files = req.files;
  if (files.length < 1 || files.length === undefined) {
    res.status(201).send({ status: 201, success: false, message: 'Please upload at lest one image' });
  }
  var uploadedFiles = [];
  for (let i = 0; i < files.length; i++) {
    
    files[i].originalname = 'app/uploads/user/' + files[i].originalname;
    fs.rename(files[i].path, files[i].originalname, function (err) {
      if (err) {
        res.status(500).send({ status: 500, success: false, message: err.message });
      } else {
        if (req.body.is_main == '1') {
          var origName = files[i].originalname.split('app/uploads/user/')[1]
          setLegacyProfileImage(userId, origName).then(user => {
            var fileUrl = "/user/" + files[i].originalname;
            uploadedFiles.push({ 'id': '', 'is_main': '1', 'name': files[i].originalname, 'file': fileUrl });
          }).catch(err => {
            res.status(500).send({ status: 500, success: false, message: err.message });
          });
        } else {
          var origName = files[i].originalname.split('app/uploads/user/')[1]
          UserImages.create({
            userId: userId,
            name: origName,
            originalName: origName
          }).then(fileData => {
            var fileUrl = "app/uploads/user/" + fileData.name;
            uploadedFiles.push({ 'id': fileData.id, 'is_main': '0', 'name': fileData.originalName, 'file': fileUrl });
          }).catch(err => {
            res.status(500).send({ status: 500, success: false, message: err.message });
          });
        }
      }
    });
  }
  setTimeout(() => {
    console.log(uploadedFiles);
    res.status(200).send({ status: 200, success: true, message: 'Images uploaded Successfully', data: uploadedFiles });
  }, 2000)

};

exports.delUserImage = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(201).send({ status: 201, message: "Something went wrong.", success: false, data: errors.array() });
  }
  if (req.headers && req.headers.authorization) {
    jwt.verify(req.headers.authorization.split(' ')[1], config.secret, (err, decoded) => {
      if (err) {
        return res.status(401).send({
          status: 401,
          success: false,
          message: "Unauthorized!"
        });
      }
      userId = decoded.id;
    });
  };
  var oldImg = ''
  if (req.body.is_main == '1') {
    Userdetail.findOne({
      where: { user_fk_id: userId }
    }).then(data => {
      oldImg = data ? data.profile_picture : ''
    });
    setTimeout(() => {
      setLegacyProfileImage(userId, '').then(udata => {
        if (oldImg) {
          fs.unlink('app/uploads/user/' + oldImg, (err => {
            if (err) {
              console.log(err)
              console.log('not removed');
            }
          }));
        }
        res.status(200).send({ status: 200, success: true, message: 'Profile picture removed!' });
      }).catch(err => {
        res.status(500).send({ status: 500, success: false, message: err.message });
      })
    }, 1000);
  } else {
    if (!req.body.imageId) {
      var errdata =
      {
        msg: "Something went wrong.",
        param: "imageId",
        location: "body"
      }

      return res.status(201).send({ status: 201, message: "Image Id is mandatory!", success: false, data: errdata });
    }
    UserImages.findByPk(req.body.imageId).then(img_data => {
      oldImg = img_data.name
    });
    setTimeout(() => {
      UserImages.destroy({
        where: {
          id: req.body.imageId,
          userId: userId
        }
      }).then(img_dat => {
        fs.unlink('app/uploads/user/' + oldImg, (err => {
          if (err) {
            console.log(err)
            console.log('not removed');
          }
        }));
        res.status(200).send({ status: 200, success: true, message: 'Picture removed!' });
      }).catch(err => {
        res.status(500).send({ status: 500, success: false, message: err.message });
      });
    }, 1000);
  }
};

function getCurrentFilenames() {
  console.log("Current filenames:");
  fs.readdirSync(__dirname).forEach(file => {
    console.log(file);
  });
}

exports.updateProfile = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(201).send({ status: 201, message: "Something went wrong.", success: false, data: errors.array() });
  }
  if (req.headers && req.headers.authorization) {
    jwt.verify(req.headers.authorization.split(' ')[1], config.secret, (err, decoded) => {
      if (err) {
        return res.status(401).send({
          status: 401,
          success: false,
          message: "Unauthorized!"
        });
      }
      userId = decoded.id;
    });
  };
  // console.log('ohh');
  var u_pass = '';
  if(req.body.password){
    if(req.body.password != req.body.con_password){
      return res.status(201).send({ status: 201, message: "Passwords not matched.", success: false, data: errors.array() });
    }else{
      u_pass = req.body.password
    } 
  }

  User.findOne({
    where: {
      id: userId
    }
  })
    .then(userData => {
      if (userData) {
        if(userData.is_practitioner == '0'){
          req.body.aboutme = '',
          req.body.bio = ''
        }else{
          if(req.body.bio == ""){
            res.status(201).send({ status: 201, message: "Something went wrong.", success: false, data: [
              {
                  "value": "", "msg": "Bio field is Mandatory.", "param": "bio", "location": "body"
              }
            ] });
          }
          if(req.body.aboutme == ""){
            res.status(201).send({ status: 201, message: "Something went wrong.", success: false, data: [
              {
                  "value": "", "msg": "About Me field is Mandatory.", "param": "aboutme", "location": "body"
              }
            ] });
          }
        }
        if(u_pass != ''){
          User.update({
            name: req.body.name,
            location: req.body.location,
            language: req.body.language,
            gender: req.body.gender,
            phone: req.body.phone,
            speciality: req.body.speciality,
            password: bcrypt.hashSync(req.body.password, 8)
          },
          {
            where: {
              id: userId,
            }
          })
          .then(user => {
            Practitioner.update({
              aboutme: req.body.aboutme,
              bio: req.body.bio
            },
              {
              where: {
                userId: userId
              }
            }).catch(err => {
              res.status(500).send({ status: 500, success: false, message: err.message });
            });
            res.send({ status: 200, success: true, message: "Data updated successfully!" });
          })
          .catch(err => {
            res.status(500).send({ status: 500, success: false, message: err.message });
          });
        
        }else{
          
        User.update({
          name: req.body.name,
          location: req.body.location,
          language: req.body.language,
          gender: req.body.gender,
          phone: req.body.phone,
          speciality: req.body.speciality,
        },
          {
            where: {
              id: userId,
            }
          })
          .then(user => {
            Practitioner.update({
              aboutme: req.body.aboutme,
              bio: req.body.bio
            },
              {
              where: {
                userId: userId
              }
            }).catch(err => {
              res.status(500).send({ status: 500, success: false, message: err.message });
            });
            res.send({ status: 200, success: true, message: "Data updated successfully!" });
          })
          .catch(err => {
            res.status(500).send({ status: 500, success: false, message: err.message });
          });
        }       
      } else {
        res.status(201).send({
          status: 201,
          message: "No data found",
          success: false
        });
      }
    }).catch(err => {
      res.status(500).send({
        status: 500,
        success: false,
        message: err.message
      });
    });

}

exports.home = (req, res) => {
  // const errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //   return res.status(201).send({ status: 201, message: "Something went wrong.", success: false, data: errors.array() });
  // }

  var page = 0;
  if(req.body.page){
    page = req.body.page
  }
  var size = 8;
  if(req.body.limit){
    size = parseInt(req.body.limit)
  }
  var offset = page * size;

  if (req.headers && req.headers.authorization) {
    jwt.verify(req.headers.authorization.split(' ')[1], config.secret, (err, decoded) => {
      if (err) {
        return res.status(401).send({
          status: 401,
          success: false,
          message: "Unauthorized!"
        });
      }
      userId = decoded.id;
    });
    User.findOne({
      where: {
        id: userId
      }
    })
    .then(user_single => {
      // console.log(user_single);
      if(req.body.category){
        var userCats = req.body.category;
      }else{
        var userCats = user_single.category;
      }
      var fileUrl = "/user/";
      var qry_condition = {
        order: db.sequelize.random(),
        limit:size, 
        offset:offset,
        attributes: [
          'id', 'name', 'speciality','social_image',
          legacyImageAttribute(fileUrl),
          [db.sequelize.literal("CASE WHEN (SELECT id FROM favourite_practioners WHERE pracId = users.id AND userId ="+userId+") IS NULL THEN 0 ELSE 1 END"), 'isFav'],
          [db.sequelize.literal("(SELECT AVG(rating) FROM event_reviews WHERE prac_id = users.id)"), 'avgRating'],
        ],
        include: [
          {
            model: Practitioner,
            include: [
              {
                model: practitionerServices,
                order: [
                  ['id', 'DESC']
                ],
                limit:3,
                include: [
                  {
                    model: Services
                  }
                ],
                where: { 
                  categoryId:{
                    [Op.in]: JSON.parse("[" + userCats + "]")
                  }
                },
              }
            ]
          },
        ],
        where: {}
      };
      qry_condition.where.is_practitioner = "1"
      qry_condition.where.id = {[Op.notIn]: [userId]}
      qry_condition.where.status = 'active'

      if(req.body.gender){
        qry_condition.where.gender = req.body.gender
      }

      // if(priceMin && priceMax) {
      //   qry_condition.where.cost = {$between: [priceMin, priceMax]}
      // }
      
      User.findAll(qry_condition)
      .then(practiotioner_user => {
        
// console.log(user_single);

        res.status(200).send({ 
          status: 200, 
          success: true, 
          message: "Data updated!", 
          data:{
            userCategories : userCats,
            practitioners : practiotioner_user
          } 
      });
      })
      .catch(err => {
        res.status(500).send({ status: 500, success: false, message: err.message });
      });

    })
    .catch(err => {
      res.status(500).send({ status: 500, success: false, message: err.message });
    });

  }else{

    
    var fileUrl = "/user/";
    var qry_condition = {
      order: db.sequelize.random(),
      limit:size, 
      offset:offset,
      attributes: [
        'id', 'name', 'speciality','social_image',
        legacyImageAttribute(fileUrl),
        [db.sequelize.literal("(SELECT AVG(rating) FROM event_reviews WHERE prac_id = users.id)"), 'avgRating'],
      ],
      include: [
        {
          model: Practitioner,
          include: [
            {
              model: practitionerServices,
              order: [
                ['id', 'DESC']
              ],
              limit:3,
              include: [
                {
                  model: Services
                }
              ],
              where: {},
            }
          ]
        },
      ],
      where: {}
    };
   
    qry_condition.where.is_practitioner = "1"
    qry_condition.where.status = 'active'
   
    if(req.body.category){
      var userCats = req.body.category;
      qry_condition.include[0].include[0].where.categoryId = {[Op.in]: JSON.parse("[" + userCats + "]")}
    }

    if(req.body.gender){
      qry_condition.where.gender = req.body.gender
    }

    User.findAll(qry_condition)
    .then(practiotioner_user => {
      res.status(200).send({ 
        status: 200, 
        success: true, 
        message: "Data updated!", 
        data:{
          practitioners : practiotioner_user
        } 
    });
    })
    .catch(err => {
      res.status(500).send({ status: 500, success: false, message: err.message });
    });
  }
};
  
exports.favourite = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(201).send({ status: 201, message: "Something went wrong.", success: false, data: errors.array() });
  }
  if (req.headers && req.headers.authorization) {
    jwt.verify(req.headers.authorization.split(' ')[1], config.secret, (err, decoded) => {
      if (err) {
        return res.status(401).send({
          status: 401,
          success: false,
          message: "Unauthorized!"
        });
      }
      userId = decoded.id;
    });
  };
  FavouritePractitioner.findOne(
    {
      where: { 
        userId: userId,
        pracId: req.body.pracId 
      }
    })
    .then(fav_user => {
      if(fav_user){
        FavouritePractitioner.destroy({
          where: {
            userId: userId,
            pracId: req.body.pracId
          }
        }).then(fav_user => {
          res.status(200).send({ status: 200, success: true, message: "Removed from favourite!" });
        })
        .catch(err => {
          res.status(500).send({ status: 500, success: false, message: err.message });
        });
      }else{
        FavouritePractitioner.create({
          userId: userId,
          pracId: req.body.pracId
        }).then(fav_user => {
          res.status(200).send({ status: 200, success: true, message: "Added to favourite!"});
        }).catch(err => {
          res.status(500).send({ status: 500, success: false, message: err.message });
        });
      }
    })
    .catch(err => {
      res.status(500).send({ status: 500, success: false, message: err.message });
    });


};

exports.reportUser = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(201).send({ status: 201, message: "Something went wrong.", success: false, data: errors.array() });
  }
  if (req.headers && req.headers.authorization) {
    jwt.verify(req.headers.authorization.split(' ')[1], config.secret, (err, decoded) => {
      if (err) {
        return res.status(401).send({
          status: 401,
          success: false,
          message: "Unauthorized!"
        });
      }
      userId = decoded.id;
    });
  };
  ReportUser.findOne(
    {
      where: { 
        reportedBy: userId,
        userId: req.body.pracId
      }
    })
    .then(repoerted_user => {
      if(repoerted_user){
        res.status(201).send({ status: 201, success: true, message: "You have already reported for this user." });
      }else{
        ReportUser.create({
            userId: req.body.pracId,
            reportedBy: userId,
            reason: req.body.reason,
            comment: req.body.comment,
          }).then(repoerted_user => {
          res.status(200).send({ status: 200, success: true, message: "User reported successfully!", data: repoerted_user });
        })
        .catch(err => {
          res.status(500).send({ status: 500, success: false, message: err.message });
        });
      }
    })
    .catch(err => {
      res.status(500).send({ status: 500, success: false, message: err.message });
    });
};

exports.attachCard = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(201).send({ status: 201, message: "Something went wrong.", success: false, data: errors.array() });
  }
  if (req.headers && req.headers.authorization) {
    jwt.verify(req.headers.authorization.split(' ')[1], config.secret, (err, decoded) => {
      if (err) {
        return res.status(401).send({
          status: 401,
          success: false,
          message: "Unauthorized!"
        });
      }
      userId = decoded.id;
    });
  };
  User.findOne(
    {
      where: { 
        id: userId
      }
    })
    .then(singleUser => {
      if(singleUser.strip_user_id && singleUser.strip_user_id != null){
        // res.status(200).send({ status: 200, success: true, message: 'success-here1', data: singleUser.strip_user_id});
        stripe.paymentMethods.attach(
          req.body.paymentMethod_id,
          {customer: singleUser.strip_user_id}
        ).then(attachMethod => {
          res.status(200).send({ status: 200, success: true, message: 'success', data: attachMethod  });
        }).catch(err => {
          res.status(500).send({ status: 500, success: false, message: err.message });
        });
      }else{
        stripe.customers.create({
          email: singleUser.email,
          phone: singleUser.phone,
        }).then(stripUser => {
          console.log(stripUser);
          User.update({
            strip_user_id: stripUser.id
          },
          {
            where: {id: singleUser.id}
          }).then(updateStripId => {
            
            setTimeout(() => {
              // res.status(200).send({ status: 200, success: true, message: 'success', data: stripUser.id });
              stripe.paymentMethods.attach(
                req.body.paymentMethod_id,
                {customer: stripUser.id}
              ).then(attachMethod => {
                res.status(200).send({ status: 200, success: true, message: 'success', data: attachMethod });
                // console.log(attachMethod);
              }).catch(err => {
                res.status(500).send({ status: 500, success: false, message: err.message });
              });
            },1000);
            
          }).catch(err => {
            res.status(500).send({ status: 500, success: false, message: err.message });
          });
        });
      }
    }).catch(err => {
      res.status(500).send({ status: 500, success: false, message: err.message });
    });

}

exports.detachCard = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(201).send({ status: 201, message: "Something went wrong.", success: false, data: errors.array() });
  }
  if (req.headers && req.headers.authorization) {
    jwt.verify(req.headers.authorization.split(' ')[1], config.secret, (err, decoded) => {
      if (err) {
        return res.status(401).send({
          status: 401,
          success: false,
          message: "Unauthorized!"
        });
      }
      userId = decoded.id;
    });
  };
  User.findOne(
    {
      where: { 
        id: userId
      }
    })
    .then(singleUser => {
      if(singleUser.strip_user_id && singleUser.strip_user_id != null){
        // res.status(200).send({ status: 200, success: true, message: 'success-here1', data: singleUser.strip_user_id});
        stripe.paymentMethods.detach(
          req.body.paymentMethod_id,
          // {customer: singleUser.strip_user_id}
        ).then(attachMethod => {
          res.status(200).send({ status: 200, success: true, message: "Card remove from user's profile", data: attachMethod  });
        }).catch(err => {
          res.status(500).send({ status: 500, success: false, message: err.message });
        });
      }else{
        stripe.customers.create({
          email: singleUser.email,
          phone: singleUser.phone,
        }).then(stripUser => {
          console.log(stripUser);
          User.update({
            strip_user_id: stripUser.id
          },
          {
            where: {id: singleUser.id}
          }).then(updateStripId => {
            
            setTimeout(() => {
              // res.status(200).send({ status: 200, success: true, message: 'success', data: stripUser.id });
              stripe.paymentMethods.attach(
                req.body.paymentMethod_id,
                // {customer: stripUser.id}
              ).then(attachMethod => {
                res.status(200).send({ status: 200, success: true, message: "Card remove from user's profile", data: attachMethod });
                // console.log(attachMethod);
              }).catch(err => {
                res.status(500).send({ status: 500, success: false, message: err.message });
              });
            },1000);
            
          }).catch(err => {
            res.status(500).send({ status: 500, success: false, message: err.message });
          });
        });
      }
    }).catch(err => {
      res.status(500).send({ status: 500, success: false, message: err.message });
    });

}

exports.stripCardList = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(201).send({ status: 201, message: "Something went wrong.", success: false, data: errors.array() });
  }
  if (req.headers && req.headers.authorization) {
    jwt.verify(req.headers.authorization.split(' ')[1], config.secret, (err, decoded) => {
      if (err) {
        return res.status(401).send({
          status: 401,
          success: false,
          message: "Unauthorized!"
        });
      }
      userId = decoded.id;
    });
  };
  User.findOne(
    {
      where: { 
        id: userId
      }
    })
    .then(uData => {
      if(uData.strip_user_id && uData.strip_user_id != null){

        stripe.paymentMethods.list({
          customer: uData.strip_user_id,
          type: 'card',
        }).then(cardList =>{
          console.log(cardList);
          if(cardList.data.length > 0){
            res.status(200).send({ status: 200, success: true, message: "success", data: cardList});
          }else{
            res.status(200).send({ status: 200, success: true, message: "No card found" });
          }
        });
      }else{
        res.status(201).send({ status: 201, success: true, message: 'User is not registered with strip.' });
      }
    })
    .catch(err => {
      res.status(500).send({ status: 500, success: false, message: err.message });
    });
};

exports.eventPay = (req, res) => {

  // intent Id: pi_1JOMVWDlNqjyccEqT7gJ1pNw

  stripe.paymentIntents.retrieve(
    'pi_1JOMVWDlNqjyccEqT7gJ1pNw'
  ).then(PII => {
    console.log(PII);
  });

  stripe.paymentMethods.list({
      customer: 'cus_K2Q8s8myuOgLYE',
      type: 'card',
    }).then(data =>{
      stripe.paymentIntents.create({
        amount: 800,
        currency: 'usd',
        payment_method: data.data[0].id,
        // payment_method_types : ['card'],
        customer : 'cus_K2Q8s8myuOgLYE',
        off_session:true,
        confirm: true,
      }).then(pI => {
        // return console.log(pI)
        res.status(200).send({
          status: 200,
          message: "Data fetched",
          success: true,
          data: pI
        });
      })
      // return console.log(data);
    })
   .catch(err => {
      res.status(500).send({ status: 500, success: false, message: err.message });
    });
}

exports.myBookings = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(201).send({ status: 201, message: "Something went wrong.", success: false, data: errors.array() });
  }
  var page = 0;
  if(req.body.page){
    page = req.body.page
  }
  var size = 20;
  if(req.body.limit){
    size = parseInt(req.body.limit)
  }
  var offset = page * size;
  if (req.headers && req.headers.authorization) {
    jwt.verify(req.headers.authorization.split(' ')[1], config.secret, (err, decoded) => {
      if (err) {
        return res.status(401).send({
          status: 401,
          success: false,
          message: "Unauthorized!"
        });
      }
      userId = decoded.id;
    });
  };
  var fileUrl = "/user/";
  BookedEvent.findAll(
    {
      include: [
        {
          model: User,
          as : 'User',
          attributes: [
            'id', 'name', 'social_image',
            legacyImageAttribute(fileUrl, 'User')
          ],
        },
        {
          model: MeetingDetail,
          where: {
            event_id: db.sequelize.where(db.sequelize.col("booked_events.event_id"), "=", db.sequelize.col("meeting_detail.event_id")),
            date: db.sequelize.where(db.sequelize.col("booked_events.date"), "=", db.sequelize.col("meeting_detail.date")),
            time: db.sequelize.where(db.sequelize.col("booked_events.time"), "=", db.sequelize.col("meeting_detail.time"))
          },
        }
        
      ],
      where: { 
        bookerId: userId
      }, 
      limit:size, 
      offset:offset,
        order: [
          ['id', 'DESC']
        ]
    })
    .then(myBookings => {
      if(myBookings.length > 0){
       res.status(200).send({ status: 200, success: true, message: "success", data: myBookings});
      }else{
        res.status(201).send({ status: 201, success: true, message: 'No more bookings' });
      }
    })
    .catch(err => {
      res.status(500).send({ status: 500, success: false, message: err.message });
    });
};

exports.bookings = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(201).send({ status: 201, message: "Something went wrong.", success: false, data: errors.array() });
  }

  var page = 0;
  if(req.body.page){
    page = req.body.page
  }
  // console.log(req.body);
  var size = 20;
  if(req.body.limit){
    size = parseInt(req.body.limit)
  }
  var offset = page * size;
  if (req.headers && req.headers.authorization) {
    jwt.verify(req.headers.authorization.split(' ')[1], config.secret, (err, decoded) => {
      if (err) {
        return res.status(401).send({
          status: 401,
          success: false,
          message: "Unauthorized!"
        });
      }
      userId = decoded.id;
    });
  };
  var fileUrl = "/user/";
  BookedEvent1.findAll(
    {
      include: [
        {
          model: User1,
          attributes: [
            'id', 'name', 'social_image',
            legacyImageAttribute(fileUrl, 'user')
          ],
        },
        {
          model: MeetingDetail,
          where: {
            event_id: db.sequelize.where(db.sequelize.col("booked_events.event_id"), "=", db.sequelize.col("meeting_detail.event_id")),
            date: db.sequelize.where(db.sequelize.col("booked_events.date"), "=", db.sequelize.col("meeting_detail.date")),
            time: db.sequelize.where(db.sequelize.col("booked_events.time"), "=", db.sequelize.col("meeting_detail.time"))
          }
        }
      ],
      where: { 
        eventUser: userId
      }, 
      limit:size, 
      offset:offset,
        order: [
          ['id', 'DESC']
        ]
    })
    .then(bookings => {
      if(bookings.length > 0){
       res.status(200).send({ status: 200, success: true, message: "success", data: bookings});
      }else{
        res.status(201).send({ status: 201, success: true, message: 'No more bookings' });
      }
    })
    .catch(err => {
      res.status(500).send({ status: 500, success: false, message: err.message });
    });
};

exports.addBankAccount = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(201).send({ status: 201, message: "Something went wrong.", success: false, data: errors.array() });
  }
  if (req.headers && req.headers.authorization) {
    jwt.verify(req.headers.authorization.split(' ')[1], config.secret, (err, decoded) => {
      if (err) {
        return res.status(401).send({
          status: 401,
          success: false,
          message: "Unauthorized!"
        });
      }
      userId = decoded.id;
    });
  };
  User.findOne(
    {
      where: { 
        id: userId
      }
    })
    .then(singleUser => {

      // stripe.tokens.create({
      //   bank_account: {
      //     country: 'US',
      //     currency: 'usd',
      //     account_holder_name: req.body.account_holder_name,
      //     account_holder_type: req.body.account_holder_type,
      //     routing_number: req.body.routing_number, //'HDFC0000261'
      //     account_number: req.body.account_number , //'000123456789'
      //   },
      // }
      // ).then(bankToken => {
        // res.status(200).send({ status: 200, success: true, message: 'success-here1', data: bankToken, user: singleUser.strip_user_id});
        if(singleUser.strip_account != null){
            // setTimeout(() => {
            // console.log(bankToken.id);
            stripe.accounts.createExternalAccount(
              singleUser.strip_account,
              {
                external_account:{
                  object: 'bank_account',
                  country: 'US',
                  currency: 'usd',
                  default_for_currency: true,
                  account_holder_name: req.body.account_holder_name,
                  account_holder_type: req.body.account_holder_type,
                  routing_number: req.body.routing_number, //'HDFC0000261'
                  account_number: req.body.account_number , //'000123456789'
                }
              }
            ).then(createBankAccount => {
              Bankaccount.create({
                userId: userId  ,
                stripe_bank_id: createBankAccount.id,
              });
              // ).then(savedAccount => {
                // setTimeout(() => {
                //   stripe.customers.verifySource(
                //     singleUser.strip_user_id,
                //     createBankAccount.id,
                //     {amounts: [32, 45]}
                //   ).then(verifyBankAccount => {
                //     if(verifyBankAccount.status == 'verified'){
                //       Bankaccount.update({
                //         is_verified: '1'
                //       },{
                //         where: {
                //           stripe_bank_id: createBankAccount.id
                //         }
                //       });
                //       res.status(200).send({ status: 200, success: true, message: 'success', data: verifyBankAccount, tokenDetail: bankToken  });
                //     }else{
                //       res.status(201).send({ status: 201, success: true, message: "Verification is not successfull", tokenDetail: bankToken  });
                //     }
                    
                //   }).catch(err => {
                //     res.status(500).send({ status: 500, success: false, message: err.message });
                //   });
                // },1000);
                // res.status(200).send({ status: 200, success: true, message: 'success', data: savedAccount, tokenDetail: bankToken  });
              // }).catch(err => {
              //   res.status(500).send({ status: 500, success: false, message: err.message });
              // })
              res.status(200).send({ status: 200, code: '1929', success: true, message: 'success', data: createBankAccount  });
            }).catch(err => {
              res.status(500).send({ status: 500, code: '1931', success: false, message: err.message });
            });
          // },1000);
        }else{
          stripe.accounts.create({
            type: 'custom',
            country: 'US',
            email: singleUser.email,
            business_type: 'individual',
            capabilities: {
              card_payments: {requested: true},
              transfers: {requested: true},
            },
            settings: {
              payouts:{
                schedule: {
                  delay_days: 2,
                  interval: 'daily'
                }
              }
            }
          }).then(stripUserBankAccount => {
            setTimeout(() => {
              User.update({
                strip_account: stripUserBankAccount.id
              },
              {
                where: {id: singleUser.id}
              }).then(updateStripId => {
                stripe.accounts.createExternalAccount(
                  stripUserBankAccount.id,
                  {
                    external_account:{
                      object: 'bank_account',
                      country: 'US',
                      currency: 'usd',
                      account_holder_name: req.body.account_holder_name,
                      account_holder_type: req.body.account_holder_type,
                      routing_number: req.body.routing_number, //'HDFC0000261'
                      account_number: req.body.account_number , //'000123456789'
                    }
                  }
                ).then(createBankAccount => {
                  Bankaccount.create({
                    userId: userId  ,
                    stripe_bank_id: createBankAccount.id,
                  });
                  // ).then(savedAccount => {
                    // setTimeout(() => {
                    //   stripe.customers.verifySource(
                    //     singleUser.strip_user_id,
                    //     createBankAccount.id,
                    //     {amounts: [32, 45]}
                    //   ).then(verifyBankAccount => {
                    //     if(verifyBankAccount.status == 'verified'){
                    //       Bankaccount.update({
                    //         is_verified: '1'
                    //       },{
                    //         where: {
                    //           stripe_bank_id: createBankAccount.id
                    //         }
                    //       });
                    //       res.status(200).send({ status: 200, success: true, message: 'success', data: verifyBankAccount, tokenDetail: bankToken  });
                    //     }else{
                    //       res.status(201).send({ status: 201, success: true, message: "Verification is not successfull", tokenDetail: bankToken  });
                    //     }
                        
                    //   }).catch(err => {
                    //     res.status(500).send({ status: 500, success: false, message: err.message });
                    //   });
                    // },1000);
                    // res.status(200).send({ status: 200, success: true, message: 'success', data: savedAccount  });
                  // }).catch(err => {
                  //   res.status(500).send({ status: 500, success: false, message: err.message });
                  // })
                  res.status(200).send({ status: 200, success: true, message: 'success', data: createBankAccount  });
                }).catch(err => {
                  res.status(500).send({ status: 500, code: '2001', success: false, message: err.message });
                });
              }).catch(err => {
                res.status(500).send({ status: 500, code: '2004', success: false, message: err.message });
              });
            },2000);
          });
        }
      // }).catch(err => {
      //   res.status(500).send({ status: 500, success: false, message: err.message });
      // });
    }).catch(err => {
      res.status(500).send({ status: 500, code: '2012', success: false, message: err.message });
    });
}

exports.verifyBankAccount = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(201).send({ status: 201, message: "Something went wrong.", success: false, data: errors.array() });
  }
  if (req.headers && req.headers.authorization) {
    jwt.verify(req.headers.authorization.split(' ')[1], config.secret, (err, decoded) => {
      if (err) {
        return res.status(401).send({
          status: 401,
          success: false,
          message: "Unauthorized!"
        });
      }
      userId = decoded.id;
    });
  };
  User.findOne({
    where: { 
      id: userId
    }
  }).then(singleUser => {
    stripe.customers.verifySource(
      singleUser.strip_user_id,
      req.body.stripe_bank_id,
      {amounts: [32, 45]}
    ).then(verifyBankAccount => {
      if(verifyBankAccount.status == 'verified'){
        Bankaccount.update({
          is_verified: '1'
        },{
          where: {
            stripe_bank_id: req.body.stripe_bank_id
          }
        });
        res.status(200).send({ status: 200, success: true, message: 'success', data: verifyBankAccount,  });
      }else{
        res.status(201).send({ status: 201, success: true, message: "Verification is not successfull"  });
      }
    }).catch(err => {
      res.status(500).send({ status: 500, success: false, message: err.message });
    });
  }).catch(err => {
    res.status(500).send({ status: 500, success: false, message: err.message });
  });
}

exports.getBankAccounts = (req, res) => { 
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(201).send({ status: 201, message: "Something went wrong.", success: false, data: errors.array() });
  }
  if (req.headers && req.headers.authorization) {
    jwt.verify(req.headers.authorization.split(' ')[1], config.secret, (err, decoded) => {
      if (err) {
        return res.status(401).send({
          status: 401,
          success: false,
          message: "Unauthorized!"
        });
      }
      userId = decoded.id;
    });
  };
  User.findOne({
    where: { 
      id: userId
    }
  }).then(singleUser => {
    Bankaccount.findAll({
      where: {
        userId: singleUser.id 
      }
    }).then(BankaccountAll => {
      // console.log(BankaccountAll)
      
      if(BankaccountAll.length > 0){
        const accountWithdetail = []
        BankaccountAll.forEach((val, i) => { 
          // console.log(i+"->")
          // console.log(val)

          stripe.accounts.retrieveExternalAccount(
            singleUser.strip_account,
            val.stripe_bank_id
          ).then(BankaccountDetail => {
            if(BankaccountDetail){
              BankaccountDetail.is_default = val.is_default
              accountWithdetail.push(BankaccountDetail)
              // console.log(BankaccountDetail)
            }
          }).catch(err => {
            res.status(500).send({ status: 500, success: false, message: err.message });
          });
         })
         setTimeout(() => {
          res.status(200).send({ status: 200, success: true, message: 'Success', data: accountWithdetail });
         },2000);
         
      }else{
        res.status(200).send({ status: 200, success: true, message: 'No data found', data: "" });
      }
      // return res.status(200).send({ status: 200, success: true, message: 'Data fetched', data: BankaccountAll });
    }).catch(err => {
      res.status(500).send({ status: 500, success: false, message: err.message });
    })
  }).catch(err => {
    res.status(500).send({ status: 500, success: false, message: err.message });
  });
}

exports.deleteBankAccount = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(201).send({ status: 201, message: "Something went wrong.", success: false, data: errors.array() });
  }
  if (req.headers && req.headers.authorization) {
    jwt.verify(req.headers.authorization.split(' ')[1], config.secret, (err, decoded) => {
      if (err) {
        return res.status(401).send({
          status: 401,
          success: false,
          message: "Unauthorized!"
        });
      }
      userId = decoded.id;
    });
  };
  User.findOne({
    where: { 
      id: userId
    }
  }).then(singleUser => {
    // stripe.customers.deleteSource(
    //   singleUser.strip_user_id,
    //   req.body.stripe_bank_id
    stripe.accounts.deleteExternalAccount(
      singleUser.strip_account,
      req.body.stripe_bank_id
    ).then(deleteBankAccount => {
      if(deleteBankAccount.deleted == true){
        Bankaccount.destroy({
          where: {
            stripe_bank_id: req.body.stripe_bank_id
          }
        })
        res.status(200).send({ status: 200, success: true, message: 'Account deleted successfully', data: deleteBankAccount  });
      }else{
        res.status(201).send({ status: 201, success: true, message: "Account not deleted"  });
      }
    }).catch(err => {
      res.status(500).send({ status: 500, success: false, message: err.message });
    });
  }).catch(err => {
    res.status(500).send({ status: 500, success: false, message: err.message });
  });
}

exports.setDefaultBankAccount = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(201).send({ status: 201, message: "Something went wrong.", success: false, data: errors.array() });
  }
  if (req.headers && req.headers.authorization) {
    jwt.verify(req.headers.authorization.split(' ')[1], config.secret, (err, decoded) => {
      if (err) {
        return res.status(401).send({
          status: 401,
          success: false,
          message: "Unauthorized!"
        });
      }
      userId = decoded.id;
    });
  };
  Bankaccount.findOne({
    where: { 
      stripe_bank_id: req.body.stripe_bank_id
    }
  }).then(singleBankaccount => {
    // if(singleBankaccount.length > 0){
    if(singleBankaccount){
      Bankaccount.update({
        is_default: '1'
      },{
        where: { stripe_bank_id: req.body.stripe_bank_id }
      }).then(deleteBankAccount => {
        Bankaccount.update({
          is_default: '0'
        },{
          where: { stripe_bank_id: {[Op.notIn]: [req.body.stripe_bank_id]} }
        })
        res.status(200).send({ status: 200, success: true, message: "Set default successfully"  });
      }).catch(err => {
        res.status(500).send({ status: 500, success: false, message: err.message });
      });
    }else{
      res.status(201).send({ status: 201, success: true, message: "No record found"  });
    }
  }).catch(err => {
    res.status(500).send({ status: 500, success: false, message: err.message });
  });
}

exports.getUserPayments = (req, res) => { 
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(201).send({ status: 201, message: "Something went wrong.", success: false, data: errors.array() });
  }
  var page = 0;
  if(req.body.page){
    page = req.body.page
  }
  var size = 20;
  if(req.body.limit){
    size = parseInt(req.body.limit)
  }
  var offset = page * size;
  if (req.headers && req.headers.authorization) {
    jwt.verify(req.headers.authorization.split(' ')[1], config.secret, (err, decoded) => {
      if (err) {
        return res.status(401).send({
          status: 401,
          success: false,
          message: "Unauthorized!"
        });
      }
      userId = decoded.id;
    });
  };
  User.findOne({
    where: { 
      id: userId
    }
  }).then(singleUser => {
    var fileUrl = "/user/";
  Payments.findAll({
    attributes: [
      'id',
      'amount',
      'stripe_id',
      'status',
      'withdraw_amount',
      'released',
      'amount_refunded',
      'refunded_amount',
      'refunded_percentage',
      'refund_description',
      'created_at',
      'updated_at',
      [db.sequelize.literal('NULL'), 'commissionVal']
    ],
    include: [
      {
        model: User,
          attributes: [
            'id', 'name', 'social_image',
            legacyImageAttribute(fileUrl, 'user')
          ],
      }
    ],
    where: {
      [Op.or]: [
        {
            from: singleUser.id 
        },
        {
            to: singleUser.id 
        }
      ]
    },
      limit:size, 
      offset:offset,
    order: [
      ['id', 'DESC']
    ]
  }).then(PaymentsAll => {
      // console.log(PaymentsAll)
    if(PaymentsAll.length > 0){
        const paymentWithdetail = []
        var paymentDetail = []
        PaymentsAll.forEach((val, i) => {
          // console.log(i+"->")
          // console.log(val)
          
          if(val.to == userId){
            var newUser = "";
            newUser = val
            // paymentDetail.push(val);
            User.findOne({
              attributes: [
                'id', 'name', 'social_image',
                legacyImageAttribute(fileUrl)
              ],
              where: {id: val.from}
            }
            ).then(fromUserDetail => {
              if(fromUserDetail){
                // delete newUser.user
                newUser = {
        id: val.id,
                  type: val.type,
                  from: val.from,
                  to: val.to,
        amount: val.amount,
        stripe_id: val.stripe_id,
                  eventId: val.eventId,
                  ratingId: val.ratingId,
                  packageId: val.packageId,
                  extendedHourId: val.extendedHourId,
        status: val.status,
                  createdAt: val.createdAt,
                  updatedAt: val.updatedAt,
                  user: {
                      id: fromUserDetail.id,
                      name: fromUserDetail.name,
                      social_image: fromUserDetail.social_image,
                      image: fromUserDetail.image
                  }
              }

                if(val.to === val.from){
                  newUser.status = 'Completed';
                }
                paymentDetail.push(newUser);
              }
            }).catch(err => {
              res.status(500).send({ status: 500, success: false, message: err.message });
            });
            
          }
          else{
            val.status = ((val.status).toUpperCase() == 'REFUND')? 'Refund' : 'Completed';
            paymentDetail.push(val);
          }
          // stripe.paymentIntents.retrieve(
          //   val.stripe_id
          // ).then(PaymentDetail => {
          //   if(PaymentDetail){
          //     payData.stripeDetail = PaymentDetail
          //     paymentWithdetail.push(payData)
          //     // console.log(PaymentDetail)
          //   }
          // }).catch(err => {
          //   res.status(500).send({ status: 500, success: false, message: err.message });
          // });
         })
         
         setTimeout(() => {
      return res.status(200).send({ status: 200, success: true, message: 'Success', data: paymentDetail });
          // res.status(200).send({ status: 200, success: true, message: 'Success', data: PaymentsAll });
         },1000);
         
    }else{
        res.status(200).send({ status: 200, success: true, message: 'No data found', data: "" });
    }
      // return res.status(200).send({ status: 200, success: true, message: 'Data fetched', data: BankaccountAll });
    }).catch(err => {
      res.status(500).send({ status: 500, success: false, message: err.message });
    })
  }).catch(err => {
    res.status(500).send({ status: 500, success: false, message: err.message });
  });
}


exports.getPaymentDetailForInvoice = (req, res) => { 
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(201).send({ status: 201, message: "Something went wrong.", success: false, data: errors.array() });
  }
  if (req.headers && req.headers.authorization) {
    jwt.verify(req.headers.authorization.split(' ')[1], config.secret, (err, decoded) => {
      if (err) {
        return res.status(401).send({
          status: 401,
          success: false,
          message: "Unauthorized!"
        });
      }
      userId = decoded.id;
    });
  };
  var fileUrl = "/user/";
  Payments.findOne({
    include: [
      {
        model: User,
        attributes: [
          'id', 'name', 'social_image','phone','email',
          legacyImageAttribute(fileUrl, 'user')
        ],
      },
      {
        model: User,
        as: 'fromUser',
        attributes: [
          'id', 'name', 'social_image',
          legacyImageAttribute(fileUrl, 'fromUser')
        ],
      }
    ],
    where: {
      id: req.body.payment_id,
      // status: 'Withdrawn'
    }
  }).then(PaymentDetail => {
    // console.log(PaymentsAll)
    // return res.status(200).send({ status: 200, success: true, message: 'No data found', data: PaymentDetail });
    if(PaymentDetail){
      
      if(PaymentDetail.to == userId){
        if(PaymentDetail.to === PaymentDetail.from){
          PaymentDetail.status = 'Completed';
        }
      }else{
        PaymentDetail.status = ((PaymentDetail.status).toUpperCase() == 'REFUND')? 'Refund' : 'Completed';
      }
      return res.status(200).send({ status: 200, success: true, message: 'Success', data: PaymentDetail });
    }else{
      res.status(200).send({ status: 200, success: true, message: 'No data found', data: "" });
    }
    // return res.status(200).send({ status: 200, success: true, message: 'Data fetched', data: BankaccountAll });
  }).catch(err => {
    res.status(500).send({ status: 500, success: false, message: err.message });
  });
}


exports.nonRatedEvent = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(201).send({ status: 201, message: "Something went wrong.", success: false, data: errors.array() });
  }

  var page = 0;
  if(req.body.page){
    page = req.body.page
  }
  // console.log(req.body);
  var size = 20;
  if(req.body.limit){
    size = parseInt(req.body.limit)
  }
  var offset = page * size;
  if (req.headers && req.headers.authorization) {
    jwt.verify(req.headers.authorization.split(' ')[1], config.secret, (err, decoded) => {
      if (err) {
        return res.status(401).send({
          status: 401,
          success: false,
          message: "Unauthorized!"
        });
      }
      userId = decoded.id;
    });
  };
  
  var fileUrl = "/user/";
  BookedEvent.findAll(
    {
      include: [
        {
          model: User,
          as: 'User',
          attributes: [
            'id', 'name', 'social_image',
            legacyImageAttribute(fileUrl, 'User')
          ],
        },
        {
          model: MeetingDetail,
          where: {
            event_id: db.sequelize.where(db.sequelize.col("booked_events.event_id"), "=", db.sequelize.col("meeting_detail.event_id")),
            date: db.sequelize.where(db.sequelize.col("booked_events.date"), "=", db.sequelize.col("meeting_detail.date")),
            time: db.sequelize.where(db.sequelize.col("booked_events.time"), "=", db.sequelize.col("meeting_detail.time")),
            current_status: 'Ended'
          }
        },{
          model: Events
        }
      ],
      where: { 
        bookerId: userId,
            rating_id: null
      }, 
      limit:size, 
      offset:offset,
        order: [
          ['id', 'DESC']
        ]
    })
    .then(bookings => {
      res.status(200).send({ status: 200, success: true, message: "success", data: bookings});
      if(bookings.length > 0){
       res.status(200).send({ status: 200, success: true, message: "success", data: bookings});
      }else{
        res.status(201).send({ status: 201, success: true, message: 'No Reviews' });
      }
    })
    .catch(err => {
      res.status(500).send({ status: 500, success: false, message: err.message });
    });
};

exports.ratedEvent = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(201).send({ status: 201, message: "Something went wrong.", success: false, data: errors.array() });
  }

  var page = 0;
  if(req.body.page){
    page = req.body.page
  }
  // console.log(req.body);
  var size = 20;
  if(req.body.limit){
    size = parseInt(req.body.limit)
  }
  var offset = page * size;
  if (req.headers && req.headers.authorization) {
    jwt.verify(req.headers.authorization.split(' ')[1], config.secret, (err, decoded) => {
      if (err) {
        return res.status(401).send({
          status: 401,
          success: false,
          message: "Unauthorized!"
        });
      }
      userId = decoded.id;
    });
  };
  var fileUrl = "/user/";
  BookedEvent.findAll(
    {
      include: [
        {
          model: User,
          as:'User',
          attributes: [
            'id', 'name', 'social_image',
            legacyImageAttribute(fileUrl, 'User')
          ],
        },
        {
          model: MeetingDetail,
          where: {
            event_id: db.sequelize.where(db.sequelize.col("booked_events.event_id"), "=", db.sequelize.col("meeting_detail.event_id")),
            date: db.sequelize.where(db.sequelize.col("booked_events.date"), "=", db.sequelize.col("meeting_detail.date")),
            time: db.sequelize.where(db.sequelize.col("booked_events.time"), "=", db.sequelize.col("meeting_detail.time")),
            // current_status: 'Ended'
          }
        },
        {
          model: EventReview,
        },
        {
          model: Events
        }
      ],
      where: { 
        bookerId: userId,
        rating_id: { [Op.ne]: null }
      }, 
      limit:size, 
      offset:offset,
        order: [
          ['id', 'DESC']
        ]
    })
    .then(bookings => {
      if(bookings.length > 0){
       res.status(200).send({ status: 200, success: true, message: "success", data: bookings});
      }else{
        res.status(200).send({ status: 200, success: true, message: 'No Reviews', data:userId });
      }
    })
    .catch(err => {
      res.status(500).send({ status: 500, success: false, message: err.message });
    });
};

exports.receivedRating = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(201).send({ status: 201, message: "Something went wrong.", success: false, data: errors.array() });
  }

  var page = 0;
  if(req.body.page){
    page = req.body.page
  }
  // console.log(req.body);
  var size = 20;
  if(req.body.limit){
    size = parseInt(req.body.limit)
  }
  var offset = page * size;
  if (req.headers && req.headers.authorization) {
    jwt.verify(req.headers.authorization.split(' ')[1], config.secret, (err, decoded) => {
      if (err) {
        return res.status(401).send({
          status: 401,
          success: false,
          message: "Unauthorized!"
        });
      }
      userId = decoded.id;
    });
  };
  var fileUrl = "/user/";
  BookedEvent.findAll(
    {
      include: [
        {
          model: User1,
          attributes: [
            'id', 'name', 'social_image',
            legacyImageAttribute(fileUrl, 'user')
          ],
        },
        {
          model: MeetingDetail,
          where: {
            event_id: db.sequelize.where(db.sequelize.col("booked_events.event_id"), "=", db.sequelize.col("meeting_detail.event_id")),
            date: db.sequelize.where(db.sequelize.col("booked_events.date"), "=", db.sequelize.col("meeting_detail.date")),
            time: db.sequelize.where(db.sequelize.col("booked_events.time"), "=", db.sequelize.col("meeting_detail.time")),
            // current_status: 'Ended'
          }
        },
        {
          model: EventReview,
        },{
          model: Events
        }
      ],
      where: { 
        eventUser: userId,
            rating_id: { [Op.ne]: null }
      }, 
      limit:size, 
      offset:offset,
        order: [
          ['id', 'DESC']
        ]
    })
    .then(bookings => {
      if(bookings.length > 0){
       res.status(200).send({ status: 200, success: true, message: "success", data: bookings});
      }else{
        res.status(201).send({ status: 201, success: true, message: 'No Reviews' });
      }
    })
    .catch(err => {
      res.status(500).send({ status: 500, success: false, message: err.message });
    });
};

exports.replyRating = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(201).send({ status: 201, message: "Something went wrong.", success: false, data: errors.array() });
  }

  if (req.headers && req.headers.authorization) {
    jwt.verify(req.headers.authorization.split(' ')[1], config.secret, (err, decoded) => {
      if (err) {
        return res.status(401).send({
          status: 401,
          success: false,
          message: "Unauthorized!"
        });
      }
      userId = decoded.id;
    });
  };
// console.log(userId);
  EventReview.update({
    reply: req.body.reply
    },
    {
      where: { id: req.body.ratingId, prac_id: userId }
  }).then(EventReviewUpdated => {
    
    if(EventReviewUpdated == 1){
      res.status(200).send({ status: 200, success: true, message: "Replied to review successfully!" });
    }else{
      res.status(500).send({ status: 500, success: false, message: "Something went wrong!", dd: EventReviewUpdated });
    }
  })
  .catch(err => {
    res.status(500).send({ status: 500, success: false, message: err.message });
  });
};


exports.updateProfilePicture = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(201).send({ status: 201, message: "Something went wrong.", success: false, data: errors.array() });
  }
  if (req.headers && req.headers.authorization) {
    jwt.verify(req.headers.authorization.split(' ')[1], config.secret, (err, decoded) => {
      if (err) {
        return res.status(401).send({
          status: 401,
          success: false,
          message: "Unauthorized!"
        });
      }
      userId = decoded.id;
    });
  };
  var filename = '';
  if (!req.file) res.status(500).send({ status: 500, success: false, message: 'Please upload a file' });

  req.file.originalname = '/var/www/html/storage/uploads/profiles/ankit_'+Date.now()+'_'+req.file.originalname;
  fs.rename(req.file.path, req.file.originalname, function (err) {
    if (err) {
      res.status(500).send({ status: 500, success: false, message: err.message });
    } else {
      filename = path.basename(req.file.originalname);
    }
  });
  setTimeout(() => {
    // console.log(filename);
    setLegacyProfileImage(userId, filename)
      .then(user => {
        res.status(200).send({ status: 200, success: true, message: "Picture Updated successfully!", filename: filename, path: req.file.originalname });
      })
      .catch(err => {
        res.status(500).send({ status: 500, success: false, message: err.message });
      });
  }, 1000)
};





// Admin Functions


exports.practitionerList = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(201).send({ status: 201, message: "Something went wrong.", success: false, data: errors.array() });
  }
  if (req.headers && req.headers.authorization) {
    jwt.verify(req.headers.authorization.split(' ')[1], config.secret, (err, decoded) => {
      if (err) {
        return res.status(401).send({
          status: 401,
          success: false,
          message: "Unauthorized!"
        });
      }
      userId = decoded.id;
    });
  };
  var page = 0;
  if(req.body.page){
    page = req.body.page
  }
  var size = 100;
  if(req.body.limit){
    size = parseInt(req.body.limit)
  }
  var offset = page * size;
  fileUrl = "/user/";
  User.findAll({
    attributes: [`id`, `name`, `username`, `email`, `signup_step`, `is_practitioner`, `status`, `category`, `speciality`, `modality`, `location`, `language`, `gender`, `phone`, `social_image`, `createdAt`, `updatedAt`,
      legacyImageAttribute(fileUrl),
    ],
    include: [
      {
        model: Practitioner,
      },
      {
        model: UserImages,
        attributes: [
          [db.sequelize.fn('CONCAT', fileUrl, db.sequelize.col('user_images.name')), 'name'],
        ]
      }
    ],
    where: {
      status: 'active',
      is_practitioner: { [Op.ne]: '0' },
      id: { [Op.ne]: userId }
    },
    limit:size, 
    offset:offset,
    order: [
      ['id', 'DESC']
    ]
  }).then(practiotinersList => {
      if(practiotinersList){
       res.status(200).send({ status: 200, success: true, message: "success", data: practiotinersList});
      }else{
        res.status(201).send({ status: 201, success: true, message: 'No practitioner registered yet.' });
      }
    })
    .catch(err => {
      res.status(500).send({ status: 500, success: false, message: err.message });
    });
};

exports.usersList = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(201).send({ status: 201, message: "Something went wrong.", success: false, data: errors.array() });
  }
  if (req.headers && req.headers.authorization) {
    jwt.verify(req.headers.authorization.split(' ')[1], config.secret, (err, decoded) => {
      if (err) {
        return res.status(401).send({
          status: 401,
          success: false,
          message: "Unauthorized!"
        });
      }
      userId = decoded.id;
    });
  };
  var page = 0;
  if(req.body.page){
    page = req.body.page
  }
  var size = 10;
  if(req.body.limit){
    size = parseInt(req.body.limit)
  }
  var offset = page * size;

  var fileUrl = "/user/";
  
  User.findAll({
    attributes: [`id`, `name`, `username`, `email`, `phone`, `joined_on`,`status`
      // [db.sequelize.fn('CONCAT', fileUrl, db.sequelize.col('image')), 'image'],
    ],
    include: [
      {
        model: Userdetail,
      }
    ],
    where: {
      id: { [Op.ne]: userId },
      role: 'user'
    },
    limit:size, 
    offset:offset,
    order: [
      ['id', 'DESC']
    ]
  }).then(usersList => {
      if(usersList){
       res.status(200).send({ status: 200, success: true, message: "success", data: usersList});
      }else{
        res.status(201).send({ status: 201, success: true, message: 'No User registered yet.' });
      }
    })
    .catch(err => {
      res.status(500).send({ status: 500, success: false, message: err.message });
    });
};

exports.allPayments = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(201).send({ status: 201, message: "Something went wrong.", success: false, data: errors.array() });
  }
  var page = 0;
  if(req.body.page){
    page = req.body.page
  }
  var size = 8;
  if(req.body.limit){
    size = parseInt(req.body.limit)
  }
  var offset = page * size;
    Payments.findAll({
      include: [
        {
          model: User,
          as: 'host'
        },
        {
          model: User,
        }
      ],
      limit:size, 
      offset:offset,
      order: [
        [db.sequelize.literal("case when `event_payments`.`status` = 'Pending' then 0 else 1 end, `event_payments`.`status` DESC")],
        ['id', 'DESC']
      ],
      where: {
        amount: {
          [Op.not]: 0
        }
      }
    }).then(PaymentsAll => {
      if(PaymentsAll.length > 0){
        const paymentWithdetail = []
        var paymentDetail = []
        PaymentsAll.forEach((val, i) => {
          var newUser = '';
          newUser = {
            id: val.id,
            type: val.type,
            from: val.from,
            to: val.to,
            amount: val.amount,
            stripe_id: val.stripe_id,
            eventId: val.eventId,
            ratingId: val.ratingId,
            packageId: val.packageId,
            extendedHourId: val.extendedHourId,
            status: val.status,
            commissionVal: parseFloat(val.amount) - parseFloat((val.amount*(val.host.commission/100))),
            withdraw_amount:val.withdraw_amount,
            released:val.released,
            amount_refunded:val.amount_refunded,
            refunded_amount:val.refunded_amount,
            refunded_percentage:val.refunded_percentage,
            refund_description:val.refund_description,
            created_at: val.created_at,
            updated_at: val.updated_at,
            sender: {
                id: val.user.id,
                name: val.user.name
            },
            receiver: {
                id: val.host.id,
                name: val.host.name,
                commission: val.host.commission
            }
          }
          paymentDetail.push(newUser);
         })

         setTimeout(() => {
          return res.status(200).send({ status: 200, success: true, message: 'Success', data: paymentDetail });
         },1000);
         
      }else{
        res.status(200).send({ status: 200, success: true, message: 'No data found', data: "" });
      }
    }).catch(err => {
      res.status(500).send({ status: 5001, success: false, message: err.message });
    })
};

exports.practitionerServicesList = (req, res) => {
  if (req.headers && req.headers.authorization) {
    jwt.verify(req.headers.authorization.split(' ')[1], config.secret, (err, decoded) => {
      if (err) {
        return res.status(401).send({
          status: 401,
          success: false,
          message: "Unauthorized!"
        });
      }
      userId = decoded.id;
    });
  };
  // var fileUrl = "/user/";

  var page = 0;
  if(req.body.page){
    page = req.body.page
  }
  var size = 20;
  if(req.body.limit){
    size = parseInt(req.body.limit)
  }
  var offset = page * size;

  practitionerServices.findAll({
    include: [
      {
        model: Services
      },
      {
        model: Categories
      }
    ],
    where:{
      userId: req.body.prac_id,
    }, 
    limit:size, 
    offset:offset,
      order: [
        ['id', 'DESC']
    ]
  }).then(service_data => {
    // console.log(service_data);
    if(service_data){
      if(service_data.length > 0){
        for (let i = 0; i < service_data.length; i++) {
          const usingSplit = service_data[i].certifications;
          // console.log(usingSplit);
          if (usingSplit) {
            var fileUrl = "/practitioner/docs/";
            Practitionerdocs.findAll({
              attributes: [
                'id', 'isDoc', 'createdAt', 'updatedAt',
                [db.sequelize.fn('CONCAT', fileUrl, db.sequelize.col('name')), 'name']
              ],
              where: {
                id: {
                  [Op.in]: JSON.parse("[" + usingSplit + "]")
                }
              }
            }).then(document => {
              // console.log(document);
              service_data[i].certifications = document;
            }).catch(err => {
              res.status(500).send({ status: 500, success: false, message: err.message });
            })
          }

          
          const usingSplitDoc = service_data[i].documents;
          // return console.log(usingSplit);
          if (usingSplitDoc) {
            var fileUrl = "/practitioner/docs/";
            Practitionerdocs.findAll({
              attributes: [
                'id', 'isDoc', 'createdAt', 'updatedAt',
                [db.sequelize.fn('CONCAT', fileUrl, db.sequelize.col('name')), 'name']
              ],
              where: {
                id: {
                  [Op.in]: JSON.parse("[" + usingSplitDoc + "]")
                }
              }
            }).then(documentData => {
              // console.log(document);
              service_data[i].documents = documentData;
            }).catch(err => {
              res.status(500).send({ status: 500, success: false, message: err.message });
            })
          }
        }
        var msg = 'Data fetched!'
      }else{
        var msg = 'No more data in record!'
      }
      setTimeout(() => {
        res.status(200).send({ status: 200, success: true, message: msg, data: service_data });
      },1000);
    }else{
      res.status(201).send({ status: 201, success: false, message: 'No data found' });
    }

  }).catch(err => {
    res.status(500).send({ status: 500, success: false, message: err.message });
  });
};

exports.practitionerEventsList = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({ status: 200, message: "Something went wrong.", success: false, data: errors.array() });
  }
  if (req.headers && req.headers.authorization) {
    jwt.verify(req.headers.authorization.split(' ')[1], config.secret, (err, decoded) => {
      if (err) {
        return res.status(401).send({
          status: 401,
          success: false,
          message: "Unauthorized!"
        });
      }
      userId = decoded.id;
    });
  };

  var page = 0;
  if (req.body.page) {
    page = req.body.page
  }
  var size = 20;
  if(req.body.limit){
    size = parseInt(req.body.limit)
  }
  var offset = page * size
  var fileUrl = "/event/";
  Events.findAll({
    attributes: [
      `id`, `userId`, `type`, `title`, `available_time`, `services`, `description`, `available_date`, `cost`, `seats`, `createdAt`, `updatedAt`,
      [db.sequelize.fn('CONCAT', fileUrl, db.sequelize.col('docs')), 'docs'],
    ],
    include: [
      {
        model: MeetingDetail
      }
    ],
    where: {
      userId: req.body.prac_id,
    },
    limit: size,
    offset: offset,
    order: [
      ['id', 'DESC']
    ]
  }).then(eventsList => {
    // console.log(eventsList);
    if (eventsList) {
      
      if (eventsList.length > 0) {
        var msg = 'Data fetched!'
      } else {
        var msg = 'No more data in record!'
      }
      setTimeout(() => {
        res.status(200).send({ status: 200, success: true, message: msg, data: eventsList });
      },1000);
    } else {
      res.status(201).send({ status: 201, success: false, message: 'No data found' });
    }

  }).catch(err => {
    res.status(500).send({ status: 500, success: false, message: err.message });
  });
};

exports.allPractitionerPayments = (req, res) => { 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(201).send({ status: 201, message: "Something went wrong.", success: false, data: errors.array() });
    }
    var page = 0;
    if(req.body.page){
      page = req.body.page
    }
    var size = 10;
    if(req.body.limit){
      size = parseInt(req.body.limit)
    }
    var offset = page * size;
   
    var fileUrl = "/user/";
    Payments.findAll({
      include: [
        {
          model: User,
          as: 'sender',
          attributes: [
            'id', 'name', 'social_image',
            legacyImageAttribute(fileUrl, 'sender')
          ],
        },
        {
          model: User,
          as: 'receiver',
          attributes: [
            'id', 'name', 'social_image',
            legacyImageAttribute(fileUrl, 'receiver')
          ],
        }
      ],
      where: {
        [Op.or]: [
          {
            user_fk_id: req.body.prac_id
          },
          {
            to_user: req.body.prac_id
          }
        ]
      },
      limit:size, 
      offset:offset,
      order: [
        ['id', 'DESC']
      ]
    }).then(PaymentsAll => {
      // console.log(PaymentsAll)
      if(PaymentsAll.length > 0){
        const practitionerId = String(req.body.prac_id);
        const paymentDetail = PaymentsAll.map((val) => {
          const isIncoming = String(val.to_user) === practitionerId;
          const counterpartUser = isIncoming ? val.sender : val.receiver;
          const normalizedStatus = isIncoming
            ? (String(val.to_user) === String(val.user_fk_id) ? 'Completed' : val.status)
            : ((val.status && val.status.toUpperCase() === 'REFUND') ? 'Refund' : 'Completed');

          return {
            id: val.id,
            type: val.type,
            from: val.user_fk_id,
            to: val.to_user,
            amount: val.amount,
            stripe_id: val.stripe_id,
            eventId: val.eventId,
            ratingId: val.ratingId,
            packageId: val.packageId,
            extendedHourId: val.extendedHourId,
            status: normalizedStatus,
            created_at: val.created_at,
            updated_at: val.updated_at,
            createdAt: val.createdAt,
            updatedAt: val.updatedAt,
            user: counterpartUser ? {
              id: counterpartUser.id,
              name: counterpartUser.name,
              social_image: counterpartUser.social_image,
              image: counterpartUser.image
            } : null
          };
        });

        return res.status(200).send({ status: 200, success: true, message: 'Success', data: paymentDetail });
      }else{
        res.status(200).send({ status: 200, success: true, message: 'No data found', data: "" });
      }
    }).catch(err => {
      res.status(500).send({ status: 500, success: false, message: err.message });
    })
}

exports.practitionerPackagesList = (req, res) => {
  // var fileUrl = "/user/";

  var page = 0;
  if(req.body.page){
    page = req.body.page
  }
  var size = 20;
  if(req.body.limit){
    size = parseInt(req.body.limit)
  }
  var offset = page * size;
  Packages.findAll({
    where:{
      id:{
        [Op.in] : JSON.parse("[" + usingSplitpackages + "]")
      }
    }
  }).then(package_data =>{
    // return console.log(document);
    practitionerService.package = package_data;
    // console.log(practitionerService);
  }).catch(err =>{
    res.status(500).send({ status: 500,  success:false,  message: err.message });
  }).then(service_data => {
    // console.log(service_data);
    if(service_data){
      if(service_data.length > 0){
        var msg = 'Data fetched!'
      }else{
        var msg = 'No more data in record!'
      }
      res.status(200).send({ status: 200, success: true, message: msg, data: service_data });
    }else{
      res.status(201).send({ status: 201, success: false, message: 'No data found' });
    }

  }).catch(err => {
    res.status(500).send({ status: 500, success: false, message: err.message });
  });
};

exports.releasePayment = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({ status: 200, message: "Something went wrong.", success: false, data: errors.array() });
  }
  if (req.headers && req.headers.authorization) {
    jwt.verify(req.headers.authorization.split(' ')[1], config.secret, (err, decoded) => {
      if (err) {
        return res.status(401).send({
          status: 401,
          success: false,
          message: "Unauthorized!"
        });
      }
      userId = decoded.id;
    });
  };

  Payments.findOne({
    where: {
      id: req.body.payment_id
    }
  }).then(paymentDetail => {
    if(paymentDetail){
      console.log(paymentDetail)
      if(paymentDetail.stripe_transfer_id == null || paymentDetail.stripe_transfer_id == ''){
        setTimeout(() => {
          Payments.update({
            released: 1,
          },{
            where:{
              id:paymentDetail.id
            }
          }).then(updateTransfer => {
            if(updateTransfer == 1){
              res.status(200).send({ status: 200, success: true, message: 'Transfer Successfully', code: '3180' });
            }else{
              res.status(201).send({
                status: 201,
                message: 'Transfer Not saved',
                success: false
              });
            }
          }).catch(err => {
            res.status(401).send({
              status: 401,
              message: err.message,
              success: false
            });
          })
          
        }, 2000);
      }else{
        res.status(201).send({
          status: 201,
          message: 'Payment already withdrawn!',
          success: false
        });
      }
    }else{
      res.status(201).send({
        status: 201,
        message: 'No data found',
        success: false
      });
    }
  }).catch(err => {
    res.status(401).send({
      status: 401,
      message: err.message,
      success: false
    });
  });

  

  // stripe.payouts.create({
  //   amount: 1,
  //   currency: 'usd',
  //   method: 'instant',
  //   // destination: 'ba_1JzJCVKxyHny1crsF3g3d72z'
  // }, 
  // stripe.accounts.listCapabilities('acct_1GVkdkDlNqjyccEq'
  // stripe.payouts.create({amount: 1, currency: 'usd'}
  // // {
  // //   stripeAccount: 'ba_1JzH3zDlNqjyccEqjPx9mwxt',
  // }
  // stripe.transfers.create({
  //   amount: 4,
  //   currency: 'usd',
  //   destination: 'ba_1K2DS7LU8HQ73neogXWgFxD3',
  //   transfer_group: 'test_order',
  // }

  // stripe.accounts.create({
  //   type: 'custom',
  //   country: 'US',
  //   email: 'ankit.03992@gmail.com',
  //   business_type: 'individual',
  //   // name: 'Ankit Sukhija',
  //   capabilities: {
  //     card_payments: {requested: true},
  //     transfers: {requested: true},
  //   },
  // }
  // stripe.accounts.retrieve(
  //   'acct_1K6Z9BPuzRp9OM5W'
  // );
  // stripe.payouts.create({
  //   amount: 10,
  //   currency: 'usd',
  //   method: 'instant',
  // }, {
  //   stripeAccount: 'ba_1K6q9cPr8mVbfJoBV3jjP7bl',
  // }

  // stripe.accounts.createExternalAccount(
  //   'acct_1K6UlAQ3Yio0sXHw',
  //   {
  //     external_account: 'btok_1K6XYwLU8HQ73neoWDBdtriL',
  //   }
  // );
  // stripe.accounts.update(
  //   'acct_1K1dQ9LU8HQ73neo',
  //   {business_type: 'individual'}
  // stripe.charges.create({
  //   amount: 2000,
  //   currency: 'usd',
  //   source: 'tok_mastercard',
  //   description: 'My First Test Charge (created for API docs)',
  // });
  // stripe.balance.retrieve(function(err, balance) {
  //   console.log(balance)
  // });

  // stripe.transfers.create({
  //   amount: 5000,
  //   currency: 'usd',
  //   // destination: 'acct_1K6UlAQ3Yio0sXHw',
  //   destination: 'acct_1K6YzePr8mVbfJoB',
  //   transfer_group: 'dest',
  //   // business_type: 'individual',
  // }
  // stripe.charges.create({
  //   amount: 10,
  //   currency: 'inr',
  //   customer: 'cus_Kec6yQmtACgHSy',
  //   // source: 'src_18eYalAHEMiOZZp1l9ZTjSU0',
  // }
  // ).then(pI => {
    // stripePI = pI.id;

    // stripe.accountLinks.create({
    //   account: pI.id,
    //   refresh_url: 'http://localhost:8080/reauth',
    //   return_url: 'http://localhost:8080/return',
    //   type: 'account_update',
    //   collect: 'eventually_due'
    // }).then(accountLink => {
    //   res.status(200).send({ status: 200, success: true, message: pI, code: '2833', data:  accountLink});
    // }).catch(err => {
    //   res.status(401).send({
    //     status: 401,
    //     message: err.message,
    //     success: false,
    //     code: 3190
    //   });
    // });
  //   res.status(200).send({ status: 200, success: true, message: pI, code: '2833' });
  //   // console.log(pI)
  // })
  // .catch(err => {
  //   res.status(401).send({
  //     status: 401,
  //     message: err.message,
  //     success: false
  //   });
  // });

  // const paymentIntent = await stripe.paymentIntents.create({
  //   payment_method_types: ['card'],
  //   amount: 1000,
  //   currency: 'usd',
  //   transfer_data: {
  //     destination: '{{CONNECTED_STRIPE_ACCOUNT_ID}}',
  //   },
  // });
 
  // const transfer = await stripe.transfers.create({
  //   amount: 400,
  //   currency: 'inr',
  //   destination: 'ba_1JiY3sDlNqjyccEqyjKS0vLM',
  //   transfer_group: 'ORDER_95',
  // });
};

exports.userPaymentsRefund = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(201).send({ status: 201, message: "Something went wrong.", success: false, data: errors.array() });
  }
  if (req.headers && req.headers.authorization) {
    jwt.verify(req.headers.authorization.split(' ')[1], config.secret, (err, decoded) => {
      if (err) {
        return res.status(401).send({
          status: 401,
          success: false,
          message: "Unauthorized!"
        });
      }
      userId = decoded.id;
    });
  };
  
  
  Payments.findOne({
    where: {
      id: req.body.paymentId
    }
  }).then((paymentDetail)=>{
    console.log(paymentDetail.stripe_id)
    try {
      // Create a refund

      var amount = (parseFloat(paymentDetail.amount) *(parseFloat(req.body.percentage)/100)*100)
      const refund =  stripe.refunds.create({
        payment_intent: paymentDetail.stripe_id,
        amount: amount, // Specify the amount to refund (in cents)
      }).then(responseTransfer=>{

        setTimeout(() => {
          Payments.update({
            'amount_refunded':1,
            'refunded_amount':amount/100,
            'refund_id':responseTransfer.id,
            'refund_description':req.body.description,
            'refunded_percentage':req.body.percentage
          },{
            where:{
              id:paymentDetail.id
            }
          }).then(updateTransfer => {
            if(updateTransfer == 1){
              res.status(200).send({ status: 200, success: true, message: 'Transfer Successfully', code: '3180' });
            }else{
              res.status(201).send({
                status: 201,
                message: 'Transfer Not saved',
                success: false
              });
            }
          }).catch(err => {
            res.status(401).send({
              status: 401,
              message: err.message,
              success: false
            });
          })
          
        }, 2000);
      }).catch(error=>{
        res.status(201).send({
          status: 201,
          message: 'refund Not saved',
          data:error,
          success: false
        });
      });
  
      
    } catch (error) {
      res.status(201).send({
        status: 201,
        message: 'error for refund',
        success: false
      });
    }

  })
};

exports.direct = (req, res) => {
  return res.status(401).send({
    status: 401,
    success: false,
    message: "Unauthorized!"
  });
}

exports.returnStripe = (req, res) => {
  console.log(req);
  res.status(200).send("Moderator Content.: "+req.toString());
};

exports.stripeConnect = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(201).send({ status: 201, message: "Something went wrong.", success: false, data: errors.array() });
  }
  if (req.headers && req.headers.authorization) {
    jwt.verify(req.headers.authorization.split(' ')[1], config.secret, (err, decoded) => {
      if (err) {
        return res.status(401).send({
          status: 401,
          success: false,
          message: "Unauthorized!"
        });
      }
      userId = decoded.id;
    });
  };
  User.findOne(
    {
      where: { 
        id: userId
      }
    })
    .then(uData => {
      // res.status(200).send({ status: 200, success: true, message: 'success', data: uData});
      // console.log(req.get('host'))
      if(uData.strip_account === null || uData.strip_account === ''){
        // console.log(uData.strip_account + '<<<---  null ----->>>');
        stripe.accounts.create({
          type: 'custom',
          country: 'US',
          email: uData.email,
          business_type: 'individual',
          capabilities: {
            card_payments: {requested: true},
            transfers: {requested: true},
          },
          settings: {
            payouts:{
              schedule: {
                delay_days: 2,
                interval: 'daily'
              }
            }
          }
        }).then(stripeConnectAccount => {
          setTimeout(() => {
            User.update({
              strip_account: stripeConnectAccount.id
            },{
              where: { id: userId }
            });
            stripe.accountLinks.create({
              account: stripeConnectAccount.id,
              refresh_url: 'http://'+req.get('host')+'/reauth',
              return_url: 'http://'+req.get('host')+'/return',
              type: 'account_update',
              collect: 'eventually_due'
            }).then(accountLink => {
              // console.log(accountLink.url);
              res.status(200).send({ status: 200, success: true, message: 'success', data: accountLink.url});
            }).catch(err => {
              res.status(500).send({ status: 500, code:'3294', success: false, message: err.message });
            });
          },2000);
        }).catch(err => {
          res.status(500).send({ status: 500, code:'3298', success: false, message: err.message });
        });
      }else{
        stripe.accountLinks.create({
          account: uData.strip_account,
          refresh_url: 'http://'+req.get('host')+'/reauth',
          return_url: 'http://'+req.get('host')+'/return',
          type: 'account_update',
          collect: 'eventually_due'
        }).then(accountLink => {
          // console.log(accountLink.url);
          res.status(200).send({ status: 200, success: true, message: 'success', data: accountLink.url});
        }).catch(err => {
          res.status(500).send({ status: 500, code:'3311', success: false, message: err.message });
        });
      }
    })
    .catch(err => {
      res.status(500).send({ status: 500, code:'3335', success: false, message: err.message });
    });
};

exports.stripeApproved = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(201).send({ status: 201, message: "Something went wrong.", success: false, data: errors.array() });
  }
  if (req.headers && req.headers.authorization) {
    jwt.verify(req.headers.authorization.split(' ')[1], config.secret, (err, decoded) => {
      if (err) {
        return res.status(401).send({
          status: 401,
          success: false,
          message: "Unauthorized!"
        });
      }
      userId = decoded.id;
    });
  };
  User.update({
    strip_verified: 'true'
  },{
    where: { id: userId }
  }).then(stripeVerified => {
    res.status(200).send({ status: 200, success: true, message: 'success', code: '2833', data:  stripeVerified});
  }).catch(err => {
    res.status(401).send({
      status: 401,
      message: err.message,
      success: false,
      code: 3190
    });
  });
};

exports.approvePractitioner = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(201).send({ status: 201, message: "Something went wrong.", success: false, data: errors.array() });
  }

  if (req.headers && req.headers.authorization) {
    jwt.verify(req.headers.authorization.split(' ')[1], config.secret, (err, decoded) => {
      if (err) {
        return res.status(401).send({
          status: 401,
          success: false,
          message: "Unauthorized!"
        });
      }
      userId = decoded.id;
    });
  };
// console.log(userId);
  User.update({
    is_practitioner: '1'
  },{
    where: { id: req.body.to_be_practitioner }
  }).then(pract_approved => {
    if(pract_approved == 1){
      Notification.create({
        type: 2,
        notifiable_type: 'approved_practitioner',
        notifiable_id: req.body.to_be_practitioner,
        // data: "{'sender_id': '"+userId+"','name':'"+singleUser.name+"','image':'"+uImage+"','social_image':'"+singleUser.social_image+"', 'description':'"+singleUser.name+" added you as favourite!' }"
        data: '{"sender_id": "'+userId+'","name":"Admin","image":"","social_image":"", "description": "You are approved as Practitioner!" }'
      }).then(savedNotification => {
        notify = savedNotification

        User.findOne({
          where:{id:userId}
        }).then(uData => {
          const mailData = {
            from: 'liberate.dev@gmail.com',  // sender address
            to: uData.email,   // list of receivers
            subject: 'Approval for practitioner',
            html: "You are now approved as practitioner",
          };
          transporter.sendMail(mailData, function (err, info) {
            if(err){
              console.log(err)
            }else{
              console.log(info)
            }
          });
        }).catch(err => {
          res.status(500).send({ status: 500, success: false, message: err.message });
        });
        
        // res.status(200).send({ status: 200, message: "Reset password mail has been sent.", success: true, data: { 'email': req.body.email, 'url': resetUrl } });
      }).catch(err => {
        res.status(500).send({ status: 500, success: false, message: err.message });
      });
      setTimeout(() => {
        res.status(200).send({ status: 200, success: true, message: "User is now approved for prectitioner!" });
      },1000);
    }else{
      res.status(500).send({ status: 500, success: false, message: "Something went wrong!", dd: pract_approved });
    }
  }).catch(err => {
    res.status(500).send({ status: 500, success: false, message: err.message });
  });
};


exports.dispprovePractitioner = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(201).send({ status: 201, message: "Something went wrong.", success: false, data: errors.array() });
  }

  if (req.headers && req.headers.authorization) {
    jwt.verify(req.headers.authorization.split(' ')[1], config.secret, (err, decoded) => {
      if (err) {
        return res.status(401).send({
          status: 401,
          success: false,
          message: "Unauthorized!"
        });
      }
      userId = decoded.id;
    });
  };
// console.log(userId);
  User.update({
    is_practitioner: '0'
  },{
    where: { id: req.body.not_to_be_practitioner }
  }).then(pract_approved => {
    if(pract_approved == 1){
      Notification.create({
        type: 2,
        notifiable_type: 'disapproved_practitioner',
        notifiable_id: req.body.to_be_practitioner,
        // data: "{'sender_id': '"+userId+"','name':'"+singleUser.name+"','image':'"+uImage+"','social_image':'"+singleUser.social_image+"', 'description':'"+singleUser.name+" added you as favourite!' }"
        data: '{"sender_id": "'+userId+'","name":"Admin","image":"","social_image":"", "description": "Your request is decline to be a Practitioner!" }'
      })
      .then(savedNotification => {
        notify = savedNotification

        User.findOne({
          where:{id:userId}
        }).then(uData => {
          const mailData = {
            from: 'liberate.dev@gmail.com',  // sender address
            to: uData.email,   // list of receivers
            subject: 'Disapprove for practitioner',
            html: "You are now not a practitioner",
          };
          transporter.sendMail(mailData, function (err, info) {
            if(err){
              console.log(err)
            }else{
              console.log(info)
            }
          });
        }).catch(err => {
          res.status(500).send({ status: 500, success: false, message: err.message });
        });
        // res.status(200).send({ status: 200, message: "Reset password mail has been sent.", success: true, data: { 'email': req.body.email, 'url': resetUrl } });
      }).catch(err => {
        res.status(500).send({ status: 500, success: false, message: err.message });
      });
      setTimeout(() => {
        res.status(200).send({ status: 200, success: true, message: "Request rejected to be a practitioner!" });
      },1000);
    }else{
      res.status(500).send({ status: 500, success: false, message: "Something went wrong!", dd: pract_approved });
    }
  }).catch(err => {
    res.status(500).send({ status: 500, success: false, message: err.message });
  });
};

exports.approvePractitionerService = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(201).send({ status: 201, message: "Something went wrong.", success: false, data: errors.array() });
  }

  if (req.headers && req.headers.authorization) {
    jwt.verify(req.headers.authorization.split(' ')[1], config.secret, (err, decoded) => {
      if (err) {
        return res.status(401).send({
          status: 401,
          success: false,
          message: "Unauthorized!"
        });
      }
      userId = decoded.id;
    });
  };
// console.log(userId);
  practitionerServices.findOne({
    where: {
      id: req.body.service_id
    }
  }).then(practitioner_services_data => {
    if(practitioner_services_data){
      practitionerServices.update({
        is_approved: '1'
      },{
        where: { id: req.body.service_id }
      }).then(pract_service_approved => {
        if(pract_service_approved == 1){
          Notification.create({
            type: 2,
            notifiable_type: 'approved_practitioner_service',
            notifiable_id: practitioner_services_data.userId,
            // data: "{'sender_id': '"+userId+"','name':'"+singleUser.name+"','image':'"+uImage+"','social_image':'"+singleUser.social_image+"', 'description':'"+singleUser.name+" added you as favourite!' }"
            data: '{"sender_id": "'+userId+'","name":"Admin","image":"","social_image":"", "description": "Your service is now approved!" }'
          })
          .then(savedNotification => {
            notify = savedNotification

            User.findOne({
              where:{id:practitioner_services_data.userId}
            }).then(uData => {
              const mailData = {
                from: 'liberate.dev@gmail.com',  // sender address
                to: uData.email,   // list of receivers
                subject: 'Approval for service',
                html: "Your service is now approved as practitioner",
              };
              transporter.sendMail(mailData, function (err, info) {
                if(err){
                  console.log(err)
                }else{
                  console.log(info)
                }
              });
            }).catch(err => {
              res.status(500).send({ status: 500, success: false, message: err.message });
            });
            // res.status(200).send({ status: 200, message: "Reset password mail has been sent.", success: true, data: { 'email': req.body.email, 'url': resetUrl } });
          }).catch(err => {
            res.status(500).send({ status: 500, success: false, message: err.message });
          });
          setTimeout(() => {
            res.status(200).send({ status: 200, success: true, message: "Service is now approved!" });
          },1000);
        }else{
          res.status(500).send({ status: 500, success: false, message: "Something went wrong!", dd: pract_service_approved });
        }
      }).catch(err => {
        res.status(500).send({ status: 500, success: false, message: err.message });
      });
    }else{
      res.status(201).send({ status: 201, success: false, message: 'No data found!' });
    }
  }).catch(err => {
    res.status(500).send({ status: 500, success: false, message: err.message });
  })
};

exports.UpdateUserPassword = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(201).send({ status: 201, message: "Something went wrong.", success: false, data: errors.array() });
  }

  if (req.headers && req.headers.authorization) {
    jwt.verify(req.headers.authorization.split(' ')[1], config.secret, (err, decoded) => {
      if (err) {
        return res.status(401).send({
          status: 401,
          success: false,
          message: "Unauthorized!"
        });
      }
      userId = decoded.id;
    });
  };
  // console.log(userId);
  User.findOne({
    where : {
      id : req.body.user_id
    }
  }).then(userData => {
    User.update({
      password: bcrypt.hashSync(req.body.password, 8)
    },{
      where: { id: userData.id }
    }).then(updatePass => {
      if(updatePass == 1){
        setTimeout(() => {
          res.status(200).send({ status: 200, success: true, message: "User password is updated!" });
        },1000);
      }else{
        res.status(500).send({ status: 500, success: false, message: "Something went wrong!", dd: pract_approved });
      }
    }).catch(err => {
      res.status(500).send({ status: 500, success: false, message: err.message });
    });
  }).catch(err => {
    res.status(500).send({ status: 500, success: false, message: err.message });
  })
};

exports.UpdateUserStatus = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(201).send({ status: 201, message: "Something went wrong.", success: false, data: errors.array() });
  }
  if (req.headers && req.headers.authorization) {
    jwt.verify(req.headers.authorization.split(' ')[1], config.secret, (err, decoded) => {
      if (err) {
        return res.status(401).send({
          status: 401,
          success: false,
          message: "Unauthorized!"
        });
      }
      userId = decoded.id;
    });
  };
  // return console.log(userId);
  User.findOne({
    where : {
      id : req.body.user_id
    }
  }).then(userData => {
    // return console.log(req.body)
    if(userData.status == req.body.status){
      res.status(500).send({ status: 500, success: false, message: 'Status is already '+req.body.status });
    }else{
      User.update({
        status: req.body.status,
      },{
        where: { id: userData.id }
      }).then(updateStatus => {
        if(updateStatus == 1){
          setTimeout(() => {
            res.status(200).send({ status: 200, success: true, message: "User status is updated!" });
          },1000);
        }else{
          res.status(500).send({ status: 500, success: false, message: "Something went wrong!" });
        }
      }).catch(err => {
        res.status(500).send({ status: 500, success: false, message: err.message });
      });
    }
  }).catch(err => {
    res.status(500).send({ status: 500, success: false, message: err.message });
  })
};

exports.userPracPayment = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(201).send({ status: 201, message: "Something went wrong.", success: false, data: errors.array() });
  }
  if (req.headers && req.headers.authorization) {
    jwt.verify(req.headers.authorization.split(' ')[1], config.secret, (err, decoded) => {
      if (err) {
        return res.status(401).send({
          status: 401,
          success: false,
          message: "Unauthorized!"
        });
      }
      userId = decoded.id;
    });
  };
  var fileUrl = "/user/";
  Payments.findOne({
    include: [
      {
        model: User,
        attributes: [
          'id', 'name', 'social_image', 'email', 'phone',
          legacyImageAttribute(fileUrl, 'user')
        ],
      },
      {
        model: User,
        as: 'fromUser',
        attributes: [
          'id', 'name', 'social_image', 'email', 'phone',
          legacyImageAttribute(fileUrl, 'fromUser')
        ],
      }
    ],
    where:{
      id: req.body.payment_id
    }
  }).then(PaymentData => {
    console.log(PaymentData)
    if(PaymentData){
      res.status(200).send({ status: 200, success: true, message: 'Success', data: PaymentData });
    }else{
      res.status(200).send({ status: 200, success: true, message: 'No data found', data: "" });
    }
  }).catch(err => {
    res.status(500).send({ status: 500, success: false, message: err.message });
  })
};


exports.adminPracPayment = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(201).send({ status: 201, message: "Something went wrong.", success: false, data: errors.array() });
  }
  if (req.headers && req.headers.authorization) {
    jwt.verify(req.headers.authorization.split(' ')[1], config.secret, (err, decoded) => {
      if (err) {
        return res.status(401).send({
          status: 401,
          success: false,
          message: "Unauthorized!"
        });
      }
      userId = decoded.id;
    });
  };
  var fileUrl = "/user/";
  Payments.findOne({
    include: [
      {
        model: User,
        attributes: [
          'id', 'name', 'social_image', 'email', 'phone',
          legacyImageAttribute(fileUrl, 'user')
        ],
      }
    ],
    where:{
      id: req.body.payment_id,
      stripe_transfer_id: {[Op.ne]: null}
    }
  }).then(PaymentData => {
    if(PaymentData){
      res.status(200).send({ status: 200, success: true, message: 'Success', data: PaymentData });
    }else{
      res.status(200).send({ status: 200, success: true, message: 'No transfer processed', data: "" });
    }
  }).catch(err => {
    res.status(500).send({ status: 500, success: false, message: err.message });
  })
};
exports.updateAdminPass = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(201).send({ status: 201, message: "Something went wrong.", success: false, data: errors.array() });
  }
  if (req.headers && req.headers.authorization) {
    jwt.verify(req.headers.authorization.split(' ')[1], config.secret, (err, decoded) => {
      if (err) {
        return res.status(401).send({
          status: 401,
          success: false,
          message: "Unauthorized!"
        });
      }
      userId = decoded.id;
    });
  };
  User.findOne({
    where: {
      id: userId,
    }
  }).then(user => {
    if(user){
      var passwordIsValid = bcrypt.compareSync(
        req.body.oldPassword,
        user.password
      );
  
      if (!passwordIsValid) {
        return res.status(201).send({
          status: 201,
          success: false,
          accessToken: null,
          message: "Invalid Old Password!"
        });
      }
      User.update({
        password: bcrypt.hashSync(req.body.password, 8)
      },{
        where: {
          id: userId,
        }
      }).then(user => {
        if(user == 1){
          res.send({ status: 200, success: true, message: "Password updated successfully!" });
        }else{
          res.send({ status: 200, success: true, message: "Something went wrong!" });
        }
      }).catch(err => {
        res.status(500).send({ status: 500, success: false, message: err.message });
      });
    }else{
      res.status(500).send({ status: 500, success: true, message: 'No user found' });
    }
    

  }).catch(err => {
    res.status(500).send({ status: 500, success: false, message: err.message });
  });

  
          
}

exports.adminProfileUpdate = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(201).send({ status: 201, message: "Something went wrong.", success: false, data: errors.array() });
  }
  if (req.headers && req.headers.authorization) {
    jwt.verify(req.headers.authorization.split(' ')[1], config.secret, (err, decoded) => {
      if (err) {
        return res.status(401).send({
          status: 401,
          success: false,
          message: "Unauthorized!"
        });
      }
      userId = decoded.id;
    });
  };
  User.findOne({
    where: {
      id: userId,
    }
  }).then(user => {
    if(user){
      User.update({
        name: req.body.name
      },{
        where: {
          id: userId,
        }
      }).then(user => {
        if(user == 1){
          res.send({ status: 200, success: true, message: "Profile Updated Successfully!" });
        }else{
          res.send({ status: 200, success: true, message: "Something went wrong!" });
        }
      }).catch(err => {
        res.status(500).send({ status: 500, success: false, message: err.message });
      });
    }else{
      res.status(500).send({ status: 500, success: true, message: 'No user found' });
    }
  }).catch(err => {
    res.status(500).send({ status: 500, success: false, message: err.message });
  });      
}


exports.userProfileReviews = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(201).send({ status: 201, message: "Something went wrong.", success: false, data: errors.array() });
  }
  if (req.headers && req.headers.authorization) {
    jwt.verify(req.headers.authorization.split(' ')[1], config.secret, (err, decoded) => {
      if (err) {
        return res.status(401).send({
          status: 401,
          success: false,
          message: "Unauthorized!"
        });
      }
      userId = decoded.id;
    });
  };
  var fileUrl = "/user/";
  EventReview.findAll({
    include: [
      {
        model: User,
        attributes: [
          'id', 'name', 'social_image', 'email', 'phone',
          legacyImageAttribute(fileUrl, 'user')
        ],
      }
    ],
    where:{
      prac_id: req.body.prac_id,
      display: '1'
    }
  }).then(userReviewData => {
    if(userReviewData){
      res.status(200).send({ status: 200, success: true, message: 'Success', data: userReviewData });
    }else{
      res.status(200).send({ status: 200, success: true, message: 'No transfer processed', data: "" });
    }
  }).catch(err => {
    res.status(500).send({ status: 500, success: false, message: err.message });
  })
};

exports.adminUserReport = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(201).send({ status: 201, message: "Something went wrong.", success: false, data: errors.array() });
  }
  if (req.headers && req.headers.authorization) {
    jwt.verify(req.headers.authorization.split(' ')[1], config.secret, (err, decoded) => {
      if (err) {
        return res.status(401).send({
          status: 401,
          success: false,
          message: "Unauthorized!"
        });
      }
      userId = decoded.id;
    });
  };
  UserReport.findAll({
    include: [
      {
        model: User,
        attributes: [
          'id', 'name', 'email', 'phone','username',
          // [db.sequelize.fn('CONCAT', fileUrl, db.sequelize.col('user.image')), 'image']
        ],
      },{
        model: User,
        as: 'reportedByUser',
        attributes: [
          'id', 'name', 'email', 'phone','username',
          // [db.sequelize.fn('CONCAT', fileUrl, db.sequelize.col('fromUser.image')), 'image']
        ],
      }
    ],
    where:{
      r_user_id: {
        [Op.ne]: null
      }
    },
    order: [
      ['id', 'DESC'],
    ],
  }).then(userReportData => {
    // return console.log(userReportData);
    if(userReportData){
      res.status(200).send({ status: 200, success: true, message: 'Success', data: userReportData });
    }else{
      res.status(200).send({ status: 200, success: true, message: 'No Data Found!', data: "" });
    }
  }).catch(err => {
    res.status(500).send({ status: 500, success: false, message: err.message });
  })
};

exports.adminToggleReportStatus = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(201).send({ status: 201, message: "Something went wrong.", success: false, data: errors.array() });
  }
  if (req.headers && req.headers.authorization) {
    jwt.verify(req.headers.authorization.split(' ')[1], config.secret, (err, decoded) => {
      if (err) {
        return res.status(401).send({
          status: 401,
          success: false,
          message: "Unauthorized!"
        });
      }
      userId = decoded.id;
    });
  };

  UserReport.findOne({
    where: {
      id: req.body.id
    }
  }).then(reportData => {
    if (!reportData) {
      return res.status(201).send({ status: 201, success: false, message: 'No report found!' });
    }

    const updatedStatus = reportData.status == '1' ? '0' : '1';

    UserReport.update({
      status: updatedStatus,
    }, {
      where: { id: reportData.id }
    }).then(() => {
      res.status(200).send({
        status: 200,
        success: true,
        message: "Report status updated successfully!",
        data: {
          id: reportData.id,
          status: updatedStatus
        }
      });
    }).catch(err => {
      res.status(500).send({ status: 500, success: false, message: err.message });
    });
  }).catch(err => {
    res.status(500).send({ status: 500, success: false, message: err.message });
  })
};


exports.adminEventReport = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(201).send({ status: 201, message: "Something went wrong.", success: false, data: errors.array() });
  }
  if (req.headers && req.headers.authorization) {
    jwt.verify(req.headers.authorization.split(' ')[1], config.secret, (err, decoded) => {
      if (err) {
        return res.status(401).send({
          status: 401,
          success: false,
          message: "Unauthorized!"
        });
      }
      userId = decoded.id;
    });
  };
  UserReport.findAll({
    include: [
      {
        model: Event,
        // attributes: [
          // 'id', 'name', 'email', 'phone',
          // [db.sequelize.fn('CONCAT', fileUrl, db.sequelize.col('user.image')), 'image']
        // ],
      },{
        model: User,
        as: 'reportedByUser',
        attributes: [
          'id', 'name', 'email', 'phone','username',
          // [db.sequelize.fn('CONCAT', fileUrl, db.sequelize.col('fromUser.image')), 'image']
        ],
      }
    ],
    where:{
      r_event_id: {
        [Op.ne]: null
      }
    },
    order: [
      ['id', 'DESC'],
    ],
  }).then(eventReportData => {
    // return console.log(userReportData);
    if(eventReportData){
      res.status(200).send({ status: 200, success: true, message: 'Success', data: eventReportData });
    }else{
      res.status(200).send({ status: 200, success: true, message: 'No Data Found!', data: "" });
    }
  }).catch(err => {
    res.status(500).send({ status: 500, success: false, message: err.message });
  })
};

exports.adminAllEvents = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(201).send({ status: 201, message: "Something went wrong.", success: false, data: errors.array() });
  }
  if (req.headers && req.headers.authorization) {
    jwt.verify(req.headers.authorization.split(' ')[1], config.secret, (err, decoded) => {
      if (err) {
        return res.status(401).send({
          status: 401,
          success: false,
          message: "Unauthorized!"
        });
      }
      userId = decoded.id;
    });
  };
  Event.findAll({
    include: [{
        model: User,
        attributes: [
          'id', 'name', 'email', 'phone',
        ],
        include: [
          {
            model: Userdetail
          }
        ]
      }
    ],
    order: [
      ['id', 'DESC']
    ],
  }).then(eventsAll => {
    // return console.log(userReportData);
    if(eventsAll){
      res.status(200).send({ status: 200, success: true, message: 'Success', data: eventsAll });
    }else{
      res.status(200).send({ status: 200, success: true, message: 'No Data Found!', data: "" });
    }
  }).catch(err => {
    res.status(500).send({ status: 500, success: false, message: err.message });
  })
};


exports.adminEventsAllSlots = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(201).send({ status: 201, message: "Something went wrong.", success: false, data: errors.array() });
  }
  if (req.headers && req.headers.authorization) {
    jwt.verify(req.headers.authorization.split(' ')[1], config.secret, (err, decoded) => {
      if (err) {
        return res.status(401).send({
          status: 401,
          success: false,
          message: "Unauthorized!"
        });
      }
      userId = decoded.id;
    });
  };
  
  EventSlot.findAll({
    attributes: {exclude: ['createdAt','updatedAt']},
    include: [{
        model: Event,
      }
    ],
    order: [
      ['id', 'DESC']
    ],
    where:{
      event_fk_id: req.body.eventId
    }
  }).then(eventsAll => {
    // return console.log(userReportData);
    if(eventsAll){
      res.status(200).send({ status: 200, success: true, message: 'Success', data: eventsAll });
    }else{
      res.status(200).send({ status: 200, success: true, message: 'No Data Found!', data: "" });
    }
  }).catch(err => {
    res.status(500).send({ status: 500, success: false, message: err.message, code:"22" });
  })
};


exports.adminEventsSlotBookingDetail = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(201).send({ status: 201, message: "Something went wrong.", success: false, data: errors.array() });
  }
  if (req.headers && req.headers.authorization) {
    jwt.verify(req.headers.authorization.split(' ')[1], config.secret, (err, decoded) => {
      if (err) {
        return res.status(401).send({
          status: 401,
          success: false,
          message: "Unauthorized!"
        });
      }
      userId = decoded.id;
    });
  };

  Payments.findAll({
    attributes: {exclude: ['createdAt','updatedAt']},
    include: [{
        model: User,
        // as: 'bookedUser',
        attributes: [
          'id', 'name', 'email', 'phone','username'
        ],
        include: [{
            model: Userdetail,
          }
        ],
      }
    ],
    order: [
      ['id', 'DESC']
    ],
    where:{
      event_time_slot_id: req.body.slotId
    }
  }).then(eventsAll => {
    // return console.log(userReportData);
    if(eventsAll){
      res.status(200).send({ status: 200, success: true, message: 'Success', data: eventsAll });
    }else{
      res.status(200).send({ status: 200, success: true, message: 'No Data Found!', data: "" });
    }
  }).catch(err => {
    res.status(500).send({ status: 500, success: false, message: err.message, code:"22" });
  })
};


exports.adminUserAllEvents = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(201).send({ status: 201, message: "Something went wrong.", success: false, data: errors.array() });
  }
  if (req.headers && req.headers.authorization) {
    jwt.verify(req.headers.authorization.split(' ')[1], config.secret, (err, decoded) => {
      if (err) {
        return res.status(401).send({
          status: 401,
          success: false,
          message: "Unauthorized!"
        });
      }
      userId = decoded.id;
    });
  };
  Event.findAll({
    include: [{
        model: User,
        attributes: [
          'id', 'name', 'email', 'phone',
        ],
        include: [
          {
            model: Userdetail
          }
        ]
      }
    ],
    order: [
      ['id', 'DESC']
    ],
    where:{
      user_fk_id: req.body.userId
    }
  }).then(eventsAll => {
    // return console.log(userReportData);
    if(eventsAll){
      res.status(200).send({ status: 200, success: true, message: 'Success', data: eventsAll });
    }else{
      res.status(200).send({ status: 200, success: true, message: 'No Data Found!', data: "" });
    }
  }).catch(err => {
    res.status(500).send({ status: 500, success: false, message: err.message });
  })
};

exports.adminUserEventsBookings = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(201).send({ status: 201, message: "Something went wrong.", success: false, data: errors.array() });
  }
  if (req.headers && req.headers.authorization) {
    jwt.verify(req.headers.authorization.split(' ')[1], config.secret, (err, decoded) => {
      if (err) {
        return res.status(401).send({
          status: 401,
          success: false,
          message: "Unauthorized!"
        });
      }
      userId = decoded.id;
    });
  };

  Payments.findAll({
    attributes: {exclude: ['createdAt','updatedAt']},
    include: [{
        model: User,
        as: 'host',
        attributes: [
          'id', 'name', 'email', 'phone',
        ],
        include: [{
            model: Userdetail,
          }
        ],
      },
      {
        model: EventSlot,
        include: [{
          model: Event,
        }
      ],
        attributes: {exclude: ['createdAt','updatedAt']},
      }
    ],
    order: [
      ['id', 'DESC']
    ],
    where:{
      user_fk_id: req.body.userId
    }
  }).then(eventsAll => {
    // return console.log(userReportData);
    if(eventsAll){
      res.status(200).send({ status: 200, success: true, message: 'Success', data: eventsAll });
    }else{
      res.status(200).send({ status: 200, success: true, message: 'No Data Found!', data: "" });
    }
  }).catch(err => {
    res.status(500).send({ status: 500, success: false, message: err.message, code:"22" });
  })
};

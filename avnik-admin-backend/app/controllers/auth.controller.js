const db = require("../models");
const config = require("../config/auth.config");
var nodemailer = require('nodemailer');
const User = db.user;
const Role = db.role;
const Emailverify = db.emailVerify;
const UserRoles = db.userRoles;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const { body, validationResult, check } = require("express-validator");
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

  exports.testmail = (req, res) => {
    const mailData = {
      from: 'test@mail.com',  // sender address
        to: 'ankit.fbz@gmail.com',   // list of receivers
        subject: 'Thanks for registration',
        html: 'Welcome test'
      };
      transporter.sendMail(mailData, function (err, info) {
        if(err){
          // console.log(err);
          res.status(500).send({ status: 500, message: "Something went wrong.", success:false, data: err.message });
        }else{
          // console.log(info);
          res.status(200).send({ status: 200, message: "Done", success:false, data: info });
        }
     });
  }
  

exports.adminSignIn = (req, res) => {
  // console.log(req.body);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({ status: 200, message: "Something went wrong.", success:false, data: errors.array() });
  }
    User.findOne({
      where: {
        email: req.body.email,
        status : 'active',
        role: 'admin'
      }
    })
    .then(user => {
      console.log(user)
      if (!user || user.role != 'admin') {
        return res.status(201).send({
          status: 201,
          success: false,
          message: "User Not found." });
      }

      if (user.email_verified_status != '1') {
        return res.status(201).send({
          status: 201,
          success: false,
          accessToken: null,
          message: "User email is not verified."
        });
      }

      
      if (user.status != 'active') {
        return res.status(201).send({
          status: 201,
          success: false,
          accessToken: null,
          message: "Your account is not active to login. Please conatct our support team."
        });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(201).send({
          status: 201,
          success: false,
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 2629800 // 24 hours
      });

      res.status(200).send({
        status: 200,
        success: true,
        data: {
          id: user.id,
          email: user.email,
          roles: user.role,
          accessToken: token,
          email_verified_status: user.email_verified_status,
          status: user.status,
        }
      });
    })
    .catch(err => {
      res.status(500).send({
        status: 500,
        success: false, 
        message: err.message });
    });
};

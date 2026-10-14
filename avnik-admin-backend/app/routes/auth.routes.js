const { verifySignUp } = require("../middleware");
const controller = require("../controllers/auth.controller");
const { check } = require("express-validator");


module.exports = function(app) {
  
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

  // app.post("/api/auth/signin", (req, res) => {
  //   console.log(req.body);
  // });

  
  app.post(
    "/api/auth/testmail",
    [
      check('email', 'Email is not valid').isEmail() 
    ],
    controller.testmail
  );


  //Admin SignIn
  app.post("/api/auth/adminSignIn", [
    // check('email', 'Email is not valid').isEmail().normalizeEmail(),
    check('email', 'Email is not valid').not().isEmpty().isEmail(),
    check('password', 'Password is requried').not().isEmpty().isLength({ min: 1 })
  ], 
  controller.adminSignIn
);

};
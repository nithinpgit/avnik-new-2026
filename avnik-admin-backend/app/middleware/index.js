const authJwt = require("./authJwt");
const verifySignUp = require("./verifySignUp");


console.log('middleware'),
module.exports = {
  authJwt,
  verifySignUp
};
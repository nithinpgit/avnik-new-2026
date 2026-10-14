const { authJwt } = require("../middleware");
const controller = require("../controllers/category.controller");
const cors = require("cors");
const { check, body } = require("express-validator");

module.exports = function(app) {
  app.use(cors({origin: "*"}));

  app.post(
    "/api/category/category",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.category
  );
  
  app.post(
    "/api/category/addCategory",
    [authJwt.verifyToken, authJwt.isAdmin],
    [
      check('name', 'Name is mandatory').not().isEmpty(),
      // check('parentCatId', 'Parent Category Id is mandatory').not().isEmpty(),
    ],
    controller.addCategory
  );

  app.post(
    "/api/category/updateCategory",
    [authJwt.verifyToken, authJwt.isAdmin],
    [
      check('name', 'Name is mandatory').not().isEmpty(),
      check('id', 'Category Id is mandatory').not().isEmpty(),
    ],
    controller.updateCategory
  );

};
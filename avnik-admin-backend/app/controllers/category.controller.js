const db = require("../models");
const config = require("../config/auth.config");
const { decode } = require("jsonwebtoken");
const jwt = require("jsonwebtoken");
const Category = db.category;
const { validationResult } = require("express-validator");

//  Categories
exports.category = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(201).send({ status: 201, message: "Something went wrong.", success: false, data: errors.array() });
  }
  var parentIdVal = 0
  if(req.body.parentId){
    parentIdVal = req.body.parentId
  }
  Category.findAll({
    where:{
      parentId : parentIdVal,
    },
    order: [
      ['name', 'ASC']
    ],
  })
    .then(category => {
      var categories = [];
      category.forEach((categoryOne) => {
        categories.push({ id: categoryOne.id, name: categoryOne.name });
      });
      res.status(200).send({
        data: categories,
        message: 'Success',
        status: 200,
        success: true
      });
    }).catch(err => {
      res.status(200).send({ 
        status: 200,
        success: true,
        message: err.message 
      });
    });
};

exports.addCategory = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(201).send({ status: 201, message: "Something went wrong.", success: false, data: errors.array() });
  }
  var parentCatId = 0
  if(req.body.parentId){
    parentCatId = req.body.parentId
  }
  Category.findOne({
    where: {
      name: req.body.name,
      parentId: parentCatId,
    }
  }).then(cat => {
    if (!cat) {
      Category.create({
        name: req.body.name,
        parentId: parentCatId,
      })
        .then(category => {
          res.status(200).send({
            status: 200,
            success: true,
            data: {
              id: category.id,
              name: category.name
            },
            message: 'Success',
          });
        });
    } else {
      res.status(200).send({ 
        status: 200,
        success: false,
        message: 'Category with this name already in record.' 
      })
    }
  })


};

exports.updateCategory = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(201).send({ status: 201, message: "Something went wrong.", success: false, data: errors.array() });
  }
  Category.update({
    name: req.body.name
  },
  {
    where: {id:req.body.id}
  }).then(updatedCategory => {
    if(updatedCategory == 0){
      res.status(200).send({
        status: 201, 
        success: false,
        message: 'Something went wrong',
      });
    }else{
      res.status(200).send({
        status: 200, 
        success: true,
        message: 'Success',
        data: {
          name: req.body.name
        },
      });
    }
    });
};

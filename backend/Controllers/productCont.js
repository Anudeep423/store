const Product = require("../Model/Product")
const formidable = require("formidable");
const _ = require("lodash");
const User = require("../Model/User")
const fs = require("fs");

exports.getProductById = (req, res, next, id) => {
    Product.findById(id)
      .populate("user", "_id email userName role")
      .exec((err, product) => {
        if (err) {
          return res.status(400).json({
            error: "Product not found"
          });
        }
        req.product = product;
        next();
      });
  };

  exports.getUserById = (req, res, next, id) => {
    User.findById(id)
      .exec((err, user) => {
        if (err) {
          return res.status(400).json({
            error: "User not found"
          });
        }
        req.user = user;
        next();
      });
  };

  exports.sendID = (req,res,next,id) => {

    req.id = id
    next();

  }


exports.createProduct = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
  
    form.parse(req, (err, fields, file) => {
      if (err) {
        return res.status(400).json({
          error: "problem with image"
        });
      }
      //destructure the fields
  
      let product = new Product(fields);
  
      //handle file here
      if (file.photo) {
        if (file.photo.size > 3000000) {
          return res.status(400).json({
            error: "File size too big!"
          });
        }
        product.photo.data = fs.readFileSync(file.photo.path);
        product.photo.contentType = file.photo.type;
      }
      // console.log(product);
  
      //save to the DB
      product.save((err, product) => {
        if (err) {
          res.status(400).json({
            error: "Saving product in DB failed"
          });
        }
        res.json(product);
      });
    });
  };

  exports.getAllProducts = (req, res) => {
    console.log(req.id)
    Product.find({ user : req.id  })
    .exec((err, order) => {
        if (err) {
          return res.status(400).json({
            error: "No orders found in DB"
          });
        }
        res.json(order);
      });
  };

  exports.getProduct = (req,res) => {
      res.json(req.product)
  }

  exports.photo = (req, res, next) => {
    if (req.product.photo.data) {
      res.set("Content-Type", req.product.photo.contentType);
      return res.send(req.product.photo.data);
    }
    next();
  };
  

  exports.updateProduct = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
  
    form.parse(req, (err, fields, file) => {
      if (err) {
        return res.status(400).json({
          error: "problem with image"
        });
      }
  
      //updation code
      let product = req.product;
      product = _.extend(product, fields);
  
      //handle file here
      if (file.photo) {
        if (file.photo.size > 3000000) {
          return res.status(400).json({
            error: "File size too big!"
          });
        }
        product.photo.data = fs.readFileSync(file.photo.path);
        product.photo.contentType = file.photo.type;
      }
      // console.log(product);
  
      //save to the DB
      product.save((err, product) => {
        if (err) {
          res.status(400).json({
            error: "Updation of product failed"
          });
        }
        res.json(product);
      });
    });
  };

  exports.deleteProduct = (req, res) => {
    let product = req.product;
    product.remove((err, deletedProduct) => {
      if (err) {
        return res.status(400).json({
          error: "Failed to delete the product"
        });
      }
      res.json({
        message: "Deletion was a success",
        deletedProduct
      });
    });
  };
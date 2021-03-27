var jwt = require("jsonwebtoken");
const User = require("../Model/User")
require("dotenv").config();
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");

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

exports.getAllUsers = (req, res) => {
  User.find({role : 1})
    .exec((err, user) => {
      if (err) {
        return res.status(400).json({
          error: "No users found in DB"
        });
      }
      res.json(user);
    });
};

exports.photo = (req, res) => {
  console.log("userr",req.user)
  if (req.user.photo.data) {
    res.set("Content-Type", req.user.photo.contentType);
    return res.send(req.user.photo.data);
  }
  next();
};

exports.signup = ( req,res) => {
    console.log(req.body)
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields, file) => {

    console.log("Fieldss", fields )
    // if (err) {
    //   return res.status(400).json({
    //     err
    //   });
    // }
    //destructure the fields

    let user = new User(fields);

    //handle file here
    if (file.photo) {
      console.log("Called in photooo ")
      if (file.photo.size > 3000000) {
        return res.status(400).json({
          error: "File size too big!"
        });
      }
      user.photo.data = fs.readFileSync(file.photo.path);
      user.photo.contentType = file.photo.type;
    }
    // console.log(user);

    //save to the DB
    user.save((err, user) => {
      if (err) {
        res.status(400).json({
          error: "Saving user in DB failed"
        });
      }
      res.json( "User succesfully Registered");
    });
  });

}


exports.signin = (req, res) => {
    console.log(req.body);
    const { email , password } = req.body;
  
    User.findOne({ email }, (err, user) => {
        console.log("zzzz",user)
      if (err || !user) {
        return res.status(400).json({
          error: "User does not exists"
        });
      }
      if (!user.autheticate(password)) {
        return res.status(401).json({
          error: "Email and password do not match"
        });
      }
  

  
      //create token
      const token = jwt.sign({ _id: req.body.userName }, process.env.SECRET);
      //put token in cookie
      res.cookie("token", token, { expire: new Date() + 9999 });
  
      //send response to front end
      const { userName,email, encry_password ,role , _id } = user;
      return res.json( { userName , email , role , _id }  );
    });
  };


  exports.updateUser = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
  
    form.parse(req, (err, fields, file) => {
      if (err) {
        return res.status(400).json({
          error: "problem with image"
        });
      }
  
      //updation code
      let user = req.user;
      user = _.extend(user, fields);
  
      //handle file here
      if (file.photo) {
        if (file.photo.size > 3000000) {
          return res.status(400).json({
            error: "File size too big!"
          });
        }
        user.photo.data = fs.readFileSync(file.photo.path);
        user.photo.contentType = file.photo.type;
      }
      // console.log(user);
  
      //save to the DB
      user.save((err, user) => {
        if (err) {
          res.status(400).json({
            error: "Updation of user failed"
          });
        }
        res.json(user);
      });
    });
  };




  // let form = new formidable.IncomingForm();
  // form.keepExtensions = true;

  // form.parse(req, (err, fields, file) => {
  //   if (err) {
  //     return res.status(400).json({
  //       error: "problem with image"
  //     });
  //   }
  //   //destructure the fields

  //   let user = new Product(fields);

  //   //handle file here
  //   if (file.photo) {
  //     if (file.photo.size > 3000000) {
  //       return res.status(400).json({
  //         error: "File size too big!"
  //       });
  //     }
  //     product.photo.data = fs.readFileSync(file.photo.path);
  //     product.photo.contentType = file.photo.type;
  //   }
  //   // console.log(product);

  //   //save to the DB
  //   product.save((err, product) => {
  //     if (err) {
  //       res.status(400).json({
  //         error: "Saving product in DB failed"
  //       });
  //     }
  //     res.json(product);
  //   });
  // });
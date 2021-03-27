const express = require("express");

const Router = express.Router();

const {signup,signin,getUserById,updateUser,getAllUsers,photo} = require("../Controllers/userCont")

Router.param("userId",getUserById)

Router.post("/user/signup",signup);

Router.post("/user/signin",signin);

Router.put("/updateUser/:userId", updateUser );

Router.get("/user/photo/:userId", photo);

Router.get("/getAllUsers" , getAllUsers );

module.exports = Router;
const express = require("express");

const {createProduct,getAllProducts,getProductById,getProduct,updateProduct,deleteProduct,photo,getUserById,sendID} = require("../Controllers/productCont")

// const {} = require("../Controllers/userCont")

const Router = express.Router();

Router.param("userId",sendID)

Router.param("productId", getProductById);

//post route
Router.post( "/create/product", createProduct )

Router.get("/getAllProducts/:userId" , getAllProducts );

Router.get("/getAProduct/:productId" , getProductById , getProduct);


Router.put("/updateProduct/:productId", getProductById , updateProduct);

Router.delete(
    "/deleteProduct/:productId"  , deleteProduct  );
//get all products route
// Router.get("/products", getAllProducts);
// // get single product route
// Router.get("/product/:productId",getProduct)
// // delete a product
// Router.delete(
//     "/deleteProduct/:productId",
//     deleteProduct
//   );
//   // update a product 
//   Router.put(
//     "/updateProduct/:productId",
//     updateProduct
//   );


module.exports = Router;
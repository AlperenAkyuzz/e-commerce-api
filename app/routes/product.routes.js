module.exports = app => {
    const { authJwt } = require("../middleware");
    const products = require("../controllers/product.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", [authJwt.verifyToken, authJwt.isVendor], products.create);
  
    // Retrieve all Tutorials
    router.get("/", products.findAll);
  
    // Retrieve all published Tutorials
    router.get("/published", products.findAllPublished);
  
    // Retrieve a single Tutorial with id
    router.get("/:uuid", products.findOne);
  
    // Update a Tutorial with id
    router.put("/:uuid", [authJwt.verifyToken, authJwt.isVendor], products.update);
  
    // Delete a Tutorial with id
    router.delete("/:uuid", products.delete);
  
    // Delete all Tutorials
    router.delete("/", products.deleteAll);
  
    app.use('/api/products', router);
  };
  
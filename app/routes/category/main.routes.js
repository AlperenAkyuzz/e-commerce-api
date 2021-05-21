module.exports = app => {
    const main_categories = require("../../controllers/category/main.controller.js");
    const { authJwt } = require("../../middleware");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", main_categories.create);
  
    // Retrieve all Tutorials
    router.get("/", [authJwt.verifyToken], main_categories.findAll);

    // Retrieve all Categories with Sub
    router.get("/sub", main_categories.findAllWithSub);

    // Retrieve all Categories with Sub and child
    router.get("/sub/child", main_categories.findAllWithSubChild);
  
    // Retrieve all published Tutorials
    router.get("/published", main_categories.findAllPublished);
  
    // Retrieve a single Tutorial with id
    router.get("/:id", main_categories.findOne);
  
    // Update a Tutorial with id
    router.put("/:id", main_categories.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", main_categories.delete);
  
    // Delete all Tutorials
    router.delete("/", main_categories.deleteAll);
  
    app.use('/api/categories/main', router);
  };
  
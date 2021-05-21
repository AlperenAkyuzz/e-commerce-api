module.exports = app => {
    const sub_categories = require("../../controllers/category/sub.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", sub_categories.create);
  
    // Retrieve all Tutorials
    router.get("/", sub_categories.findAll);
  
    // Retrieve all published Tutorials
    router.get("/published", sub_categories.findAllPublished);
  
    // Retrieve a single Tutorial with id
    router.get("/:id", sub_categories.findOne);
  
    // Update a Tutorial with id
    router.put("/:id", sub_categories.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", sub_categories.delete);
  
    // Delete all Tutorials
    router.delete("/", sub_categories.deleteAll);
  
    app.use('/api/categories/sub', router);
  };
  
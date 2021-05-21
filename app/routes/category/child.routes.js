module.exports = app => {
    const child_categories = require("../../controllers/category/child.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", child_categories.create);
  
    // Retrieve all Tutorials
    router.get("/", child_categories.findAll);
  
    // Retrieve all published Tutorials
    router.get("/published", child_categories.findAllPublished);
  
    // Retrieve a single Tutorial with id
    router.get("/:id", child_categories.findOne);
  
    // Update a Tutorial with id
    router.put("/:id", child_categories.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", child_categories.delete);
  
    // Delete all Tutorials
    router.delete("/", child_categories.deleteAll);
  
    app.use('/api/categories/child', router);
  };
  
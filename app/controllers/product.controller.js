const db = require("../models");
var slugify = require('slugify')
var uuid = require('uuid');
const config = require("../config/auth.config.js");
var jwt = require("jsonwebtoken");
const Product = db.products;;
const Op = db.Sequelize.Op;

// Create and Save a new Tutorial
exports.create = (req, res) => {
  // Validate request
  /*if (!req.body.name) {
    res.status(400).send({
      message: "Name can not be empty!"
    });
    return;
  }*/


  // Find user id by api token
  let token = req.headers["x-access-token"];
  var user;
  try {
    user = jwt.verify(token, config.secret);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while verify user auth"
    });
  }

  let sku = req.body.sku

  // Create a Product
  const product = {
    uuid: uuid.v1(),
    name: req.body.name,
    user_id: user.id,
    product_type: req.body.type,
    category_id: req.body.category_id,
    sku: sku,
    stock: req.body.stock,
    slug: slugify(req.body.name + ' ' + sku),
    price: req.body.price,
    status: req.body.status,
  };

  // Save Product in the database
  Product.create(product)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Product."
      });
    });



};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? {
    title: {
      [Op.like]: `%${title}%`
    }
  } : null;

  Product.findAll({
      where: condition
    })
    .then(data => {
      res.send(data);

    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving products.",
      });
    });
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
  //const id = req.params.id;
  const uuid = req.params.uuid;

  //Product.findByPk(id)
  Product.findOne({
      where: {
        uuid: uuid
      }
    })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Product with id=" + uuid
      });
    });
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
  const uuid = req.params.uuid;

  let token = req.headers["x-access-token"];
  var user;
  try {
    user = jwt.verify(token, config.secret);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while verify user auth"
    });
  }

  Product.update(req.body, {
      where: {
        uuid: uuid,
        user_id: user.id
      }
    })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Product was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Product with id=${uuid}. Maybe Product was not found or you are not authorized to do this operation!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Product with id=" + uuid
      });
    });
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  const uuid = req.params.uuid;

  Product.destroy({
      where: {
        uuid: uuid
      }
    })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Product was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Product with id=${uuid}. Maybe Product was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Product with id=" + uuid
      });
    });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  Product.destroy({
      where: {},
      truncate: false
    })
    .then(nums => {
      res.send({
        message: `${nums} Products were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all products."
      });
    });
};

// find all published Tutorial
exports.findAllPublished = (req, res) => {
  Product.findAll({
      where: {
        status: 1
      }
    })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving products."
      });
    });
};
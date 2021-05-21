var jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const Op = db.Sequelize.Op;
const User = db.users;

exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
    res.status(200).send("User Content.");
};

exports.vendorBoard = (req, res) => {
    res.status(200).send("Vendor Content.");
};

exports.getUser = (req, res) => {
    var token = req.params.token
    if (!token) {
        res.status(400).send({
          message: "Token missing!"
        });
        return;
    }

    var payload;
    try {
        payload = jwt.verify(token, config.secret);
        if(!payload.id) {
            res.status(500).send({
                message: "This token not valid."
            });
        }
    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while verify user auth"
        });
    }

    User.findOne({
        where: {
          id: payload.id
        },
        attributes: {
            exclude: ['id', 'password', 'is_vendor']
        }
      })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving User with id=" + payload.id
        });
      });

    
};
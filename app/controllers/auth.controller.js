const db = require("../models");
const config = require("../config/auth.config");
const User = db.users;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  // Save User to Database
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)
  })
    .then(user => {
        res.send({ message: "User was registered successfully!" }); 
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.signin = (req, res) => {
  User.findOne({
    where: {
      email: req.body.email
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });

      let values = {
        update : {
          api_token : token
        },
        where: {
          id: user.id
        }
      }

      //user.update({ api_token: token });

      saveToken(values);
      
      res.status(200).send({
        id: user.id,
        email: user.email,
        accessToken: token
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

var saveToken = exports.saveToken = function saveToken(values) {
  
    User.update(values.update, { where: values.where }).then((result) => {
      // here result will be [ 1 ], if the id column is unique in your table
      // the problem is that you can't return updated instance, you would have to retrieve it from database once again
      return result;
    }).catch(e => {
        console.log(e);
    });
}
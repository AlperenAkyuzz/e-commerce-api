const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.users;

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!"
      });
    }
    req.userId = decoded.id;
    req.payload = decoded;
    next();
  });
};

isVendor = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
      if (user.is_vendor == 1) {
          next();
          return;
      }
  
      res.status(403).send({
          message: "Require Vendor Role!",
      });
    });
};

isUser = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    if (user.is_vendor === 0) {
        next();
        return;
    }

    res.status(403).send({
        message: "Require User Role!"
    });
  });
};

isPublic = (req, res, next) => {
  //console.log(req.payload)
  if (req.payload.isPublic === true) {
    next();
    return;
  }

  res.status(403).send({
    message: "Require Public Role!"
});
};


const authJwt = {
  verifyToken: verifyToken,
  isVendor: isVendor,
  isPublic: isPublic,
};
module.exports = authJwt;
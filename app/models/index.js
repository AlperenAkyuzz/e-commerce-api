'use strict';
const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  },
  define: {
    timestamps: false
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.tutorials = require("./tutorial.model.js")(sequelize, Sequelize);

// User Model
db.users = require("./user.model.js")(sequelize, Sequelize);

// Product Model
db.products = require("./product.model.js")(sequelize, Sequelize);
// Category Model
db.main_categories = require("./category/main.model.js")(sequelize, Sequelize);
db.sub_categories = require("./category/sub.model.js")(sequelize, Sequelize);
db.child_categories = require("./category/child.model.js")(sequelize, Sequelize);

module.exports = db;

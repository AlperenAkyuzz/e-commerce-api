'use strict';

const ChildCategory = {};

/*
const ChildCategory = db.define("ChildCategory", {
  name: {
    type: Sequelize.STRING
  },
  subcategory_id: {
    type: Sequelize.STRING
  },
  slug: {
    type: Sequelize.STRING
  },
  status: {
    type: Sequelize.INTEGER
  }
});

module.exports = ChildCategory;*/


module.exports = (sequelize, Sequelize) => {
  const ChildCategory = sequelize.define("childcategories", {
    name: {
      type: Sequelize.STRING
    },
    subcategory_id: {
      type: Sequelize.STRING
    },
    slug: {
      type: Sequelize.STRING
    },
    status: {
      type: Sequelize.INTEGER
    }

  
  });

  /*var SubCategory = sequelize.define('subcategory');

  ChildCategory.belongsTo(SubCategory, { 'foreign_key': 'subcategory_id'});*/

  /*ChildCategory.associate = function(models) {
    models.ChildCategory.belongsTo(models.SubCategory, { 'foreign_key': 'subcategory_id'});
  };*/

  return ChildCategory;
  
};

ChildCategory.associate = (models) => {

  ChildCategory.belongsTo(models.SubCategory, {
    as:"childcategories",
    foreignKey: 'id',
  });
};


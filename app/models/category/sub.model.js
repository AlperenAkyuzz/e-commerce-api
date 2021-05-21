'use strict';

const SubCategory = {};

module.exports = (sequelize, Sequelize) => {
  const SubCategory = sequelize.define("subcategories", {
    name: {
      type: Sequelize.STRING
    },
    slug: {
      type: Sequelize.STRING
    },
    status: {
      type: Sequelize.INTEGER
    },
  });

  

  return SubCategory;
};


SubCategory.associate = (models) => {

  SubCategory.belongsTo(models.MainCategory, {
    as:"subcategories",
    foreignKey: 'id',
  });
};

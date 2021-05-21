module.exports = (sequelize, Sequelize) => {
  const MainCategory = sequelize.define("categories", {
    name: {
      type: Sequelize.STRING
    },
    slug: {
      type: Sequelize.STRING
    },
    status: {
      type: Sequelize.INTEGER
    },
    photo: {
      type: Sequelize.STRING
    },
    is_featured: {
      type: Sequelize.STRING
    },
    image: {
      type: Sequelize.STRING
    }
  });

  return MainCategory;
};
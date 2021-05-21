module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      uuid: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      is_vendor: {
          type: Sequelize.INTEGER
      },
      api_token: {
        type: Sequelize.STRING
      }
    });
  
    return User;
  };
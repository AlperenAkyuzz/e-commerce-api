module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define("product", {
    id: {
      type: DataTypes.INTEGER,
      get() {
        return undefined;
      },
      primaryKey: true
    },
    uuid: {
      type: DataTypes.UUID
    },
    user_id: {
      type: DataTypes.INTEGER,
      get() {
        return undefined;
      },
    },
    name: {
      type: DataTypes.STRING
    },
    slug: {
      type: DataTypes.STRING
    },
    sku: {
      type: DataTypes.STRING
    },
    stock: {
      type: DataTypes.INTEGER
    },
    price: {
      type: DataTypes.INTEGER
    },
    category_id: {
      type: DataTypes.INTEGER
    },
    product_type: {
      type: DataTypes.ENUM('normal', 'affiliate')
    },
    status: {
      type: DataTypes.INTEGER
    },
    photo: {
      type: DataTypes.STRING
    }
  }, {
    // relationship
    classMethods: {
        associate: function(models) {
            this.belongsTo(models.User);
        }
    }
  }, {
    defaultScope: {
      attributes: { exclude: ['id'] }
    },
  });

  return Product;
};
'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.post);
    }
  }
  category.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      sequelize,
      createdAt: false,
      updatedAt: false,
      modelName: 'category',
    }
  );
  return category;
};

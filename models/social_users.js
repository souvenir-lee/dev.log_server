'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class social_users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // static associate(models) {
    //   // define association here
    // }
  }
  social_users.init(
    {
      access_token: DataTypes.STRING,
      email: DataTypes.STRING,
      username: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'social_users',
    }
  );
  return social_users;
};

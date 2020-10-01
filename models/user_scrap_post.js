/* eslint-disable no-unused-vars */
'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user_scrap_post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.user);
      this.belongsTo(models.post);
    }
  }
  user_scrap_post.init(
    {},
    {
      sequelize,
      createdAt: false,
      updatedAt: false,
      modelName: 'user_scrap_post',
    }
  );
  return user_scrap_post;
};

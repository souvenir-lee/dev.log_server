/* eslint-disable no-unused-vars */
'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class post_tag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.tag);
      this.belongsTo(models.post);
    }
  }
  post_tag.init(
    {},
    {
      sequelize,
      createdAt: false,
      updatedAt: false,
      modelName: 'post_tag',
    }
  );
  return post_tag;
};

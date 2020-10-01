/* eslint-disable no-unused-vars */
'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class member_post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.post);
      this.belongsTo(models.user, { as: 'member' }); // member_posts 테이블에 memberId 존재
    }
  }
  member_post.init(
    {},
    {
      sequelize,
      createdAt: false,
      updatedAt: false,
      modelName: 'member_post',
    }
  );
  return member_post;
};

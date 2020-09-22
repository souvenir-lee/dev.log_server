'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class posts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // static associate(models) {
    //   // define association here
    // }
  }
  posts.init(
    {
      category_id: DataTypes.INTEGER,
      author_id: DataTypes.INTEGER,
      author_name: DataTypes.STRING,
      title: DataTypes.STRING,
      message: DataTypes.STRING,
      view_count: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'posts',
    }
  );
  return posts;
};

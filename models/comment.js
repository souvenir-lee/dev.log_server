'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.post, { as: 'post', constraints: false, onDelete: 'CASCADE' });
      this.belongsTo(models.user, { as: 'author', constraints: false, onDelete: 'CASCADE' });
    }
  }
  comment.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      message: {
        type: DataTypes.STRING,
        allowNull: false
      },
    },
    {
      sequelize,
      timestamp: true,
      modelName: 'comment',
    }
  );
  return comment;
};

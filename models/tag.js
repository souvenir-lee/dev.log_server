'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class tag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.post, {
        through: models.post_tag,
        constraints: false,
        onDelete: 'CASCADE',
      });
      // this.hasMany(models.post_tag, { as: 'tagToPost' });
    }
  }
  tag.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      createdAt: false,
      updatedAt: false,
      modelName: 'tag',
    }
  );
  return tag;
};

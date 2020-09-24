'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.user, {
        as: 'user',
        constraints: false,
        onDelete: 'CASCADE',
      });
      this.belongsTo(models.category, {
        as: 'category',
        constraints: false,
        onDelete: 'CASCADE',
      });
      this.hasMany(models.comment);
      this.belongsToMany(models.user, { through: models.member_posts });
      this.hasMany(models.member_posts, { as: 'postToMember' });
      this.belongsToMany(models.tag, { through: models.post_tag });
      this.hasMany(models.post_tag, { as: 'postToTag' });
    }
  }
  post.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      message: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      viewCount: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      timestamp: true,
      modelName: 'post',
    }
  );
  return post;
};

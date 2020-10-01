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
        as: 'author',
        constraints: false,
        onDelete: 'CASCADE',
      }); // posts 테이블에 authorId 존재
      this.belongsTo(models.category, {
        constraints: false,
        onDelete: 'CASCADE',
      });
      this.hasMany(models.comment);
      this.hasMany(models.member_post); // N:M
      this.hasMany(models.post_tag); // N:M
      // === super many to many
      // this.belongsToMany(models.user, {
      //   as: 'member',
      //   through: models.member_post,
      // });
      // this.belongsToMany(models.tag, { through: models.post_tag });
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

/* eslint-disable no-unused-vars */
'use strict';
const { Model } = require('sequelize');
const crypto = require('crypto');

module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.post);
      this.hasMany(models.comment);
      this.belongsToMany(models.post, {
        through: models.member_posts,
        constraints: false,
        onDelete: 'CASCADE',
      });
      this.hasMany(models.member_posts, { as: 'memberToPost' });
    }
  }
  user.init(
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      hooks: {
        beforeCreate: (data, options) => {
          let secret = 'dev_log@@';
          let hash = crypto
            .createHmac('sha256', secret)
            .update(String(data.password))
            .digest('hex');
          data.password = hash;
        },
        beforeFind: (data) => {
          if (data.where !== undefined && data.where.password) {
            let secret = 'dev_log@@'; // env로 빼기
            let hash = crypto
              .createHmac('sha256', secret)
              .update(String(data.where.password))
              .digest('hex');
            data.where.password = hash;
          }
        },
      },
      sequelize,
      timestamps: true,
      modelName: 'user',
    }
  );
  return user;
};

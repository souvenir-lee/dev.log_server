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
      this.hasMany(models.post, { foreignKey: 'authorId' }); // 'author'로 post 테이블에 id 등록됨, foreignKey 안 해두면 오류 생김!(authorId, userId 둘 다 검색함)
      this.hasMany(models.comment);

      this.hasMany(models.member_post, { foreignKey: 'memberId' }); // N:M, foreignKey 안 해두면 오류 생김!(memberId, userId 둘 다 검색함)
      // === super many to many
      // this.belongsToMany(models.post, {
      //   through: models.member_post,
      // });
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
      token: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      hooks: {
        beforeCreate: (data, options) => {
          let secret = process.env.USER_HOOK_SECRET;
          let hash = crypto
            .createHmac('sha256', secret)
            .update(String(data.password))
            .digest('hex');
          data.password = hash;
        },
        beforeFind: (data) => {
          if (data.where !== undefined && data.where.password) {
            let secret = process.env.USER_HOOK_SECRET;
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

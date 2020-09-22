// 'use strict';
// const { Model } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class social_user extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   }
//   social_user.init(
//     {
//       access_token: {
//         type: DataTypes.STRING,
//         allowNull: false
//       },
//       email: {
//         type: DataTypes.STRING,
//         allowNull: false
//       },
//       username: {
//         type: DataTypes.STRING,
//         allowNull: false
//       },
//     },
//     {
//       sequelize,
//       timestamps: true,
//       modelName: 'social_user',
//     }
//   );
//   return social_user;
// };

/* eslint-disable no-unused-vars */
'use strict';
const { sequelize } = require('../models');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('user_scrap_posts', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: {
        type: Sequelize.INTEGER,
        constraints: false,
        onDelete: 'cascade',
        references: {
          model: {
            tableName: 'users',
          },
          key: 'id',
        },
      },
      postId: {
        type: Sequelize.INTEGER,
        constraints: false,
        onDelete: 'cascade',
        references: {
          model: {
            tableName: 'posts',
          },
          key: 'id',
        },
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('user_scrap_posts');
  },
};

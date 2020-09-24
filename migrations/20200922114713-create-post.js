/* eslint-disable no-unused-vars */
'use strict';
const { sequelize } = require('../models');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('posts', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      categoryId: {
        type: Sequelize.INTEGER,
        constraints: false,
        onDelete: 'cascade',
        references: {
          model: {
            tableName: 'categories',
          },
          key: 'id',
        },
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
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      message: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      viewCount: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('posts');
  },
};

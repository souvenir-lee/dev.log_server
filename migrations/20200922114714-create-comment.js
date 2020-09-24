/* eslint-disable no-unused-vars */
'use strict';
const { sequelize } = require('../models');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('comments', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
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
    await queryInterface.dropTable('comments');
  },
};

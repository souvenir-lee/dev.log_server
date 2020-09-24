/* eslint-disable no-unused-vars */
'use strict';
const { sequelize } = require('../models');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('post_tag', {
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
      tagId: {
        type: Sequelize.INTEGER,
        constraints: false,
        onDelete: 'cascade',
        references: {
          model: {
            tableName: 'tags',
          },
          key: 'id',
        },
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('post_tag');
  },
};

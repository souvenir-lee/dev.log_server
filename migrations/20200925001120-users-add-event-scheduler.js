/* eslint-disable no-unused-vars */
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return queryInterface.sequelize.query(
      'CREATE EVENT deleteExpiredToken ON SCHEDULE EVERY 1 HOUR DO UPDATE users SET token = NULL WHERE TIMESTAMPDIFF(DAY, createdAt, NOW()) > 14'
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    return queryInterface.sequelize.query('DROP EVENT deleteExpiredToken');
  },
};

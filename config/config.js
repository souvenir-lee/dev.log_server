const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  development: {
    username: 'root',
    password: process.env.DATABASE_PASSWORD,
    database: 'dev_log_development',
    host: '127.0.0.1',
    dialect: 'mysql',
    dialectOptions: {
      dateStrings: true,
      typeCast: true,
    },
    timezone: '+09:00',
  },
  test: {
    username: 'root',
    password: process.env.DATABASE_PASSWORD,
    database: 'dev_log_test',
    host: '127.0.0.1',
    dialect: 'mysql',
    dialectOptions: {
      dateStrings: true,
      typeCast: true,
    },
    timezone: '+09:00',
  },
  production: {
    username: 'root',
    password: process.env.DATABASE_PASSWORD,
    database: 'dev_log_production',
    host: '127.0.0.1',
    dialect: 'mysql',
    dialectOptions: {
      dateStrings: true,
      typeCast: true,
    },
    timezone: '+09:00',
  },
};

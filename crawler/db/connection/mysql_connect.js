const Sequelize = require('sequelize'),
  { mysql } = require('../../config/db_config.js');

const seq = new Sequelize(...mysql.conf, mysql.base);

module.exports = seq;
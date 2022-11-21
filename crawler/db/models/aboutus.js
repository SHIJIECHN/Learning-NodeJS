const seq = require('../connection/mysql_connect.js');
const { STRING, TEXT, INT } = require('../../config/db_type_config.js');

const Aboutus = seq.define('aboutus', {
  aid: {
    comment: 'aboutus ID',
    type: STRING,
    allowNull: false
    // unique: true
  },
  posterUrl: {
    comment: 'poster',
    type: STRING,
    allowNull: false
  },
  title: {
    comment: 'title',
    type: STRING,
    allowNull: false
  },
  name: {
    comment: 'name',
    type: STRING,
    allowNull: false
  },
  intro: {
    comment: 'intro',
    type: TEXT,
    allowNull: false
  },
  posterKey: {
    comment: 'qiniu poster image name',
    type: STRING,
    allowNull: false
  }
})

module.exports = Aboutus;
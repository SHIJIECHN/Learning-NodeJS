const seq = require('../connection/mysql_connect.js');
const { STRING, INT } = require('../../config/db_type_config.js');

const Slider = seq.define('slider', {
  cid: {
    comment: 'course ID',
    type: INT,
    allowNull: false,
    unique: true
  },
  href: {
    comment: 'course detail page link',
    type: STRING,
    allowNull: false
  },
  imgUrl: {
    comment: 'course image url',
    type: STRING,
    allowNull: false
  },
  title: {
    comment: 'course name',
    type: STRING,
    allowNull: false
  },
  imgKey: {
    comment: 'qiniu image name',
    type: STRING,
    allowNull: false
  },
  status: {
    comment: 'course status',
    type: INT,
    defaultValue: 1,
    allowNull: false
  }
})

module.exports = Slider;
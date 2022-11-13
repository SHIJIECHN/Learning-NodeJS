const seq = require('../connection/mysql_connect.js');
const { STRING, INT } = require('../../config/db_type_config.js');

// 数据库建表
const AgencyInfo = seq.define('agency_info', {
  logoUrl: {
    comment: 'Logo image url',
    type: STRING,
    allowNull: false
  },
  name: {
    comment: 'Agency name',
    type: STRING,
    allowNull: false
  },
  feedbackRate: {
    comment: 'FeedbackRate',
    type: INT,
    allowNull: false
  },
  studentCount: {
    comment: 'Student total count',
    type: INT,
    allowNull: false
  },
  description: {
    comment: 'Agency slogan',
    type: STRING,
    allowNull: false
  },
  qqLink: {
    comment: 'QQ infomation link',
    type: STRING,
    allowNull: false
  }
})

module.exports = AgencyInfo;
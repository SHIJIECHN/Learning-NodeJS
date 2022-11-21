const seq = require('../connection/mysql_connect.js');
const { STRING, INT } = require('../../config/db_type_config.js');

const Course = seq.define('course', {
  cid: {
    comment: 'course id',
    type: INT,
    allowNull: false,
    unique: true
  },
  href: {
    comment: 'course detail page link',
    type: STRING,
    allowNull: false
  },
  posterUrl: {
    comment: 'course image url',
    type: STRING,
    allowNull: false
  },
  courseName: {
    comment: 'course name',
    type: STRING,
    allowNull: false
  },
  price: {
    comment: 'course price',
    type: STRING,
    allowNull: false
  },
  description: {
    comment: 'course description',
    type: STRING,
    allowNull: false
  },
  studentCount: {
    comment: 'the count of students who joined the course',
    type: INT,
    allowNull: false
  },
  field: {
    comment: 'the course concerned the tab',
    type: INT,
    allowNull: false
  },
  posterKey: {
    comment: 'qiniu course image name',
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

module.exports = Course;
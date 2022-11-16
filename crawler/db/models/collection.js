const seq = require('../connection/mysql_connect.js');
const { STRING, INT } = require('../../config/db_type_config.js');

const Collection = seq.define('collection', {
  cid: {
    comment: 'coolection id',
    type: INT,
    allowNull: false,
    unique: true
  },
  title: {
    comment: 'collection title',
    type: STRING,
    allowNull: false
  },
  info: {
    comment: 'collection infomation',
    type: STRING,
    allowNull: false
  },
  qqQunLink: {
    comment: 'the link to open QQ communication',
    type: STRING,
    allowNull: false
  },
  posterUrl: {
    coment: 'poster image url',
    type: STRING,
    allowNull: false
  },
  courseIdList: {
    comment: 'the collection for containing course IDs',
    type: STRING,
    allowNull: false
  },
  posterKey: {
    comment: 'qiniu poster image name',
    type: STRING,
    allowNull: false
  }
})

module.exports = Collection;
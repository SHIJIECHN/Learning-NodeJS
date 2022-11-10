const seq = require('./connection/mysql_connect.js');
require('./models');

seq.authenticate().then(() => {
  console.log('MySQL server is connected completely.')
}).catch(err => {
  console.log('MySQL server is failed to be connected. Error infomation is below. ' + err)
})

seq.sync({
  force: true
}).then(() => {
  console.log('Table has been synchronised into database successfully.')
  process.exit();
})
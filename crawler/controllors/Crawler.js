const { statProcess, startProcess } = require('../libs/utils.js')

class Crawler {
  crawlSiderData() {
    startProcess({
      path: '../crawlers/slider',
      async message(data) {
        console.log(data);
      },
      async exit(code) {
        console.log(code);
      },
      async error(error) {
        console.log(error)
      }
    })
  }
}

module.exports = new Crawler();
const { statProcess, startProcess } = require('../libs/utils.js'),
  { addSliderData } = require('../services/Slider.js')

class Crawler {
  crawlSiderData() {
    startProcess({
      path: '../crawlers/slider',
      async message(data) {
        data.map(async item => {
          const result = await addSliderData(item);
          if (result) {
            console.log('Data crate OK');
          } else {
            console.log('Data create failed.')
          }
        })
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
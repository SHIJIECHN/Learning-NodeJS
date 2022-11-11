const { statProcess, startProcess, qiniuUpload } = require('../libs/utils.js'),
  { addSliderData } = require('../services/Slider.js'),
  config = require('../config/config.js')

class Crawler {
  crawlSiderData() {
    startProcess({
      path: '../crawlers/slider',
      async message(data) {
        data.map(async item => {
          if (item.imgUrl && !item.img_key) {
            const qiniu = config.qiniu;
            try {
              const imgData = await qiniuUpload({
                url: item.imgUrl,
                bucket: qiniu.bucket.tximg.bucket_name,
                ak: qiniu.keys.ak,
                sk: qiniu.keys.sk,
                ext: '.jpg'
              });

              if (imgData.key) {
                item.imgKey = imgData.key;
              }
            } catch (e) {
              console.log(e)
            }
          }

          // const result = await addSliderData(item);
          // if (result) {
          //   console.log('Data crate OK');
          // } else {
          //   console.log('Data create failed.')
          // }
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
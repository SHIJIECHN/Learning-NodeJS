const { statProcess, startProcess, qiniuUpload } = require('../libs/utils.js'),
  { addSliderData } = require('../services/Slider.js'),
  config = require('../config/config.js')

class Crawler {
  crawlSiderData() {
    startProcess({
      path: '../crawlers/slider',
      async message(data) {
        data.map(async item => {
          // 由于其中一条数据cid大于int类型的最大值，判断出错，所以截断cid
          item.cid = parseInt(item.cid.toString().slice(0, 6));

          if (item.imgUrl && !item.imgKey) {
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

  // 开启子进程执行“获取机构信息”脚本
  crawlAgencyInfo() {
    startProcess({
      path: '../crawlers/agencyInfo', // 需要执行的脚本路径
      async message(data) {
        // data.logonUrl存在并且data.logoKey不存在，在进行七牛上传
        if (data.logoUrl && !data.logoKey) {
          const qiniu = config.qiniu;
          try {
            // 图片上传七牛
            const logoData = await qiniuUpload({
              url: data.logoUrl,
              bucket: qiniu.bucket.tximg.bucket_name,
              ext: '.jpg'
            })

            if (logoData.key) {
              data.logoKey = logoData.key;
            }

          } catch (e) {
            console.log(e);
          }
        }
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
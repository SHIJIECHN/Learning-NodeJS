const cp = require('child_process'),
  { resolve } = require('path'),
  nanoId = require('nanoid'),
  Qiniu = require('qiniu'),
  { qiniu } = require('../config/config.js')

module.exports = {
  // 启动进程
  startProcess(options) {
    // 拼接路径，导入爬虫脚本：crawlers/silder.js
    const script = resolve(__dirname, options.path),
      // 开启子进程执行script
      child = cp.fork(script, []);

    let invoked = false;

    child.on('message', (data) => {
      options.message(data);
    })

    child.on('exit', (code) => {
      if (invoked) return;

      invoked = true;
      options.exit(code);
    })

    child.on('error', (err) => {
      if (invoked) return;

      invoked = true;
      options.error(err);
    })
  },

  // 上传图片到七牛云图床
  qiniuUpload(options) {
    // 七牛上传配置
    const mac = new Qiniu.auth.digest.Mac(qiniu.keys.ak, qiniu.keys.sk),
      conf = new Qiniu.conf.Config(),
      client = new Qiniu.rs.BucketManager(mac, conf),
      key = nanoId() + options.ext;

    return new Promise((resolve, reject) => {
      client.fetch(options.url, options.bucket, key, (error, res, info) => {
        if (error) {
          reject(error)
        } else {
          if (info.statusCode === 200) {
            resolve({ key })
          } else {
            reject(info)
          }
        }
      })
    })
  }
}



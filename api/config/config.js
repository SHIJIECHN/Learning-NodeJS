module.exports = {
  qiniu: {
    keys: {
      ak: 'INZdqGOz-wkhCkyCYT4ItH3hodUg2_IVVtQxOWud',
      sk: '54fjgxSI3-4OiKquJbrsmGe81aXcvApMGt1LYgph',
    },
    bucket: {
      tximg: {
        bucket_name: 'source-image',
        domain: 'http://rl63od9kl.hd-bkt.clouddn.com/'
      }
    }
  },
  crawler: {
    url: {
      main: 'https://ke.qq.com/cgi-bin/agency?aid=64228#category=-1&tab=0',
      course: 'https://ke.qq.com/cgi-bin/agency?aid=64228#tab=1&category=-1',
      teacher: 'https://ke.qq.com/cgi-bin/agency?aid=64228#tab=2&category=-1',
      aboutus: 'https://ke.qq.com/cgi-bin/agency?aid=64228#category=14687&tab=3'
    }
  }
}
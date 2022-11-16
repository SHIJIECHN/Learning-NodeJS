const router = require('koa-router')(),
  crawlerController = require('../controllors/Crawler.js')
// child_process 启动一个子进程
cp = require('child_process'),
  { resolve } = require('path');

// 前缀
router.prefix('/crawler');

router.get('/crawl_slider_data', crawlerController.crawlSiderData);
router.get('/crawl_agency_info', crawlerController.crawlAgencyInfo);
router.get('/crawl_recom_course', crawlerController.crawlRecomCourse);
router.get('/crawl_collection', crawlerController.crawlCollection);
router.get('/crawl_teacher', crawlerController.crawlTeacher);



module.exports = router;

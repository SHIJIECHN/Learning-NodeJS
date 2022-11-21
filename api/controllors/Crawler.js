const { statProcess, startProcess, qiniuUpload } = require('../libs/utils.js'),
  { addSliderData } = require('../services/Slider.js'),
  { addAgencyInfo } = require('../services/AgencyInfo.js'),
  { addRecomCourse } = require('../services/RecomCourse.js'),
  { addCollection } = require('../services/Collection.js'),
  { addTeacherData } = require('../services/Teacher.js'),
  { addStudentData } = require('../services/Student.js'),
  { addCourseTab } = require('../services/CourseTab.js'),
  { addCourseData } = require('../services/Course.js'),
  { addAboutus } = require('../services/Aboutus.js'),
  { qiniu } = require('../config/config.js')

class Crawler {
  // 轮播图
  crawlSiderData() {
    startProcess({
      file: 'slider',
      async message(data) {
        data.map(async item => {
          // 由于其中一条数据cid大于int类型的最大值，判断出错，所以截断cid
          item.cid = parseInt(item.cid.toString().slice(0, 6));

          if (item.imgUrl && !item.imgKey) {
            try {
              const imgData = await qiniuUpload({
                url: item.imgUrl,
                bucket: qiniu.bucket.tximg.bucket_name,
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

  // 机构信息
  // 开启子进程执行“获取机构信息”脚本
  crawlAgencyInfo() {
    startProcess({
      file: 'agencyInfo', // 需要执行的脚本路径
      async message(data) {
        // data.logonUrl存在并且data.logoKey不存在，在进行七牛上传
        if (data.logoUrl && !data.logoKey) {
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

            const result = await addAgencyInfo(data);
            if (result) {
              console.log('Data crate OK');
            } else {
              console.log('Data create failed.')
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

  // 关于我们
  async crawlAboutus() {
    startProcess({
      file: 'aboutus', // 需要执行的脚本路径
      async message(data) {
        if (data.posterUrl && !data.posterKey) {
          try {
            // 图片上传七牛
            const posterData = await qiniuUpload({
              url: data.posterUrl,
              bucket: qiniu.bucket.tximg.bucket_name,
              ext: '.jpg'
            })

            if (posterData.key) {
              data.posterKey = posterData.key;
            }

            const result = await addAboutus(data);
            if (result) {
              console.log('Data crate OK');
            } else {
              console.log('Data create failed.')
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
  // 推荐课程
  async crawlRecomCourse() {
    startProcess({
      file: 'recomCourse',
      async message(data) {
        data.map(async item => {
          try {
            if (item.posterUrl && !item.posterKey) {
              const posterData = await qiniuUpload({
                url: item.posterUrl,
                bucket: qiniu.bucket.tximg.bucket_name,
                ext: '.jpg'
              });

              if (posterData.key) {
                item.posterKey = posterData.key;
              }
            }
            if (item.teacherImg && !item.teacherImgKey) {
              const teacherImgData = await qiniuUpload({
                url: item.teacherImg,
                bucket: qiniu.bucket.tximg.bucket_name,
                ext: '.jpg'
              })

              if (teacherImgData.key) {
                item.teacherImgKey = teacherImgData.key;
              }
            }
            const result = await addRecomCourse(item);
            if (result) {
              console.log('Data crate OK');
            } else {
              console.log('Data create failed.')
            }
          } catch (e) {
            console.log(e)
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
  // 精品课程
  async crawlCollection() {
    startProcess({
      file: 'collection',
      async message(data) {
        data.map(async item => {
          if (item.posterUrl && !item.posterKey) {
            try {
              const posterData = await qiniuUpload({
                url: item.posterUrl,
                bucket: qiniu.bucket.tximg.bucket_name,
                ext: '.jpg'
              });

              if (posterData.key) {
                item.posterKey = posterData.key;
              }
            } catch (e) {
              console.log(e)
            }
          }
          const result = await addCollection(item);
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
  // 老师列表
  async crawlTeacher() {
    startProcess({
      file: 'teacher',
      async message(data) {
        data.map(async item => {
          if (item.teacherImg && !item.teacherImgKey) {
            try {
              const imgData = await qiniuUpload({
                url: item.teacherImg,
                bucket: qiniu.bucket.tximg.bucket_name,
                ext: '.jpg'
              });

              if (imgData.key) {
                item.teacherImgKey = imgData.key;
              }
            } catch (e) {
              console.log(e)
            }
          }
          const result = await addTeacherData(item);
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
  // 优秀学员
  async crawlStudent() {
    startProcess({
      file: 'student',
      async message(data) {
        data.map(async item => {
          if (item.studentImg && !item.studentImgKey) {
            try {
              const imgData = await qiniuUpload({
                url: item.studentImg,
                bucket: qiniu.bucket.tximg.bucket_name,
                ext: '.jpg'
              });

              if (imgData.key) {
                item.studentImgKey = imgData.key;
              }

            } catch (e) {
              console.log(e)
            }
          }
          const result = await addStudentData(item);
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
  // Tab
  async crawlCourseTab() {
    startProcess({
      file: 'courseTab',
      async message(data) {
        data.map(async item => {
          const result = await addCourseTab(item);
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

  async crawlCourseData() {
    startProcess({
      file: 'course',
      async message(data) {
        data.map(async item => {
          console.log(item)
          if (item.posterUrl && !item.posterKey) {
            try {
              const posterData = await qiniuUpload({
                url: item.posterUrl,
                bucket: qiniu.bucket.tximg.bucket_name,
                ext: '.jpg'
              });

              if (posterData.key) {
                item.posterKey = posterData.key;
              }
              console.log(item)

            } catch (e) {
              console.log(e)
            }
          }
          const result = await addCourseData(item);
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
const CourseTabModel = require('../db/models/courseTab.js');

class CourseTabService {
  async addCourseTab(data) {
    const cid = data.cid;

    const result = await CourseTabModel.findOne({
      where: { cid }
    })

    if (result) {
      return await CourseTabModel.update(data, {
        where: { cid }
      })
    } else {
      return await CourseTabModel.create(data);
    }
  }
}

module.exports = new CourseTabService();
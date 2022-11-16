const RecomCourseModel = require('../db/models/recomCourse.js');

class RecomCourseService {
  async addRecomCourse(data) {
    const cid = data.cid;

    const result = await RecomCourseModel.findOne({
      where: { cid }
    })

    if (result) {
      return await RecomCourseModel.update(data, {
        where: { cid }
      })
    } else {
      return await RecomCourseModel.create(data);
    }
  }
}

module.exports = new RecomCourseService();
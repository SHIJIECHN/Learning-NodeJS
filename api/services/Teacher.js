const TeacherModel = require('../db/models/teacher.js');

class TeacherService {
  async addTeacherData(data) {
    const tid = data.tid;

    const result = await TeacherModel.findOne({
      where: { tid }
    })

    if (result) {
      return await TeacherModel.update(data, {
        where: { tid }
      })
    } else {
      return await TeacherModel.create(data);
    }
  }
}

module.exports = new TeacherService();
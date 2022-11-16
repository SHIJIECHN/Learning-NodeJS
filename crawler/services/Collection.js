const CollectionModel = require('../db/models/collection.js');

class CollectionService {
  async addCollection(data) {
    const cid = data.cid;

    const result = await CollectionModel.findOne({
      where: { cid }
    })

    if (result) {
      return await CollectionModel.update(data, {
        where: { cid }
      })
    } else {
      return await CollectionModel.create(data);
    }
  }

}

module.exports = new CollectionService();
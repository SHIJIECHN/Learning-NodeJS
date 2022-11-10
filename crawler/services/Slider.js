const SliderModel = require('../db/models/slider.js')

class SliderService {
  async addSliderData(data) {
    return await SliderModel.create(data);
  }
}

module.exports = new SliderService();
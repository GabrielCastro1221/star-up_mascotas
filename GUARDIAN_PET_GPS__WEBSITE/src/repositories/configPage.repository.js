const ConfigPage = require('../models/configPage.model');

class ConfigPageRepository {
    async create(data) {
        const configPage = new ConfigPage(data);
        return await configPage.save();
    }

    async findAll() {
        return await ConfigPage.find();
    }

    async findById(id) {
        return await ConfigPage.findById(id);
    }

    async update(id, data) {
        return await ConfigPage.findByIdAndUpdate(id, data, { new: true });
    }

    async delete(id) {
        return await ConfigPage.findByIdAndDelete(id);
    }
}

module.exports = new ConfigPageRepository();

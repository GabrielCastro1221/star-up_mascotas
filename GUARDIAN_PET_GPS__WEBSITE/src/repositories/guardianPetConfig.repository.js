const GuardianPetConfig = require('../models/guardianPetConfig.model');

class GuardianPetConfigRepository {
    async create(data) {
        const config = new GuardianPetConfig(data);
        return await config.save();
    }

    async findAll() {
        return await GuardianPetConfig.find();
    }

    async findById(id) {
        return await GuardianPetConfig.findById(id);
    }

    async update(id, data) {
        return await GuardianPetConfig.findByIdAndUpdate(id, data, { new: true });
    }

    async delete(id) {
        return await GuardianPetConfig.findByIdAndDelete(id);
    }
}

module.exports = new GuardianPetConfigRepository();

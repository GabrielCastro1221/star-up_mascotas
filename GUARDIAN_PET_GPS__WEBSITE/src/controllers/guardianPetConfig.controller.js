const guardianPetConfigRepository = require('../repositories/guardianPetConfig.repository');

class GuardianPetConfigController {
    async create(req, res) {
        try {
            const config = await guardianPetConfigRepository.create(req.body);
            res.status(201).json(config);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async getAll(req, res) {
        try {
            const configs = await guardianPetConfigRepository.findAll();
            res.status(200).json(configs);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getById(req, res) {
        try {
            const config = await guardianPetConfigRepository.findById(req.params.id);
            if (!config) return res.status(404).json({ message: 'Config not found' });
            res.status(200).json(config);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async update(req, res) {
        try {
            const config = await guardianPetConfigRepository.update(req.params.id, req.body);
            if (!config) return res.status(404).json({ message: 'Config not found' });
            res.status(200).json(config);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async delete(req, res) {
        try {
            const config = await guardianPetConfigRepository.delete(req.params.id);
            if (!config) return res.status(404).json({ message: 'Config not found' });
            res.status(200).json({ message: 'Config deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new GuardianPetConfigController();

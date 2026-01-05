const configPageRepository = require('../repositories/configPage.repository');

class ConfigPageController {
    async create(req, res) {
        try {
            const configPage = await configPageRepository.create(req.body);
            res.status(201).json(configPage);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async getAll(req, res) {
        try {
            const configPages = await configPageRepository.findAll();
            res.status(200).json(configPages);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getById(req, res) {
        try {
            const configPage = await configPageRepository.findById(req.params.id);
            if (!configPage) return res.status(404).json({ message: 'ConfigPage not found' });
            res.status(200).json(configPage);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async update(req, res) {
        try {
            const configPage = await configPageRepository.update(req.params.id, req.body);
            if (!configPage) return res.status(404).json({ message: 'ConfigPage not found' });
            res.status(200).json(configPage);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async delete(req, res) {
        try {
            const configPage = await configPageRepository.delete(req.params.id);
            if (!configPage) return res.status(404).json({ message: 'ConfigPage not found' });
            res.status(200).json({ message: 'ConfigPage deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new ConfigPageController();

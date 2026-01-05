const LocationRepository = require("../repositories/location.repository");

class LocationController {
    async createLocation(req, res) {
        try {
            const locationData = req.body;
            const location = await LocationRepository.createLocation(locationData);
            res.status(201).json({
                message: "Ubicación registrada con éxito",
                Location: location
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getLocations(req, res) {
        try {
            const { gpsDevice, startDate, endDate } = req.query;
            const locations = await LocationRepository.getLocations({ gpsDevice, startDate, endDate });
            res.status(200).json(locations);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getLocation(req, res) {
        const { id } = req.params;
        try {
            const location = await LocationRepository.getLocationById(id);
            res.status(200).json(location);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async updateLocation(req, res) {
        const { id } = req.params;
        try {
            const updated = await LocationRepository.updateLocation(id, req.body);
            res.status(200).json({
                message: "Ubicación actualizada correctamente",
                Location: updated
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async deleteLocation(req, res) {
        const { id } = req.params;
        try {
            const deleted = await LocationRepository.deleteLocation(id);
            res.status(200).json({
                message: "Ubicación eliminada",
                Location: deleted
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new LocationController();

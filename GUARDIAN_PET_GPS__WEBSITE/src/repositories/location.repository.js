const LocationModel = require("../models/location.model");

class LocationRepository {
    async createLocation(data) {
        try {
            const location = await LocationModel.create(data);
            return location;
        } catch (error) {
            throw new Error(`Error al crear la ubicación: ${error.message}`);
        }
    }

    async getLocations({ gpsDevice, startDate, endDate }) {
        try {
            const query = {};
            if (gpsDevice) query.gpsDevice = gpsDevice;
            if (startDate && endDate) {
                query.fecha = { $gte: new Date(startDate), $lte: new Date(endDate) };
            }

            return await LocationModel.find(query).sort({ fecha: -1 }).lean();
        } catch (error) {
            throw new Error(`Error al obtener ubicaciones: ${error.message}`);
        }
    }

    async getLocationById(id) {
        try {
            const location = await LocationModel.findById(id).lean();
            if (!location) throw new Error("Ubicación no encontrada");
            return location;
        } catch (error) {
            throw new Error(`Error al obtener ubicación: ${error.message}`);
        }
    }

    async updateLocation(id, data) {
        try {
            const updated = await LocationModel.findByIdAndUpdate(id, data, { new: true });
            if (!updated) throw new Error("Ubicación no encontrada");
            return updated;
        } catch (error) {
            throw new Error(`Error al actualizar ubicación: ${error.message}`);
        }
    }

    async deleteLocation(id) {
        try {
            const deleted = await LocationModel.findByIdAndDelete(id);
            if (!deleted) throw new Error("Ubicación no encontrada");
            return deleted;
        } catch (error) {
            throw new Error(`Error al eliminar ubicación: ${error.message}`);
        }
    }
}

module.exports = new LocationRepository();

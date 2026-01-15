const gpsDeviceModel = require("../models/gps_devise.model");

class GPSDeviceRepository {
    async createGPSDevice(gpsData) {
        try {
            const newGPSDevice = new gpsDeviceModel({
                ...gpsData,
            });
            await newGPSDevice.save();
            return newGPSDevice;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async getGPSDevices({ page = 1, deviceId, nombre, activo, mascota, estadoConexion, asignadoAUsuario }) {
        try {
            const query = {};
            if (deviceId) query.deviceId = deviceId;
            if (nombre) { query.nombre = { $regex: nombre, $options: "i" }; }
            if (activo !== undefined) query.activo = activo;
            if (mascota) query.mascota = mascota;
            if (estadoConexion) query.estadoConexion = estadoConexion;
            if (asignadoAUsuario) query.asignadoAUsuario = asignadoAUsuario;
            const options = {
                page: parseInt(page),
                limit: 10,
                sort: { createdAt: -1 },
                lean: true,
            };
            const result = await gpsDeviceModel.paginate(query, options);
            return result;
        } catch (error) {
            throw new Error(`Error al obtener los dispositivos GPS: ${error.message}`);
        }
    }

    async getGPSDeviceById(id) {
        try {
            const gps = await gpsDeviceModel.findById(id);
            if (!gps) {
                throw new Error("Dispositivo GPS no encontrado");
            }
            return gps;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async getLastLocation(id) {
        try {
            const gps = await gpsDeviceModel.findById(id);
            if (!gps) {
                throw new Error("Dispositivo GPS no encontrado");
            }
            return gps.ultimaUbicacion;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async getHistoricalLocations(id) {
        try {
            const gps = await gpsDeviceModel.findById(id);
            if (!gps) {
                throw new Error("Dispositivo GPS no encontrado");
            }
            return gps.historialUbicaciones;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async updateGPSDevice(id, updateData) {
        try {
            const gps = await gpsDeviceModel.findById(id);
            if (!gps) {
                throw new Error("Dispositivo GPS no encontrado");
            }
            Object.assign(gps, updateData);
            await gps.save();
            return gps;
        } catch (error) {
            throw new Error(`Error al actualizar el dispositivo GPS: ${error.message}`);
        }
    }

    async changeConnectionStatus(id, newStatus) {
        try {
            const conn = await gpsDeviceModel.findById(id);
            if (!conn) {
                throw new Error("Dispositivo GPS no encontrado");
            }
            const updated = await gpsDeviceModel.findByIdAndUpdate(
                id,
                { estadoConexion: newStatus },
                { new: true }
            );
            return updated;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async deleteGPSDevice(id) {
        try {
            const gps = await gpsDeviceModel.findByIdAndDelete(id);
            if (!gps) {
                throw new Error("Dispositivo GPS no encontrado");
            }
            return gps;
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

module.exports = new GPSDeviceRepository();
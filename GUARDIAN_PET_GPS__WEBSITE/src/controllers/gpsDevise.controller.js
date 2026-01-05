const GPSDeviceRepository = require("../repositories/gpsDevice.repository");

class GPSDeviceController {
    async createGPSDevice(req, res) {
        try {
            const gpsData = req.body;
            await GPSDeviceRepository.createGPSDevice(gpsData);
            res.status(201).json({
                message: "Dispositivo GPS registrado con exito",
                GPSDevice: gpsData
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getGPSDevices(req, res) {
        try {
            const { page, deviceId, nombre, activo, mascota, estadoConexion, asignadoAUsuario } = req.query;
            const gps = await GPSDeviceRepository.getGPSDevices({ page, deviceId, nombre, activo, mascota, estadoConexion, asignadoAUsuario });
            res.status(200).json(gps);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getGPSDevice(req, res) {
        const { id } = req.params;
        try {
            const gps = await GPSDeviceRepository.getGPSDeviceById(id);
            res.status(200).json({
                message: "Dispositivo GPS: ",
                GPSDevice: gps
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async updateGPSDevice(req, res) {
        const { id } = req.params;
        try {
            const updatedGPS = await GPSDeviceRepository.updateGPSDevice(id, req.body);
            res.status(200).json({
                message: "Dispositivo GPS actualizado correctamente",
                GPSDevice: updatedGPS
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async deleteGPSDevice(req, res) {
        const { id } = req.params;
        try {
            const deletedGPS = await GPSDeviceRepository.deleteGPSDevice(id);
            res.status(200).json({
                message: "Dispositivo GPS eliminado",
                GPSDevice: deletedGPS
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async changeStatusOffline(req, res) {
        const { id } = req.params;
        try {
            const updated = await GPSDeviceRepository.changeConnectionStatus(id, "offline");
            res.status(200).json(updated);
        } catch (error) {
            res.status(500).send(error.message);
        }
    }

    async changeStatusOnline(req, res) {
        const { id } = req.params;
        try {
            const updated = await GPSDeviceRepository.changeConnectionStatus(id, "online");
            res.status(200).json(updated);
        } catch (error) {
            res.status(500).send(error.message);
        }
    }

    async getLastLocation(req, res) {
        const { id } = req.params;
        try {
            const location = await GPSDeviceRepository.getLastLocation(id);
            res.status(200).json(location);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getHistoricalLocations(req, res) {
        const { id } = req.params;
        try {
            const locations = await GPSDeviceRepository.getHistoricalLocations(id);
            res.status(200).json(locations);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new GPSDeviceController();
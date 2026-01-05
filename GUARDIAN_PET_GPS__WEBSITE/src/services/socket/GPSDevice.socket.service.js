const { logger } = require("../../middlewares/logger.middleware");
const GPSDeviceRepository = require("../../repositories/gpsDevice.repository");

module.exports = function (io) {
    io.on("connection", (socket) => {
        logger.info("Cliente conectado al socket GPS:", socket.id);
        socket.on("gps:ubicacion", async ({ deviceId, lat, lng, fecha }) => {
            try {
                const gps = await GPSDeviceRepository.getGPSDeviceById(deviceId);
                if (!gps) return socket.emit("gps:error", { message: "Dispositivo no encontrado" });
                gps.ultimaUbicacion = { lat, lng, fecha };
                gps.historialUbicaciones.push({ lat, lng, fecha });
                await gps.save();
                io.emit("gps:ubicacion:actualizada", {
                    deviceId,
                    lat,
                    lng,
                    fecha
                });
            } catch (error) {
                socket.emit("gps:error", { message: error.message });
            }
        });

        socket.on("gps:estado", async ({ deviceId, estado }) => {
            try {
                const updated = await GPSDeviceRepository.changeConnectionStatus(deviceId, estado);
                io.emit("gps:estado:actualizado", {
                    deviceId: updated.deviceId,
                    estadoConexion: updated.estadoConexion
                });
            } catch (error) {
                socket.emit("gps:error", { message: error.message });
            }
        });

        socket.on("gps:ubicacion:last", async ({ deviceId }) => {
            try {
                const ubicacion = await GPSDeviceRepository.getLastLocation(deviceId);
                socket.emit("gps:ubicacion:last:response", ubicacion);
            } catch (error) {
                socket.emit("gps:error", { message: error.message });
            }
        });

        socket.on("gps:ubicacion:historial", async ({ deviceId }) => {
            try {
                const historial = await GPSDeviceRepository.getHistoricalLocations(deviceId);
                socket.emit("gps:ubicacion:historial:response", historial);
            } catch (error) {
                socket.emit("gps:error", { message: error.message });
            }
        });

        socket.on("disconnect", () => {
            logger.info("Cliente desconectado del socket GPS:", socket.id);
        });
    });
};

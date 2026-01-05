const { logger } = require("../../middlewares/logger.middleware");
const LocationRepository = require("../../repositories/location.repository");

module.exports = function (io) {
    io.on("connection", (socket) => {
        logger.info("Cliente conectado al socket Location:", socket.id);

        socket.on("location:create", async (data) => {
            try {
                const location = await LocationRepository.createLocation(data);
                io.emit("location:created", location);
            } catch (error) {
                socket.emit("location:error", { message: error.message });
            }
        });

        socket.on("location:getAll", async ({ gpsDevice, startDate, endDate }) => {
            try {
                const locations = await LocationRepository.getLocations({ gpsDevice, startDate, endDate });
                socket.emit("location:getAll:response", locations);
            } catch (error) {
                socket.emit("location:error", { message: error.message });
            }
        });

        socket.on("location:getById", async ({ id }) => {
            try {
                const location = await LocationRepository.getLocationById(id);
                socket.emit("location:getById:response", location);
            } catch (error) {
                socket.emit("location:error", { message: error.message });
            }
        });

        socket.on("location:update", async ({ id, data }) => {
            try {
                const updated = await LocationRepository.updateLocation(id, data);
                io.emit("location:updated", updated);
            } catch (error) {
                socket.emit("location:error", { message: error.message });
            }
        });

        socket.on("location:delete", async ({ id }) => {
            try {
                const deleted = await LocationRepository.deleteLocation(id);
                io.emit("location:deleted", deleted);
            } catch (error) {
                socket.emit("location:error", { message: error.message });
            }
        });

        socket.on("disconnect", () => {
            logger.info("Cliente desconectado del socket Location:", socket.id);
        });
    });
};

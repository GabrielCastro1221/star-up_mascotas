const { logger } = require("../../middlewares/logger.middleware");
const PetRepository = require("../../repositories/pet.repository");

module.exports = function (io) {
    io.on("connection", (socket) => {
        logger.info("Cliente conectado al socket Pet:", socket.id);

        socket.on("pet:create", async (data) => {
            try {
                const pet = await PetRepository.createPet(data);
                io.emit("pet:created", pet);
            } catch (error) {
                socket.emit("pet:error", { message: error.message });
            }
        });

        socket.on("pet:getAll", async ({ page, edad, raza, especie }) => {
            try {
                const pets = await PetRepository.getPets({ page, edad, raza, especie });
                socket.emit("pet:getAll:response", pets);
            } catch (error) {
                socket.emit("pet:error", { message: error.message });
            }
        });

        socket.on("pet:getById", async ({ id }) => {
            try {
                const pet = await PetRepository.getPetById(id);
                socket.emit("pet:getById:response", pet);
            } catch (error) {
                socket.emit("pet:error", { message: error.message });
            }
        });

        socket.on("pet:update", async ({ id, data }) => {
            try {
                const updated = await PetRepository.updatePet(id, data);
                io.emit("pet:updated", updated);
            } catch (error) {
                socket.emit("pet:error", { message: error.message });
            }
        });

        socket.on("pet:delete", async ({ id }) => {
            try {
                const deleted = await PetRepository.deletePet(id);
                io.emit("pet:deleted", deleted);
            } catch (error) {
                socket.emit("pet:error", { message: error.message });
            }
        });

        socket.on("disconnect", () => {
            logger.info("Cliente desconectado del socket Pet:", socket.id);
        });
    });
};

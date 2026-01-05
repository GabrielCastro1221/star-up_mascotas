const PetRepository = require("../repositories/pet.repository");
const UserModel = require("../models/user.model");

class PetController {
    async createPet(req, res) {
        try {
            const petData = req.body;
            if (req.file && req.file.path) { petData.foto = req.file.path; }
            const newPet = await PetRepository.createPet(petData);
            await UserModel.findByIdAndUpdate(petData.usuario,
                { $push: { mascotas: newPet._id } },
                { new: true });
            res.status(200).json({ message: "Mascota registrada con éxito", mascota: newPet });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getPets(req, res) {
        try {
            const { page, edad, raza, especie } = req.query;
            const pets = await PetRepository.getPets({ page, edad, raza, especie });
            res.status(200).json(pets);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getPet(req, res) {
        const { id } = req.params;
        try {
            const Pet = await PetRepository.getPetById(id);
            res.status(200).json({
                message: "Mascota: ",
                mascota: Pet
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async updatePet(req, res) {
        const { id } = req.params;
        try {
            const updatedPet = await PetRepository.updatePet(id, req.body);
            res.status(200).json({
                message: "Mascota actualizada correctamente",
                mascota: updatedPet
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async deletePet(req, res) {
        const { id } = req.params;
        try {
            const deletedPet = await PetRepository.deletePet(id);
            res.status(200).json({
                message: "Mascota eliminada",
                mascota: deletedPet
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new PetController();
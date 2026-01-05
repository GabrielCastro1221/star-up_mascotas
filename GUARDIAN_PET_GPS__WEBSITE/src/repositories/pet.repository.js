const petModel = require("../models/pet.model");

class PetRepository {
    async createPet(petData) {
        try {
            const newPet = new petModel({ ...petData });
            await newPet.save();
            return newPet;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async getPets({ page = 1, edad, raza, especie }) {
        try {
            const query = {};
            if (edad) query.edad = edad;
            if (raza) query.raza = raza;
            if (especie) query.especie = especie;
            const options = {
                page: parseInt(page),
                limit: 10,
                sort: { createdAt: -1 },
                lean: true,
            };
            const result = await petModel.paginate(query, options);
            return result;
        } catch (error) {
            throw new Error(`Error al obtener los mascotas: ${error.message}`);
        }
    }

    async getPetById(id) {
        try {
            const pet = await petModel.findById(id);
            if (!pet) {
                throw new Error("Mascota no encontrada");
            }
            return pet;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async updatePet(id, updateData) {
        try {
            const pet = await petModel.findById(id);
            if (!pet) {
                throw new Error("Mascota no encontrada");
            }
            Object.assign(pet, updateData);
            await pet.save();
            return pet;
        } catch (error) {
            throw new Error(`Error al actualizar la mascota: ${error.message}`);
        }
    }

    async deletePet(id) {
        try {
            const pet = await petModel.findByIdAndDelete(id);
            if (!pet) {
                throw new Error("Mascota no encontrada");
            }
            return pet;
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

module.exports = new PetRepository();
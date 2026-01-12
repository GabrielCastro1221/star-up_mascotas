const userModel = require("../models/user.model");
const cartModel = require("../models/cart.model");
const { hashedPassword, createHash } = require("../utils/hash.util");

class UserRepository {
    async createUser(userData) {
        try {
            const existingUser = await userModel.findOne({ email: userData.email });
            if (existingUser) {
                throw new Error("El usuario ya esta registrado en la plataforma");
            }
            const hashedPassword = createHash(userData.password);
            const newCart = new cartModel();
            await newCart.save();
            const newUser = new userModel({
                ...userData,
                password: hashedPassword,
                cart: newCart._id,
            });
            await newUser.save();
            return newUser;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async getUsers({ page = 1, rol, genero }) {
        try {
            const query = {};
            if (rol) query.rol = rol;
            if (genero) query.genero = genero;
            const options = {
                page: parseInt(page),
                limit: 10,
                sort: { createdAt: -1 },
                lean: true,
            };
            const result = await userModel.paginate(query, options);
            return result;
        } catch (error) {
            throw new Error(`Error al obtener los usuarios: ${error.message}`);
        }
    }

    async updateUser(id, updateData) {
        try {
            const user = await userModel.findById(id);
            if (!user) {
                throw new Error("Usuario no encontrado");
            }
            Object.assign(user, updateData);
            await user.save();
            return user;
        } catch (error) {
            throw new Error(`Error al actualizar el usuario: ${error.message}`);
        }
    }

    async deleteUser(id) {
        try {
            const user = await userModel.findByIdAndDelete(id);
            if (!user) {
                throw new Error("Usuario no encontrado");
            }
            return user;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async changeRole(id, newRole) {
        try {
            const user = await userModel.findById(id);
            if (!user) {
                throw new Error("Usuario no encontrado");
            }
            const updatedUser = await userModel.findByIdAndUpdate(
                id,
                { rol: newRole },
                { new: true }
            );
            return updatedUser;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async getUserProfile(id) {
        try {
            const user = await userModel.findById(id);
            if (!user) {
                throw new Error("Usuario no encontrado");
            }
            return user;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async getUserPets(userId) {
        try {
            const user = await userModel.findById(userId).populate("mascotas");
            if (!user) {
                throw new Error("Usuario no encontrado");
            }
            return user.mascotas;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async getUserTickets(userId) {
        try {
            const user = await userModel.findById(userId).populate("tickets");
            if (!user) {
                throw new Error("Usuario no encontrado");
            }
            return user.tickets;
        } catch (error) {
            throw new Error(`Error al obtener los tickets del usuario: ${error.message}`);
        }
    }
}

module.exports = new UserRepository();
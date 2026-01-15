const cartModel = require("../models/cart.model");
const CartRepository = require("../repositories/cart.repository");
const UserRepository = require("../repositories/user.repository");
const MailerController = require("../services/mailer/nodemailer.services");
const { generateToken } = require("../utils/generateToken.util");

class UserController {
    async createUser(req, res) {
        try {
            const userData = req.body;
            await UserRepository.createUser(userData);
            await MailerController.userRegister(userData);
            res.status(200).json({
                message: "Usuario registrado con exito",
                usuario: userData
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async registerGuest(req, res) {
        try {
            const userData = req.body;
            const user = await UserRepository.createUser(userData);
            const newCart = new cartModel({ products: [] });
            await newCart.save();
            user.cart = newCart._id;
            await user.save();
            const guestId = req.body.guestId;
            await CartRepository.migrateGuestCartToUser(guestId, newCart._id);
            await MailerController.userRegister(userData);
            const token = generateToken(user);
            const { password, ...rest } = user._doc;
            res.cookie("token", token, {
                httpOnly: true,
                secure: false,
                maxAge: 1000 * 60 * 60,
            });
            res.status(200).json({
                message: "Usuario registrado, carrito migrado y sesión iniciada",
                usuario: rest,
                cart: newCart,
                token,
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getUsers(req, res) {
        try {
            const { page, rol, genero } = req.query;
            const users = await UserRepository.getUsers({ page, rol, genero });
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async updateUser(req, res) {
        const { id } = req.params;
        try {
            const updateData = { ...req.body };
            if (req.file && req.file.path) {
                updateData.foto = req.file.path;
            }
            const updatedUser = await UserRepository.updateUser(id, updateData);
            res.status(200).json({
                message: "Usuario actualizado correctamente",
                user: updatedUser,
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async deleteUser(req, res) {
        const { id } = req.params;
        try {
            const deletedUser = await UserRepository.deleteUser(id);
            await MailerController.accountDeleted(deletedUser);
            res.status(200).json({
                message: "Usuario eliminado",
                usuario: deletedUser
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async changeRolAdmin(req, res) {
        const { id } = req.params;
        try {
            const updatedUser = await UserRepository.changeRole(id, "admin");
            await MailerController.roleChangedToAdmin(updatedUser);
            res.status(200).json(updatedUser);
        } catch (error) {
            res.status(500).send(error.message);
        }
    }

    async changeRolUser(req, res) {
        const { id } = req.params;
        try {
            const updatedUser = await UserRepository.changeRole(id, "user");
            res.status(200).json(updatedUser);
        } catch (error) {
            res.status(500).send(error.message);
        }
    }

    async getUserProfile(req, res) {
        const userId = req.user._id;
        try {
            const user = await UserRepository.getUserProfile(userId);
            const { password, ...rest } = user.toObject();
            res.status(200).json({
                success: true,
                message: "Información del perfil obtenida exitosamente",
                data: rest,
            });
        } catch (error) {
            res.status(500).json({
                error: error.message,
                message: "Error al obtener la información del perfil",
            });
        }
    }

    async getUserPets(req, res) {
        try {
            const { userId } = req.params;
            const pets = await UserRepository.getUserPets(userId);
            res.status(200).json({ message: "Mascotas obtenidas con éxito", mascotas: pets });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getUserTickets(req, res) {
        try {
            const { id } = req.params;
            const tickets = await UserRepository.getUserTickets(id);
            res.status(200).json({
                message: "Tickets obtenidos con éxito",
                tickets
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new UserController();
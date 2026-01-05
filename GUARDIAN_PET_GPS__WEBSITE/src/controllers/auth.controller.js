const userModel = require("../models/user.model");
const { generateToken } = require("../utils/generateToken.util");
const { generarResetToken } = require("../utils/resetToken.util");
const { isValidPassword, createHash } = require("../utils/hash.util");
const UserRepository = require("../repositories/user.repository");
const MailerController = require("../services/mailer/nodemailer.services");

class AuthController {
    register = async (req, res) => {
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
    };

    login = async (req, res) => {
        const { email, password } = req.body;
        try {
            const user = await userModel.findOne({ email });
            if (!user) {
                return res.status(404).json({ message: "Usuario no encontrado" });
            }

            const isPasswordMatch = isValidPassword(password, user);
            if (!isPasswordMatch) {
                return res.status(400).json({ message: "Credenciales incorrectas" });
            }

            const token = generateToken(user);
            const { password: userPassword, ...rest } = user._doc;

            res.cookie("token", token, {
                httpOnly: true,
                secure: false,
                maxAge: 1000 * 60 * 60,
            });

            res.status(200).json({
                message: "Inicio de sesión exitoso",
                data: {
                    ...rest,
                    rol: user.rol,
                    token,
                },
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };

    RequestPasswordReset = async (req, res) => {
        const { email } = req.body;
        try {
            let user = await userModel.findOne({ email });
            if (!user) {
                return res.render("resetPass", { error: "Usuario no encontrado" });
            }
            const token = generarResetToken();
            user.token_reset = {
                token: token,
                expire: new Date(Date.now() + 3600000),
            };
            await user.save();
            await MailerController.SendEmailRecoveryPassword(email, token);
            res.redirect("/confirm");
        } catch (err) {
            res.status(500).json({
                status: false,
                message: "error interno del servidor",
                error: err.message,
            });
        }
    };

    resetPassword = async (req, res) => {
        const { email, password, token } = req.body;
        try {
            let user = await userModel.findOne({ email });
            if (!user) {
                return res.render("resetPass", { error: "Usuario no encontrado" });
            }
            const resetToken = user.token_reset;
            if (!resetToken || resetToken.token !== token) {
                return res.render("resetPass", { error: "Token invalido" });
            }
            const ahora = new Date();
            if (ahora > resetToken.expire) {
                return res.render("resetPass", { error: "El token expiro" });
            }
            if (isValidPassword(password, user)) {
                return res.render("resetPass", {
                    error: "La nueva contraseña no puede ser igual a a la anterior",
                });
            }
            user.password = createHash(password);
            user.token_reset = undefined;
            await user.save();
            return res.redirect("/login");
        } catch (err) {
            res.status(500).json({
                status: false,
                message: "error interno del servidor",
                error: err.message,
            });
        }
    };
}

module.exports = new AuthController();
const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");
const configObject = require("../config/enviroment.config");

class AuthMiddleware {
    authenticate = async (req, res, next) => {
        const token = req.cookies.token;
        if (!token) {
            return res.redirect("/acceso-denegado");
        }

        try {
            const decoded = jwt.verify(token, configObject.auth.jwt_secret);
            const user = await userModel.findById(decoded.id);
            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: "Usuario no encontrado.",
                });
            }

            req.user = user;
            next();
        } catch (error) {
            if (error.name === "TokenExpiredError") {
                return res.status(401).json({
                    success: false,
                    message: "El token ha expirado.",
                });
            }
            return res.status(401).json({
                success: false,
                message: "Token inválido.",
            });
        }
    };

    restrict = (roles = []) => {
        return (req, res, next) => {
            if (!req.user) {
                return res.redirect("/page-not-found");
            }
            if (!roles.includes(req.user.rol)) {
                return res.redirect("/acceso-denegado");
            }
            next();
        };
    };
}

module.exports = new AuthMiddleware();

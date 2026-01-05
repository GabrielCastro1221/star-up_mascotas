const nodemailer = require("nodemailer");
const configObject = require("../../config/enviroment.config");
const { logger } = require("../../middlewares/logger.middleware");

class MailerController {
    constructor() {
        this.transporter = nodemailer.createTransport({
            service: configObject.mailer.email_service,
            auth: {
                user: configObject.mailer.mailer_user,
                pass: configObject.mailer.mailer_pass,
            },
        });
    }

    async userRegister(userData) {
        try {
            const { nombre, email, edad, rol, genero, telefono, direccion, ciudad } = userData;
            const Opt = {
                from: configObject.mailer.email_from,
                to: email,
                subject: "Guardian Pet - Bienvenido al sistema de rastreo GPS para mascotas",
                html: `
                <div style="font-family: 'Roboto', sans-serif; background-color: #F2F4F8; color: #4B4B4B; line-height: 1.6; max-width: 600px; margin: 0 auto; border: 1px solid #D9E2EC; padding: 20px; border-radius: 12px;">
                    <div style="background-color: #1A2A6C; padding: 20px; text-align: center; border-radius: 8px;">
                        <h1 style="color: #FFFFFF; font-family: 'Montserrat', sans-serif; margin: 0;">Guardian Pet</h1>
                    </div>
                    <h2 style="color: #4F7CAC; font-family: 'Poppins', sans-serif;">¡Bienvenido, ${nombre}!</h2>
                    <p>Nos alegra que te hayas registrado en nuestra plataforma. Aquí están tus datos de registro:</p>
                    <ul style="padding-left: 20px; color: #4B4B4B;">
                        <li><strong>Nombre completo:</strong> ${nombre}</li>
                        <li><strong>Email:</strong> ${email}</li>
                        <li><strong>Edad:</strong> ${edad}</li>
                        <li><strong>Rol:</strong> ${rol}</li>
                        <li><strong>Género:</strong> ${genero}</li>
                        <li><strong>Teléfono:</strong> ${telefono}</li>
                        <li><strong>Dirección:</strong> ${direccion}, ${ciudad}</li>
                    </ul>
                    <p style="color: #4B4B4B;">Estamos aquí para ofrecerte la mejor experiencia de rastreo GPS para tu mascota.</p>
                    <div style="margin-top: 20px; text-align: center;">
                        <h3 style="color: #A3D9B1; font-family: 'Raleway', sans-serif;">¡Gracias por confiar en Guardian Pet!</h3>
                        <p>Si necesitas ayuda, no dudes en
                            <a href="${configObject.server.base_url}/contact" style="color: #4F7CAC; text-decoration: underline;">contactarnos</a>.
                        </p>
                    </div>
                </div>
            `,
            };
            await this.transporter.sendMail(Opt);
            logger.info("Correo de bienvenida enviado exitosamente a " + email);
        } catch (error) {
            logger.error("Error al enviar correo de bienvenida:", error);
        }
    }

    async accountDeleted(userData) {
        try {
            const { nombre, email } = userData;
            const Opt = {
                from: configObject.mailer.email_from,
                to: email,
                subject: "Guardian Pet - Confirmación de eliminación de cuenta",
                html: `
                <div style="font-family: 'Roboto', sans-serif; background-color: #F2F4F8; color: #4B4B4B; line-height: 1.6; max-width: 600px; margin: 0 auto; border: 1px solid #D9E2EC; padding: 20px; border-radius: 12px;">
                    <div style="background-color: #1A2A6C; padding: 20px; text-align: center; border-radius: 8px;">
                        <h1 style="color: #FFFFFF; font-family: 'Montserrat', sans-serif; margin: 0;">Guardian Pet</h1>
                    </div>
                    <h2 style="color: #F56565; font-family: 'Poppins', sans-serif;">Tu cuenta ha sido eliminada</h2>
                    <p>Hola <strong>${nombre}</strong>, te confirmamos que tu cuenta asociada al correo <strong>${email}</strong> ha sido eliminada de nuestro sistema.</p>
                    <p style="color: #4B4B4B;">Esto significa que ya no tendrás acceso a la plataforma ni a los dispositivos GPS vinculados.
                    Si en el futuro deseas regresar, siempre podrás registrarte nuevamente.</p>
                    <div style="margin-top: 20px; text-align: center;">
                        <h3 style="color: #A3D9B1; font-family: 'Raleway', sans-serif;">Guardian Pet siempre estará aquí para ti y tu mascota</h3>
                        <p>Si esta acción fue un error o necesitas asistencia, por favor
                            <a href="${configObject.server.base_url}/contact" style="color: #4F7CAC; text-decoration: underline;">contáctanos</a>.
                        </p>
                    </div>
                </div>
            `,
            };
            await this.transporter.sendMail(Opt);
            logger.info("Correo de eliminación de cuenta enviado exitosamente a " + email);
        } catch (error) {
            logger.error("Error al enviar correo de eliminación de cuenta:", error);
        }
    }

    async roleChangedToAdmin(userData) {
        try {
            const { nombre, email } = userData;

            const Opt = {
                from: configObject.mailer.email_from,
                to: email,
                subject: "Guardian Pet - Tu rol ha sido actualizado a Administrador",
                html: `
                <div style="font-family: 'Roboto', sans-serif; background-color: #F2F4F8; color: #4B4B4B; line-height: 1.6; max-width: 600px; margin: 0 auto; border: 1px solid #D9E2EC; padding: 20px; border-radius: 12px;">
                    <div style="background-color: #1A2A6C; padding: 20px; text-align: center; border-radius: 8px;">
                        <h1 style="color: #FFFFFF; font-family: 'Montserrat', sans-serif; margin: 0;">Guardian Pet</h1>
                    </div>
                    <h2 style="color: #4F7CAC; font-family: 'Poppins', sans-serif;">¡Felicitaciones, ${nombre}!</h2>
                    <p>Tu cuenta asociada al correo <strong>${email}</strong> ha sido actualizada y ahora tienes el rol de <span style="color: #A3D9B1; font-weight: bold;">Administrador</span>.</p>
                    <p style="color: #4B4B4B;">Como administrador, tendrás acceso a funciones avanzadas de gestión de usuarios, dispositivos GPS y mascotas dentro de la plataforma Guardian Pet.</p>
                    <div style="margin-top: 20px; text-align: center;">
                        <h3 style="color: #A3D9B1; font-family: 'Raleway', sans-serif;">¡Gracias por ser parte activa de Guardian Pet!</h3>
                        <p>Si tienes dudas sobre tus nuevas funciones, visita nuestro
                            <a href="${configObject.server.base_url}/admin-help" style="color: #4F7CAC; text-decoration: underline;">centro de ayuda</a>.
                        </p>
                    </div>
                </div>
            `,
            };
            await this.transporter.sendMail(Opt);
            logger.info("Correo de cambio de rol a Admin enviado exitosamente a " + email);
        } catch (error) {
            logger.error("Error al enviar correo de cambio de rol a Admin:", error);
        }
    }

    async SendEmailRecoveryPassword(email, token) {
        try {
            const Opt = {
                from: `"Guardian Pet - Recuperación" <${configObject.mailer.mailer_user}>`,
                to: email,
                subject: "Guardian Pet - Recuperar contraseña",
                html: `
                <div style="font-family: 'Roboto', sans-serif; background-color: #F2F4F8; color: #4B4B4B; line-height: 1.6; max-width: 600px; margin: 0 auto; border: 1px solid #D9E2EC; padding: 20px; border-radius: 12px;">
                    <div style="background-color: #1A2A6C; padding: 20px; text-align: center; border-radius: 8px;">
                        <h1 style="color: #FFFFFF; font-family: 'Montserrat', sans-serif; margin: 0;">Guardian Pet</h1>
                    </div>
                    <h2 style="color: #4F7CAC; font-family: 'Poppins', sans-serif;">¿Olvidaste tu contraseña?</h2>
                    <p>Hola, has solicitado recuperar tu acceso a la plataforma Guardian Pet.</p>
                    <p>Tu código de recuperación es:</p>
                    <h1 style="color: #A3D9B1; font-family: 'Raleway', sans-serif;">${token}</h1>
                    <p>Este código expira en 1 hora. Por favor, úsalo para restablecer tu contraseña.</p>
                    <div style="margin-top: 20px; text-align: center;">
                        <a href="${configObject.server.base_url}/change-password"
                            style="background-color: #4F7CAC; color: #FFFFFF; padding: 10px 20px; border-radius: 6px; text-decoration: none; font-family: 'Lato', sans-serif;">
                            Recuperar contraseña
                        </a>
                    </div>
                    <div style="margin-top: 20px; text-align: center;">
                        <p style="color: #4B4B4B;">Si no solicitaste este cambio, puedes ignorar este mensaje.</p>
                    </div>
                </div>
            `,
            };
            const info = await this.transporter.sendMail(Opt);
            logger.info("Correo de recuperación enviado:", info.messageId);
        } catch (error) {
            logger.error("Error al enviar correo de recuperación:", error);
        }
    }
}

module.exports = new MailerController();
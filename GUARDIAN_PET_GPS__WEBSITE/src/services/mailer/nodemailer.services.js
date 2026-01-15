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

    async sendPurchaseTicket(ticketData) {
        try {
            const {
                email,
                nombre,
                ticketId,
                fechaCompra,
                productos,
                total,
                metodoPago,
                direccionEnvio,
                ciudadEnvio
            } = ticketData;
            const productosHTML = productos.map(p => `
            <li>
                <strong>${p.nombre}</strong> - Cantidad: ${p.cantidad} - Precio: $${p.precio}
            </li>
        `).join("");
            const Opt = {
                from: configObject.mailer.email_from,
                to: email,
                subject: `Guardian Pet - Ticket de compra #${ticketId}`,
                html: `
            <div style="font-family: 'Roboto', sans-serif; background-color: #F2F4F8; color: #4B4B4B; line-height: 1.6; max-width: 600px; margin: 0 auto; border: 1px solid #D9E2EC; padding: 20px; border-radius: 12px;">
                <div style="background-color: #1A2A6C; padding: 20px; text-align: center; border-radius: 8px;">
                    <h1 style="color: #FFFFFF; font-family: 'Montserrat', sans-serif; margin: 0;">Guardian Pet</h1>
                </div>
                <h2 style="color: #4F7CAC; font-family: 'Poppins', sans-serif;">¡Gracias por tu compra, ${nombre}!</h2>
                <p>Hemos generado tu ticket de compra con los siguientes detalles:</p>
                <ul style="padding-left: 20px; color: #4B4B4B;">
                    <li><strong>ID del Ticket:</strong> ${ticketId}</li>
                    <li><strong>Fecha de compra:</strong> ${fechaCompra}</li>
                    <li><strong>Método de pago:</strong> ${metodoPago}</li>
                    <li><strong>Dirección de envío:</strong> ${direccionEnvio}, ${ciudadEnvio}</li>
                </ul>
                <h3 style="color: #4F7CAC;">Productos adquiridos:</h3>
                <ul style="padding-left: 20px; color: #4B4B4B;">
                    ${productosHTML}
                </ul>
                <h2 style="color: #A3D9B1;">Total: $${total}</h2>
                <p style="color: #4B4B4B;">Tu pedido será procesado y enviado lo antes posible.</p>
                <div style="margin-top: 20px; text-align: center;">
                    <h3 style="color: #A3D9B1; font-family: 'Raleway', sans-serif;">¡Gracias por confiar en Guardian Pet!</h3>
                    <p>Si necesitas ayuda con tu pedido, no dudes en
                        <a href="${configObject.server.base_url}/contact" style="color: #4F7CAC; text-decoration: underline;">contactarnos</a>.
                    </p>
                </div>
            </div>
            `,
            };
            await this.transporter.sendMail(Opt);
            logger.info("Correo de ticket de compra enviado exitosamente a " + email);
        } catch (error) {
            logger.error("Error al enviar correo de ticket de compra:", error);
        }
    }

    async sendTicketPaidEmail(userData, ticketData) {
        try {
            const { nombre, email } = userData;
            const { code, purchase_datetime, amount, products } = ticketData;
            const productosHTML = products.map(p => `
            <li>
                <strong>${p.title}</strong> - Cantidad: ${p.quantity} - Precio: $${p.price}
            </li>
        `).join("");
            const Opt = {
                from: configObject.mailer.email_from,
                to: email,
                subject: `Guardian Pet - Ticket #${code} Pagado`,
                html: `
            <div style="font-family: 'Roboto', sans-serif; background-color: #F2F4F8; color: #4B4B4B; line-height: 1.6; max-width: 600px; margin: 0 auto; border: 1px solid #D9E2EC; padding: 20px; border-radius: 12px;">
                <div style="background-color: #1A2A6C; padding: 20px; text-align: center; border-radius: 8px;">
                    <h1 style="color: #FFFFFF; font-family: 'Montserrat', sans-serif; margin: 0;">Guardian Pet</h1>
                </div>
                <h2 style="color: #4F7CAC; font-family: 'Poppins', sans-serif;">¡Pago confirmado, ${nombre}!</h2>
                <p>Tu ticket ha sido marcado como <strong>Pagado</strong>. Aquí están los detalles:</p>
                <ul style="padding-left: 20px; color: #4B4B4B;">
                    <li><strong>ID del Ticket:</strong> ${code}</li>
                    <li><strong>Fecha de compra:</strong> ${new Date(purchase_datetime).toLocaleString()}</li>
                    <li><strong>Total pagado:</strong> $${amount}</li>
                </ul>
                <h3 style="color: #4F7CAC;">Productos:</h3>
                <ul style="padding-left: 20px; color: #4B4B4B;">
                    ${productosHTML}
                </ul>
                <div style="margin-top: 20px; text-align: center;">
                    <h3 style="color: #A3D9B1; font-family: 'Raleway', sans-serif;">¡Gracias por tu compra!</h3>
                    <p>Si necesitas ayuda con tu pedido, no dudes en
                        <a href="${configObject.server.base_url}/contact" style="color: #4F7CAC; text-decoration: underline;">contactarnos</a>.
                    </p>
                </div>
            </div>
            `,
            };
            await this.transporter.sendMail(Opt);
            logger.info("Correo de ticket pagado enviado exitosamente a " + email);
        } catch (error) {
            logger.error("Error al enviar correo de ticket pagado:", error);
        }
    }

    async sendTicketCancelledEmail(userData, ticketData) {
        try {
            const { nombre, email } = userData;
            const { code, purchase_datetime, amount, products } = ticketData;
            const productosHTML = products.map(p => `
            <li>
                <strong>${p.title}</strong> - Cantidad: ${p.quantity} - Precio: $${p.price}
            </li>
        `).join("");
            const Opt = {
                from: configObject.mailer.email_from,
                to: email,
                subject: `Guardian Pet - Ticket #${code} Cancelado`,
                html: `
            <div style="font-family: 'Roboto', sans-serif; background-color: #F2F4F8; color: #4B4B4B; line-height: 1.6; max-width: 600px; margin: 0 auto; border: 1px solid #D9E2EC; padding: 20px; border-radius: 12px;">
                <div style="background-color: #F56565; padding: 20px; text-align: center; border-radius: 8px;">
                    <h1 style="color: #FFFFFF; font-family: 'Montserrat', sans-serif; margin: 0;">Guardian Pet</h1>
                </div>
                <h2 style="color: #F56565; font-family: 'Poppins', sans-serif;">Ticket Cancelado</h2>
                <p>Hola <strong>${nombre}</strong>, tu ticket ha sido cancelado. Aquí están los detalles:</p>
                <ul style="padding-left: 20px; color: #4B4B4B;">
                    <li><strong>ID del Ticket:</strong> ${code}</li>
                    <li><strong>Fecha de compra:</strong> ${new Date(purchase_datetime).toLocaleString()}</li>
                    <li><strong>Monto total:</strong> $${amount}</li>
                </ul>
                <h3 style="color: #4F7CAC;">Productos en el ticket:</h3>
                <ul style="padding-left: 20px; color: #4B4B4B;">
                    ${productosHTML}
                </ul>
                <p style="color: #4B4B4B;">Si esta cancelación fue un error o necesitas asistencia, por favor
                    <a href="${configObject.server.base_url}/contact" style="color: #4F7CAC; text-decoration: underline;">contáctanos</a>.
                </p>
                <div style="margin-top: 20px; text-align: center;">
                    <h3 style="color: #A3D9B1; font-family: 'Raleway', sans-serif;">Guardian Pet siempre estará aquí para ti y tu mascota</h3>
                </div>
            </div>
            `,
            };
            await this.transporter.sendMail(Opt);
            logger.info("Correo de ticket cancelado enviado exitosamente a " + email);
        } catch (error) {
            logger.error("Error al enviar correo de ticket cancelado:", error);
        }
    }

    async sendTicketInProcessEmail(userData, ticketData) {
        try {
            const { nombre, email } = userData;
            const { code, purchase_datetime, amount, products } = ticketData;
            const productosHTML = products.map(p => `
            <li>
                <strong>${p.title}</strong> - Cantidad: ${p.quantity} - Precio: $${p.price}
            </li>
        `).join("");
            const Opt = {
                from: configObject.mailer.email_from,
                to: email,
                subject: `Guardian Pet - Ticket #${code} en proceso`,
                html: `
            <div style="font-family: 'Roboto', sans-serif; background-color: #F2F4F8; color: #4B4B4B; line-height: 1.6; max-width: 600px; margin: 0 auto; border: 1px solid #D9E2EC; padding: 20px; border-radius: 12px;">
                <div style="background-color: #4F7CAC; padding: 20px; text-align: center; border-radius: 8px;">
                    <h1 style="color: #FFFFFF; font-family: 'Montserrat', sans-serif; margin: 0;">Guardian Pet</h1>
                </div>
                <h2 style="color: #4F7CAC; font-family: 'Poppins', sans-serif;">¡Tu pedido está en proceso, ${nombre}!</h2>
                <p>Tu ticket ha sido actualizado al estado <strong>En proceso</strong>. Aquí están los detalles:</p>
                <ul style="padding-left: 20px; color: #4B4B4B;">
                    <li><strong>ID del Ticket:</strong> ${code}</li>
                    <li><strong>Fecha de compra:</strong> ${new Date(purchase_datetime).toLocaleString()}</li>
                    <li><strong>Total:</strong> $${amount}</li>
                </ul>
                <h3 style="color: #4F7CAC;">Productos:</h3>
                <ul style="padding-left: 20px; color: #4B4B4B;">
                    ${productosHTML}
                </ul>
                <p style="color: #4B4B4B;">Estamos preparando tu pedido y pronto estará listo para envío.</p>
                <div style="margin-top: 20px; text-align: center;">
                    <h3 style="color: #A3D9B1; font-family: 'Raleway', sans-serif;">Gracias por confiar en Guardian Pet</h3>
                    <p>Si necesitas ayuda con tu pedido, no dudes en
                        <a href="${configObject.server.base_url}/contact" style="color: #4F7CAC; text-decoration: underline;">contactarnos</a>.
                    </p>
                </div>
            </div>
            `,
            };
            await this.transporter.sendMail(Opt);
            logger.info("Correo de ticket en proceso enviado exitosamente a " + email);
        } catch (error) {
            logger.error("Error al enviar correo de ticket en proceso:", error);
        }
    }

    async sendPetCreatedEmail(userData, petData) {
        try {
            const { nombre, email } = userData;
            const { nombre_mascota, especie, raza, edad, sexo, foto } = petData;
            const Opt = {
                from: configObject.mailer.email_from,
                to: email,
                subject: `Guardian Pet - Mascota ${nombre_mascota} registrada`,
                html: `
            <div style="font-family: 'Roboto', sans-serif; background-color: #F2F4F8; color: #4B4B4B; line-height: 1.6; max-width: 600px; margin: 0 auto; border: 1px solid #D9E2EC; padding: 20px; border-radius: 12px;">
                <div style="background-color: #1A2A6C; padding: 20px; text-align: center; border-radius: 8px;">
                    <h1 style="color: #FFFFFF; font-family: 'Montserrat', sans-serif; margin: 0;">Guardian Pet</h1>
                </div>
                <h2 style="color: #4F7CAC; font-family: 'Poppins', sans-serif;">¡Nueva mascota registrada!</h2>
                <p>Hola <strong>${nombre}</strong>, tu mascota ha sido registrada exitosamente en Guardian Pet. Aquí están los detalles:</p>
                <ul style="padding-left: 20px; color: #4B4B4B;">
                    <li><strong>Nombre:</strong> ${nombre_mascota}</li>
                    <li><strong>Especie:</strong> ${especie || "No especificada"}</li>
                    <li><strong>Raza:</strong> ${raza || "No especificada"}</li>
                    <li><strong>Edad:</strong> ${edad || "No especificada"}</li>
                    <li><strong>Sexo:</strong> ${sexo || "No especificado"}</li>
                </ul>
                ${foto ? `<div style="margin: 20px 0; text-align: center;">
                    <img src="${foto}" alt="Foto de ${nombre_mascota}" style="max-width: 200px; border-radius: 8px; border: 1px solid #D9E2EC;" />
                </div>` : ""}
                <p style="color: #4B4B4B;">Ahora podrás vincular dispositivos GPS y gestionar toda la información de tu mascota desde la plataforma.</p>
                <div style="margin-top: 20px; text-align: center;">
                    <h3 style="color: #A3D9B1; font-family: 'Raleway', sans-serif;">Guardian Pet siempre contigo y tu mascota</h3>
                    <p>Si necesitas ayuda, no dudes en
                        <a href="${configObject.server.base_url}/contact" style="color: #4F7CAC; text-decoration: underline;">contactarnos</a>.
                    </p>
                </div>
            </div>
            `,
            };
            await this.transporter.sendMail(Opt);
            logger.info("Correo de mascota registrada enviado exitosamente a " + email);
        } catch (error) {
            logger.error("Error al enviar correo de mascota registrada:", error);
        }
    }

    async sendPetDeletedEmail(userData, petData) {
        try {
            const { nombre, email } = userData;
            const { nombre_mascota, especie, raza, edad, sexo } = petData;
            const Opt = {
                from: configObject.mailer.email_from,
                to: email,
                subject: `Guardian Pet - Mascota ${nombre_mascota} eliminada`,
                html: `
            <div style="font-family: 'Roboto', sans-serif; background-color: #F2F4F8; color: #4B4B4B; line-height: 1.6; max-width: 600px; margin: 0 auto; border: 1px solid #D9E2EC; padding: 20px; border-radius: 12px;">
                <div style="background-color: #F56565; padding: 20px; text-align: center; border-radius: 8px;">
                    <h1 style="color: #FFFFFF; font-family: 'Montserrat', sans-serif; margin: 0;">Guardian Pet</h1>
                </div>
                <h2 style="color: #F56565; font-family: 'Poppins', sans-serif;">Mascota eliminada</h2>
                <p>Hola <strong>${nombre}</strong>, te confirmamos que tu mascota <strong>${nombre_mascota}</strong> ha sido eliminada de tu perfil en Guardian Pet.</p>
                <ul style="padding-left: 20px; color: #4B4B4B;">
                    <li><strong>Nombre:</strong> ${nombre_mascota}</li>
                    <li><strong>Especie:</strong> ${especie || "No especificada"}</li>
                    <li><strong>Raza:</strong> ${raza || "No especificada"}</li>
                    <li><strong>Edad:</strong> ${edad || "No especificada"}</li>
                    <li><strong>Sexo:</strong> ${sexo || "No especificado"}</li>
                </ul>
                <p style="color: #4B4B4B;">Si esta acción fue un error o necesitas asistencia, por favor
                    <a href="${configObject.server.base_url}/contact" style="color: #4F7CAC; text-decoration: underline;">contáctanos</a>.
                </p>
                <div style="margin-top: 20px; text-align: center;">
                    <h3 style="color: #A3D9B1; font-family: 'Raleway', sans-serif;">Guardian Pet siempre contigo y tu mascota</h3>
                </div>
            </div>
            `,
            };
            await this.transporter.sendMail(Opt);
            logger.info("Correo de mascota eliminada enviado exitosamente a " + email);
        } catch (error) {
            logger.error("Error al enviar correo de mascota eliminada:", error);
        }
    }

    async sendProductReviewEmail(userData, productData, reviewData) {
        try {
            const { nombre, email } = userData;
            const { title } = productData;
            const { comentario, calificacion } = reviewData;
            const Opt = {
                from: configObject.mailer.email_from,
                to: email,
                subject: `Guardian Pet - Nuevo comentario en ${title}`,
                html: `
            <div style="font-family: 'Roboto', sans-serif; background-color: #F2F4F8; color: #4B4B4B; line-height: 1.6; max-width: 600px; margin: 0 auto; border: 1px solid #D9E2EC; padding: 20px; border-radius: 12px;">
                <div style="background-color: #1A2A6C; padding: 20px; text-align: center; border-radius: 8px;">
                    <h1 style="color: #FFFFFF; font-family: 'Montserrat', sans-serif; margin: 0;">Guardian Pet</h1>
                </div>
                <h2 style="color: #4F7CAC; font-family: 'Poppins', sans-serif;">¡Nuevo comentario en tu producto!</h2>
                <p>Hola <strong>${nombre}</strong>, tu producto <strong>${title}</strong> ha recibido una nueva reseña:</p>
                <ul style="padding-left: 20px; color: #4B4B4B;">
                    <li><strong>Comentario:</strong> ${comentario}</li>
                    <li><strong>Calificación:</strong> ⭐ ${calificacion}/5</li>
                </ul>
                <p style="color: #4B4B4B;">Recuerda que las reseñas ayudan a otros usuarios a confiar en tus productos.</p>
                <div style="margin-top: 20px; text-align: center;">
                    <h3 style="color: #A3D9B1; font-family: 'Raleway', sans-serif;">Guardian Pet siempre contigo</h3>
                    <p>Si necesitas ayuda, no dudes en
                        <a href="${configObject.server.base_url}/contact" style="color: #4F7CAC; text-decoration: underline;">contactarnos</a>.
                    </p>
                </div>
            </div>
            `,
            };
            await this.transporter.sendMail(Opt);
            logger.info("Correo de nueva reseña enviado exitosamente a " + email);
        } catch (error) {
            logger.error("Error al enviar correo de nueva reseña:", error);
        }
    }
}

module.exports = new MailerController();
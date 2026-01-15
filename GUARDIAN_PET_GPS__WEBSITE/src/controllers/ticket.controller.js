const TicketRepository = require("../repositories/ticket.repository");
const CartRepository = require("../repositories/cart.repository");
const { ticketNumberRandom } = require("../utils/cart.util");
const { logger } = require("../middlewares/logger.middleware");
const MailerController = require("../services/mailer/nodemailer.services");

class TicketController {
    async finishPurchase(req, res) {
        const cartId = req.params.cid;
        const { amount, shipping, subtotal } = req.body;
        try {
            const cart = await CartRepository.getProductsInCart(cartId);
            const user = await TicketRepository.findUserByCartId(cartId);
            if (!cart || !user) {
                return res.status(404).json({ error: "Carrito o usuario no encontrado" });
            }
            if (!Array.isArray(cart.products)) {
                throw new Error("El carrito no tiene productos o no fueron poblados correctamente.");
            }
            const productsData = cart.products.map((item) => ({
                productId: item.product._id,
                title: item.product.title,
                price: item.product.price,
                quantity: item.quantity,
            }));
            const ticketData = {
                code: await ticketNumberRandom(),
                amount: Number(amount),
                shipping: Number(shipping),
                subtotal: Number(subtotal),
                purchaser: user._id,
                cart: cartId,
                purchase_datetime: new Date(),
                products: productsData,
            };
            const ticket = await TicketRepository.createTicket(ticketData);
            await TicketRepository.addTicketToUser(user._id, ticket._id);
            await CartRepository.emptyCart(cartId);
            await MailerController.sendPurchaseTicket({
                email: user.email,
                nombre: user.nombre,
                ticketId: ticket.code,
                fechaCompra: ticket.purchase_datetime.toLocaleString(),
                productos: productsData.map(p => ({ nombre: p.title, cantidad: p.quantity, precio: p.price })), total: ticket.amount, metodoPago: "Tarjeta / Transferencia",
                direccionEnvio: user.direccion || "No especificada",
                ciudadEnvio: user.ciudad || "No especificada"
            });
            res.status(201).json({ _id: ticket._id, message: "Compra realizada con éxito" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Error al realizar la compra, intenta nuevamente" });
        }
    }

    async getTicketById(req, res) {
        const { id } = req.params;
        try {
            const Ticket = await TicketRepository.getTicketById(id);
            res
                .status(200)
                .json({ message: "Ticket", ticket: Ticket });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getProductsByTicketId(req, res) {
        const { id } = req.params;
        try {
            const products = await TicketRepository.getProductsByTicketId(id);
            res.status(200).json({
                message: "Productos del ticket",
                products: products,
            });
        } catch (error) {
            logger.error("Error al obtener productos del ticket:", error.message);
            res.status(500).json({ message: error.message });
        }
    }

    async payTicket(req, res) {
        const id = req.params.id;
        try {
            const updatedTicket = await TicketRepository.payTicket(id);
            await MailerController.sendTicketPaidEmail(user, updatedTicket);
            res.status(200).json({
                message: "El estado del ticket se actualizó a pagado",
                ticket: updatedTicket,
            });
        } catch (error) {
            res.status(500).json({
                message: error.message || "Error al cambiar el estado del ticket",
            });
        }
    }

    async cancelTicket(req, res) {
        const id = req.params.id;
        try {
            const updatedTicket = await TicketRepository.payCancel(id);
            await MailerController.sendTicketCancelledEmail(user, updatedTicket);
            res.status(200).json({
                message: "El estado del ticket se actualizó a cancelado",
                ticket: updatedTicket,
            });
        } catch (error) {
            res.status(500).json({
                message: error.message || "Error al cambiar el estado del ticket",
            });
        }
    }

    async processTicket(req, res) {
        const id = req.params.id;
        try {
            const updatedTicket = await TicketRepository.payProcess(id);
            await MailerController.sendTicketInProcessEmail(user, updatedTicket);
            res.status(200).json({
                message: "El estado del ticket se actualizó a en proceso",
                ticket: updatedTicket,
            });
        } catch (error) {
            res.status(500).json({
                message: error.message || "Error al cambiar el estado del ticket",
            });
        }
    }

    async deleteTicket(req, res) {
        const { id } = req.params;
        try {
            const deleteTicket = await TicketRepository.deleteTicket(id);
            res
                .status(200)
                .json({ message: "Ticket eliminado", ticket: deleteTicket });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new TicketController();

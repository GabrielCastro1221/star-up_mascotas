const TicketRepository = require("../repositories/ticket.repository");
const CartRepository = require("../repositories/cart.repository");
const { ticketNumberRandom } = require("../utils/cart.util");
const { logger } = require("../middlewares/logger.middleware");
const mailer = require("../services/mailer/nodemailer.services");

class TicketController {
    async finishPurchase(req, res) {
        const cartId = req.params.cid;
        const { amount, shipping, subtotal } = req.body;

        try {
            const cart = await CartRepository.getProductsInCart(cartId);
            const user = await TicketRepository.findUserByCartId(cartId);

            if (!cart || !user) {
                console.warn("Carrito o usuario no encontrado");
                return res.status(404).json({ error: "Carrito o usuario no encontrado" });
            }

            if (!Array.isArray(cart.products)) {
                throw new Error("El carrito no tiene productos o no fueron poblados correctamente.");
            }
            const clonedProducts = JSON.parse(JSON.stringify(cart.products));
            const productsData = clonedProducts.map((product) => ({
                productId: product.product._id,
                title: product.product.title,
                price: product.product.price,
                quantity: product.quantity,
            }));

            const ticketData = {
                code: await ticketNumberRandom(),
                amount,
                shipping,
                subtotal,
                purchaser: user._id,
                cart: cartId,
                purchase_datetime: new Date(),
                products: productsData,
            };
            const ticket = await TicketRepository.createTicket(ticketData);
            await TicketRepository.addTicketToUser(user._id, ticket._id);
            await CartRepository.emptyCart(cartId);
            await mailer.SendPurchaseConfirmation(user.email, ticketData);
            res.status(201).json({ _id: ticket._id });
        } catch (error) {
            logger.error(error.message);
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

    async payTicket(req, res) {
        const id = req.params.id;
        try {
            const updatedTicket = await TicketRepository.payTicket(id);
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
}

module.exports = new TicketController();

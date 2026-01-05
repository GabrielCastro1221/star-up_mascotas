const ticketModel = require("../models/ticket.model");
const userModel = require("../models/user.model");
const { logger } = require("../middlewares/logger.middleware");

class TicketRepository {
    async createTicket(data) {
        const ticket = new ticketModel(data);
        await ticket.save();
        return ticket;
    }

    async findUserByCartId(cartId) {
        return await userModel.findOne({ cart: cartId });
    }

    async addTicketToUser(userId, ticketId) {
        const user = await userModel.findById(userId);
        if (!user) return null;
        user.tickets.push(ticketId);
        await user.save();
        return user;
    }

    async getTickets({ page = 1, limit = 1000 }) {
        try {
            const options = {
                page: parseInt(page),
                limit: parseInt(limit),
                populate: "purchaser",
                lean: true,
                sort: { createdAt: -1 },
            };

            const result = await ticketModel.paginate({}, options);

            if (result.docs.length === 0) {
                logger.warning("No se encontraron tickets");
            }

            return result;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async getTicketById(id) {
        try {
            const ticket = await ticketModel
                .findById(id)
                .populate("purchaser", "last_name name email phone address city")
                .populate({
                    path: "products.productId",
                    model: "Product",
                    select: "image title price description"
                })
                .lean();

            if (!ticket) throw new Error("Ticket no encontrado");

            ticket.viewProducts = (ticket.products || []).map(p => ({
                title: p.title || p.productId?.title,
                price: (p.price ?? p.productId?.price) ?? 0,
                quantity: p.quantity,
                image: p.image || p.productId?.image,
                description: p.description || p.productId?.description
            }));
            return ticket;
        } catch (error) {
            logger.error("Error al obtener ticket:", error.message);
            throw new Error(error.message);
        }
    }

    async getProductsByTicketId(id) {
        try {
            const ticket = await ticketModel
                .findById(id)
                .populate({
                    path: "products.productId",
                    model: "Product",
                    select: "image title price description"
                })
                .lean();

            if (!ticket) throw new Error("Ticket no encontrado");

            const products = (ticket.products || []).map(p => ({
                title: p.title || p.productId?.title,
                price: (p.price ?? p.productId?.price) ?? 0,
                quantity: p.quantity,
                image: p.image || p.productId?.image,
                description: p.description || p.productId?.description
            }));

            return products;
        } catch (error) {
            logger.error("Error al obtener productos del ticket:", error.message);
            throw new Error(error.message);
        }
    }

    async deleteTicket(id) {
        try {
            const ticket = await ticketModel.findByIdAndDelete(id);
            if (!ticket) {
                throw new Error("Ticket no encontrado");
            }
            return ticket;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async payTicket(id) {
        try {
            const ticket = await ticketModel.findById(id);
            if (!ticket) {
                throw new Error("Ticket no encontrado");
            }
            ticket.status = "pagado";
            await ticket.save();
            return ticket;
        } catch (error) {
            logger.error("Error al actualizar el estado del ticket:", error.message);
            throw new Error(error.message);
        }
    }

    async payCancel(id) {
        try {
            const ticket = await ticketModel.findById(id);
            if (!ticket) {
                throw new Error("Ticket no encontrado");
            }
            ticket.status = "cancelado";
            await ticket.save();
            return ticket;
        } catch (error) {
            logger.error("Error al actualizar el estado del ticket:", error.message);
            throw new Error(error.message);
        }
    }

    async payProcess(id) {
        try {
            const ticket = await ticketModel.findById(id);
            if (!ticket) {
                throw new Error("Ticket no encontrado");
            }
            ticket.status = "en proceso";
            await ticket.save();
            return ticket;
        } catch (error) {
            logger.error("Error al actualizar el estado del ticket:", error.message);
            throw new Error(error.message);
        }
    }
}

module.exports = new TicketRepository();
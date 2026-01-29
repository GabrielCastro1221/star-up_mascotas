const CartRepository = require("../repositories/cart.repository");
const ShippingRepository = require("../repositories/shipping.repository");

class CartController {
    async addProductsToCart(req, res) {
        const { cid, pid } = req.params;
        const quantity = req.body.quantity || 1;
        try {
            await CartRepository.addProductInCart(cid, pid, quantity);
            res.redirect(`/cart/${cid}`);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async addProductsToGuestCart(req, res) {
        const { guestId, pid } = req.params;
        const quantity = req.body.quantity || 1;
        try {
            const cart = await CartRepository.addProductInGuestCart(guestId, pid, quantity);
            res.redirect(`/cart/${cart._id}`);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getProductsToCart(req, res) {
        const { cid } = req.params;
        try {
            const products = await CartRepository.getProductsInCart(cid);
            if (!products) {
                return res.status(404).json({ error: "Carrito no encontrado" });
            }
            res.status(200).json(products);
        } catch (error) {
            res.status(500).send("Error al obtener productos del carrito");
        }
    }

    async getCartById(req, res) {
        const { cid } = req.params;
        try {
            const result = await CartRepository.getCartById(cid);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({
                message: "Error al obtener el carrito de compras",
                error: error.message,
            });
        }
    }

    async getCartByGuestId(req, res) {
        try {
            const { guestId } = req.params;
            const cart = await CartRepository.getCartByGuestId(guestId);
            const shipping = await ShippingRepository.getShipping();
            if (!shipping) {
                return res.status(404).json({
                    status: false,
                    message: "No hay disponibilidad de envíos en el momento, inténtalo más tarde",
                });
            }
            if (!cart) {
                return res.redirect("/page-not-found");
            }
            const subtotal = cart.products.reduce((acc, item) => {
                return acc + item.product.price * item.quantity;
            }, 0);
            res.render("cart", { cart, subtotal, shipping, isGuest: true });
        } catch (error) {
            res.redirect("/page-not-found");
        }
    }

    async deleteProductToCart(req, res) {
        const { cid, pid } = req.params;
        try {
            const updateCart = await CartRepository.deleteProductInCart(cid, pid);
            res.status(200).json({ "Producto eliminado del carrito": updateCart });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async deleteProductFromGuestCart(req, res) {
        const { guestId, pid } = req.params;
        try {
            const updatedCart = await CartRepository.deleteProductInGuestCart(guestId, pid);
            res.status(200).json({ message: "Producto eliminado del carrito invitado", cart: updatedCart });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async emptyCart(req, res) {
        const { cid } = req.params;
        try {
            const updateCart = await CartRepository.emptyCart(cid);
            res.status(200).json({ "Carrito vacio": updateCart });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async emptyGuestCart(req, res) {
        const { guestId } = req.params;
        try {
            const cart = await CartRepository.emptyGuestCart(guestId);
            res.status(200).json({ message: "Carrito invitado vaciado", cart });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getPaginatedCarts(req, res) {
        try {
            const { page = 1, limit = 10 } = req.query;
            const { carts, pagination } = await CartRepository.getPaginatedCarts({
                page: parseInt(page),
                limit: parseInt(limit)
            });
            res.status(200).json({ status: true, carts, pagination });
        } catch (error) {
            res.status(500).json({
                status: false,
                message: "Error al obtener carritos paginados",
                error: error.message
            });
        }
    }
}

module.exports = new CartController();

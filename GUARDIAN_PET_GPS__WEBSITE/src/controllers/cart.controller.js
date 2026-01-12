const CartRepository = require("../repositories/cart.repository");

class CartController {
    async addProductsToCart(req, res) {
        const cartId = req.params.cid;
        const productId = req.params.pid;
        const quantity = req.body.quantity || 1;
        try {
            await CartRepository.addProductInCart(cartId, productId, quantity);
            res.redirect(`/cart/${cartId}`);
            //res.status(200).json({ message: "producto agregado con exito" });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getProductsToCart(req, res) {
        const cartId = req.params.cid;
        try {
            const products = await CartRepository.getProductsInCart(cartId);
            if (!products) {
                return res.status(404).json({ error: "Carrito no encontrado" });
            }
            res.status(200).json(products);
        } catch (error) {
            res.status(500).send("Error al obtener productos del carrito");
        }
    }

    async deleteProductToCart(req, res) {
        const cartId = req.params.cid;
        const productId = req.params.pid;
        try {
            const updateCart = await CartRepository.deleteProductInCart(cartId, productId);
            res.status(200).json({ "Producto eliminado del carrito": updateCart });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async emptyCart(req, res) {
        const cartId = req.params.cid;
        try {
            const updateCart = await CartRepository.emptyCart(cartId);
            res.status(200).json({ "Carrito vacio": updateCart });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getCartById(req, res) {
        const { cid: cartId } = req.params;

        try {
            const result = await CartRepository.getCartById(cartId);

            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({
                message: "Error al obtener el carrito de compras",
                error: error.message,
            });
        }
    }
}

module.exports = new CartController();
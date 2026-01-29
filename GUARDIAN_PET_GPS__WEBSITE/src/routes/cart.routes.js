const { Router } = require("express");
const CartController = require("../controllers/cart.controller");

const router = Router();

router.post("/:cid/products/:pid", CartController.addProductsToCart);
router.post("/guest/:guestId/products/:pid", CartController.addProductsToGuestCart);
router.get("/", CartController.getPaginatedCarts);
router.get("/:cid", CartController.getProductsToCart);
router.get("/:cid/detail", CartController.getCartById);
router.get("/guest/:guestId", CartController.getCartByGuestId);
router.delete("/:cid/products/:pid", CartController.deleteProductToCart);
router.delete("/:cid", CartController.emptyCart);
router.delete("/guest/:guestId/products/:pid", CartController.deleteProductFromGuestCart);
router.delete("/guest/:guestId", CartController.emptyGuestCart);


module.exports = router;

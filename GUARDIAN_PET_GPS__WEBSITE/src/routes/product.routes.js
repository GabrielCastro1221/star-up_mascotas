const { Router } = require("express");
const ProductController = require("../controllers/product.controller");
const upload = require("../middlewares/cloudinary.middleware");

const router = Router();

router.post(
    "/create",
    upload.fields([
        { name: "image", maxCount: 1 },
        { name: "thumbnails", maxCount: 5 },
    ]),

    ProductController.createProd
);

router.get("/", ProductController.getProducts);
router.get('/search', ProductController.searchProducts);

router.put(
    "/:id",
    upload.fields([
        { name: "image", maxCount: 1 },
        { name: "thumbnails", maxCount: 5 },
    ]),
    ProductController.updateProduct
);
router.put("/featured/:id", ProductController.featuredProduct);
router.put("/new-arrive/:id", ProductController.newArrive);
router.put("/best-seller/:id", ProductController.bestSeller);

router.delete("/:pid", ProductController.deleteProduct);

module.exports = router;
const { Router } = require("express");
const ShippingController = require("../controllers/shipping.controller");

const router = Router();

router.post("/create", ShippingController.createShipping);
router.get("/", ShippingController.getShipping);
router.put("/:id", ShippingController.updateShipping);
router.delete("/:id", ShippingController.deleteShipping);

module.exports = router;
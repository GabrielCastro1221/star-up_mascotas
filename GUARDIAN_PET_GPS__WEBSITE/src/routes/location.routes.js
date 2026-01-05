const { Router } = require("express");
const LocationController = require("../controllers/location.controller");

const router = Router();

router.post("/create", LocationController.createLocation);
router.get("/", LocationController.getLocations);
router.get("/:id", LocationController.getLocation);
router.put("/update/:id", LocationController.updateLocation);
router.delete("/delete/:id", LocationController.deleteLocation);

module.exports = router;

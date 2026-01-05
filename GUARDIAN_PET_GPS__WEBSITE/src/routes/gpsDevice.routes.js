const { Router } = require("express");
const GPSDeviceController = require("../controllers/gpsDevise.controller");

const router = Router();

router.post("/create", GPSDeviceController.createGPSDevice);
router.get("/", GPSDeviceController.getGPSDevices);
router.get("/gps/:id", GPSDeviceController.getGPSDevice);
router.get("/last-location/:id", GPSDeviceController.getLastLocation);
router.get("/history/:id", GPSDeviceController.getHistoricalLocations);
router.put("/update/:id", GPSDeviceController.updateGPSDevice);
router.put("/offline/:id", GPSDeviceController.changeStatusOffline);
router.put("/online/:id", GPSDeviceController.changeStatusOnline);
router.delete("/delete/:id", GPSDeviceController.deleteGPSDevice);

module.exports = router;
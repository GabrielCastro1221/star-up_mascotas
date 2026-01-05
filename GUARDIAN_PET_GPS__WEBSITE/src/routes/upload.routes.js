const { Router } = require('express');
const upload = require("../middlewares/cloudinary.middleware");
const MulterController = require("../controllers/upload.controller");

const router = Router();

router.post(
    "/upload",
    upload.single("foto"),
    MulterController.uploadImage
);

module.exports = router;
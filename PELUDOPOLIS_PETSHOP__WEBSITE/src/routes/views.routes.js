const { Router } = require('express');
const viewsController = require('../controllers/views.controller');

const router = Router();

router.get("/", viewsController.renderIndex);

module.exports = router;
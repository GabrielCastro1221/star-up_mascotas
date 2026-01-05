const express = require('express');
const router = express.Router();
const configPageController = require('../controllers/configPage.controller');

router.post('/', configPageController.create);
router.get('/', configPageController.getAll);
router.get('/:id', configPageController.getById);
router.put('/:id', configPageController.update);
router.delete('/:id', configPageController.delete);

module.exports = router;

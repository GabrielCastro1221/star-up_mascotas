const express = require('express');
const router = express.Router();
const guardianPetConfigController = require('../controllers/guardianPetConfig.controller');

router.post('/', guardianPetConfigController.create);
router.get('/', guardianPetConfigController.getAll);
router.get('/:id', guardianPetConfigController.getById);
router.put('/:id', guardianPetConfigController.update);
router.delete('/:id', guardianPetConfigController.delete);

module.exports = router;

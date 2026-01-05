const { Router } = require("express");
const PetController = require("../controllers/pet.controller");

const router = Router();

router.post("/create", PetController.createPet);
router.get("/", PetController.getPets);
router.get("/pet/:id", PetController.getPet);
router.put("/update/:id", PetController.updatePet);
router.delete("/delete/:id", PetController.deletePet);

module.exports = router;

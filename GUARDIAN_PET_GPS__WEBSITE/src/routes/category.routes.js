const { Router } = require("express");
const CategoryController = require("../controllers/category.controller");

const router = Router();

router.post("/create", CategoryController.createCategory);
router.get("/", CategoryController.getCategories);
router.delete("/:id", CategoryController.deleteCategory);

module.exports = router;

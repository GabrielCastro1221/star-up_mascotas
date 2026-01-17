const { Router } = require("express");
const CategoryController = require("../controllers/category.controller");

const router = Router();

router.post("/create", CategoryController.createCategory);
router.get("/", CategoryController.getCategories);
router.put("/:id", CategoryController.updateCategory);
router.delete("/:id", CategoryController.deleteCategory);

module.exports = router;

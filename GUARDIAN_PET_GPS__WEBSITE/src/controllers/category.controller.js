const CategoryRepository = require("../repositories/category.repository");

class CategoryController {
    async createCategory(req, res) {
        try {
            const categoryData = req.body;
            await CategoryRepository.createCategory(categoryData);
            res.redirect("/perfil-admin");
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getCategories(req, res) {
        try {
            const categories = await CategoryRepository.getCategories();
            if (!categories || categories.length === 0) {
                return res.status(404).json({ message: "No hay categorías disponibles" });
            }
            res.status(200).json({ categories });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async deleteCategory(req, res) {
        try {
            const { id } = req.params;
            const result = await CategoryRepository.deleteCategory(id);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new CategoryController();

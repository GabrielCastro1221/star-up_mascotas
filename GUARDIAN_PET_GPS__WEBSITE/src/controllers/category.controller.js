const CategoryRepository = require("../repositories/category.repository");

class CategoryController {
    async createCategory(req, res) {
        try {
            const categoryData = req.body;
            const newCategory = await CategoryRepository.createCategory(categoryData);
            res.status(201).json({
                message: "Categoría creada con éxito",
                category: newCategory
            });
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

    async updateCategory(req, res) {
        try {
            const { id } = req.params;
            const newData = req.body;
            const updatedCategory = await CategoryRepository.updateCategory(id, newData);
            res.status(200).json({
                message: "Categoría actualizada con éxito",
                category: updatedCategory
            });
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

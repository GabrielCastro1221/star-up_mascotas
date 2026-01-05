const categoryModel = require("../models/category.model");

class CategoryRepository {
    async createCategory(categoryData) {
        try {
            const existingCategory = await categoryModel.findOne({ category: categoryData.category });
            if (existingCategory) {
                throw new Error("La categoria ya existe");
            }
            const newCategory = new categoryModel({
                ...categoryData
            });
            await newCategory.save();
            return newCategory;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async getCategories() {
        try {
            const categories = await categoryModel.find({});
            return categories;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async deleteCategory(categoryId) {
        try {
            const deletedCategory = await categoryModel.findByIdAndDelete(categoryId);
            if (!deletedCategory) {
                throw new Error("La categoría no existe");
            }
            return { message: "Categoría eliminada correctamente" };
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

module.exports = new CategoryRepository();

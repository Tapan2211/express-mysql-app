const categoriesModel = require('../models/categories.model');

const createCategories = async (categories) => {
    return await categoriesModel.createCategories(categories);
}

const getAllCategories = async () => {
    return await categoriesModel.getAllcategories();
}

const getCategoriesById = async (id) => {
    return await categoriesModel.getCategoriesById(id);
}

const getCategoriesbyProductCategoryId = async (product_category_id) => {
    console.log("SERVICE_ID", product_category_id);
    return await categoriesModel.getCategoriesByProductCategoryId(product_category_id);
}

const updateCategoryById = async (id, data) => {
    return await categoriesModel.updateCategoryById(id, data);
}

const deleteCategoryById = async (id) => {
    return await categoriesModel.deleteCategoryById(id);
}

module.exports = {
    createCategories,
    getAllCategories,
    getCategoriesById,
    getCategoriesbyProductCategoryId,
    updateCategoryById,
    deleteCategoryById
}
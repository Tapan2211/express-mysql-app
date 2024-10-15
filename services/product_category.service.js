const categoryModel = require('../models/product_category.model');

const createProductCategory = async (category) => {
    return await categoryModel.createProductCategory(category);
}

const getAllProductsCategory = async () => {
    return await categoryModel.getAllProductsCategory();
}

const getProductsCategoryById = async (id) => {
    console.log("SERVICE_ID", id);
    return await categoryModel.getProductsCategoryById(id);
}

const updateCategory = async (id, category) => {
    return await categoryModel.updateCategory(id, category);
}

const deleteCategory = async (id) => {
    return await categoryModel.deleteCategory(id);
}

module.exports = {
    createProductCategory,
    getAllProductsCategory,
    getProductsCategoryById,
    updateCategory,
    deleteCategory
}
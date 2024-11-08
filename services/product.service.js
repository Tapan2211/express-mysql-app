const productModel = require('../models/product.model');

const createProduct = async (product) => {
    return await productModel.createProduct(product);
}

const getAllProductList = async () => {
    return await productModel.getAllProduct();
}

const getllProductByCategoryId = async (category_id) => {
    console.log("SERVICE_ID", category_id);
    return await productModel.getllProductByCategoryId(category_id);
}

const getProductById = async (id) => {
    console.log("SERVICE_PRODUCT_ID", id);
    return await productModel.getProductById(id);
}

const updateProductById = async (id, product) => {
    return await productModel.updateProductById(id, product);
}

const deleteProductById = async (id) => {
    console.log("SERVICE_ID", id);
    return await productModel.deleteProductById(id);
}

module.exports = {
    createProduct,
    getAllProductList,
    getllProductByCategoryId,
    getProductById,
    updateProductById,
    deleteProductById
}
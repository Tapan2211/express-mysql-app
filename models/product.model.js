const { json } = require('body-parser');
const db = require('../config/database');

const createProduct = async (product) => {

    const { product_name, image, price, brand, description, color, size, ratings, original_price, percentage, category_id } = product;

    const query = `INSERT INTO products (product_name, image, price, brand, description, color, size, ratings, original_price, percentage, category_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const [results] = await db.execute(query, [product_name, image, price, brand, description, color, size, ratings, original_price, percentage, category_id]);

    return results;
}

const getAllProduct = async () => {
    const query = `SELECT * FROM products`;
    const [results] = await db.execute(query);
    return results;
}

const getllProductByCategoryId = async (id) => {
    console.log("MODEL_ID", id);
    const query = `SELECT * FROM products WHERE category_id = ?`;
    const [results] = await db.query(query, [id]);
    return results
}

const getProductById = async (id) => {
    console.log("MODEL_ID_PRODUCT", id);
    const query = `SELECT * FROM products WHERE id= ?`;
    const [results] = await db.execute(query, [id]);
    return results;
}

const updateProductById = async (id, product) => {
    const { product_name, image, price, brand, description, color, size, ratings, original_price, percentage, category_id } = product;

    const jsonColor = JSON.stringify(color);
    const jsonSize = JSON.stringify(size);

    const query = `UPDATE products SET product_name = ?, image = ?, price = ?, brand = ?, description = ?,
    color = ?, size = ?, ratings = ?, original_price = ?, percentage = ?, category_id = ? WHERE id = ?`;
    const [results] = await db.execute(query, [product_name, image, price, brand, description, jsonColor, jsonSize, ratings, original_price, percentage, category_id, id]);
    return results;
}

const deleteProductById = async (id) => {
    console.log("MODEL_ID", id);
    const query = `DELETE FROM products WHERE id = ?`;
    const [results] = await db.execute(query, [id]);
    return results;
}

module.exports = {
    createProduct,
    getAllProduct,
    getllProductByCategoryId,
    getProductById,
    updateProductById,
    deleteProductById
}
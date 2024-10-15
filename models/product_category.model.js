const db = require('../config/database');

const createProductCategory = async (category) => {
    const { category_name, image, description } = category;
    if (!category_name || !image || !description) {
        throw new Error('Category name, image, and description must not be undefined');
    }

    const sql = `INSERT INTO product_category (category_name, image, description) VALUES (?, ?, ?);`
    const [results] = await db.execute(sql, [category_name, image, description]);
    return results;
}

// Get all categories
const getAllProductsCategory = async () => {
    const sql = `SELECT * FROM product_category`;
    const [results] = await db.execute(sql);
    return results;
}

// Get category by ID
const getProductsCategoryById = async (id) => {
    console.log("Model_ID", id);
    const sql = `SELECT * FROM product_category WHERE id = ?`;
    const [results] = await db.execute(sql, [id]);
    return results;
}

// Update a category by ID
const updateCategory = async (id, category) => {
    const { category_name, image, description } = category;
    const sql = 'UPDATE product_category SET category_name = ?, image = ?, description = ? WHERE id = ?';
    const [result] = await db.execute(sql, [category_name, image, description, id]);
    return result;
}

// Delete a category by ID
const deleteCategory = async (id) => {
    const sql = 'DELETE FROM product_category WHERE id = ?';
    const [result] = await db.execute(sql, [id]);
    return result;
};

module.exports = {
    createProductCategory,
    getAllProductsCategory,
    getProductsCategoryById,
    updateCategory,
    deleteCategory
}
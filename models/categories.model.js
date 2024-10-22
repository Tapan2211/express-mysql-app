const db = require('../config/database');

const createCategories = async (categories) => {
    const { category_name, product_category_id, image } = categories;
    if (!category_name || !image || !product_category_id) {
        throw new Error('Category name, image, and product_category_id must not be undefined');
    }
    const sql = `INSERT INTO categories (product_category_id, category_name, image) VALUES (?, ?, ?)`;
    const [results] = await db.execute(sql, [product_category_id, category_name, image]);
    return results;
}

const getAllcategories = async () => {
    const sql = `SELECT * FROM categories`;
    const [results] = await db.execute(sql);
    return results;
}

const getCategoriesById = async (id) => {
    console.log("MODEL_ID", id);
    const sql = `SELECT * FROM categories WHERE id = ?`;
    const [results] = await db.execute(sql, [id]);
    return results;
}

const getCategoriesByProductCategoryId = async (product_category_id) => {
    console.log("MODEL_ID", product_category_id);
    const sql = `SELECT * FROM categories WHERE product_category_id = ?`;
    const [results] = await db.execute(sql, [product_category_id]);
    return results;
}

const updateCategoryById = async (id, categories) => {
    const { product_category_id, category_name, image } = categories; // Destructure here

    const sql = `UPDATE categories SET product_category_id = ?, category_name = ?, image = ? WHERE id = ?`;
    const [results] = await db.execute(sql, [product_category_id, category_name, image, id]);
    return results;

}

const deleteCategoryById = async (id) => {
    const sql = `DELETE FROM categories WHERE id = ?`;
    const [results] = await db.execute(sql, [id]);
    return results;
}


module.exports = {
    createCategories,
    getAllcategories,
    getCategoriesById,
    getCategoriesByProductCategoryId,
    updateCategoryById,
    deleteCategoryById
}
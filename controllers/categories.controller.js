const categorieService = require('../services/categories.service');
const path = require('path');

const createCategories = async (req, res) => {
    try {
        const { category_name, product_category_id } = req.body;  // Added product_category_id here
        const image = req.file ? req.file.filename : null;

        const baseUrl = `${req.protocol}://${req.get('host')}`;
        const imageUrl = image ? `${baseUrl}/uploads/${image}` : null;

        const result = await categorieService.createCategories({ product_category_id, category_name, image });

        // Fetch the newly created category using the insertId
        const newCategory = await categorieService.getCategoriesbyId(result.insertId);

        // Format the response with the category object
        const createdCategory = {
            id: newCategory[0].id,
            category_name: newCategory[0].category_name,
            image: newCategory[0].image ? `${baseUrl}/uploads/${newCategory[0].image}` : null,
            product_category_id: newCategory[0].product_category_id,
        };

        res.status(201).json({
            message: 'Categories created successfully',
            createdCategory
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getAllCategories = async (req, res) => {
    try {
        const categories = await categorieService.getAllCategories();
        if (categories.length === 0) {
            return res.status(404).json({ message: 'Categories not found' });
        }
        const categoriesWithImageURL = categories.map(category => ({
            ...category,
            image: category.image ? `http://localhost:3000/uploads/${category.image}` : null
        }))
        res.status(200).json(categoriesWithImageURL);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getCategoriesById = async (req, res) => {
    try {
        const { id } = req.params;
        const categories = await categorieService.getCategoriesById(id);
        console.log('Controler_id', categories);

        if (categories.length === 0) {
            return res.status(404).json({ message: 'No categories found for this id' });
        }

        const baseUrl = `${req.protocol}://${req.get('host')}`;
        const categoriesWithImageURLs = categories.map(category => ({
            ...category,
            image: category.image ? `${baseUrl}/uploads/${category.image}` : null
        }));

        // Return all matching categories
        res.status(200).json(categoriesWithImageURLs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getCategoriesByProductCategoryId = async (req, res) => {
    try {
        const { product_category_id } = req.params;
        const categories = await categorieService.getCategoriesbyProductCategoryId(product_category_id);

        if (categories.length === 0) {
            return res.status(404).json({ message: 'No categories found for this product_category_id' });
        }

        const baseUrl = `${req.protocol}://${req.get('host')}`;
        const categoriesWithImageURLs = categories.map(category => ({
            ...category,
            image: category.image ? `${baseUrl}/uploads/${category.image}` : null
        }));

        // Return all matching categories
        res.status(200).json(categoriesWithImageURLs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateCategoryById = async (req, res) => {
    try {
        const { category_name, product_category_id } = req.body;
        const categoryId = product_category_id || null;
        const categoryName = category_name ? category_name : null;
        const image = req.file ? req.file.filename : null;
        if (!categoryName) {
            return res.status(400).json({ message: 'category_name must not be null or empty' });
        }

        const updatedCategory = await categorieService.updateCategoryById(req.params.id, { product_category_id: categoryId, category_name: categoryName, image });

        if (updatedCategory.affectedRows === 0) {
            return res.status(404).json({ message: 'Category not found' });
        }

        res.status(200).json({
            message: 'Categories updated successfully',
            category: {
                id: req.params.id,
                category_name: categoryName,
                image: image ? `${req.protocol}://${req.get('host')}/uploads/${image}` : null,
                product_category_id: categoryId
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const deleteCategoryById = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await categorieService.getCategoriesbyId(id);
        const result = await categorieService.deleteCategoryById(id);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Category not found' });
        }
        const baseUrl = `${req.protocol}://${req.get('host')}`;
        const deletedCategories = category[0];
        const imageUrl = `${baseUrl}/uploads/${deletedCategories.image}`;

        const deletedCategory = {
            name: category[0].category_name,
            image: imageUrl,
        };
        res.status(200).json({ message: 'Categories deleted successfully', deletedCategory });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    createCategories,
    getAllCategories,
    getCategoriesById,
    getCategoriesByProductCategoryId,
    updateCategoryById,
    deleteCategoryById
}
const productCategoryService = require('../services/product_category.service');
const path = require('path');

const createProductCategory = async (req, res) => {
    try {
        const { category_name, description } = req.body;
        const image = req.file ? req.file.filename : null;

        const baseUrl = `${req.protocol}://${req.get('host')}`;
        const imageUrl = image ? `${baseUrl}/uploads/${image}` : null;

        const result = await productCategoryService.createProductCategory({ category_name, image, description });
        res.status(201).json({
            message: 'Category created successfully',
            category: {
                category_name, // The name of the category
                image: imageUrl, // The constructed image URL
                description // The description of the category
            }, category_id: result.insertId
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getAllCategories = async (req, res) => {
    try {
        const categories = await productCategoryService.getAllProductsCategory();
        if (categories.length === 0) {
            return res.status(404).json({ message: 'Category not found' });
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

const getCategoryById = async (req, res) => {
    try {
        const category = await productCategoryService.getProductsCategoryById(req.params.id);
        console.log("CONTROLLER_ID", category);
        if (category.length === 0) {
            return res.status(404).json({ message: 'Category not found' });
        }
        category[0].image = category[0].image ? `http://localhost:3000/uploads/${category[0].image}` : null;
        res.status(200).json(category[0]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateCategory = async (req, res) => {
    try {
        const { category_name, description } = req.body;
        const image = req.file ? req.file.filename : null;

        await productCategoryService.updateCategory(req.params.id, { category_name, image, description });
        res.status(200).json({ message: 'Category updated' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await productCategoryService.getProductsCategoryById(id);
        const result = await productCategoryService.deleteCategory(id);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Category not found' });
        }
        const baseUrl = `${req.protocol}://${req.get('host')}`;
        const deletedCategories = category[0];
        const imageUrl = `${baseUrl}/uploads/${deletedCategories.image}`;

        const deletedCategory = {
            name: category[0].category_name,
            image: imageUrl,
            description: category[0].description,
            message: 'Category deleted successfully'
        };
        res.status(200).json({ message: 'Category deleted', deletedCategory });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createProductCategory,
    getAllCategories,
    getCategoryById,
    updateCategory,
    deleteCategory
}
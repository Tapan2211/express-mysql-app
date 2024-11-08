const productService = require('../services/product.service');

const createProduct = async (req, res) => {
    try {
        console.log("ID_PRODUCT", req.body)
        const { product_name, price, brand, description, color, size, ratings, original_price, percentage, category_id } = req.body;
        const image = req.file ? req.file.filename : null;

        if (!product_name || !price || !brand || !description || !original_price || !percentage || !category_id) {
            return res.status(400).json({ message: "All fields are required." });
        }

        const baseUrl = `${req.protocol}://${req.get('host')}`;
        const imageUrl = image ? `${baseUrl}/uploads/${image}` : null;

        const result = await productService.createProduct({
            product_name,
            image,
            price,
            brand,
            description,
            color, // No JSON.stringify here
            size,  // No JSON.stringify here
            ratings,
            original_price,
            percentage,
            category_id
        });

        res.status(201).json({
            message: 'Product created successfully',
            product: {
                product_name,
                image: imageUrl,
                price,
                brand,
                description,
                color, // Keep as array
                size,  // Keep as array
                ratings,
                original_price,
                percentage,
                category_id
            },
            id: result.insertId
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const getAllProduct = async (req, res) => {
    try {
        const products = await productService.getAllProductList();

        if (products.length === 0) {
            return res.status(404).json({ message: 'Products not found' });
        }

        const productWithImageURL = products.map(product => ({
            ...product,
            color: product.color ? JSON.parse(product.color) : [], // Parse JSON string to array
            size: product.size ? JSON.parse(product.size) : [],    // Parse JSON string to array
            image: product.image ? `http://localhost:3000/uploads/${product.image}` : null
        }));

        res.status(200).json(productWithImageURL);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getllProductByCategoryId = async (req, res) => {
    try {
        const { id } = req.params;
        console.log("CATEGORY_ID", id)
        const product = await productService.getllProductByCategoryId(id);
        // console.log("CATEGORYsss_ID", product)
        if (product.length === 0) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const productsWithParsedFields = product.map(product => ({
            ...product,
            color: product.color ? JSON.parse(product.color) : [],
            size: product.size ? JSON.parse(product.size) : [],
            image: product.image ? `http://localhost:3000/uploads/${product.image}` : null
        }));

        res.status(200).json(productsWithParsedFields);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        console.log("PRODUCT_ID", id)
        const product = await productService.getProductById(id);
        console.log("PRODUCTsss_ID", product)
        if (product.length === 0) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Parse color and size JSON strings to arrays, if they exist
        product[0].color = product[0].color ? JSON.parse(product[0].color) : [];
        product[0].size = product[0].size ? JSON.parse(product[0].size) : [];

        // Construct the image URL
        product[0].image = product[0].image ? `http ://localhost:3000/uploads/${product[0].image}` : null;

        res.status(200).json(product[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const updateProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const { product_name, price, brand, description, color, size, ratings, original_price, percentage, category_id } = req.body;
        const image = req.file ? req.file.filename : null;

        if (!product_name || !price || !brand || !description || !original_price || !percentage || !category_id) {
            return res.status(400).json({ message: "All fields are required." });
        }

        const baseUrl = `${req.protocol}://${req.get('host')}`;
        const imageUrl = image ? `${baseUrl}/uploads/${image}` : null;

        const updatedProductData = {
            product_name,
            image,
            price,
            brand,
            description,
            color: Array.isArray(color) ? JSON.stringify(color) : color, // Convert array to JSON string
            size: Array.isArray(size) ? JSON.stringify(size) : size,     // Convert array to JSON string
            ratings,
            original_price,
            percentage,
            category_id
        };

        const result = await productService.updateProductById(id, updatedProductData);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Product not found" });
        }

        const updatedProduct = {
            id,
            product_name,
            image: imageUrl,
            price,
            brand,
            description,
            color: Array.isArray(color) ? color : JSON.parse(color),
            size: Array.isArray(size) ? size : JSON.parse(size),
            ratings,
            original_price,
            percentage,
            category_id
        };

        res.status(200).json({
            message: 'Product updated successfully',
            product: updatedProduct
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const deleteProductById = async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await productService.deleteProductById(productId);

        if (product.length === 0) {
            return res.status(404).json({ message: 'Product not found' });
        }

        await productService.deleteProductById(productId);
        const deletedProduct = {
            ...product[0],
            color: product[0].color ? JSON.parse(product[0].color) : [], // Parse color to array
            size: product[0].size ? JSON.parse(product[0].size) : [],     // Parse size to array
            image: product[0].image ? `http://localhost:3000/uploads/${product[0].image}` : null // Construct image URL
        };
        res.status(200).json({ message: 'Product deleted successfully', deletedProduct });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


module.exports = {
    createProduct,
    getAllProduct,
    getllProductByCategoryId,
    getProductById,
    updateProductById,
    deleteProductById
}
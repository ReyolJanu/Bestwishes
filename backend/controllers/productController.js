// controllers/productController.js
const Product = require("../models/Product");
const path = require('path');

// addProduct.js - admin only
exports.addProduct = async (req, res) => {
  try {
    console.log('Received request body:', req.body);
    console.log('Received files:', req.files);

    // Check for file upload errors
    if (req.fileValidationError) {
      console.error('File validation error:', req.fileValidationError);
      return res.status(400).json({
        success: false,
        message: req.fileValidationError
      });
    }

    if (!req.files || req.files.length === 0) {
      console.error('No files uploaded');
      return res.status(400).json({
        success: false,
        message: "Please upload at least one image"
      });
    }

    const {
      title,
      description,
      mainCategory,
      facets,
      price,
      stock,
      isAvailable,
      rentType,
    } = req.body;

    console.log('Parsed request data:', {
      title,
      description,
      mainCategory,
      facets,
      price,
      stock,
      isAvailable,
      rentType
    });

    // Validate required fields
    if (!title || !description || !mainCategory || !price) {
      console.error('Missing required fields:', { title, description, mainCategory, price });
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields",
      });
    }

    // Parse facets if it's a string
    let parsedFacets = facets;
    if (typeof facets === 'string') {
      try {
        parsedFacets = JSON.parse(facets);
        console.log('Parsed facets:', parsedFacets);
      } catch (e) {
        console.error('Facets parsing error:', e);
        return res.status(400).json({
          success: false,
          message: "Invalid facets format"
        });
      }
    }

    // Create image URLs from uploaded files
    const imageUrls = req.files.map(file => {
      const url = `/uploads/${file.filename}`;
      console.log('Created image URL:', url);
      return url;
    });

    const productData = {
      title,
      description,
      mainCategory,
      facets: parsedFacets,
      price: Number(price),
      imageUrls,
      stock: Number(stock) || 0,
      isAvailable: isAvailable === 'true',
      rentType: rentType || 'none',
      owner: req.user._id,
    };

    console.log('Creating product with data:', productData);

    const product = await Product.create(productData);

    console.log('Product created successfully:', product);

    return res.status(201).json({
      success: true,
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    console.error("Add Product Error Details:", {
      message: error.message,
      stack: error.stack,
      name: error.name
    });
    return res.status(500).json({
      success: false,
      message: "Server error while creating product",
      error: error.message,
    });
  }
};

// get single Product
exports.getProduct = async (req, res) =>{
     try {
    const productId = req.params.id;  

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);  // Send the product data as JSON
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }

}

// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().limit(10); // Fetch all products from the DB

    if (products.length === 0) {
      return res.status(404).json({ message: 'No products found' });
    }

    res.status(200).json(products); // Send all products as JSON
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

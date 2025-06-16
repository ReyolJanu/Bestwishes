const express = require('express');
const router = express.Router();
const { addProduct, getAllProducts } = require('../controllers/productController');
const { isAuthenticated, authorizeRoles } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

// Use multer middleware for file uploads
router.route('/addProduct')
  .post(
    isAuthenticated,
    authorizeRoles('admin'),
    upload.array('images', 5), // Allow up to 5 images
    addProduct
  );

router.route('/getAllProducts').get(getAllProducts);

module.exports = router;

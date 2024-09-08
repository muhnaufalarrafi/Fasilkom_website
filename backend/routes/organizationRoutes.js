// routes/organizationRoutes.js
const express = require('express');
const router = express.Router();
const { upload, handleUploadErrors } = require('../middlewares/uploadMiddleware');
const { verifyToken, isAdmin } = require('../middlewares/authMiddleware');
const organizationController = require('../controllers/organizationController');

// Get all organizations
router.get('/organization', organizationController.getAllOrganizations);

// Get single organization by ID
router.get('/organization/:id', organizationController.getOrganizationById);

// Create a new organization with image upload
router.post('/organization', verifyToken, isAdmin, upload, handleUploadErrors, organizationController.createOrganization);

// Update an existing organization with image upload
router.put('/organization/:id',verifyToken, isAdmin, upload, handleUploadErrors, organizationController.updateOrganization);

// Delete an organization
router.delete('/organization/:id', verifyToken, isAdmin, organizationController.deleteOrganization);

module.exports = router;

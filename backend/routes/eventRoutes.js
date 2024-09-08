// routes/eventRoutes.js
const express = require('express');
const { createEvent, getAllEvents, getEventById, updateEvent, deleteEvent } = require('../controllers/eventController');
const { upload, handleUploadErrors } = require('../middlewares/uploadMiddleware');
const { verifyToken, isAdmin } = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/events', getAllEvents);  // Get all events
router.get('/events/:id', getEventById);  // Get event by ID
router.post(
    '/events',
    verifyToken,                           // Token verification middleware
    isAdmin,
    upload,                                // Multer handles the image and text fields
    handleUploadErrors,                    // Error handling middleware for Multer
    createEvent                            // The actual controller for creating the event
  );
  router.put(
    '/events/:id',
    verifyToken,             // Middleware token
    isAdmin,
    upload,                  // Multer middleware untuk menangani upload file
    handleUploadErrors,       // Middleware error handling
    updateEvent               // Controller untuk update event
);
router.delete('/events/:id', verifyToken,isAdmin, deleteEvent);  // Delete an event

module.exports = router;

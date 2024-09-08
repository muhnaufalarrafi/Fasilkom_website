const express = require('express');
const { createDiscussion, getAllDiscussions, getDiscussionById, updateDiscussion, deleteDiscussion } = require('../controllers/discussionController');
const { uploadMultiple, handleUploadErrors } = require('../middlewares/multipleuploadMiddleware');  // Ensure this is correctly pointing to multipleuploadMiddleware
const { verifyToken } = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/discussions', getAllDiscussions);  // Get all discussions
router.get('/discussions/:id', getDiscussionById);  // Get discussion by ID
router.post(
    '/discussions',
    verifyToken,               // Ensure verifyToken is defined
    uploadMultiple,            // Ensure uploadMultiple is correctly imported
    handleUploadErrors, // Ensure handleUploadErrors is correctly imported
    createDiscussion           // Ensure createDiscussion is correctly imported
);
router.put(
    '/discussions/:id',
    verifyToken,
    uploadMultiple,            
    handleUploadErrors,
    updateDiscussion           // Ensure updateDiscussion is correctly imported
);
router.delete('/discussions/:id', verifyToken, deleteDiscussion);  // Ensure deleteDiscussion is correctly imported

module.exports = router;

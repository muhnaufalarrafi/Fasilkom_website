// routes/newsRoutes.js
const express = require('express');
const { createNews, getAllNews, getNewsById, updateNews, deleteNews } = require('../controllers/newsController');
const { upload, handleUploadErrors } = require('../middlewares/uploadMiddleware');
const { verifyToken, isAdmin } = require('../middlewares/authMiddleware'); // Middleware autentikasi dan admin
const router = express.Router();

router.get('/news', getAllNews);  // Semua pengguna bisa melihat berita
router.get('/news/:id', getNewsById);  // Semua pengguna bisa melihat detail berita
router.post(
  '/news', 
  verifyToken, 
  isAdmin, 
  upload, 
  handleUploadErrors, 
  createNews
);  // Admin bisa menambahkan berita
router.put(
  '/news/:id', 
  verifyToken, 
  isAdmin, 
  upload, 
  handleUploadErrors, 
  updateNews
);  // Admin bisa memperbarui berita
router.delete(
  '/news/:id', 
  verifyToken, 
  isAdmin, 
  deleteNews
);  // Admin bisa menghapus berita

module.exports = router;

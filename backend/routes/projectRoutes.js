// routes/projectRoutes.js
const express = require('express');
const { createProject, getAllProjects, getProjectById, updateProject, deleteProject } = require('../controllers/projectController');
const { verifyToken, isAdmin } = require('../middlewares/authMiddleware');
const { upload, handleUploadErrors } = require('../middlewares/uploadBothMiddleware'); // Middleware yang benar


const router = express.Router();

router.get('/projects', getAllProjects);  // Semua pengguna bisa melihat daftar proyek
router.get('/projects/:id', getProjectById);  // Semua pengguna bisa melihat detail proyek
router.post('/projects/', verifyToken, isAdmin, upload, handleUploadErrors, createProject);  // Rute khusus untuk upload PDF
router.put('/projects/:id', verifyToken, isAdmin, upload, handleUploadErrors, updateProject);  // Admin bisa memperbarui proyek
router.delete('/projects/:id', verifyToken, isAdmin, deleteProject);  // Admin bisa menghapus proyek

module.exports = router;

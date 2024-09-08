// routes/journalRoutes.js
const express = require('express');
const { createJournal, getAllJournals, getJournalById, updateJournal, deleteJournal } = require('../controllers/journalController');
const { verifyToken, isAdmin } = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/journals', getAllJournals);  // Semua pengguna bisa melihat daftar jurnal
router.get('/journals/:id', getJournalById);  // Semua pengguna bisa melihat detail jurnal
router.post('/journals', verifyToken, isAdmin, createJournal);  // Admin bisa menambahkan jurnal
router.put('/journals/:id', verifyToken, isAdmin, updateJournal);  // Admin bisa memperbarui jurnal
router.delete('/journals/:id', verifyToken, isAdmin, deleteJournal);  // Admin bisa menghapus jurnal

module.exports = router;

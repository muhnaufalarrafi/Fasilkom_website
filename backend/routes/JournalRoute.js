import express from "express";
import {
    getJournals,
    getJournalById,
    createJournal,
    updateJournal,
    deleteJournal
} from "../controllers/Journal.js";
import { verifyUser, adminOnly } from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/journals', verifyUser, getJournals);
router.get('/journals/:id', verifyUser, getJournalById);
router.post('/journals', verifyUser, adminOnly, createJournal);
router.patch('/journals/:id', verifyUser, adminOnly, updateJournal);
router.delete('/journals/:id', verifyUser, adminOnly, deleteJournal);

export default router;

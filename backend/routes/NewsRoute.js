import express from "express";
import { body } from "express-validator";
import {
    getNews,
    getNewsById,
    createNews,
    updateNews,
    deleteNews
} from "../controllers/News.js";
import { verifyUser, adminOnly } from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/news', verifyUser, getNews);
router.get('/news/:id', verifyUser, getNewsById);
router.post('/news', [
    verifyUser,
    adminOnly,
    body('title').notEmpty().withMessage('Title is required').isLength({ min: 3 }).withMessage('Title should be at least 3 characters'),
    body('content').notEmpty().withMessage('Content is required'),
    body('date').isDate().withMessage('Date should be a valid date')
], createNews);
router.patch('/news/:id', [
    verifyUser,
    adminOnly,
    body('title').optional().isLength({ min: 3 }).withMessage('Title should be at least 3 characters'),
    body('content').optional().notEmpty().withMessage('Content should not be empty'),
    body('date').optional().isDate().withMessage('Date should be a valid date')
], updateNews);
router.delete('/news/:id', verifyUser, adminOnly, deleteNews);

export default router;

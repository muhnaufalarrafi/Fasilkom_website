import express from "express";
import { body } from "express-validator";
import {
    getEvents,
    getEventById,
    createEvent,
    updateEvent,
    deleteEvent
} from "../controllers/Event.js";
import { verifyUser, adminOnly } from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/events', verifyUser, getEvents);
router.get('/events/:id', verifyUser, getEventById);
router.post('/events', [
    verifyUser,
    adminOnly,
    body('title').notEmpty().withMessage('Title is required').isLength({ min: 3 }).withMessage('Title should be at least 3 characters'),
    body('description').notEmpty().withMessage('Description is required'),
    body('date').isDate().withMessage('Date should be a valid date'),
    body('time').notEmpty().withMessage('Time is required'),
    body('location').notEmpty().withMessage('Location is required')
], createEvent);
router.patch('/events/:id', [
    verifyUser,
    adminOnly,
    body('title').optional().isLength({ min: 3 }).withMessage('Title should be at least 3 characters'),
    body('description').optional().notEmpty().withMessage('Description should not be empty'),
    body('date').optional().isDate().withMessage('Date should be a valid date'),
    body('time').optional().notEmpty().withMessage('Time should not be empty'),
    body('location').optional().notEmpty().withMessage('Location should not be empty')
], updateEvent);
router.delete('/events/:id', verifyUser, adminOnly, deleteEvent);

export default router;

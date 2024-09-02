import express from "express";
import {
    getProjects,
    getProjectById,
    createProject,
    updateProject,
    deleteProject
} from "../controllers/Project.js";
import { verifyUser, adminOnly } from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/projects', verifyUser, getProjects);
router.get('/projects/:id', verifyUser, getProjectById);
router.post('/projects', verifyUser, adminOnly, createProject);
router.patch('/projects/:id', verifyUser, adminOnly, updateProject);
router.delete('/projects/:id', verifyUser, adminOnly, deleteProject);

export default router;

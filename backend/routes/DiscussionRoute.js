import express from "express";
import {
    getDiscussions,
    getDiscussionById,
    createDiscussion,
    updateDiscussion,
    deleteDiscussion,
    addComment,
    deleteComment
} from "../controllers/Discussion.js";
import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/discussions', verifyUser, getDiscussions);
router.get('/discussions/:id', verifyUser, getDiscussionById);
router.post('/discussions', verifyUser, createDiscussion);
router.patch('/discussions/:id', verifyUser, updateDiscussion);
router.delete('/discussions/:id', verifyUser, deleteDiscussion);

router.post('/discussions/:discussionId/comments', verifyUser, addComment);
router.delete('/discussions/:discussionId/comments/:commentId', verifyUser, deleteComment);

export default router;

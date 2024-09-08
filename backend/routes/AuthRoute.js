import express from "express";
import jwt from 'jsonwebtoken';
import argon2 from 'argon2';
import { Login, logOut, Me } from "../controllers/Auth.js";
import { createUser } from "../controllers/Users.js";  // Import createUser function

const router = express.Router();

router.post('/signup', createUser);  // Route for user signup
router.get('/me', Me);
router.post('/login', Login);
router.delete('/logout', logOut);

export default router;

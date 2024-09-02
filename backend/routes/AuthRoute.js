import express from "express";
import jwt from 'jsonwebtoken';
import argon2 from 'argon2';
import { login, logOut, Me } from "../controllers/Auth.js";
import { createUser } from "../controllers/Users.js";  // Import createUser function

const router = express.Router();

router.post('/signup', createUser);  // Route for user signup
router.get('/me', Me);
router.post('/login', login);
router.delete('/logout', logOut);

export default router;

import express from "express";
import jwt from 'jsonwebtoken';
import argon2 from 'argon2';
import {Login, logOut, Me} from "../controllers/Auth.js";

const router = express.Router();

router.get('/me', Me);
router.post('/login', Login);
router.delete('/logout', logOut);

export default router;
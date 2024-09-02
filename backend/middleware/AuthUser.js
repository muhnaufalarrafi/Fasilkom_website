import User from "../models/UserModel.js";
import jwt from "jsonwebtoken";

export const verifyUser = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (!token) return res.status(401).json({ msg: "Mohon login ke akun Anda!" });

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
        if (err) return res.status(403).json({ msg: "Akses terlarang!" });
        
        req.userId = decoded.userId;
        req.role = decoded.role;

        const user = await User.findOne({
            where: {
                uuid: req.userId
            }
        });
        if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });

        next();
    });
}

export const adminOnly = async (req, res, next) => {
    if (req.role !== "admin") return res.status(403).json({ msg: "Akses terlarang" });
    next();
}

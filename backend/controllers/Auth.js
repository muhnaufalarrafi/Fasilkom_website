import User from "../models/UserModel.js";
import argon2 from "argon2";
import jwt from "jsonwebtoken";

export const Login = async (req, res) => {
    const user = await User.findOne({
        where: {
            email: req.body.email
        }
    });
    if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });
    
    const match = await argon2.verify(user.password, req.body.password);
    if (!match) return res.status(400).json({ msg: "Wrong Password" });
    
    const uuid = user.uuid;
    const name = user.name;
    const email = user.email;
    const role = user.role;

    // Generate JWT Token
    const accessToken = jwt.sign({ userId: uuid, name, email, role }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '1h'
    });

    res.status(200).json({ accessToken, uuid, name, email, role });
}

export const Me = async (req, res) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (!token) return res.status(401).json({ msg: "Mohon login ke akun Anda!" });

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
        if (err) return res.status(403).json({ msg: "Akses terlarang!" });
        
        const user = await User.findOne({
            attributes: ['uuid', 'name', 'email', 'role'],
            where: {
                uuid: decoded.userId
            }
        });
        if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });

        res.status(200).json(user);
    });
}

export const logOut = (req, res) => {
    // For JWT, typically we don't handle logout server-side
    res.status(200).json({ msg: "Anda telah logout" });
};

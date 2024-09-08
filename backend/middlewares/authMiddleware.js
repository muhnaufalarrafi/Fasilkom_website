const jwt = require('jsonwebtoken');
const TokenBlacklist = require('../models/tokenBlacklist');

exports.verifyToken = async (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ error: 'No token provided, authorization denied.' });
  }

  try {
    // Cek apakah token sudah di-blacklist
    const blacklistedToken = await TokenBlacklist.findOne({ where: { token } });
    if (blacklistedToken) {
      return res.status(401).json({ error: 'Token has been invalidated, authorization denied.' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

        // Tambahkan log untuk memeriksa apakah req.user terisi
        console.log('Decoded user:', req.user);

    next();
  } catch (error) {
    res.status(401).json({ error: 'Token is not valid.' });
  }
};

exports.isAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Access denied, admin only.' });
  }
  next();
};

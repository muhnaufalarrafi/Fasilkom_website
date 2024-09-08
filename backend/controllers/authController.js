const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/users');
const TokenBlacklist = require('../models/tokenBlacklist');
const logger = require('../logger'); // Import logger
const { body, validationResult } = require('express-validator');

exports.signup = [
    body('username').isLength({ min: 1 }).withMessage('Username must be at least 5 characters long').trim().escape(),
    body('email').isEmail().withMessage('Please provide a valid email').normalizeEmail(),
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long').trim().escape(),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    },

    async (req, res) => {
        const { username, email, password, role } = req.body;

        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = await User.create({ 
                username, 
                email, 
                password: hashedPassword, 
                role: role || 'user'  // Set default role to 'user' if not provided
            });

            logger.info(`User ${username} signed up successfully`); // Log successful signup
            res.status(201).json({ message: 'Registration successful. Please check your email to verify your account.' });
        } catch (error) {
            logger.error(`Signup failed for user ${username}: ${error.message}`); // Log signup error
            res.status(400).json({ error: 'User registration failed.' });
        }
    }
];

exports.login = [
    body('username').notEmpty().withMessage('Username is required').trim().escape(),
    body('password').notEmpty().withMessage('Password is required').trim().escape(),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    },
    
    async (req, res) => {
        const { username, password } = req.body;

        try {
            const user = await User.findOne({ where: { username } });

            if (!user) {
                logger.warn(`Login attempt failed: User ${username} not found`); // Log failed login attempt
                return res.status(400).json({ error: 'User not found.' });
            }

            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                logger.warn(`Login attempt failed: Incorrect password for user ${username}`); // Log failed password match
                return res.status(400).json({ error: 'Incorrect password.' });
            }

            const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

            logger.info(`User ${username} logged in successfully`); // Log successful login
            res.json({ token, user: { id: user.id, username: user.username, role: user.role } });
        } catch (error) {
            logger.error(`Login failed for user ${username}: ${error.message}`); // Log login error
            res.status(400).json({ error: 'Login failed.' });
        }
    }
];

exports.updateUser = [
    // Validasi dan sanitasi input
    body('username').optional().isLength({ min: 1 }).withMessage('Username must be at least 5 characters long').trim().escape(),
    body('email').optional().isEmail().withMessage('Please provide a valid email').normalizeEmail(),
    body('password').optional().isLength({ min: 8 }).withMessage('Password must be at least 8 characters long').trim().escape(),

    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const userId = req.params.id;

        try {
            // Cari user berdasarkan ID
            const user = await User.findByPk(userId);

            if (!user) {
                return res.status(404).json({ error: 'User not found.' });
            }

            // Periksa apakah pengguna yang login adalah pemilik akun atau admin
            if (req.user.id !== user.id && req.user.role !== 'admin') {
                return res.status(403).json({ error: 'Access denied.' });
            }

            const { username, email, password } = req.body;
            if (username) user.username = username;
            if (email) user.email = email;
            if (password) user.password = await bcrypt.hash(password, 10);

            await user.save();

            logger.info(`User ${user.username} updated successfully.`);
            res.status(200).json({ message: 'User updated successfully.', user });

        } catch (error) {
            logger.error(`Signup failed for user ${username}: ${error.message}`);
            res.status(400).json({ error: error.message }); // Output error message untuk membantu debugging
        }
    }
];


exports.logout = async (req, res) => {
    const token = req.header('Authorization').replace('Bearer ', '');

    try {
      // Masukkan token ke dalam blacklist
      await TokenBlacklist.create({ token });
      logger.info(`Token for user ${req.user.username} has been blacklisted and logged out`); // Log successful logout
      res.status(200).json({ message: 'Logged out successfully.' });
    } catch (error) {
      logger.error(`Logout failed: ${error.message}`); // Log logout error
      res.status(500).json({ error: 'Failed to logout user.' });
    }
};

exports.deleteUser = async (req, res) => {
    const userId = req.params.id;

    try {
        // Cari user berdasarkan ID
        const user = await User.findByPk(userId);

        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }

        // Periksa apakah pengguna yang login adalah admin
        if (req.user.role !== 'admin') {
            return res.status(403).json({ error: 'Access denied.' });
        }

        await user.destroy();

        logger.info(`User ${user.username} deleted successfully.`);
        res.status(200).json({ message: 'User deleted successfully.' });

    } catch (error) {
        logger.error(`Failed to delete user ${req.params.id}: ${error.message}`);
        res.status(500).json({ error: 'Failed to delete user.' });
    }
};

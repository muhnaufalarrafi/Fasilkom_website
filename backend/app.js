const express = require('express');
const authRoutes = require('./routes/authRoutes');
const eventRoutes = require('./routes/eventRoutes');
const sequelize = require('./config/config');
const newsRoutes = require('./routes/newsRoutes');  // Import news routes
const journalRoutes = require('./routes/journalRoutes');  // Import rute jurnal
const projectRoutes = require('./routes/projectRoutes');  // Import rute proyek
const discussionRoutes = require ('./routes/discussionRoutes');
const organizationRoutes = require('./routes/organizationRoutes');
const cors = require('cors'); // Import cors


const app = express();

// Gunakan middleware cors
app.use(cors({
  origin: 'http://localhost:3000'
}));
 // Izinkan semua origin, atau bisa juga specify origin tertentu


// Middleware untuk menangani JSON dan form-urlencoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Menyediakan akses ke folder uploads untuk gambar
app.use('/uploads', express.static('uploads'));

// Gunakan route event dan auth
app.use('/api', authRoutes);
app.use('/api', eventRoutes);
app.use('/api', newsRoutes);  // Tambahkan rute berita
app.use('/api', journalRoutes);  // Tambahkan rute jurnal
app.use('/api', projectRoutes);  // Tambahkan rute proyek
app.use('/api', discussionRoutes);
app.use('/api/', organizationRoutes);



// Sinkronisasi dan koneksi ke database
sequelize.sync()
  .then(() => console.log('Database connected'))
  .catch((err) => console.error('Database connection failed:', err));

module.exports = app;

// models/News.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/config'); // Koneksi database

const News = sequelize.define('News', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING, // Optional field untuk menyimpan URL gambar
    allowNull: true,
  },
}, {
  timestamps: true,
});

module.exports = News;

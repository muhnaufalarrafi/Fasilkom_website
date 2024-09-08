// models/Journals.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/config'); // Koneksi ke database

const Journal = sequelize.define('Journal', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  authors: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  abstract: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  uploadDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  downloadLink: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  timestamps: true,
});

module.exports = Journal;

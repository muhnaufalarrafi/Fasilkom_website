const { DataTypes } = require('sequelize');
const sequelize = require('../config/config');  // Impor konfigurasi Sequelize dari file config

const Project = sequelize.define('Project', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  images: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  studentNames: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  pdfLink: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  timestamps: true,
});

module.exports = Project;

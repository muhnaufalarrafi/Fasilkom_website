const { DataTypes } = require('sequelize');
const sequelize = require('../config/config');

const Discussion = sequelize.define('Discussion', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  images: {
    type: DataTypes.JSON, // Store multiple image paths in an array
    allowNull: true,
  },
  author: {
    type: DataTypes.STRING, // The author's username
    allowNull: false,
  }
}, {
  timestamps: true,
});

module.exports = Discussion;

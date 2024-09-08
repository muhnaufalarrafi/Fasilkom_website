// models/Organization.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/config'); // Assuming you're using Sequelize

const Organization = sequelize.define('Organization', {
  personName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  positionName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true,
  }
});

module.exports = Organization;

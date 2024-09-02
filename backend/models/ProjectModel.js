import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Users from "./UserModel.js";

const { DataTypes } = Sequelize;

const Project = db.define('project', {
    uuid: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [3, 255]
        }
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    images: {
        type: DataTypes.JSON, // Store as JSON
        allowNull: true,
    },
    studentNames: {
        type: DataTypes.JSON, // Store as JSON
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    supervisorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Users,
            key: 'id'
        }
    }
}, {
    freezeTableName: true
});

Users.hasMany(Project, { foreignKey: 'userId' });
Project.belongsTo(Users, { foreignKey: 'userId' });

export default Project;

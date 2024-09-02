import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Users from "./UserModel.js";
import Discussion from "./DiscussionModel.js";

const { DataTypes } = Sequelize;

const Comment = db.define('comment', {
    uuid: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true
    },
    createdDate: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
        validate: {
            notEmpty: true
        }
    },
    discussionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Discussion,
            key: 'id'
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

Discussion.hasMany(Comment, { foreignKey: 'discussionId' });
Comment.belongsTo(Discussion, { foreignKey: 'discussionId' });

Users.hasMany(Comment, { foreignKey: 'userId' });
Comment.belongsTo(Users, { foreignKey: 'userId' });

export default Comment;

import Users from "./models/UserModel.js";
import News from "./models/NewsModel.js";
import Event from "./models/EventModel.js";
import Project from "./models/ProjectModel.js";
import Journal from "./models/JournalModel.js";
import Discussion from "./models/DiscussionModel.js";
import Comment from "./models/CommentModel.js";

// Initialize relations
Users.hasMany(News, { foreignKey: 'userId' });
News.belongsTo(Users, { foreignKey: 'userId' });

Users.hasMany(Event, { foreignKey: 'userId' });
Event.belongsTo(Users, { foreignKey: 'userId' });

Users.hasMany(Project, { foreignKey: 'userId' });
Project.belongsTo(Users, { foreignKey: 'userId' });

Users.hasMany(Journal, { foreignKey: 'userId' });
Journal.belongsTo(Users, { foreignKey: 'userId' });

Users.hasMany(Discussion, { foreignKey: 'userId' });
Discussion.belongsTo(Users, { foreignKey: 'userId' });

Discussion.hasMany(Comment, { foreignKey: 'discussionId' });
Comment.belongsTo(Discussion, { foreignKey: 'discussionId' });

Users.hasMany(Comment, { foreignKey: 'userId' });
Comment.belongsTo(Users, { foreignKey: 'userId' });

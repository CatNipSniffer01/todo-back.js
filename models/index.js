// api/models/index.js
const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Import models in singular form...
db.Users = require('./user')(sequelize, Sequelize);       // Model defined in user.js
db.TaskLists = require('./tasklist')(sequelize, Sequelize); // Model defined in tasklist.js
db.Tasks = require('./task')(sequelize, Sequelize);         // Model defined in task.js

// Define associations
db.Users.hasMany(db.TaskLists, { foreignKey: 'owner_Id', onDelete: 'CASCADE' });
db.TaskLists.belongsTo(db.Users, { foreignKey: 'owner_Id' });

db.TaskLists.hasMany(db.Tasks, { foreignKey: 'taskList_Id', onDelete: 'CASCADE' });
db.Tasks.belongsTo(db.TaskLists, { foreignKey: 'taskList_Id' });

module.exports = db;

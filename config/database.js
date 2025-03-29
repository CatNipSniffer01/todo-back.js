const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('todo_app', 'Szakall', 'sajtosstangli', {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306,
    logging: false
});

module.exports = sequelize;

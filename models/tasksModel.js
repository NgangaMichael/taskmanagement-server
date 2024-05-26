// taskModel.js
const Sequelize = require('sequelize');
const { sequelize } = require('../database/dbSetup');

const Task = sequelize.define('Task', {
    issue: Sequelize.STRING,
    phone: Sequelize.STRING,
    email: Sequelize.STRING,
    assignee: Sequelize.STRING,
    category: Sequelize.STRING,
    complainant: Sequelize.STRING,
});

module.exports = Task;
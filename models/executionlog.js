const { Sequelize } = require('sequelize');
const { DataTypes } = require('sequelize');
const sequelize = require('../db/db');

const executionLog = sequelize.define('executionLog', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    jobId:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    status :{
        type: DataTypes.STRING,
        allowNull: false
    },
    timesLeft: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    log: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

module.exports = executionLog;

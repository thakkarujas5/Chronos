const { Sequelize } = require('sequelize');
const { DataTypes } = require('sequelize');
const sequelize = require('../db/db');
const UserJob = require('./userjob')

const Job = sequelize.define('Job', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    script: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    startTime: {
        type: DataTypes.STRING,
        allowNull: false
    },
    executeAgainAfter: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    timesLeft: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'started'
    },
    nextExecutionTime: {
        type: DataTypes.BIGINT,
        allowNull: true
    }
});

Job.hasMany(UserJob, { foreignKey: 'jobid' });
UserJob.belongsTo(Job, { foreignKey: 'jobid' });

module.exports = Job;
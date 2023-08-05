const { Sequelize } = require('sequelize');
const { DataTypes } = require('sequelize');
const sequelize = require('../db/db');
const Job = require('./job')

const UserJob = sequelize.define('UserJob', {

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userid: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    jobid: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
})


module.exports = UserJob;
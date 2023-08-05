const {
    Sequelize,
    DataTypes
} = require('sequelize')

const sequelize = new Sequelize('Capstone', 'root', 'drago1234', {
    host: "localhost",
    dialect: 'mysql',
    logging: false
});

module.exports = sequelize;
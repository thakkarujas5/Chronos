const sequelize = require('../db/db')

async function syncDatabase() {
    try {
        // Synchronize the models with the database
        // The "alter" option will add new columns or modify existing ones without data loss
        await sequelize.sync({
            alter: true
        });

        console.log('Database synchronized successfully.');
    } catch (err) {
        console.error('Error synchronizing the database:', err);
    }
}

module.exports = syncDatabase;
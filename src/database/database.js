const { Sequelize, Model, DataTypes } = require('sequelize');

const DATABASE_URL = "postgres://localhost/postgres" || process.env.DATABASE_URL;

class Database {
    constructor () {
        this.sequelize = new Sequelize(DATABASE_URL, {
            logging: false,
        });
    }

    async init () {
        try {
            await this.sequelize.authenticate();
            console.log("🔗 Connected to the Database!");
        } catch (error) {
            console.error("☠️ Unable to connect to the Database");
            process.exit(1);
        }
    }
}


module.exports = Database;
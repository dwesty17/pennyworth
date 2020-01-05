const { Sequelize } = require("sequelize");
const Umzug = require("umzug");

const { DATABASE_URL } = require("../config");
const { userOptions, userAttributes } = require("./models/user");
const { transactionOptions, transactionAttributes } = require("./models/transaction");
const { budgetOptions, budgetAttributes } = require("./models/budget");
const { User } = require("./models");
const { Transaction } = require("./models");
const { Budget } = require("./models");

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
			console.error("❌ Unable to connect to the Database", error);
			process.exit(1);
		}

		try {
			transactionOptions.sequelize = this.sequelize;
			userOptions.sequelize = this.sequelize;
			budgetOptions.sequelize = this.sequelize;

			User.init(userAttributes, userOptions);
			Transaction.init(transactionAttributes, transactionOptions);
			Budget.init(budgetAttributes, budgetOptions);

			User.hasMany(Transaction);
			Budget.hasMany(Transaction);

			await this.runMigrations();

			console.log("🔮 Initialized data models!");
		} catch (error) {
			console.error("❌ Unable to initialize data models", error);
			process.exit(1);
		}
	}

	async runMigrations () {
		const umzug = new Umzug({
			storage: "sequelize",
			storageOptions: {
				sequelize: this.sequelize,
				tableName: "migrations",
			},
			migrations: {
				params: [
					this.sequelize.getQueryInterface(),
					this.sequelize.constructor,
				],
				path: "./migrations",
				pattern: /^\d+[\w-]+\.js$/,
			},
		});
		await umzug.up({});
	}
}


module.exports = Database;

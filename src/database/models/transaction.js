const { Sequelize } = require("sequelize");

class Transaction extends Sequelize.Model {}

const transactionAttributes = {
	id : {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	transactionTime: {
		type: Sequelize.DATE,
		allowNull: false,
	},
	amount: {
		type: Sequelize.FLOAT,
		allowNull: false,
	},
	transactee: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	description: {
		type: Sequelize.STRING,
		allowNull: false,
	},
};

const transactionOptions = {
	modelName: "transaction",
	underscored: true,
};

module.exports = {
	Transaction,
	transactionAttributes,
	transactionOptions,
};

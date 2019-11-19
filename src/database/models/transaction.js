const { Sequelize } = require("sequelize");

class Transaction extends Sequelize.Model {}

const transactionAttributes = {
    id : {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    type: {
        type: Sequelize.ENUM("CREDIT", "DEBIT"),
        allowNull: false
    },
    transactionTime: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    category: {
        type: Sequelize.ENUM("PAYCHECK", "RENT", "TRANSPORTATION"),
        allowNull: false,
    },
    tags: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: false,
        defaultValue: [],
    },
    transactee: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    transacteeType: {
        type: Sequelize.ENUM("VENDOR", "PERSON", "EMPLOYER"),
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    amount: {
        type: Sequelize.FLOAT,
        allowNull: false,
    },
};

const transactionOptions = {
    modelName: 'transaction',
    underscored: true,
};

module.exports = {
    Transaction,
    transactionAttributes,
    transactionOptions,
};
const { Sequelize } = require("sequelize");

class Transaction extends Sequelize.Model {}

module.exports = {
    Transaction,
};
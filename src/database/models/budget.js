const { Sequelize } = require("sequelize");

class Budget extends Sequelize.Model {}

const budgetAttributes = {
    id : {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    description: {
        type: Sequelize.STRING,
    },
    amount: {
        type: Sequelize.FLOAT,
        allowNull: false,
    },
    timespan: {
        type: Sequelize.ENUM("WEEK", "MONTH", "YEAR"),
        allowNull: false,
    },
};

const budgetOptions = {
    modelName: "budget",
    underscored: true,
};

module.exports = {
    Budget,
    budgetAttributes,
    budgetOptions,
};

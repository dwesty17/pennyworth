const { Op } = require("sequelize");

const { Transaction } = require("../../database/models");

const getAmountSpent = (_, { since }, { user }) => {
    return Transaction.sum("amount", {
        where: {
            userId: user.id,
            budgetId: null,
            transactionTime: {
                [Op.gte]: new Date(parseInt(since)),
            },
        },
    });
};

module.exports = { getAmountSpent };

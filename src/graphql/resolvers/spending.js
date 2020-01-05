const { Op } = require("sequelize");
const moment = require("moment");

const { Transaction } = require("../../database/models");

const getAmountSpent = (_, { from, to }, { user }) => {
    const now = moment().valueOf();
    return Transaction.sum("amount", {
        where: {
            userId: user.id,
            budgetId: null,
            transactionTime: {
                [Op.gte]: new Date(parseInt(from || now)),
                [Op.lte]: new Date(parseInt(to || now)),
            },
        },
    });
};

const getAmountSpentPerDay = (_, { from, to }, { user }) => {
    const now = moment().valueOf();
    return Transaction.sum("amount", {
        where: {
            userId: user.id,
            budgetId: null,
            transactionTime: {
                [Op.gte]: new Date(parseInt(from || now)),
                [Op.lte]: new Date(parseInt(to || now)),
            },
        },
    });
};

module.exports = {
    getAmountSpent,
    getAmountSpentPerDay,
};

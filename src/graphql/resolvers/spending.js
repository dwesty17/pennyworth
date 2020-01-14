const { Op } = require("sequelize");
const moment = require("moment");

const { Transaction } = require("../../database/models");

const getAmountSpent = (_, { from, to }, { user }) => {
    const now = moment().valueOf();
    return Transaction.sum("amount", {
        where: {
            userId: user.id,
            transactionTime: {
                [Op.gte]: new Date(parseInt(from || now)),
                [Op.lte]: new Date(parseInt(to || now)),
            },
        },
    });
};

const getAmountSpentPerDay = (_, { from, to }, { user }) => {
    const amounts = [];
    for (let i = parseInt(from); i <= parseInt(to); i += 1000 * 60 * 60 * 24) {
        amounts.push(
            Transaction.sum("amount", {
                where: {
                    userId: user.id,
                    transactionTime: {
                        [Op.gte]: moment(i).startOf("day"),
                        [Op.lte]: moment(i).endOf("day"),
                    },
                },
            })
        );
    }
    return Promise.all(amounts);
};

module.exports = {
    getAmountSpent,
    getAmountSpentPerDay,
};

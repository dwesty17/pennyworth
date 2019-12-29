const { Transaction } = require("../../database/models");

const getTransactions = (_, __, { user }) => {
    return Transaction.findAll({
        where: { userId: user.id },
        order: [ ["transactionTime", "DESC"] ],
    });
};

const createTransaction = async (_, { transaction }, { user }) => {
    transaction.userId = user.id;
    transaction.transactionTime = parseInt(transaction.transactionTime);
    return Transaction.create(transaction);
};

const transactionTime = (transaction) => {
    return transaction.transactionTime.valueOf().toString();
};

module.exports = {
    getTransactions,
    createTransaction,
    transactionTime,
};

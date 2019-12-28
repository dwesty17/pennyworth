const { Transaction } = require("../../database/models");

const getTransactions = (_, __, { user }) => {
    return Transaction.findAll({
        where: { userId: user.id },
    });
};

const createTransaction = async (_, { transaction }, { user }) => {
    transaction.userId = user.id;
    transaction.transactionTime = parseInt(transaction.transactionTime);
    return Transaction.create(transaction);
};

const updateTransaction = async (_, { id, transaction }, { user }) => {
    return Transaction.update(transaction, {
        where: { id, userId: user.id },
    });
};

const deleteTransaction = async (_, { id }, { user }) => {
    return Transaction.destroy({
        where: { id, userId: user.id },
    });
};

const transactionTime = (transaction) => {
    return transaction.transactionTime.valueOf().toString();
};

module.exports = {
    getTransactions,
    createTransaction,
    updateTransaction,
    deleteTransaction,
    transactionTime,
};

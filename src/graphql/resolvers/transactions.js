const { Transaction } = require("../../database/models");

const getTransactions = () => {
    return Transaction.findAll();
};

const createTransaction = async (_, { transactionInput }) => {
    return Transaction.create(transactionInput);
};

const updateTransaction = async (_, { id, transactionInput }) => {
    return Transaction.update(transactionInput, { where: { id } });
};

const deleteTransaction = async (_, { id }) => {
    return Transaction.destroy({ where: { id } });
};

module.exports = {
    getTransactions,
    createTransaction,
    updateTransaction,
    deleteTransaction,
};
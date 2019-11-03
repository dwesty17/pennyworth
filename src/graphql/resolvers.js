const { Transaction } = require("../database/models");

const resolvers = {
    Query: {
        async getTransactions() {
            return Transaction.findAll();
        },
    },
    Mutation: {
        async createTransaction(_, { transactionInput }) {
            return Transaction.create(transactionInput);
        },
        async updateTransaction(_, { id, transactionInput }) {
            return Transaction.update(transactionInput, { where: { id } });
        },
        async deleteTransaction(_, { id }) {
            return Transaction.destroy({ where: { id } });
        },
    },
};

module.exports = resolvers;
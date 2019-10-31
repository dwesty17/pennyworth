const resolvers = {
    Query: {
        getTransactions() {},
    },
    Mutation: {
        createTransaction(_, { transactionInput }) {},
        updateTransaction(_, { id, transactionInput }) {},
        deleteTransaction(_, { id }) {},
    },
};

module.exports = resolvers;
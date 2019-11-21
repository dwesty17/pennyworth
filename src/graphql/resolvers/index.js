const { authenticated } = require("../auth-gaurd");
const { getUser, createUser } = require("./users");
const {
    getTransactions,
    createTransaction,
    updateTransaction,
    deleteTransaction,
} = require("./transactions");

const resolvers = {
    Query: {
        getUser,
        getTransactions: authenticated(getTransactions),
    },
    Mutation: {
        createUser,
        createTransaction: authenticated(createTransaction),
        updateTransaction: authenticated(updateTransaction),
        deleteTransaction: authenticated(deleteTransaction),
    },
};

module.exports = resolvers;
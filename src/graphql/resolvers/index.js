const { authenticated } = require("../auth-gaurd");
const { loginUser, createUser } = require("./users");
const {
    getTransactions,
    createTransaction,
    updateTransaction,
    deleteTransaction,
} = require("./transactions");

const resolvers = {
    Query: {
        loginUser,
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

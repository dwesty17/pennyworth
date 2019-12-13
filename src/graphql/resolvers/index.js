const { authenticated } = require("../auth-gaurd");
const {
    loginUser,
    getUser,
    createUser,
} = require("./users");
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
        loginUser,
        createTransaction: authenticated(createTransaction),
        updateTransaction: authenticated(updateTransaction),
        deleteTransaction: authenticated(deleteTransaction),
    },
};

module.exports = resolvers;

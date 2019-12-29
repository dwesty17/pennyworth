const { authenticated } = require("../auth-gaurd");
const {
    getUser,
    loginUser,
    createUser,
    updateUser,
} = require("./users");
const {
    getTransactions,
    createTransaction,
    updateTransaction,
    deleteTransaction,
    transactionTime,
} = require("./transactions");
const { getAmountSpent } = require("./getAmountSpent");

const resolvers = {
    Query: {
        getUser,

        getTransactions: authenticated(getTransactions),

        getAmountSpent: authenticated(getAmountSpent),
    },
    Mutation: {
        loginUser,
        createUser,
        updateUser: authenticated(updateUser),

        createTransaction: authenticated(createTransaction),
        updateTransaction: authenticated(updateTransaction),
        deleteTransaction: authenticated(deleteTransaction),
    },
    Transaction: {
        transactionTime,
    },
};

module.exports = resolvers;

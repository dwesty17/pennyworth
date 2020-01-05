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
    transactionTime,
} = require("./transactions");
const { getBudgets } = require("./budgets");
const { getAmountSpent } = require("./getAmountSpent");

const resolvers = {
    Query: {
        getUser,
        getTransactions: authenticated(getTransactions),
        getBudgets: authenticated(getBudgets),
        getAmountSpent: authenticated(getAmountSpent),
    },
    Mutation: {
        loginUser,
        createUser,
        updateUser: authenticated(updateUser),
        createTransaction: authenticated(createTransaction),
    },
    Transaction: {
        transactionTime,
    },
};

module.exports = resolvers;

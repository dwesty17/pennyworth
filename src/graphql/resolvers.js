const bcrypt = require("bcrypt");

const { Transaction, User } = require("../database/models");

const authenticated = (resolver) => (root, args, context, info) => {
    if (!context.currentUser) {
        throw new Error("Unauthenticated!");
    }

    return resolver(root, args, context, info);
};

const resolvers = {
    Query: {
        getUser: async (_, { user }) => {
            try {
                const matchingUser = await User.findOne({ where: { user: user.email } });
                if (!matchingUser || matchingUser.isSuspended) {
                    return;
                }

                const passwordMatch = bcrypt.compare(user.password, matchingUser.password);

                if (passwordMatch) {
                    const token = matchingUser.generateAuthToken();
                    return { token, ...matchingUser };
                }
            } catch (error) {
                console.error(error);
            }
        },
        getTransactions: authenticated(async () => {
            return Transaction.findAll();
        }),
    },
    Mutation: {
        createUser: async (_, { user }) => {
            try {
                const existingUser = await User.findOne({ where: { email: user.email }});
                if (existingUser) {
                    console.error("👯 User already exists");
                    return;
                }

                user.password = await bcrypt.hash(user.password, 10);
                const newUser = await User.create(user);
                const token = newUser.generateAuthToken();

                return { token, ...newUser };
            } catch (error) {
                console.error(error);
            }
        },
        createTransaction: authenticated(async (_, { transactionInput }) => {
            return Transaction.create(transactionInput);
        }),
        updateTransaction: authenticated(async (_, { id, transactionInput }) => {
            return Transaction.update(transactionInput, { where: { id } });
        }),
        deleteTransaction: authenticated(async (_, { id }) => {
            return Transaction.destroy({ where: { id } });
        }),
    },
};

module.exports = resolvers;
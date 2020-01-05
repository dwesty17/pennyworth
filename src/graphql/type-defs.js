const { gql } = require("apollo-server");

const typeDefs = gql`
    type Query {
        getUser: User
        getTransactions: [ Transaction! ]
        getBudgets: [ Budget! ]
        getAmountSpent(since: String!): Float!
    }

    type Mutation {
        loginUser (user: UserInput!): User
        createUser (user: UserInput!): User
        updateUser (updatedUser: UserInput!): User
        createTransaction (transaction: TransactionInput!): Transaction!
    }

    type User {
        id: ID!
        email: String!
        token: String
        isAdmin: Boolean!
        monthlySpendingGoal: Float
    }
    
    input UserInput {
        email: String
        password: String
        monthlySpendingGoal: Float
    }

    type Transaction {
        id: ID!
        transactionTime: String!
        amount: Float!
        transactee: String!
        description: String!
    }

    input TransactionInput {
        transactionTime: String!
        amount: Float!
        transactee: String!
        description: String!
    }
    
    type Budget {
        id: ID!
        name: String!
        description: String
        amount: Float!
        timespan: Timespan!
    }
    
    enum Timespan {
        WEEK
        MONTH
        YEAR
    }
`;

module.exports = typeDefs;

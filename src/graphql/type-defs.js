const { gql } = require("apollo-server");

const typeDefs = gql`
    type Query {
        getUser(user: UserInput): User
        
        getTransactions: [ Transaction! ]
    }

    type Mutation {
        createUser(user: UserInput): User
        
        createTransaction(transaction: TransactionInput): Transaction!
        updateTransaction(id: ID, transaction: TransactionInput): Transaction!
        deleteTransaction(id: ID): Transaction
    }

    type User {
        id: ID!
        email: String!
        token: String!
        isAdmin: Boolean!
    }

    input UserInput {
        email: String!
        password: String!
    }

    type Transaction {
        id: ID!
        type: TransactionType!
        transactionTime: Int!
        category: TransactionCategory
        tags: [ String! ]
        transactee: String! # TODO should have types for different vendors
        transacteeType: TransacteeType
        description: String!
        amount: Float!
    }

    input TransactionInput {
        type: TransactionType!
        transactee: String!
        description: String!
        amount: Float!
        timestamp: Int!
    }

    enum TransactionCategory {
        PAYCHECK
        RENT
        TRANSPORTATION
    }

    enum TransactionType {
        CREDIT
        DEBIT
    }

    enum TransacteeType {
        VENDOR
        PERSON
        EMPLOYER
    }
`;

module.exports = typeDefs;
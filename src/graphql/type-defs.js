const { gql } = require('apollo-server');

const typeDefs = gql`
    type Query {
        getTransactions: [ Transaction! ]
    }
    
    type Mutation {
        createTransaction(transaction: TransactionInput): Transaction!
        updateTransaction(id: ID, transaction: TransactionInput): Transaction!
        deleteTransaction(id: ID): Transaction
    }
    
    type Transaction {
        id: ID!
        type: TransactionType!
        timestamp: Int!
        category: TransactionCategory
        tags: [ String! ]
        transactee: String!
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
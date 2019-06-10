const { buildSchema } = require("graphql");

module.exports = buildSchema(`
    type Client {
        id: String!
        name: String!
        role: String!
        email: String!
    }

    type Policy {
        id: String!
        amountInsured: Float!
        email: String!
        inceptionDate: String!
        installmentPayment: String!
        clientId: String!
    }

    type User {
        id: String!
        name: String!
        role: String!
    }

    input UserInput {
        id: String!
        name: String!
        role: String!
    }

    type RootQuery {
        clients: [Client!]!
        policies: [Policy!]!
        clientsById(id: String!): Client
        clientsByName(name: String!): Client
    }

    type RootMutation {
        createUser(userInput: UserInput): User
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
    `);

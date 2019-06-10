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

    type RootQuery {
        clients: [Client!]!
        policies: [Policy!]!
    }

    schema {
        query: RootQuery
    }
    `);

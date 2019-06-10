const { buildSchema } = require("graphql");

module.exports = buildSchema(`
    type Client {
        id: String!
        name: String!
        role: String!
        email: String!
    }

    type RootQuery {
        clients: [Client!]!
    }

    schema {
        query: RootQuery
    }
    `);

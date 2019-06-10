const express = require("express");
const bodyParser = require("body-parser");
const graphqlHttp = require("express-graphql");
const mongoose = require("mongoose");

const isAuth = require("./middleware/is-auth");

const graphQLSchema = require("./graphql/schema/index");
const graphQLResolvers = require("./graphql/resolvers/index");

const app = express();

app.use(bodyParser.json());

app.use(isAuth);

app.use(
  "/graphql",
  graphqlHttp({
    schema: graphQLSchema,
    rootValue: graphQLResolvers,
    graphiql: true
  })
);

mongoose
  .connect(
    `mongodb+srv://andrea:tester88@cluster0-pud7f.mongodb.net/clientes?retryWrites=true&w=majority`
  )
  .then(() => {
    app.listen(8000, () => console.log("Server listening"));
  })
  .catch(err => {
    console.log(err);
  });

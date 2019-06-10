const fs = require("fs");
const jwt = require("jsonwebtoken");
const User = require("../../models/user");

// parsing JSON data stored in JSON files
const customers = JSON.parse(fs.readFileSync("./customers.json", "utf8"));
const policies = JSON.parse(fs.readFileSync("./policies.json", "utf8"));

module.exports = {
  // fetching Customer list
  clients: () => {
    return customers;
  },

  // fetching Policy list
  policies: () => {
    return policies;
  },

  // function to fetch single Customer => Customer ID as input
  clientsById: ({ id }) => {
    const customerId = customers.find(client => {
      return client.id === id;
    });
    return customerId;
  },

  // function to fetch single Customers => Customer Name as input
  clientsByName: ({ name }) => {
    const customerName = customers.find(client => {
      return client.name === name;
    });
    return customerName;
  },

  // function to fetch Policies related to Single customer => Customer Name as input
  policyByName: ({ name }, req) => {
    if (req.role !== "admin") {
      throw new Error(
        "You are not an Admin and you don't have permissions to read this data"
      );
    }
    const customer = customers.find(c => {
      return name === c.name;
    });
    const policy = policies.filter(p => {
      return customer.id === p.clientId;
    });
    return policy;
  },

  // function to fetch User related to Policies => Policy ID as input
  userByPolicy: ({ policy }, req) => {
    if (req.role !== "admin") {
      throw new Error(
        "You are not an Admin and you don't have permissions to read this data"
      );
    }
    const policyId = policies.find(p => {
      return policy === p.id;
    });
    const customer = customers.find(c => {
      return policyId.clientId === c.id;
    });
    return customer;
  },

  // function to create a new User and save it into the Database
  createUser: async args => {
    try {
      const existingUser = await User.findOne({ id: args.userInput.id });
      if (existingUser) {
        throw new Error("User already exist");
      }
      const user = new User({
        id: args.userInput.id,
        name: args.userInput.name,
        role: args.userInput.role
      });
      return user.save();
    } catch (err) {
      throw err;
    }
  },

  // function to login a created User, storing the token into it
  login: async ({ id }) => {
    const user = await User.findOne({ id: id });
    if (!user) {
      throw new Error("User does not exist");
    }
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      "examplekeytomatch"
    );

    return { id: user.id, name: user.name, role: user.role, token: token };
  }
};

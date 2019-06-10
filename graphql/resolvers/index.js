const fs = require("fs");
const User = require("../../models/user");

const customers = JSON.parse(fs.readFileSync("./customers.json", "utf8"));
const policies = JSON.parse(fs.readFileSync("./policies.json", "utf8"));

module.exports = {
  clients: () => {
    return customers;
  },

  policies: () => {
    return policies;
  },

  clientsById: ({ id }) => {
    const customerId = customers.find(client => {
      return client.id === id;
    });
    return customerId;
  },

  clientsByName: ({ name }) => {
    const customerName = customers.find(client => {
      return client.name === name;
    });
    return customerName;
  },

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
  }
};

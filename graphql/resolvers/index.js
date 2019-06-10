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

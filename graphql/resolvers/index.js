const fs = require("fs");

const customers = JSON.parse(fs.readFileSync("./customers.json", "utf8"));
const policies = JSON.parse(fs.readFileSync("./policies.json", "utf8"));

module.exports = {
  clients: () => {
    return customers;
  },

  policies: () => {
    return policies;
  }
};

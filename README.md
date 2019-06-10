# Test AXA Backend - Node.js, GraphQL, MongoDB

Backend Test Application using Node.js, GraphQL and MongoDB

## Installation

Git Clone the Project and then run

```bash
NPM INSTALL
```

to download all the dependencies needed.

## Usage

In order to read the Client List and the Policy List, we will be using the GraphQL Tool at this url:
http://localhost:8000/graphql

Here, on the left hand side, we will be writing the queries and mutations.
In order to run successfully the queries, we will need to write the query (as shown below) on the left hand side
panel and click on the 'play' button to see the results on the right hand side panel.

Here is the list of queries and how to write them in order to fetch data/

### Queries:

CLIENTS LIST:

```
{
    clients {
        id
        name
        email
        role
    }
}
```

POLICIES LIST:

```
{
    policies {
        id
        amountInsured
        email
        inceptionDate
        installmentPayment
   	    clientId
    }
}
```

CLIENT BY NAME:
The name of the user (between double quotes) can be changed. Barnett is just an example.

```
{
  clientsByName(name: "Barnett") {
    id
    name
    role
    email
  }
}
```

CLIENT BY ID:
The id of the user (between double quotes) can be changed. This one is just an example.

```
{
  clientsById(id: "a3b8d425-2b60-4ad7-becc-bedf2ef860bd") {
    id
    name
    role
    email
  }
}
```

### Mutation:

CREATE USER:
This mutation has been created in order to Sign Up with two Users (the data has been taken from the Customers list) with different roles: one will have the 'Admin' role and the other one will have the simple 'User' role.
In this way, we will be able to differentiate the permissions and authorizations regarding the list of policies linked to other Users.

```
mutation {
  createUser(userInput: { id: "a0ece5db-cd14-4f21-812f-966633e7be86",  name: "Britney", role: "admin"}) {
    id
    name
    role
  }
}
```

However, the Users taken (one is 'Britney' with 'Admin' permissions and the other one is 'Barnett' with 'User' permissions) are already registered in the MongoDB database, so there is no need to Sign them Up again.

## Author

Andrea Belluccia

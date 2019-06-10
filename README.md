# Test AXA Backend - Node.js, GraphQL, MongoDB

Backend Test Application using Node.js, GraphQL and MongoDB

## Installation

Git Clone the Project and then run

```bash
npm install
```

to download all the dependencies needed, and then run

```bash
npm start
```

to start the Server, which will be running on port 8000.

## Usage

In order to read the Client List and the Policy List, we will be using the GraphQL Tool at this url:
http://localhost:8000/graphql

Here, on the left hand side, we will be writing the queries and mutations.
In order to run successfully the queries, we will need to write the query (as shown below) on the left hand side
panel and click on the 'play' button to see the results on the right hand side panel.
On MAC, pressing 'option + space', we can get autocompletion and suggestions.

Here is the list of queries and how to write them in order to fetch data.

### POSTMAN

As we don't have a frontend in this App, we will need to use Postman (or any other tool) in order to authenticate our Users and read permissions (Admin or User) and, therefore, fetch the data related to the policies.

Here is how to proceed with Postman.

- POST request to: http://localhost:3000/graphql
- go to BODY section
- set the body to RAW and select JSON(application/json)
- write the query in the space as the example that follows:
  Britney => Admin permissions:

```
{
	"query": "query { login(id: \"a0ece5db-cd14-4f21-812f-966633e7be86\") { token }}"
}
```

Barnett => User permissions

```
{
	"query": "query { login(id: \"a3b8d425-2b60-4ad7-becc-bedf2ef860bd\") { token }}"
}
```

- send the POST request
- copy the token shown below in the Body of the response
- go to HEADER
- add another field named 'Authorization as key;
- in the value input, write 'Bearer + space + paste the Token'
- go back to the BODY section
- write the query in the space as the example that follows:

```
{
	"query": "query { policyByName(name: \"Britney\") { id, amountInsured, email, inceptionDate, installmentPayment, clientId } }"
}
```

### Queries:

#### CLIENTS LIST:

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

#### POLICIES LIST:

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

#### CLIENT BY NAME:

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

#### CLIENT BY ID:

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

#### LOGIN:

The login, just for this project purpose, works with the ID only.
For now, due to the fact the only 'Britney' and 'Barnett', we can only login with these two Users.
We can add more Users using the 'createUser' Mutation anyway.
We set a token, so our program will know when a User is authenticated, reading the permissions of that particular user.

```
{
  login(id: "a0ece5db-cd14-4f21-812f-966633e7be86") {
    id
    name
    token
    role
  }
}
```

#### POLICY BY NAME:

With this query, we can fetch all the related Policies linked to a single User, typing its name (between double quotes). Obviously, we can change the name to see other policies linked to that specific other user.

```
{
  policyByName(name: "Britney") {
    id
    amountInsured
    email
    inceptionDate
    installmentPayment
    clientId
  }
}
```

#### USERS BY POLICY:

With this query, we can fetch the name of the User linked to the Policy ID we specified between double quotes.

```
{
  userByPolicy(policy: "64cceef9-3a01-49ae-a23b-3761b604800b") {
    id
    name
    role
    email
  }
}
```

### Mutation:

#### CREATE USER:

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

### Andrea Belluccia

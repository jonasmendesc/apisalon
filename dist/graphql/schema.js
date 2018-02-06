"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_tools_1 = require("graphql-tools");
const users = [
    {
        id: 1,
        name: 'Jon',
        email: 'emaildojon'
    }
];
const typeDefs = `
  # Objeto que representa um usuario
  type Users{
    # Identificador do usuário
    id: ID!
    # Nome do usuário
    name: String!
    # Email do usuário
    email: String!
  }

  type Query{
    allUsers: [Users!]!
  }

`;
const resolvers = {
    Query: {
        allUsers: () => users
    }
};
exports.default = graphql_tools_1.makeExecutableSchema({ typeDefs, resolvers });

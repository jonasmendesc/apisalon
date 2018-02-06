import  { makeExecutableSchema } from 'graphql-tools'

const users: any[] = [
  {
    id: 1,
    name: 'Jon',
    email: 'emaildojon'
  }
]

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
}

export default makeExecutableSchema({typeDefs, resolvers});

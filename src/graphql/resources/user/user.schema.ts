const userTypes = `
  # Usuário
  type User {
    # Identificador do Usuário
    id: ID!
    # Nome do Usuário
    name: String!
    # Email do Usuário
    email: String!
    # Foto (Não Obrigatório)
    photo: String
    # Senha para o Usuário
    password: String!
    # Data de criação do Usuário
    createdAt: String!
    # Data da atualização do Usuário
    updatedAt
    companyId: Company!
  }

  # Dados para criar um usuário
  input UserCreateInput{
      # Nome do Usuário
      name: String!
      # Email do Usuário
      email: String!
      # Senha do usuário
      password: String!
  }
 # Dados para atualizar um usuário
  input UserUpdateInput {
      # Nome do Usuário
      name: String!
      # Email do Usuário
      email: String!
      # Foto do usuário
      photo: String!
  }
  
  # Dados para a atualização de senha
  input UpdatePasswordInput {
    # Novo password
    password: String!
  }

`;

const userQueries = `
  # Retorna o usuário pelo ID
  user(id: ID!): User!
  # Retorna consulta todos os usuários
  users(first: Int, offset: Int): [ User! ]!
`;

const userMutation = `
  createUser(input: UserCreateInput!) : User
  updateUser(input: UserUpdateInput): User
  updateUserPassword(input: UpdatePasswordInput!) : Boolean
`;

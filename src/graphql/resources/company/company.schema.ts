const companyTypes = `
  # Definição para o tipo empresa
  type Company{
      # Identificador da empresa
      id: ID!
      # Nome da empresa
      name: String!
      # Email da empresa
      email: String!
      # Senha para a empresa
      password: String!
      # Data de criação da empresa
      createdAt: String!
      # Data da atualização da empresa
      updatedAt
  }

input CompanyCreateInput{
    name: String!
    email: String!
    password: String!
}

input CompanyUpdateInput{
    name: String!
    email: String!
}

input CompanyUpdateInput{
  password: String!
}
`;

const companiesQueries = `
    # Retorna a empresa pelo seu id
    company(id: ID!): Company
`;

const companiesMutations = `
    # Cria uma empresa no banco de dados e retorna a empresa criada
    createCompany(input: CompanyCreateInput!): Company!
    # Atualiza os dados da empresa e retorna a empresa criada exceto Password
    updateCompany(input: CompanyUpdateInput!): Company!
    # Atualiza o password da empresa e retorna true para sucesso ou false para falha
    updatePassword(input: CompanyUpdateInput!): Boolean
`;

export { companyTypes, companiesQueries, companiesMutations }

export const schema = `#graphql
# Custom scalars
directive @email on SCALAR
scalar Email @email

type User {
  id: ID!
  email: Email!
  createdAt: String!
  token: String
}

input AuthInput {
  email: Email!
  password: String!
}

type Query {
  user: User
}

type Mutation {
  signIn(input: AuthInput): User 
  signUp(input: AuthInput): User
}
`

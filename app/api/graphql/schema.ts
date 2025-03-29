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

enum STATUS {
  BACKLOG
  TODO
  INPROGRESS
  DONE
}

type Issue {
  id: ID!
  name: String!
  userId: ID!
  projectId: ID!
  content: String!
  status: STATUS
  createdAt: String!
  user: User!
}

input AuthInput {
  email: Email!
  password: String!
}

input CreateIssueInput {
  name: String!
  content: String!
  status: STATUS
}

type Query {
  user: User
  issues: [Issue]!
}

type Mutation {
  signIn(input: AuthInput!): User 
  signUp(input: AuthInput!): User
  createIssue(input: CreateIssueInput!): Issue
}
`

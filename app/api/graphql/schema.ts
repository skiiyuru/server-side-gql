export const schema = `#graphql
# Custom scalars
directive @email on SCALAR
scalar Email @email

type User {
  id: ID!
  email: Email!
  createdAt: String!
  token: String
  issues: [Issue]!
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

input IssuesFilterInput {
  statuses: [STATUS!]
}

input EditIssueInput {
  id: ID!
  status: STATUS
  name: String
  content: String
}

type Query {
  user: User
  issues(input: IssuesFilterInput): [Issue]!
}

type Mutation {
  signIn(input: AuthInput!): User 
  signUp(input: AuthInput!): User
  createIssue(input: CreateIssueInput!): Issue
  editIssue(input: EditIssueInput!): Issue!
}
`

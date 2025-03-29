import Issue from '@/app/_components/Issue'
import { db } from '@/db/db'
import { InsertIssues, SelectIssues, issues, users } from '@/db/schema'
import { GQLContext } from '@/types'
import { getUserFromToken, signin, signup } from '@/utils/auth'
import { and, asc, desc, eq, or, sql } from 'drizzle-orm'
import { GraphQLError } from 'graphql'

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

export const resolvers = {
  // Resolve custom scalars
  Email: {
    //For outgoing responses
    serialize: (value: string) => {
      if (emailRegex.test(value)) {
        return value
      }
      throw new Error('Invalid email format')
    },
    // For incoming variables
    parseValue: (value: string) => {
      if (emailRegex.test(value)) {
        return value
      }
      throw new Error('Invalid email format')
    },
    // For inline arguments
    parseLiteral: (ast: any) => {
      if (ast.kind === 'StringValue' && emailRegex.test(ast.value)) {
        return ast.value
      }
      throw new Error('Invalid email format')
    }
  },

  STATUS: {
    BACKLOG: 'backlog',
    TODO: 'todo',
    INPROGRESS: 'inprogress',
    DONE: 'done'
  },

  Issue: {
    user: async (issue, _, context: GQLContext) => {
      if (!context.user) {
        throw new GraphQLError('UNAUTHORIZED', {extensions: {code: 401}})
      }

      const user = await db.query.users.findFirst({
        where: eq(users.id, issue.userId)
      })

      return user
    }
  },

  Query: {
    user: (_, __, context: GQLContext) => {
      return context.user
    },

    issues: async (_, __, context: GQLContext) => {
    }
  },

  Mutation: {
    signIn: async (_, {input}, context) => {
      const data = await signin(input)

      if (!data || !data.token || !data.user) {
        // recommended to throw GQL errors; more control
        throw new GraphQLError('UNAUTHORIZED', {extensions: {code: 401}})
      }

      return {...data.user, token: data.token}

    },
    
    signUp: async (_, {input}, context) => {
      const data = await signup(input)

      if (!data || !data.token || !data.user) {
        throw new GraphQLError('UNAUTHORIZED', {extensions: {code: 400}})
      }

      return {...data.user, token: data.token}
    },

    createIssue: async (_, {input}, context: GQLContext) => {
      if (!context.user) {
        throw new GraphQLError('UNAUTHORIZED', {extensions: {code: 401}})
      }

      const newIssue = {...input, userId: context.user.id}

      const data = await db.insert(issues).values(newIssue).returning()

      // Validate the database response
      if (!data || !data.length || !data[0]) {
        throw new GraphQLError('Failed to create issue', {
          extensions: { code: 500 }
        })
      }

      return data[0]
    }
  }
}

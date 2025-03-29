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

  Query: {
    user: (_, __, context: GQLContext) => {
      return context.user
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
    }
  }
}

import { type NextRequest } from 'next/server'
import {ApolloServerPluginLandingPageLocalDefault, ApolloServerPluginLandingPageProductionDefault} from '@apollo/server/plugin/landingPage/default'
import { startServerAndCreateNextHandler } from '@as-integrations/next'
import {ApolloServer} from '@apollo/server'
import { resolvers } from './resolver'
import { schema } from './schema'


// Setup Apollo's dashboard
let plugins = []
if (process.env.NODE_ENV === 'production') {
  plugins = [
    ApolloServerPluginLandingPageProductionDefault({
      embed: true,
      graphRef: 'myGraph@prod' // usually used for apollo's tracing service
    })
  ]
} else {
  plugins = [ApolloServerPluginLandingPageLocalDefault]
}

// Create apollo server
const server = new ApolloServer({
  resolvers,
  plugins,
  typeDefs: schema
})

// Create apollo handler
const handler = startServerAndCreateNextHandler<NextRequest>(server, {})

// handler for GET /api/graphql
export async function GET(request: NextRequest) {
  // return NextResponse.json({ data: {} })
  return handler(request)
}

// handler for POST /api/graphql
export async function POST(request: NextRequest) {
  // return NextResponse.json({ data: {} })
  return handler(request)
}

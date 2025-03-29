# Building GraphQL APIs with Next.js

This project demonstrates how to build a full-featured GraphQL API using Next.js App Router, Apollo Server, and TypeScript. Each commit represents a key learning concept in the development journey.

## Learning Concepts

### 1. Basic Setup and Configuration
- Setting up Next.js App Router with TypeScript
- Configuring Apollo Server in a Next.js API route
- Understanding the project structure
- Implementing CORS headers for API routes

### 2. GraphQL Schema Design
- Defining type definitions (typeDefs)
- Creating custom scalar types (Email validation)
- Understanding schema directives
- Implementing resolvers

### 3. Authentication & Authorization
- JWT-based authentication
- Protected resolvers
- Context handling in GraphQL
- Password hashing with bcrypt

### 4. Database Integration
- Setting up Drizzle ORM with Turso (SQLite)
- Database schema design
- Migration management
- Relation handling

### 5. Client Integration
- Setting up URQL client
- GraphQL caching strategies
- Authentication state management
- Protected routes

## Getting Started

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Set up your environment variables:
```env
TURSO_CONNECTION_URL=your_url
TURSO_AUTH_TOKEN=your_token
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000)

## Commit History

Each commit in this repository represents a specific learning concept:


## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **API**: Apollo Server, GraphQL
- **Database**: Turso (SQLite) with Drizzle ORM
- **Authentication**: JWT, bcrypt
- **Client**: URQL, NextUI
- **Styling**: Tailwind CSS

## Key Features

- Type-safe GraphQL API
- Custom scalar types for validation
- JWT-based authentication
- Database integration with ORM
- Protected routes and API endpoints
- Client-side state management

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Apollo Server Documentation](https://www.apollographql.com/docs/apollo-server/)
- [GraphQL Documentation](https://graphql.org/learn/)
- [Drizzle ORM Documentation](https://orm.drizzle.team/docs/overview)

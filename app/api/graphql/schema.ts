const schema = `#graphql
  enum POSITIONS {
    GK
    CB
    FB
    CM
    FW
  }

  type Stadium {
    name: String!
    location: String!
  }

  type Coach {
    name: String!
    specialty: String!
  }
  
  type Player {
    name: String!
    position: POSITIONS!
    coaches: [Coach]!
  }

  union SearchResult = Stadium | Player

  type Query {
    me: String!
    players: [Player!]!
    searchResults: [SearchResult]!
  }
`

export default schema

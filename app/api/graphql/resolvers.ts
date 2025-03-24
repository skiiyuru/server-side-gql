const resolvers = {
  SearchResult: {
    __resolveType: (obj) => {
      if (obj.location) {
        return 'Stadium'
      } else if (obj.position) {
        return 'Player'
      }
    }
  },
  Player: {
    name: (player) => {
      return player.name.toUpperCase()
    },
    coaches: (player) => {
      switch (player.coaches.length) {
        case 2:
          return  [
            {
              name: 'Pablo',
              specialty: 'passing'
            },
            {
              name: 'Henzo',
              specialty: 'penalties'
            }
          ]
        case 1:
          return  [
            {
              name: 'Pablo',
              specialty: 'passing'
            }
          ]
        default:
          return []
      }
    } 
  },
  Query: {
    me: () => {
      return 'kiiyuru'
    },
    players: () => {
      return [
        {
          name: 'Fenrandez',
          position: 'CM',
          coaches: [1, 2]
        },
        {
          name: 'Onana',
          position: 'GK',
          coaches: [1]
        }
      ]
    },
    searchResults: () => {
      return [
        {
          name: 'Fenrandez',
          position: 'CM'
        },
        {
          name: 'Old Trafford',
          location: 'Manchester'
        }
      ]
    }
  }
}

export default resolvers

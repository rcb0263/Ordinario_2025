export const schema = `#graphql

type Restaurant {
    id: ID!
    name: String!,
    adress: String!,
    city: String!,
    phone: String!
},

type Query{
    getRestaurants(id: ID): [Restaurant!]!
    getRestaurant(id: ID!) : Restaurant!  
},

type Mutation{
    addRestaurant(name: String!, adress: String!, city: String!, phone: String! ): Restaurant!
    deleteRestaurant(id: ID!): Boolean!
}
`
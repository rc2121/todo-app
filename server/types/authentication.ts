import { gql } from 'apollo-server'

export = gql`
    type authentication {
        userName: String
        password: String
        admin: Int
        todos: [String!]!
    }

    input authenticationInput {
        userName: String!
        password: String!
    }
    
    type Query {
        login(input: authenticationInput!): String!
    }

    type Mutation {
        signup(input: authenticationInput!): String!
    }
`
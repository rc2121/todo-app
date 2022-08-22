import { gql } from 'apollo-server'

export = gql`
    type todo {
        id: String!
        name: String!
        done: Int
        createdAt: String!
        updatedAt: String!
    }
    
    type Query {
        getTodos: [todo!]!
    }

    input TodoInput{
        name: String!
        done: Int
    }

    type deleteTodo {
        deletedCount: Int!
    }

    type Mutation {
        addTodo(input: TodoInput!): todo!
        editTodo(id: String!, input: TodoInput!): todo!
        deleteTodo(id: String!): deleteTodo!
    }
`
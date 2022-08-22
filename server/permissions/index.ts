import { allow, shield } from 'graphql-shield'
import * as rules from './types'

export const permissions = shield(
    {
        Mutation: {
            signup: allow,
            addTodo: rules.authentication.isAuthenticated,
            editTodo: rules.authentication.isAuthenticated,
            deleteTodo: rules.authentication.isAuthenticated,
        },
        Query: {
            login: allow,
            getTodos: rules.authentication.isAuthenticated,
        }
    },
    {
        fallbackError: async (error, _parent, args, _context, info) => {
            console.error(
                '\nThrown with args:',
                args,
                '\nResolver info :',
                info.path,
                '\nModel :',
                info.returnType,
                '\nError :',
                error
            )
            return error as Error
        }
    }
)
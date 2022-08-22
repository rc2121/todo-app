import queries from './queries'
import mutations from './mutations'
import { Resolvers } from '../graphql'

export = {
    Mutation: {
        ...mutations
    },
    Query: {
        ...queries
    }
} as Resolvers
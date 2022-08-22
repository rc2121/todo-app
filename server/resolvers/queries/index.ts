import login from './login'
import todo from './todo'
import { QueryResolvers } from '../../graphql'

export = {
    login,
    getTodos: todo
} as QueryResolvers
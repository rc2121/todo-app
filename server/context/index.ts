import { ContextFunction } from 'apollo-server-core'
import { ExpressContext } from 'apollo-server-express'
import { verify } from '../utils'
import models from '../models'

interface JwtUser {
    id: string;
    userName: string;
    admin: number;
}

export interface Context {
    authenticated: JwtUser;
    models: any;
}

export const createContext: ContextFunction<ExpressContext, Context> = (req) => {
    const res = {} as Context
    const authorizationRaw = req.req.header('authorization')
    if (authorizationRaw) {
        try {
            res.authenticated = verify(authorizationRaw.replace(/^Bearer /, '')) as JwtUser
        } catch (error) {
            console.log('Invalid jwt found')
        }
    }
    res.models = models
    return res
}
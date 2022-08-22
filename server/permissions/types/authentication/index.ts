import { rule } from 'graphql-shield'

export const authentication = {
    isAuthenticated: rule('isAtuthenticated', { cache: 'no_cache' })(
        (_root, _args, ctx) => Boolean(ctx.authenticated) || 'Not Authenticated' 
    )
}
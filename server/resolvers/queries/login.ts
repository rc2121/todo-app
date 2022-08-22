import { sign, createHashPassword } from '../../utils'

import { QueryLoginArgs, AuthenticationResolvers, QueryResolvers } from '../../graphql'
export = async (_: QueryResolvers<AuthenticationResolvers, 'ParentType'>, { input }: QueryLoginArgs, { models }: QueryResolvers<AuthenticationResolvers, 'ContextType'>) => {
    try {
        if(!process.env.salt)
            throw new Error('Something went wrong!')
        const hashPassword = createHashPassword(input.password, process.env.salt)
        const res = await models.authentication.findOne({ userName: input.userName, password: hashPassword });
        if (res) {
            return sign({id: res?._id, userName: res?.userName, admin: res?.admin});
        }
        return new Error('username or password incorrect!');
    } catch (error) {
        return new Error('username or password incorrect!');
    }
}
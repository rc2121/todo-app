import { sign, createHashPassword } from '../../../utils'

export = async (_: any, { input }: any, { models }: any) => {
    if(!process.env.salt)
        throw new Error('Something went wrong!')
    const hashPassword = createHashPassword(input.password, process.env.salt)
    const res = await models.authentication.create({ userName: input.userName, password: hashPassword });
    return sign({id: res?._id, userName: res?.userName, admin: res?.admin});
}
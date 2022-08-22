import { createHash } from "crypto"
const jwt = require('jsonwebtoken')

interface PayloadType {
    id: string
    userName: string
    admin: number
}

export const sign = (value: PayloadType) => {
    return jwt.sign(value, process.env.secret)
}

export const verify = (token: string) => {
    const test = jwt.verify(token, process.env.secret)
    return test
}

export const createHashPassword = (password: string, salt: string) => {
    return salt
    ? createHash('sha1').update(`${salt}${password}${salt}`).digest('hex')
    : createHash('md5').update(`${password}`).digest('hex')
}
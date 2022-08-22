import Mongoose, { Types } from 'mongoose'

const Schema = Mongoose.Schema

interface AuthenticationSchema {
    userName: string
    password: string
    admin: number
    todos: Types.ObjectId
}

const Authentication = new Schema<AuthenticationSchema>({
    userName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    admin: {
        type: Number,
        default: 0
    },
    todos: [{
        type: Schema.Types.ObjectId,
        ref: 'todo'
    }]
}, { collection: 'authentication', timestamps: true })

export default Mongoose.model('authentication', Authentication)
import Mongoose from 'mongoose'

const Schema = Mongoose.Schema

interface TodoSchema {
    name: string
    done: number
}

const Todo = new Schema<TodoSchema>({
    name: {
        type: String,
        required: true
    },
    done: {
        type: Number,
        default: 0
    }
}, { collection: 'todo', timestamps: true })

export default Mongoose.model('todo', Todo)
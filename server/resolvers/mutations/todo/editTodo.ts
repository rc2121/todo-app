export = async (_: any, { id, input: { name, done } }: any, { models }: any) => {
    try {
        const res = await getTodo(id, models.todo);
        if (res) {
            await models.todo.updateOne({ _id: res._id }, { name, done })
            return getTodo(res._id, models.todo)
        }
        return new Error('no record found to update');
    } catch (error) {
        return new Error('Error occured when updating todo')
    }
}

const getTodo = async (id: String, todo: any) => {
    return todo.findOne({ _id: id })
}
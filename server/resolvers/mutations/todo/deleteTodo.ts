export = async (_: any, { id }: any, { models, authenticated }: any) => {
    try {
        const user = await models.authentication.findOne({ _id: authenticated.id });
        const { deletedCount } = await models.todo.deleteOne({ _id: id })
        const todoIds = user.todos
        await todoIds.splice(todoIds.indexOf(id), 1)
        user.todos = todoIds
        await models.authentication.updateOne({ _id: authenticated.id }, user);
        return { deletedCount }
    } catch (error) {
        return new Error('Error occured while deleting todo')
    }
}
export = async (_: any, { }, { models, authenticated }: any) => {
    // return await models.todo.find({});
    const { todos } = await models.authentication.findOne({ _id: authenticated?.id }).populate('todos').exec();
    return todos
}
export = async (_: any, { input }: any, { models, authenticated }: any) => {
    const user = await models.authentication.findOne({ _id: authenticated.id });
    const inputTodo = {
        name: input?.name,
        done: input?.done
    }
    if(!Boolean('done' in input))
        delete inputTodo.done
    const res = await models.todo.create(inputTodo);
    user.todos.push(res?._id)
    await models.authentication.updateOne({ _id: authenticated.id }, user);
    return res;
}
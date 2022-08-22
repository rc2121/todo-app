
import express, { Application, Request, Response } from 'express'
import Mongoose from 'mongoose'
import { applyMiddleware } from 'graphql-middleware'
import { makeExecutableSchema } from '@graphql-tools/schema'
import { ApolloServer } from 'apollo-server-express'
import typeDefs from './types'
import resolvers from './resolvers'
import { permissions } from './permissions'
import { createContext } from './context'

const url = 'mongodb://localhost:27017/Todo'

const app: Application = express();
const PORT = 3002;
app.use(express.json())

const main = async () => {
    await Mongoose.connect(url)
}

main().then(() => console.log('Successfully connected to the Database'))

app.get("/ping", (_: Request, res: Response) => {
  res.send("pong!!!");
});

app.listen(PORT, () => {
  console.log(`Server successfully started on localhost:${PORT}`);
});

const schema = makeExecutableSchema({ typeDefs, resolvers })

export const server = new ApolloServer({
    schema: applyMiddleware(schema, permissions),
    context: createContext,
    introspection: true,
    persistedQueries: false,
})
import 'reflect-metadata'

import { ApolloServer } from 'apollo-server'
import { buildSchema } from 'type-graphql'
import config from 'config'
import { Container } from 'typedi'
import mongoose from 'mongoose'

type MongoConfig = {
  userName: string
  password: string
  dbName: string
}
const mongoConfig: MongoConfig = config.get('mongo')

let server
async function bootstrap(): Promise<string> {
  await mongoose.connect(`mongodb://${mongoConfig.userName}:${mongoConfig.password}@localhost:27017/`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: mongoConfig.dbName
  })

  const schema = await buildSchema({
    resolvers: [ __dirname + config.resolversPath ],
    container: Container
  })
  server = new ApolloServer({
    schema,
    playground: true
  })

  const { url } = await server.listen(config.get('port'))
  return url
}

const boot = bootstrap()
boot.then((url) => {
  console.log(`🚀 Server ready at ${url}`)
}).catch(err => {
  console.error('Server failed to start', err)
})

export {
  server,
  boot
}

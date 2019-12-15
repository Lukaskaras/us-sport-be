import { GraphQLClient } from 'graphql-request'
import config from 'config'

export const client = () => {
  return new GraphQLClient(`http://localhost:${config.port}/`)
}

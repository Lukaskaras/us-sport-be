import { Field, ObjectType } from 'type-graphql'
import { GraphQLDate } from 'graphql-iso-date'
import Game from './Game'

@ObjectType()
export default class GameDay {
  @Field(type => [ Game ])
  games: Game[]

  @Field(type => GraphQLDate)
  date: Date
}

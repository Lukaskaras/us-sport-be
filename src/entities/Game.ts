import { Field, ObjectType } from 'type-graphql'

@ObjectType()
export default class Game {
  @Field()
  startDate: Date

  @Field()
  homeTeamName: string

  @Field()
  awayTeamName: string
}

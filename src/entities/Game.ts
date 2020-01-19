import { Field, ObjectType } from 'type-graphql'
import Team from './Team'

@ObjectType()
export default class Game {
  @Field()
  startDate: Date

  @Field()
  homeTeam: Team

  @Field()
  awayTeam: Team
}

import { prop, getModelForClass } from '@typegoose/typegoose'
import { Field, ObjectType } from 'type-graphql'

@ObjectType()
export default class Team {
  @prop()
  @Field()
  name: string

  @prop()
  @Field()
  externalId: string
}

export const TeamModel = getModelForClass(Team)

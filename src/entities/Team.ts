import { prop, getModelForClass } from '@typegoose/typegoose'

export default class Team {
  @prop()
  name: string

  @prop()
  externalId: string
}

export const TeamModel = getModelForClass(Team)

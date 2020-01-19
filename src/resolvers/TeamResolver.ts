import { Query, Resolver } from 'type-graphql'
import Team, { TeamModel } from '../entities/Team'

@Resolver()
export default class TeamResolver {
  @Query(returns => [ Team ])
  public async getAllTeams() {
    return TeamModel.find({})
  }
}

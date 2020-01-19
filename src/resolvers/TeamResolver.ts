import { Query, Resolver } from 'type-graphql'
import Team, { TeamModel } from '../entities/Team'

@Resolver()
export default class TeamResolver {
  @Query(returns => [ Team ])
  public async getAllTeams() {
    const teams = await TeamModel.find({}).exec()
    return teams.sort((a, b) => {
      if (a.name < b.name) {
        return -1
      }

      if (a.name > b.name) {
        return 1
      }

      return 0
    })

  }
}

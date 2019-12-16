import { Arg, Query, Resolver } from 'type-graphql'
import { GraphQLDate } from 'graphql-iso-date'

import { Inject } from 'typedi'
import NhlService from '../services/NhlService'
import GameDay from '../entities/GameDay'

@Resolver()
export default class GameDayResolver {
  @Inject()
  private readonly nhlService: NhlService

  @Query(returns => [ GameDay ])
  public async getEarlyGamesInWeek(@Arg('weekStart', type => GraphQLDate) weekStart: Date): Promise<GameDay[]> {
    return this.nhlService.getGamesForWeek(weekStart)
  }
}

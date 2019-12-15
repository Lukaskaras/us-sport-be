import { Arg, Query, Resolver } from 'type-graphql'
import { GraphQLDate } from 'graphql-iso-date'

import Game from '../entities/Game'
import { Inject } from 'typedi'
import NhlService from '../services/NhlService'
import GameDay from '../entities/GameDay'

@Resolver(Game)
export default class GameResolver {
  @Inject()
  private readonly nhlService: NhlService

  @Query(returns => [ GameDay ])
  public async getEarlyGamesInWeek(@Arg('weekStart', type => GraphQLDate) weekStart: Date): Promise<GameDay[]> {
    return this.nhlService.getGamesForWeek(weekStart)
    // TODO: filter only early games
    // TODO: maybe return by dates, frontend nebude musiet carovat, proste prejde array a ak je length na games vnutri date 0, tak nevyrendruje nic
  }
}

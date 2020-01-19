import { Service } from 'typedi'
import moment from 'moment'
import axios, { AxiosResponse } from 'axios'
import config from 'config'
import { NhlDate, NhlGame, NhlScheduleRes } from '../types/Nhl'
import GameDay from '../entities/GameDay'
import Game from '../entities/Game'
import { determineEndOfSeason } from '../utils/date'

@Service()
export default class NhlService {
  public async getGamesForWeek(startDate: Date): Promise<GameDay[]> {
    try {
      const endDate = moment(startDate).add(6, 'days').toDate()
      const games = await this.fetchGames(startDate, endDate)
      return this.makeDatesWithEarlyGames(games.dates)
    } catch (err) {
      console.error('error', err)
      throw new Error('Error when getting games for week')
    }
  }

  public async getGamesForTeam(teamId: string): Promise<GameDay[]> {
    try {
      const games = await this.fetchGamesForTeam(teamId)
      return this.makeDatesWithEarlyGames(games.dates).filter(gameday => gameday.games.length > 0)
    } catch (err) {
      console.error('error', err)
      throw new Error('Error when getting games for team')
    }
  }

  private async fetchGames(startDate: Date, endDate: Date): Promise<NhlScheduleRes> {
    const result: AxiosResponse<NhlScheduleRes> = await axios.request({
      method: 'GET',
      url: `${config.get('nhl.url')}/schedule`,
      params: {
        startDate: moment(startDate).format('YYYY-MM-DD'),
        endDate: moment(endDate).format('YYYY-MM-DD')
      }
    })
    return result.data
  }

  private async fetchGamesForTeam(teamId: string): Promise<NhlScheduleRes> {
    const now = new Date()
    const endOfSeason = determineEndOfSeason()
    const result: AxiosResponse<NhlScheduleRes> = await axios.request({
      method: 'GET',
      url: `${config.get('nhl.url')}/schedule`,
      params: {
        teamId,
        startDate: moment(now).format('YYYY-MM-DD'),
        endDate: moment(endOfSeason).format('YYYY-MM-DD')
      }
    })
    return result.data
  }

  private getEarlyGamesFromDay (gameDay: NhlDate): NhlGame[] {
    return gameDay.games.filter(game => {
      const gameStart = new Date(game.gameDate)
      return gameStart.getHours() > 13 && gameStart.getHours() <= 23
    })
  }

  private makeDatesWithEarlyGames (dates: NhlDate[]): GameDay[] {
    return dates.map(day => {
      const earlyGames = this.getEarlyGamesFromDay(day)
      const mappedEarlyGames: Game[] = earlyGames.map(game => {
        return {
          startDate: new Date(game.gameDate),
          homeTeam: {
            name: game.teams.home.team.name,
            externalId: game.teams.home.team.id
          },
          awayTeam: {
            name: game.teams.away.team.name,
            externalId: game.teams.away.team.id
          }
        }
      })
      return {
        date: new Date(day.date),
        games: mappedEarlyGames
      }
    })
  }
}

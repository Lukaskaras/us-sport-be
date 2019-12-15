import { Service } from 'typedi'
import moment from 'moment'
import axios, { AxiosResponse } from 'axios'
import config from 'config'
import { NhlDate, NhlGame, NhlScheduleRes } from '../types/NhlScheduleRes'
import GameDay from '../entities/GameDay'
import Game from '../entities/Game'

@Service()
export default class NhlService {
  public async getGamesForWeek(startDate: Date): Promise<GameDay[]> {
    const endDate = moment(startDate).add(6, 'days').toDate()
    const games = await this.fetchGames(startDate, endDate)
    const dates = games.dates.map(day => {
      const earlyGames = this.getEarlyGamesFromDay(day)
      const mappedEarlyGames: Game[] = earlyGames.map(game => {
        return {
          startDate: new Date(game.gameDate),
          homeTeamName: game.teams.home.team.name,
          awayTeamName: game.teams.away.team.name
        }
      })
      return {
        date: new Date(day.date),
        games: mappedEarlyGames
      }
    })
    return dates
  }

  public async fetchGames(startDate: Date, endDate: Date): Promise<NhlScheduleRes> {
    const result: AxiosResponse<NhlScheduleRes> = await axios.request({
      method: 'GET',
      url: `${config.get('nhl.url')}/schedule`,
      params: {
        startDate: moment(startDate).format('YYYY-MM-DD'),
        endDate: moment(endDate).format('YYYY-MM-DD'),
      }
    })
    return result.data
  }

  public getEarlyGamesFromDay (gameDay: NhlDate): NhlGame[] {
    return gameDay.games.filter(game => {
      const gameStart = new Date(game.gameDate)
      return gameStart.getHours() > 13 && gameStart.getHours() <= 23
    })
  }
}

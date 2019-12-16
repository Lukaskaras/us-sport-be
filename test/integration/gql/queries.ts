import GameDay from '../../../src/entities/GameDay'
import { client } from '../../integration'

export const getEarlyGames = async (weekStart: string): Promise<GameDay[]> => {
  const result = await client().request(`
    query getEarlyGamesInWeek($weekStart: Date!) {
      getEarlyGamesInWeek(weekStart: $weekStart) {
        games {
          startDate
          homeTeamName
          awayTeamName
        }
        date
      }
    }
  `, { weekStart })
  return result.getEarlyGamesInWeek
}

import GameDay from '../../../src/entities/GameDay'
import { client } from '../../integration'

export const getEarlyGames = async (weekStart: string): Promise<GameDay[]> => {
  const result = await client().request(`
    query getEarlyGamesInWeek($weekStart: Date!) {
      getEarlyGamesInWeek(weekStart: $weekStart) {
        games {
          startDate
          homeTeam {
            name
            externalId
          }
          awayTeam {
            name
            externalId
          }
        }
        date
      }
    }
  `, { weekStart })
  return result.getEarlyGamesInWeek
}

export const getAllEarlyGamesForTeam = async (teamId: string) => {
  const result = await client().request(`
    query getAllEarlyGamesForTeam($teamId: String!) {
      getAllEarlyGamesForTeam(teamId: $teamId) {
        games {
          startDate
          homeTeam {
            name
            externalId
          }
          awayTeam {
            name
            externalId
          }
        }
        date
      }
    }
  `, { teamId })
  return result.getAllEarlyGamesForTeam
}

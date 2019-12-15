import { client } from '../integration'

const getEarlyGames = async () => {
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
  `, { weekStart: '2019-12-09' })
  return result.getEarlyGamesInWeek
}


describe('GameResolver', async () => {
  it('should return games', async () => {
    const result = await getEarlyGames()
    console.log('result', result)
  })
})

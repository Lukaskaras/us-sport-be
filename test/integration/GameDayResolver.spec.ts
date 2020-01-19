import * as assert from 'assert'
import nock from 'nock'
import sinon from 'sinon'
import { getAllEarlyGamesForTeam, getEarlyGames } from './gql/queries'

// tslint:disable:no-require-imports
const scheduleRes = require('../fixtures/scheduleRes.json')
const teamScheduleRes = require('../fixtures/teamScheduleRes.json')
const weekExpected = require('../fixtures/earlyGamesExpectedRes.json')
const allEarlyExpected = require('../fixtures/allEarlyExpected.json')
// tslint:enable:no-require-imports

describe('Resolver', async () => {
  it('should return early games in week', async () => {
    nock('https://statsapi.web.nhl.com')
      .get('/api/v1/schedule?startDate=2019-12-09&endDate=2019-12-15')
      .reply(200, scheduleRes)

    const result = await getEarlyGames('2019-12-09')
    assert.deepStrictEqual(result, weekExpected)
  })

  it('should return all early games for a team', async () => {
    const clock = sinon.useFakeTimers(new Date('2020-01-19'))
    nock('https://statsapi.web.nhl.com')
      .get('/api/v1/schedule?teamId=1&startDate=2020-01-19&endDate=2020-07-01')
      .reply(200, teamScheduleRes)

    const result = await getAllEarlyGamesForTeam('1')
    assert.deepStrictEqual(result, allEarlyExpected)
    clock.restore()
  })
})

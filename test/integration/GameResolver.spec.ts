import * as assert from 'assert'
import nock from 'nock'
import { getEarlyGames } from './gql/queries'

// tslint:disable:no-require-imports
const scheduleRes = require('../fixtures/scheduleRes.json')
const expectedResponse = require('../fixtures/earlyGamesExpectedRes.json')
// tslint:enable:no-require-imports

describe('Resolver', async () => {
  it('should return games', async () => {
    nock('https://statsapi.web.nhl.com')
      .get('/api/v1/schedule?startDate=2019-12-09&endDate=2019-12-15')
      .reply(200, scheduleRes)

    const result = await getEarlyGames('2019-12-09')
    assert.deepStrictEqual(result, expectedResponse)
  })
})

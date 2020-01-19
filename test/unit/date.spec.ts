import sinon from 'sinon'
import * as assert from 'assert'
import { determineEndOfSeason } from '../../src/utils/date'

describe('date', () => {
  it('should determine end of season correctly - before new year', () => {
    const clock = sinon.useFakeTimers(new Date('2019-11-13'))
    const end = determineEndOfSeason()
    assert.strictEqual(end.toISOString(), '2020-07-01T00:00:00.000Z')
    clock.restore()
  })

  it('should determine end of season correctly - after new year', () => {
    const clock = sinon.useFakeTimers(new Date('2022-01-12'))
    const end = determineEndOfSeason()
    assert.strictEqual(end.toISOString(), '2022-07-01T00:00:00.000Z')
    clock.restore()
  })
})

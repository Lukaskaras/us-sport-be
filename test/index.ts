import { server, boot } from '../src'
// import nock from 'nock'

before(function (done) {
  boot.then(() => {
    // nock.disableNetConnect()
    // nock.enableNetConnect('localhost:4001')
    done()
  })
})

after((done) => {
  server.stop().then(() => {
    done()
  }).catch(err => {
    console.log(err)
    done()
  })
})

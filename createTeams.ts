import mongoose from 'mongoose'
import config from 'config'
import axios, { AxiosResponse } from 'axios'
import { TeamsRes } from './src/types/Nhl'
import { TeamModel } from './src/entities/Team'

const createTeams = async () => {
  await mongoose.connect('mongodb://root:example@localhost:27017/', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'default-db'
  })

  const result: AxiosResponse<TeamsRes> = await axios.request({
    method: 'GET',
    url: `${config.get('nhl.url')}/teams`
  })

  if (result.data && result.data.teams.length) {
    await TeamModel.deleteMany({})
  }

  for (const team of result.data.teams) {
    console.log(`adding ${team.name}`)
    await TeamModel.create({ name: team.name, externalId: team.id })
  }
}

createTeams()
  .then(() => {
    console.log('teams successfully added')
    process.exit(0)
  })
  .catch((err) => {
    console.error(err, 'Error when adding teams')
    process.exit(1)
  })

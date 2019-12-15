export type NhlScheduleRes = {
  dates: NhlDate[]
}

export type NhlDate = {
  games: NhlGame[]
  date: string
}

export type NhlGame = {
  gameDate: string
  teams: Participants
}

export type Participants = {
  home: NhlTeam
  away: NhlTeam
}

export type NhlTeam = {
  team: TeamDetail
}

export type TeamDetail = {
  name: string
}

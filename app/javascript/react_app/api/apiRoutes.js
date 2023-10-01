import axios from "axios"

const getTeams = async () => {
  const response = await axios.get("/api/v1/teams/index")
  return response.data
}

const getPlayers = async () => {
  const response = await axios.get("/api/v1/players/index")
  return response.data
}

// types: passings, rushings, receivings, defenses, players
const getTop20Statistics = async (type, playerPosition) => {
  const response = await axios.get(
    `/api/v1/${type}/statistics/${playerPosition}`
  )
  return response.data
}

const getPickStatistics = async (teamId, pickNumber) => {
  const response = await axios.get(
    `/api/v1/draft_record_teams/statistics/${teamId}?pick=${pickNumber}`
  )
  return response.data
}

export { getTeams, getPlayers, getTop20Statistics, getPickStatistics }

// Json
import data from "./static_data/picks_2024.json"

const inititalState = {
  draftState: {},
  draftRunning: false,
  userPicking: false,
  draftRounds: 3,
  speed: 50,
  needsVsValue: 50,
  randomness: 10,
  outerTab: "trade",
  viewRound: 0,
  pickData: data,
  orderedPicks: new Array(256).fill(""),
  yourPicks: {},
  teams: [],
  teamsLoaded: false,
  teamsMapping: [],
  selected: {},
  players: [],
  playersLoaded: false
}

const createDraftSlice = set => ({
  ...inititalState,

  setDraftState: newDraftState =>
    set(_ => ({
      draftState: { ...newDraftState }
    })),
  setDraftRunning: dr =>
    set(_ => ({
      draftRunning: dr
    })),
  setUserPicking: userPicking =>
    set(state => ({
      userPicking: userPicking !== undefined ? userPicking : state.userPicking
    })),
  setDraftRounds: rounds =>
    set(state => ({
      draftRounds: rounds !== undefined ? rounds : state.rounds
    })),
  setSpeed: s =>
    set(state => ({
      speed: s !== undefined ? s : state.speed
    })),
  setNeedsVsValue: nvv =>
    set(state => ({
      needsVsValue: nvv !== undefined ? nvv : state.needsVsValue
    })),
  setRandomness: rand =>
    set(state => ({
      randomness: rand !== undefined ? rand : state.randomness
    })),
  setYourPicks: picks =>
    set(_ => ({
      yourPicks: { ...picks }
    })),
  setTeams: newTeams =>
    set(_ => ({
      teams: [...newTeams],
      teamsLoaded: true
    })),
  // map the dnd reordering for each team's first first-round pick
  setTeamsMapping: newTeamsMapping =>
    set(_ => ({
      teamsMapping: [...newTeamsMapping]
    })),
  setSelected: newSelected =>
    set(_ => ({
      selected: { ...newSelected }
    })),
  setOrderedPicks: orderedPicks =>
    set(_ => ({
      orderedPicks: [...orderedPicks]
    })),
  setOuterTab: tab =>
    set(state => ({
      outerTab: tab || state.outerTab
    })),
  setViewRound: vr =>
    set(state => ({
      viewRound: vr !== undefined ? vr : state.viewRound
    })),
  setPlayers: players =>
    set(_ => ({
      players: [...players],
      playersLoaded: true
    })),
  setPickData: newPickData =>
    set(_ => ({
      pickData: { ...newPickData }
    })),
  resetDraftSlice: () => {
    set(inititalState)
  }
})

export default createDraftSlice

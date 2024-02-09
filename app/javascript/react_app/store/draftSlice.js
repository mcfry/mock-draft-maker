// Json
import data from "./static_data/picks_2024.json"
import roundData from "./static_data/picks_per_round_2024.json"
import needsData from "./static_data/needs_2024.json"
import positionalData from "./static_data/positional_value_common.json"
import pickValueData from "./static_data/pick_value_rich_hill.json"

const NUMBER_OF_PICKS = 256

// Extrapolate to fill remaining
for (let i = 225; i <= NUMBER_OF_PICKS; i += 1) {
  const diff = 1
  const pickValueDataVal =
    pickValueData[i - 1] - diff > 0 ? pickValueData[i - 1] - diff : 1

  pickValueData[i] = pickValueDataVal
}

// NOTE: reality, future pick value is dependent on many factors
//       - number of picks in future draft (can maybe use avg # in each round)
//       - team outlook (can use projections, or previous year as indicator,
//         or even average over a smaller segment like 1-8 instead of 1-32
//         where 32 is the max in the current round)
//       - can't use it for a year, less value
//
// Ideally: algo is something like slot=(team_rank / 8)
//                                 num_in_slot=(round_picks/8)
//                                 avg(values(slot*num_in_slot...(slot
//                                     +1)*num_in_slot))
//                                 * wait_time_value_percent (0.9?)

// NOTE: uncomment to find averages for future picks
// NOTE: comp picks start round 3 (avg 8)
// for (let i = 1; i < 264; i += i < 64 ? 32 : 40) {
//   let avg = 0
//   for (let j = i; j < i + (i < 64 ? 32 : 40); j += 1) {
//     avg += j in pickValueData ? pickValueData[j] : 1
//   }
//   console.log(avg / (i < 64 ? 32 : 40))
// }

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
  roundData,
  orderedPicks: new Array(256).fill(""),
  yourPicks: {},
  teams: [],
  teamsMapping: [],
  selected: {},
  players: [],
  needsData,
  positionalData,
  pickValueData
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
      teams: [...newTeams]
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
      players: [...players]
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

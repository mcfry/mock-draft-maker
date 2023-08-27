const inititalState = {
  draftRounds: 3,
  speed: 80,
  needsVsValue: 50,
  randomness: 10,
  yourPicks: {},
  teams: [],
  selected: {},
  outerTab: "trade",
  viewRound: 0
}

const createDraftSlice = set => ({
  ...inititalState,

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
  setTeams: teams =>
    set(_ => ({
      teams: [...teams]
    })),
  setSelected: selected =>
    set(_ => ({
      selected: { ...selected }
    })),
  setOuterTab: tab =>
    set(state => ({
      outerTab: tab || state.outerTab
    })),
  setViewRound: vr =>
    set(state => ({
      viewRound: vr !== undefined ? vr : state.viewRound
    })),
  resetDraftSlice: () => {
    set(inititalState)
  }
})

export default createDraftSlice

const createDraftSlice = set => ({
  draftRounds: 3,
  setDraftRounds: rounds =>
    set(state => ({
      draftRounds: rounds !== undefined ? rounds : state.rounds
    })),
  speed: 80,
  setSpeed: s =>
    set(state => ({
      speed: s !== undefined ? s : state.speed
    })),
  needsVsValue: 50,
  setNeedsVsValue: nvv =>
    set(state => ({
      needsVsValue: nvv !== undefined ? nvv : state.needsVsValue
    })),
  randomness: 10,
  setRandomness: rand =>
    set(state => ({
      randomness: rand !== undefined ? rand : state.randomness
    })),
  yourPicks: {},
  setYourPicks: picks =>
    set(_ => ({
      yourPicks: { ...picks }
    })),
  teams: [],
  setTeams: teams =>
    set(_ => ({
      teams: [...teams]
    })),
  selected: {},
  setSelected: selected =>
    set(_ => ({
      selected: { ...selected }
    })),
  outerTab: "trade",
  setOuterTab: tab =>
    set(state => ({
      outerTab: tab || state.outerTab
    })),
  viewRound: 0,
  setViewRound: vr =>
    set(state => ({
      viewRound: vr !== undefined ? vr : state.viewRound
    }))
})

export default createDraftSlice

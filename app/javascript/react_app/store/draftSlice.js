export const createDraftSlice = (set) => ({
    draftRounds: 3,
    setDraftRounds: (rounds) => (set(state => ({
        draftRounds: rounds || state.draftRounds
    }))),
    speed: 80,
    setSpeed: (s) => (set(state => ({
        speed: s || state.speed
    }))),
    needsVsValue: 50,
    setNeedsVsValue: (nvv) => (set(state => ({
        needsVsValue: nvv || state.needsVsValue
    }))),
    randomness: 50,
    setRandomness: (rand) => (set(state => ({
        randomness: rand || state.randomness
    }))),
    yourPicks: {},
    setYourPicks: (picks) => (set(state => ({
        yourPicks: {...picks},
    }))),
    teams: [],
    setTeams: (teams) => (set(state => ({
        teams: [...teams]
    }))),
    selected: {},
    setSelected: (selected) => (set(state => ({
        selected: {...selected}
    })))
})
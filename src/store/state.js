const state = {
  hasStarted: false,
  currentScreen: 'setup',
  players: {
    one: {
      life: 100,
      mana: 100,
      illment: null,
      perk: null,
      bonus: null,
      shield: 0,
      name: 'Jugador 1',
      style: null,
      instrument: null,
      strongAgainst: null,
      weakAgainst: null,
      stats: {
        attack: 0,
        defense: 0
      }
    },
    two: {
      life: 100,
      mana: 100,
      illment: null,
      perk: null,
      bonus: null,
      shield: 0,
      name: 'Jugador 2',
      style: null,
      instrument: null,
      strongAgainst: null,
      weakAgainst: null,
      stats: {
        attack: 0,
        defense: 0
      }
    }
  }
}

const getters = {
}

export { state, getters }

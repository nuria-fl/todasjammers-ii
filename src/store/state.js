const state = {
  hasStarted: false,
  currentScreen: 'setup',
  player1: {
    name: 'Jugador 1',
    stats: {
      attack: 0,
      defense: 0
    }
  },
  player2: {
    name: 'Jugador 2',
    stats: {
      attack: 0,
      defense: 0
    }
  }
}

const getters = {
}

export { state, getters }

export default {
  startGame (state) {
    state.hasStarted = true
  },
  setupPlayer (state, playerInfo) {
    const player = state.players[playerInfo.player]

    player.name = playerInfo.name
    player.style = playerInfo.style
    player.instrument = playerInfo.instrument
    player.strongAgainst = playerInfo.strongAgainst
    player.weakAgainst = playerInfo.weakAgainst
    player.bonus = playerInfo.bonus
    player.stats = {
      attack: playerInfo.attack,
      defense: playerInfo.defense
    }
  },
  setCurrentScreen (state, screen) {
    state.currentScreen = screen
  },
  hurtPlayer (state, {player, amount}) {
    state.players[player].life = state.players[player].life - amount

    if (state.players[player].life <= 0) {
      state.currentScreen = 'end'
    }
  },
  healPlayer (state, {player, amount}) {
    const addedLife = state.players[player].life + amount
    state.players[player].life = addedLife > 100 ? 100 : addedLife
  }
}

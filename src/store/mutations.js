export default {
  startGame(state) {
    state.hasStarted = true
  },
  setupPlayer(state, playerInfo) {
    const player = state.players[playerInfo.player]

    player.name = playerInfo.name
    player.stats = {
      attack: playerInfo.attack,
      defense: playerInfo.defense,
    }
  },
  setCurrentScreen(state, screen) {
    state.currentScreen = screen
  },
  hurtPlayer(state, {player, amount}) {
    state.players[player].life = state.players[player].life - amount

    if (state.players[player].life <= 0) {
      state.currentScreen = 'end'
    }
  }
}

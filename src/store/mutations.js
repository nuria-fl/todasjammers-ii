export default {
  setupPlayer(state, playerInfo) {
    const player = state[`player${playerInfo.player}`]
    player.name = playerInfo.name
    player.stats = {
      attack: playerInfo.attack,
      defense: playerInfo.defense,
    }
  },
  setCurrentScreen(state, screen) {
    state.currentScreen = screen
  }
}

export default {
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
  }
}

import sound from '@/services/sound'
import EventBus from '@/services/EventBus'

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
    player.stats = playerInfo.stats
  },
  setCurrentScreen (state, screen) {
    state.currentScreen = screen
  },
  substractLife (state, {player, amount}) {
    state.players[player].life = state.players[player].life - amount

    EventBus.$emit('showFlash', {
      playerId: player,
      text: `- ${Math.ceil(amount)}`,
      style: 'danger'
    })

    if (state.players[player].life <= 0) {
      sound.playDeath()
      setTimeout(() => {
        state.currentScreen = 'end'
      }, 500)
    }
  },
  healPlayer (state, {player, amount}) {
    const addedLife = state.players[player].life + amount
    state.players[player].life = addedLife > 100 ? 100 : addedLife

    EventBus.$emit('showFlash', {
      playerId: player,
      text: `+ ${Math.ceil(amount)}`,
      style: 'success'
    })
  },
  addIllmentToPlayer (state, {player, illment, duration}) {
    state.players[player].illment = {
      id: illment,
      duration
    }
  },
  addPerkToPlayer (state, {player, perk, duration}) {
    state.players[player].perk = {
      id: perk,
      duration
    }
  },
  resetIllment (state, player) {
    state.players[player].illment = null
  },
  resetPerk (state, player) {
    state.players[player].perk = null
  },
  addShield (state, player) {
    state.players[player].shield = 20
  },
  substractShield (state, {player, amount}) {
    const shieldAmount = state.players[player].shield
    const shieldLeft = shieldAmount - amount

    state.players[player].shield = shieldLeft < 0 ? 0 : shieldLeft

    EventBus.$emit('showFlash', {
      playerId: player,
      text: `- ${Math.ceil(amount)}`,
      style: 'danger'
    })
  },
  substractMana (state, {player, amount}) {
    const manaLeft = state.players[player].mana - amount
    state.players[player].mana = manaLeft < 0 ? 0 : manaLeft
  },
  increaseMana (state, {player, amount}) {
    const addedMana = state.players[player].mana + amount
    state.players[player].mana = addedMana > 100 ? 100 : addedMana
  }
}

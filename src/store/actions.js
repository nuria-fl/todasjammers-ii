import sound from '@/services/sound'

export default {
  hurtPlayer ({state, commit}, {player, amount}) {
    sound.playHit()
    if (state.players[player].shield) {
      let substractFromShieldAmount = amount
      let substractFromLifeAmount = 0
      if (state.players[player].shield < amount) {
        substractFromShieldAmount = amount - state.players[player].shield
        substractFromLifeAmount = amount - substractFromShieldAmount
      }
      commit('substractShield', {
        player,
        amount: substractFromShieldAmount
      })

      console.log('total', amount)
      console.log('from shield', substractFromShieldAmount)
      console.log('from life', substractFromLifeAmount)

      if (substractFromLifeAmount) {
        commit('substractLife', {player, amount: substractFromLifeAmount})
      }
    } else {
      console.log('only substract from life')
      commit('substractLife', {player, amount})
    }
  }
}

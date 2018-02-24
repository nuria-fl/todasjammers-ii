<template>
  <section>
    <button @click="attack">CANTAR</button>
    <button @click="powerUp">BAILAR</button>
  </section>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import utils from '@/services/utils'

export default {
  props: {
    playerNum: {
      type: String,
      default: 'one',
      hasPowerUp: false
    }
  },
  computed: {
    ...mapState(['players']),
    player() {
      return this.players[this.playerNum]
    },
    opponentId() {
      return this.playerNum === 'one' ? 'two' : 'one'
    },
    opponent() {
      return this.players[this.opponentId]
    },
    isStrong() {
      return this.opponent.style === this.player.strongAgainst
    },
    isWeak() {
      return this.opponent.style === this.player.weakAgainst
    },
    opponentIsStrong() {
      return this.opponent.strongAgainst === this.player.style
    },
    opponentIsWeak() {
      return this.opponent.weakAgainst === this.player.style
    },
  },
  methods: {
    ...mapMutations(['hurtPlayer', 'healPlayer']),
    attack() {
      const calculateResistance = () => {
        let modifier = 0.5

        if (this.opponentIsStrong) {
          console.log('STRONG')
          modifier = 0.8
        } else if (this.opponentIsWeak) {
          console.log('WEAK')
          modifier = 0.2
        }

        return this.opponent.stats.defense * modifier + utils.getRandomNumber(3, 0)
      }

      const calculateDamage = () => {
        let modifier = 1

        if (this.isStrong) {
          console.log('STRONG')
          modifier = 1.3
        } else if (this.isWeak) {
          console.log('WEAK')
          modifier = 0.7
        }

        return this.player.stats.attack * modifier + utils.getRandomNumber(5)
      }

      let damage = calculateDamage()
      let resistance = calculateResistance()

      if (this.hasPowerUp) {
        damage = damage + utils.getRandomNumber(5, 2)
        this.hasPowerUp = false
      }

      if (this.player.bonus === 'random-recovery') {
        this.handleRandomRecovery()
      } else if (this.player.bonus === 'attack') {
        damage++
      } else if (this.player.bonus === 'defense') {
        resistance++
      }

      console.log('resistance ', resistance)
      console.log('damage ', damage)

      this.hurtPlayer({
        player: this.opponentId, 
        amount: damage - resistance
      })

      this.$emit('done')
    },
    powerUp() {
      this.hasPowerUp = true

      if (this.player.bonus === 'random-recovery') {
        this.handleRandomRecovery()
      }

      this.$emit('done')
    },
    handleRandomRecovery() {
      const chance = utils.getRandomNumber(10) < 3

      if (chance === true) {
        console.log('RANDOM RECOVERY')
        this.healPlayer({
          player: this.playerNum,
          amount: 20
        })
      }
    }
  }
}
</script>

<style lang="scss">
</style>

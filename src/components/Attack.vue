<template>
  <button @click="attack">CANTAR</button>
</template>

<script>
import utils from '@/services/utils'
import playerMixin from '@/mixins/playerMixin'

export default {
  mixins: [ playerMixin ],
  props: {
    hasPowerUp: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    isStrong () {
      return this.opponent.style === this.player.strongAgainst
    },
    isWeak () {
      return this.opponent.style === this.player.weakAgainst
    },
    opponentIsStrong () {
      return this.opponent.strongAgainst === this.player.style
    },
    opponentIsWeak () {
      return this.opponent.weakAgainst === this.player.style
    }
  },
  methods: {
    attack () {
      const calculateResistance = () => {
        let modifier = 0.3

        if (this.opponentIsStrong) {
          console.log('STRONG')
          modifier = 0.4
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
      }

      if (this.player.bonus === 'attack') {
        damage++
      } else if (this.player.bonus === 'defense') {
        resistance += 0.5
      }

      console.log('resistance ', resistance)
      console.log('damage ', damage)

      const amount = damage - resistance

      this.hurtPlayer({
        player: this.opponentId,
        amount: amount < 0.5 ? 0.5 : amount
      })

      this.increasePlayerMana()

      this.$emit('done')
    }
  }
}
</script>

<style lang="scss">
</style>

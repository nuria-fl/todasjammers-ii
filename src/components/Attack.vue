<template>
  <button @click="attack">Cantar</button>
</template>

<script>
import utils from '@/services/utils'
import EventBus from '@/services/EventBus'
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
    },
    isPlayerConfused () {
      return this.player.illment && this.player.illment.id === 'confusion'
    }
  },
  methods: {
    attack () {
      if (this.isPlayerConfused) {
        const shouldMiss = utils.getRandomNumber(10) < 6
        const shouldGetDamaged = utils.getRandomNumber(10) < 3

        if (shouldMiss) {
          EventBus.$emit('showFlash', {
            playerId: this.playerId,
            text: `${this.player.name} no está cantando muy bien...`,
            style: 'info'
          })
          this.$emit('done')
          return
        } else if (shouldGetDamaged) {
          EventBus.$emit('showFlash', {
            playerId: this.playerId,
            text: `¡${this.player.name} ha hecho un gallo!`,
            style: 'info'
          })
          this.hurtPlayer({
            player: this.playerId,
            amount: 5
          })
          this.$emit('done')
          return
        }
      }

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

      const amount = damage - resistance + 1

      this.hurtPlayer({
        player: this.opponentId,
        amount: amount < 2 ? 2 : amount
      })

      this.increasePlayerMana()

      this.$emit('done')
    }
  }
}
</script>

<style lang="scss">
</style>

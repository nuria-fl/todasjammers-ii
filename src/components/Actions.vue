<template>
  <section>
    <button @click="attack">CANTAR</button>
  </section>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  props: {
    playerNum: {
      type: String,
      default: 'one'
    }
  },
  computed: {
    ...mapState(['players']),
    playerStats() {
      return this.players[this.playerNum].stats
    },
    opponent() {
      return this.playerNum === 'one' ? 'two' : 'one'
    }
  },
  methods: {
    ...mapMutations(['hurtPlayer']),
    attack() {
      const calculateDamage = () => {
        return this.playerStats.attack
      }

      this.hurtPlayer({
        player: this.opponent, 
        amount: calculateDamage()
      })

      this.$emit('done')
    }
  }
}
</script>

<style lang="scss">
</style>

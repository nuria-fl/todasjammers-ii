<template>
  <section>
    <div>{{ player.name }}</div>
    <div>Life: {{ player.life }}</div>
  </section>
</template>

<script>
import { mapState } from 'vuex'
export default {
  props: {
    playerNum: {
      type: String,
      default: 'one'
    }
  },
  computed: {
    ...mapState(['players']),
    player() {
      return this.players[this.playerNum]
    }
  }
}
</script>

<style lang="scss">
</style>

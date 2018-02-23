<template>
  <section>
    <h1>GAME OVER</h1>
    <h2>{{ winner }} ha ganado</h2>
    <button @click="restart">Volver a jugar</button>
  </section>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['players']),
    winner() {
      return this.players.one.life > 0 ? this.players.one.name : this.players.two.name 
    }
  },
  methods: {
    restart() {
      window.location.reload()
    }
  }
}
</script>

<style lang="scss">
</style>

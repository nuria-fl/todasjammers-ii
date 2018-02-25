<template>
  <section class="Splash">
    <h1 class="Splash__title">GAME <strong>OVER</strong></h1>
    <h2 class="Splash__lead">{{ winner }} ha ganado</h2>
    <button
      @click="restart"
      class="Btn">
      Volver a jugar
    </button>
  </section>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['players']),
    winner () {
      return this.players.one.life > 0 ? this.players.one.name : this.players.two.name
    }
  },
  methods: {
    restart () {
      window.location.reload()
    }
  }
}
</script>

<style lang="scss">
</style>

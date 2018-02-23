<template>
  <section>
    A LUCHAR!

    <player-hud playerNum="one" />
    <actions 
      playerNum="one" 
      v-show="turn === 1"
      @done="changeTurn"/>
    <player-hud playerNum="two" />
    <actions 
      playerNum="two"  
      v-show="turn === 2"
      @done="changeTurn"/>
  </section>
</template>

<script>
import { mapState } from 'vuex'
import PlayerHud from '@/components/PlayerHud'
import Actions from '@/components/Actions'

export default {
  data() {
    return {
      turn: 1
    }
  },
  components: {
    PlayerHud,
    Actions
  },
  methods: {
    changeTurn() {
      if (this.turn === 1) {
        this.turn = 2
      } else {
        this.turn = 1
      }
    }
  }
}
</script>

<style lang="scss">
</style>

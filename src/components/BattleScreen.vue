<template>
  <section class="Battleground">
    <flash />
    <section class="Battleground__field">
      <player-hud playerId="one" />
      <actions
        :turn="1"
        :currentTurn="turn"
        playerId="one"
        @done="changeTurn"
      />
    </section>
    <section class="Battleground__field">
      <player-hud playerId="two" />
      <actions
        :turn="2"
        :currentTurn="turn"
        playerId="two"
        @done="changeTurn"
      />
    </section>
  </section>
</template>

<script>
import utils from '@/services/utils'
import Flash from '@/components/Flash'
import PlayerHud from '@/components/PlayerHud'
import Actions from '@/components/Actions'

export default {
  data () {
    return {
      turn: 0,
      battleStarted: true
    }
  },
  components: {
    Flash,
    PlayerHud,
    Actions
  },
  mounted () {
    this.turn = utils.getRandomNumber(2)
    setTimeout(() => {
    }, 1000)
  },
  methods: {
    changeTurn () {
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

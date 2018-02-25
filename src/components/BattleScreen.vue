<template>
  <section class="Battleground">
    <section class="Battleground__field">
      <flash playerId="one" />
      <player-hud playerId="one" />
      <character playerId="one"/>
      <actions
        :turn="1"
        :currentTurn="turn"
        playerId="one"
        @done="changeTurn"
      />
    </section>
    <section class="Battleground__field">
      <flash playerId="two" />
      <player-hud playerId="two" />
      <character playerId="two"/>
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
import Character from '@/components/Character'

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
    Actions,
    Character
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
.Battleground {
  height: 100%;
  width: 100%;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  &__field {
    width: 50%;
    height: 100%;
    position: relative;
  }
}
</style>

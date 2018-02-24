<template>
  <section v-show="isCurrentTurn && turnHasStarted">
    <attack
      :playerId="playerId"
      :hasPowerUp="hasPowerUp"
      @done="finishAttack" />
    <button
      @click="powerUp"
      :disabled="disablePowerUp">
      BAILAR
    </button>
    <special-action
      :playerId="playerId"
      @done="finishTurn" />
  </section>
</template>

<script>
import { mapMutations } from 'vuex'
import utils from '@/services/utils'
import EventBus from '@/services/EventBus'
import playerMixin from '@/mixins/playerMixin'
import Attack from '@/components/Attack'
import SpecialAction from '@/components/SpecialAction'

export default {
  data () {
    return {
      turnHasStarted: false,
      hasPowerUp: false,
      powerUpCost: 20,
      illmentTurnCount: 0,
      perkTurnCount: 0,
      isCurrentTurn: false
    }
  },
  mixins: [ playerMixin ],
  props: {
    turn: {
      type: Number,
      required: true
    },
    currentTurn: {
      type: Number,
      required: true
    }
  },
  watch: {
    currentTurn () {
      if (this.turn === this.currentTurn) {
        this.isCurrentTurn = true
        this.startTurn()
      } else {
        this.isCurrentTurn = false
      }
    }
  },
  components: {
    Attack,
    SpecialAction
  },
  computed: {
    disablePowerUp () {
      return this.hasPowerUp || this.player.mana < this.powerUpCost
    },
    playerIllment () {
      return this.player.illment
    },
    playerPerk () {
      return this.player.perk
    }
  },
  methods: {
    ...mapMutations(['resetIllment', 'resetPerk']),
    powerUp () {
      this.hasPowerUp = true
      this.substractPlayerMana(this.powerUpCost)

      this.finishTurn()
    },
    startTurn () {
      if (this.playerPerk && this.playerPerk.id === 'cure') {
        this.healPlayer({
          player: this.playerId,
          amount: 5
        })
      }

      if (!this.playerIllment || this.playerIllment.id !== 'lose-turns') {
        this.turnHasStarted = true
      }

      if (this.playerIllment) {
        switch (this.playerIllment.id) {
          case 'burn':
            this.hurtPlayer({
              player: this.playerId,
              amount: 3
            })
            break
          case 'lose-turns':
            this.finishTurn(true)
            break
          case 'confusion':
            // this will be handled by the action itself
            break
        }
      }
    },
    finishAttack () {
      if (this.hasPowerUp) {
        this.hasPowerUp = false
      }

      this.finishTurn()
    },
    finishTurn (skip = false) {
      if (this.playerIllment) {
        this.illmentTurnCount++
        if (this.illmentTurnCount === this.playerIllment.duration) {
          this.resetIllment(this.playerId)
          this.illmentTurnCount = 0
        }
      }

      if (skip) {
        EventBus.$emit('showFlash', {
          playerId: this.playerId,
          text: `${this.player.name} pierde el turno`,
          style: 'info'
        })

        this.turnHasStarted = false

        setTimeout(() => {
          this.$emit('done')
        }, 2000)
      } else {
        if (!skip && this.player.bonus === 'random-recovery') {
          this.handleRandomRecovery()
        }

        if (this.playerPerk) {
          this.perkTurnCount++
          if (this.perkTurnCount === this.playerPerk.duration) {
            this.resetPerk(this.playerId)
            this.perkTurnCount = 0
          }
        }

        this.turnHasStarted = false
        this.$emit('done')
      }
    },
    handleRandomRecovery () {
      const chance = utils.getRandomNumber(10) < 2

      if (chance === true) {
        EventBus.$emit('showFlash', {
          playerId: this.playerId,
          text: `El triángulo es un instrumento mágico <3`,
          style: 'info'
        })

        this.healPlayer({
          player: this.playerId,
          amount: 20
        })
      }
    }
  }
}
</script>

<style lang="scss">
</style>

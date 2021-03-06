<template>
  <section
    v-show="isCurrentTurn && turnHasStarted"
    :class="`Actions Actions--${playerId}`">
    <attack
      :playerId="playerId"
      :hasPowerUp="hasPowerUp"
      @done="finishAttack" />
    <button
      @click="powerUp"
      :disabled="disablePowerUp">
      Bailar
    </button>
    <special-action
      :playerId="playerId"
      @done="finishTurn" />
  </section>
</template>

<script>
import { mapMutations } from 'vuex'
import sound from '@/services/sound'
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
      sound.playSpecial()

      this.hasPowerUp = true
      this.substractPlayerMana(this.powerUpCost)

      EventBus.$emit('showFlash', {
        playerId: this.playerId,
        text: `Cargando energía...`,
        style: 'info',
        time: 2000
      })

      this.finishTurn(false, 2000)
    },
    startTurn () {
      if (this.playerPerk && this.playerPerk.id === 'cure') {
        this.healPlayer({
          player: this.playerId,
          amount: 5
        })
      }

      if (!this.playerIllment || this.playerIllment.id !== 'lose-turns') {
        sound.playTurn()
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
    finishTurn (skip = false, delay = 500) {
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

        setTimeout(() => {
          this.$emit('done')
        }, delay)
      }
    },
    handleRandomRecovery () {
      const chance = utils.getRandomNumber(10) === 1

      if (chance === true) {
        EventBus.$emit('showFlash', {
          playerId: this.playerId,
          text: `El triángulo es un instrumento mágico. ¡Recuperas vida! <3`,
          style: 'info'
        })

        sound.playSpecial()

        this.healPlayer({
          player: this.playerId,
          amount: 10
        })
      }
    }
  }
}
</script>

<style lang="scss">
.Actions {
  width: 60%;
  position: absolute;
  bottom: 0;
  display: flex;
  flex-direction: column;
  background: rgba(0,0,0,.5);
  padding: 8px;
  &--one {
    left: 0;
  }
  &--two {
    right: 0;
  }
  button {
    margin: 0 0 8px 0;
    padding: .3em 1em;
    background: #17bebb;
    border: none;
    color: #fff;
    cursor: pointer;
    font-size: 1.2rem;
    font-family: monospace;
    text-transform: capitalize;
    transition: opacity .3s;
    &:last-child {
      margin-bottom: 0;
    }

    &:hover {
      opacity: .8;
    }

    &:disabled {
      cursor: default;
      background: #094644;
      color: #118b89;
      &:hover {
        opacity: 1;
      }
    }
  }
}
</style>

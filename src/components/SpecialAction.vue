<template>
  <button
    @click="specialAction"
    :disabled="disableSpecialAction">
    {{specialActionName}}
  </button>
</template>

<script>
import { mapMutations } from 'vuex'
import playerMixin from '@/mixins/playerMixin'

export default {
  data () {
    return {
      specialActionCost: 50
    }
  },
  mixins: [ playerMixin ],
  props: {
    hasPowerUp: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    specialActionName () {
      const actionNames = {
        reggaeton: 'Twerking',
        heavy: 'Headbanging',
        country: 'Lanzar estepicursor',
        classic: 'Dirigir orquesta',
        hiphop: 'Freestyle',
        rock: 'Air guitar'
      }

      return actionNames[this.player.style]
    },
    disableSpecialAction () {
      return this.opponent.illment !== null ||
             this.player.mana < this.specialActionCost
    }
  },
  methods: {
    ...mapMutations(['addShield']),
    specialAction () {
      switch (this.player.style) {
        case 'reggaeton':
          // absorb enemy life
          this.hurtPlayer({
            player: this.opponentId,
            amount: 10
          })
          this.healPlayer({
            player: this.playerId,
            amount: 10
          })

          break
        case 'heavy':
          // burn enemy for 4 turns
          this.addIllmentToPlayer({
            player: this.opponentId,
            illment: 'burn',
            duration: 4
          })

          break
        case 'country':
          // opponent loses 2 turns
          this.addIllmentToPlayer({
            player: this.opponentId,
            illment: 'lose-turns',
            duration: 2
          })

          break
        case 'classic':
          // shield (20 damage)
          this.addShield(this.playerId)
          break
        case 'hiphop':
          // heal a bit every turn for 4 turns
          this.addPerkToPlayer({
            player: this.playerId,
            perk: 'cure',
            duration: 4
          })

          break
        case 'rock':
          // confuse opponent for 4 turns
          this.addIllmentToPlayer({
            player: this.opponentId,
            illment: 'confusion',
            duration: 4
          })

          break
      }

      this.substractPlayerMana(this.specialActionCost)

      this.$emit('done')
    }
  }
}
</script>

<style lang="scss">
</style>

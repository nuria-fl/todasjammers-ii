import { mapState, mapMutations, mapActions } from 'vuex'

export default {
  props: {
    playerId: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapState(['players']),
    player () {
      return this.players[this.playerId]
    },
    opponentId () {
      return this.playerId === 'one' ? 'two' : 'one'
    },
    opponent () {
      return this.players[this.opponentId]
    }
  },
  methods: {
    ...mapMutations([
      'healPlayer',
      'substractMana',
      'increaseMana',
      'addIllmentToPlayer',
      'addPerkToPlayer'
    ]),
    ...mapActions(['hurtPlayer']),
    increasePlayerMana (amount = 5) {
      this.increaseMana({
        player: this.playerId,
        amount
      })
    },
    substractPlayerMana (amount) {
      this.substractMana({
        player: this.playerId,
        amount
      })
    }
  }
}

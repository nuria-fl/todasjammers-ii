<template>
  <section class="PlayerSetup">
    <div class="PlayerSetup__fields">
      <div>
        <label class="PlayerSetup__label">
          Nombre:
        </label>
        <input
          type="text"
          v-model="playerName"
          :disabled="finished"
          class="PlayerSetup__input">
      </div>
      <div>
        <label class="PlayerSetup__label">
          País:
        </label>
        <select v-model="country" :disabled="finished">
          <option
            v-for="country in availableCountries"
            :value="country.id"
            :key="country.id">
            {{ country.name }}
          </option>
        </select>
      </div>
      <div>
        <label class="PlayerSetup__label">
          Estilo musical:
        </label>
        <select v-model="musicStyle" :disabled="finished">
          <option
            v-for="style in availableStyles"
            :value="style.id"
            :key="style.id">
            {{ style.name }}
          </option>
        </select>
      </div>
      <div>
        <label class="PlayerSetup__label">
          Instrumento:
        </label>
        <select v-model="instrument" :disabled="finished">
          <option
            v-for="instrument in availableInstruments"
            :value="instrument.id"
            :key="instrument.id">
            {{ instrument.name }}
          </option>
        </select>
      </div>
    </div>

    <div :class="`PlayerSetup__result PlayerSetup__result--${playerId}`">
      <character
        :playerId="playerId"
        :characterStyle="musicStyle"
      />
      <div class="PlayerSetup__stats">
        <div>
          Ataque:
          <div
            class="PlayerSetup__bar"
            :style="`width: ${attackBarWidth}%`">
          </div>
        </div>
        <div>
          Resistencia:
          <div
            class="PlayerSetup__bar"
            :style="`width: ${defenseBarWidth}%`">
          </div>
        </div>
        <div>
          {{ specialExplanation }}
        </div>
        <div>
          {{ bonusExplanation }}
        </div>
      </div>
    </div>

    <button
      @click="createPlayer"
      :disabled="finished"
      class="Btn PlayerSetup__btn">
      ¡Listo!
    </button>
  </section>
</template>

<script>
import { mapMutations } from 'vuex'
import utils from '@/services/utils'
import Character from '@/components/Character'

export default {
  data () {
    return {
      availableCountries: [
        {
          id: 'es',
          name: 'España',
          stats: {
            attack: 5,
            defense: 5
          }
        },
        {
          id: 'fr',
          name: 'Francia',
          stats: {
            attack: 4,
            defense: 6
          }
        },
        {
          id: 'it',
          name: 'Italia',
          stats: {
            attack: 6,
            defense: 4
          }
        },
        {
          id: 'uk',
          name: 'Reino Unido',
          stats: {
            attack: 6.5,
            defense: 3.5
          }
        },
        {
          id: 'ge',
          name: 'Alemania',
          stats: {
            attack: 4.5,
            defense: 5.5
          }
        },
        {
          id: 'pt',
          name: 'Portugal',
          stats: {
            attack: 3.5,
            defense: 6.5
          }
        }
      ],
      availableInstruments: [
        {
          id: 'mic',
          name: 'Micrófono',
          bonus: 'attack'
        },
        {
          id: 'guitar',
          name: 'Guitarra',
          bonus: 'defense'
        },
        {
          id: 'triangle',
          name: 'Triángulo',
          bonus: 'random-recovery'
        }
      ],
      availableStyles: [
        {
          id: 'reggaeton',
          name: 'Reggaeton',
          strongAgainst: 'classic',
          weakAgainst: 'heavy'
        },
        {
          id: 'heavy',
          name: 'Heavy Metal',
          strongAgainst: 'country',
          weakAgainst: 'hiphop'
        },
        {
          id: 'country',
          name: 'Country',
          strongAgainst: 'hiphop',
          weakAgainst: 'rock'
        },
        {
          id: 'classic',
          name: 'Música clásica',
          strongAgainst: 'heavy',
          weakAgainst: 'country'
        },
        {
          id: 'hiphop',
          name: 'Hip Hop',
          strongAgainst: 'rock',
          weakAgainst: 'reggaeton'
        },
        {
          id: 'rock',
          name: 'Rock',
          strongAgainst: 'reggaeton',
          weakAgainst: 'classic'
        }
      ],
      playerName: null,
      musicStyle: null,
      instrument: null,
      country: null,
      finished: false
    }
  },
  props: {
    playerId: {
      type: String,
      default: 'one'
    }
  },
  components: {
    Character
  },
  mounted () {
    const getRandomItemId = (collection) => {
      const max = collection.length - 1
      return collection[utils.getRandomNumber(max)].id
    }

    this.playerName = `Jugador ${this.playerId === 'one' ? 1 : 2}`
    this.musicStyle = getRandomItemId(this.availableStyles)
    this.instrument = getRandomItemId(this.availableInstruments)
    this.country = getRandomItemId(this.availableCountries)
  },
  computed: {
    chosenInstrument () {
      return this.availableInstruments.find(instrument => instrument.id === this.instrument)
    },
    bonus () {
      return this.chosenInstrument.bonus
    },
    chosenStyle () {
      return this.availableStyles.find(style => style.id === this.musicStyle)
    },
    chosenCountry () {
      return this.availableCountries.find(country => country.id === this.country)
    },
    strength () {
      return this.chosenStyle.strongAgainst
    },
    weakness () {
      return this.chosenStyle.weakAgainst
    },
    bonusExplanation () {
      switch (this.bonus) {
        case 'defense':
          return 'Plus en resistencia'
        case 'attack':
          return 'Plus en ataque'
        case 'random-recovery':
          return 'Probabilidad de regeneración espontánea'
      }
    },
    specialExplanation () {
      switch (this.musicStyle) {
        case 'reggaeton':
          return 'Twerking: Absorbe vida del oponente'
        case 'rock':
          return 'Air guitar: Confunde al oponente durante 4 turnos'
        case 'heavy':
          return 'Headbanging: Hiere al oponente durante 4 turnos'
        case 'classic':
          return 'Dirigir orquesta: Obtiene un escudo'
        case 'country':
          return 'Lanzar estepicursor: Tu oponente pierde 2 turnos'
        case 'hiphop':
          return 'Freestyle: Recupera vida durante 4 turnos'
      }
    },
    attackBarWidth () {
      return (100 / 10) * this.chosenCountry.stats.attack
    },
    defenseBarWidth () {
      return (100 / 10) * this.chosenCountry.stats.defense
    }
  },
  methods: {
    ...mapMutations(['setupPlayer']),
    createPlayer () {
      this.setupPlayer({
        player: this.playerId,
        name: this.playerName,
        style: this.musicStyle,
        strongAgainst: this.strength,
        weakAgainst: this.weakness,
        instrument: this.instrument,
        bonus: this.bonus,
        country: this.country,
        stats: this.chosenCountry.stats
      })
      this.finished = true
      this.$emit('ready')
    }
  }
}
</script>

<style lang="scss">
.PlayerSetup {
  width: 50%;
  height: 100%;
  position: relative;
  padding: 1rem;
  &__fields {
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 1rem;
    grid-row-gap: 1rem;
    font-size: 1rem;
  }
  &__label {
    display: block;
    margin-bottom: .2em;
  }
  select, input {
    display: block;
    width: 100%;
    font-size: 1rem;
  }
  &__btn {
    position: absolute;
    bottom: 1rem;
    left: 50%;
    width: calc(100% - 2rem);
    transform: translate(-50%, 0);
    padding: .5em;
  }

  &__result {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    flex-direction: row-reverse;
    &--two {
      flex-direction: row;
    }
  }

  &__stats {
    width: 43%;
    padding: .2rem;
    background: rgba(0,0,0,.7);
    color: #ddd;
    font-size: .9rem;
    line-height: 1.2;
    > div {
      margin: .5em;
    }
  }

  &__bar {
    width: 100%;
    height: 1rem;
    margin-top: .2em;
    transition: width .4s;
    background: #cd5334;
  }
}
</style>

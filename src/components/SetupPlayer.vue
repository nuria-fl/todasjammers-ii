<template>
  <section class="PlayerSetup">
    <div>
      <label class="PlayerSetup__label">
        Nombre del artista:
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
    <button @click="createPlayer" :disabled="finished" class="PlayerSetup__btn">¡Listo!</button>
  </section>
</template>

<script>
import { mapMutations } from 'vuex'
import utils from '@/services/utils'

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
  min-width: 14rem;
  padding: 1em;
  &__label {
    display: block;
  }
  &__btn {
    width: 100%
  }
}
</style>

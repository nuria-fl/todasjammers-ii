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
  data() {
    return {
      availableInstruments: [
        {
          id: 'mic',
          name: 'Micrófono'
        },
        {
          id: 'guitar',
          name: 'Guitarra'
        },
        {
          id: 'triangle',
          name: 'Triángulo'
        },
      ],
      availableStyles: [
        {
          id: 'reggeton',
          name: 'Reggeton'
        },
        {
          id: 'heavy',
          name: 'Heavy Metal'
        },
        {
          id: 'country',
          name: 'Country'
        },
        {
          id: 'classic',
          name: 'Música clásica'
        },
        {
          id: 'hiphop',
          name: 'Hip Hop'
        },
        {
          id: 'rock',
          name: 'Rock'
        }
      ],
      playerName: null,
      musicStyle: null,
      instrument: null,
      finished: false
    }
  },
  props: {
    playerNum: {
      type: Number,
      default: 1
    }
  },
  mounted() {
    const getRandomItemId = (collection) => {
      const max = collection.length - 1
      return collection[utils.getRandomNumber(max)].id
    }

    this.playerName = 'Jugador ' + this.playerNum
    this.musicStyle = getRandomItemId(this.availableStyles)
    this.instrument = getRandomItemId(this.availableInstruments)
  },
  methods: {
    ...mapMutations(['setupPlayer']),
    createPlayer() {
      this.setupPlayer({
        player: this.playerNum,
        name: this.playerName,
        attack: 5,
        defense: 5
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

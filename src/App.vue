<template>
  <main class="Main">
    <div v-if="hasStarted">
      <setup-screen v-if="currentScreen === 'setup'"/>
      <battle-screen v-if="currentScreen === 'battle'"/>
      <end-screen v-if="currentScreen === 'end'"/>
    </div>
    <div v-else>
      <button @click="startGame">Empezar juego</button>
    </div>
  </main>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import SetupScreen from '@/components/SetupScreen'
import BattleScreen from '@/components/BattleScreen'
import EndScreen from '@/components/EndScreen'

export default {
  components: {
    SetupScreen,
    BattleScreen,
    EndScreen
  },
  computed: {
    ...mapState(['hasStarted', 'currentScreen'])
  },
  methods: {
    ...mapMutations(['startGame'])
  }
}
</script>

<style lang="scss">
  *,
  *:before,
  *:after {
    box-sizing: border-box;
  }

  body {
    font-family: monospace;
  }

  .Main {
    position: relative;
    background: #dedede;
    width: 900px;
    height: 500px;
    margin: 0 auto;
    padding: 2rem;
  }
</style>

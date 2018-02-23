<template>
  <main>
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
  body {
    font-family: monospace;
  }
</style>

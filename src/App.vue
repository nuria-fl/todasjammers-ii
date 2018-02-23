<template>
  <main>
    <div v-if="hasStarted">
      <setup-screen v-if="currentScreen === 'setup'"/>
      <battle-screen v-if="currentScreen === 'battle'"/>
    </div>
    <div v-else>
      <button @click="startGame">Empezar juego</button>
    </div>
  </main>
</template>

<script>
import { mapState } from 'vuex'
import SetupScreen from '@/components/SetupScreen'
import BattleScreen from '@/components/BattleScreen'

export default {
  data() {
    return {
      hasStarted: false
    }
  },
  components: {
    SetupScreen,
    BattleScreen,
  },
  computed: {
    ...mapState(['currentScreen'])
  },
  methods: {
    startGame() {
      this.hasStarted = true
    }
  }
}
</script>

<style lang="scss">
  body {
    font-family: monospace;
  }
</style>

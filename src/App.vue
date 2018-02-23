<template>
  <main>
    <div v-if="hasStarted">
      Jueguito
    </div>
    <div v-else>
      <button @click="startGame">Empezar juego</button>
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      hasStarted: false
    }
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

<template>
  <section>
    <div>{{ player.name }}</div>
    <div>Life: {{ player.life }}</div>
    <div v-if="player.shield">Shield: {{ player.shield }}</div>
    <div>Mana: {{ player.mana }}</div>
  </section>
</template>

<script>
import playerMixin from '@/mixins/playerMixin'

export default {
  mixins: [ playerMixin ]
}
</script>

<style lang="scss">
</style>

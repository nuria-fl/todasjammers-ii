<template>
  <section class="Setup">
    <setup-player playerId="one" @ready="setPlayerReady"/>
    <setup-player playerId="two" @ready="setPlayerReady"/>
  </section>
</template>

<script>
import { mapMutations } from 'vuex'
import SetupPlayer from '@/components/SetupPlayer'

export default {
  data () {
    return {
      playerReadyCount: 0
    }
  },
  components: {
    SetupPlayer
  },
  methods: {
    ...mapMutations(['setCurrentScreen']),
    setPlayerReady () {
      this.playerReadyCount++
      if (this.playerReadyCount === 2) {
        this.setCurrentScreen('battle')
      }
    }
  }
}
</script>

<style lang="scss">
.Setup {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
}
</style>

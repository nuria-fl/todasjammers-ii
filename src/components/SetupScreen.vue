<template>
  <section class="Setup">
    <setup-player :playerNum="1" @ready="setPlayerReady"/>
    <setup-player :playerNum="2" @ready="setPlayerReady"/>
  </section>
</template>

<script>
import { mapMutations } from 'vuex'
import SetupPlayer from '@/components/SetupPlayer'

export default {
  data() {
    return {
      playerReadyCount: 0
    }
  },
  components: {
    SetupPlayer
  },
  methods: {
    ...mapMutations(['setCurrentScreen']),
    setPlayerReady() {
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
  display: flex;
  justify-content: center;
}
</style>

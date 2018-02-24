<template>
  <div
    v-if="isVisible"
    class="Flash"
    :class="`Flash--player${playerId} Flash--${style}`">
    {{ text }}
  </div>
</template>

<script>
import EventBus from '@/services/EventBus'

export default {
  data () {
    return {
      style: null,
      playerId: null,
      isVisible: false,
      timeout: null
    }
  },
  mounted () {
    EventBus.$on('showFlash', this.showFlash)
  },
  methods: {
    showFlash (info) {
      this.hideFlash()

      this.playerId = info.playerId
      this.style = info.style
      this.text = info.text
      this.isVisible = true
      this.timeout = setTimeout(this.hideFlash, 3000)
    },
    hideFlash () {
      clearTimeout(this.timeout)

      this.isVisible = false
      this.playerId = null
      this.style = null
      this.text = null
      this.timeout = null
    }
  }
}
</script>

<style lang="scss">
  .Flash {
    position: absolute;
    top: 0;
    &--playerone {
      left: 0
    }
    &--playertwo {
      right: 0
    }
    &--success {
      color: green
    }
    &--danger {
      color: red
    }
  }
</style>

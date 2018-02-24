<template>
  <div>
    <div
      v-for="alert in alerts"
      v-show="alert.isVisible"
      :key="alert.id"
      class="Flash"
      :class="`Flash--${alert.style}`">
      {{ alert.text }}
    </div>
  </div>
</template>

<script>
import EventBus from '@/services/EventBus'

export default {
  data () {
    return {
      alerts: []
    }
  },
  props: {
    playerId: {
      type: String,
      required: true
    }
  },
  mounted () {
    EventBus.$on('showFlash', this.addFlashAlert)
  },
  methods: {
    addFlashAlert (info) {
      if (info.playerId === this.playerId) {
        // clean old alerts
        this.alerts = this.alerts.filter(alert => alert.isVisible)

        const alert = {
          id: new Date().getTime() + this.alerts.length,
          style: info.style,
          text: info.text,
          isVisible: true
        }

        console.log(alert.id, alert.text)

        this.alerts.push(alert)

        setTimeout(() => {
          this.hideFlashAlert(alert.id)
        }, info.time || 2000)
      }
    },
    hideFlashAlert (alertId) {
      const alertIdx = this.alerts.findIndex(alert => alert.id === alertId)

      this.alerts[alertIdx].isVisible = false
    }
  }
}
</script>

<style lang="scss">
  .Flash {
    position: absolute;
    top: 50%;
    left: 50%;

    &:nth-child(odd) {
      margin-left: -3em;
      margin-top: -.5em;
    }

    &--success,
    &--danger {
      animation: bubbleUp 2s forwards;
    }
    &--success {
      color: green
    }
    &--danger {
      color: red
    }

    @keyframes bubbleUp {
      0% {
        opacity: 1;
        transform: translate(0,0)
      }
      100% {
        opacity: 0;
        transform: translate(0,-2em)
      }
    }
  }
</style>

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

        const defaultTime = this.style === 'info' ? 4000 : 3000

        setTimeout(() => {
          this.hideFlashAlert(alert.id)
        }, info.time || defaultTime)
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
    z-index: 9;
    font-size: 2rem;

    &:nth-child(odd) {
      margin-left: -3em;
      margin-top: -.5em;
    }

    &--success,
    &--danger {
      animation: bubbleUp 3s forwards;
    }
    &--success {
      color: green
    }
    &--danger {
      color: red
    }

    &--info {
      background: rgba(0,0,0,.7);
      margin: 0 !important;
      top: 0;
      width: 100%;
      padding: 1em;
      color: #fff;
      font-size: 1.3rem;
      text-align: center;
      transform: translate(-50%, -5em);
      animation: comeDown .5s forwards;
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

    @keyframes comeDown {
      0% {
        opacity: 0;
        transform: translate(-50%,-5em)
      }
      50% {
        opacity: 1;
      }
      100% {
        transform: translate(-50%,0)
      }
    }
  }
</style>

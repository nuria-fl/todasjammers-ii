<template>
  <section :class="`Hud Hud--${playerId}`">
    <div class="Bar">
      <div
        :class="`Bar__progress Bar__progress--life`"
        :style="`width: ${player.life}%`">
      </div>
      <div
        v-if="player.shield"
        :class="`Bar__progress Bar__progress--shield`"
        :style="`width: calc(${shieldWidth}% - 8px)`">
      </div>
      <div
        :class="`Bar__progress Bar__progress--mana`"
        :style="`width: ${player.mana}%`">
      </div>
    </div>
    <h2 class="Hud__playerName">{{ player.name }}</h2>
  </section>
</template>

<script>
import playerMixin from '@/mixins/playerMixin'

export default {
  mixins: [ playerMixin ],
  computed: {
    shieldWidth () {
      return (100 / 20) * this.player.shield
    }
  }
}
</script>

<style lang="scss">
  .Hud {
    width: 100%;
    display: flex;
    flex-direction: column;

    &__playerName {
      margin: .2em 0 0;
      font-size: 1.2rem;
    }

    &--two {
      align-items: flex-end;
      .Bar {
        transform: scaleX(-1);
      }
    }
  }
  .Bar {
    width: 80%;
    padding: 4px;
    background: rgba(0,0,0,.3);
    position: relative;

    &__progress {
      width: 100%;
      height: 1.7rem;
      transition: width .4s;
      &--life {
        background: #cd5334;
      }
      &--shield {
        position: absolute;
        top: 4px;
        left: 4px;
        opacity: .8;
        background: #fad8d6;
      }
      &--mana {
        height: .5rem;
        margin-top: 4px;
        background: #17bebb;
      }
    }

  }
</style>

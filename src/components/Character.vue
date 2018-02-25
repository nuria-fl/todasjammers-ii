<template>
  <div :class="`Character Character--${playerId}`">
    <div :class="`Character__bd Character__bd--${style}`"></div>
    <div class="Character__feet"></div>
  </div>
</template>

<script>
import playerMixin from '@/mixins/playerMixin'
export default {
  mixins: [ playerMixin ],
  props: {
    characterStyle: {
      type: String,
      default: ''
    }
  },
  computed: {
    style () {
      return this.characterStyle || this.player.style
    }
  }
}
</script>

<style lang="scss">
  $characterHeight: 304px;
  .Character {
    &--two {
      transform: scaleX(-1);
    }
    &__bd {
      width: 230px;
      height: 304px;
      margin: 0 auto;
      background: url('/static/bodies.png') no-repeat;
      animation: 2s bounce infinite;
      &--heavy {
        background-position: 0 0;
      }
      &--hiphop {
        background-position: 0 -#{$characterHeight};
      }
      &--reggaeton {
        background-position: 0 -#{$characterHeight * 2};
      }
      &--classic {
        background-position: 0 -#{$characterHeight * 3};
      }
      &--rock {
        background-position: 0 -#{$characterHeight * 4};
      }
      &--country {
        background-position: 0 -#{$characterHeight * 5};
      }
    }
    &__feet {
      width: 117px;
      height: 25px;
      margin: 0 auto;
      background: url('/static/feet.png') no-repeat;
    }

    @keyframes bounce {
      0% {
        transform: translate(0, -.3rem);
      }
      50% {
        transform: translate(0, .3rem);
      }
      100% {
        transform: translate(0, -.3rem);
      }
    }
  }
</style>

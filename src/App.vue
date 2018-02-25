<template>
  <main class="Main">
    <template v-if="hasStarted">
      <setup-screen v-if="currentScreen === 'setup'"/>
      <battle-screen v-if="currentScreen === 'battle'"/>
      <end-screen v-if="currentScreen === 'end'"/>
    </template>
    <div
      v-else
      class="Splash">
      <h1 class="Splash__title">EURO<strong>BATTLE</strong></h1>
      <p class="Splash__lead">
        Juego para TodasJammersII<br>Desarrollado por @pincfloit
      </p>
      <button
        class="Btn"
        disabled>
        Un jugador (¡pronto!)
      </button>
      <button
        class="Btn"
        @click="startGame">
        Dos jugadores
      </button>
    </div>
  </main>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import SetupScreen from '@/components/SetupScreen'
import BattleScreen from '@/components/BattleScreen'
import EndScreen from '@/components/EndScreen'

export default {
  components: {
    SetupScreen,
    BattleScreen,
    EndScreen
  },
  computed: {
    ...mapState(['hasStarted', 'currentScreen'])
  },
  methods: {
    ...mapMutations(['startGame'])
  }
}
</script>

<style lang="scss">
/* http://meyerweb.com/eric/tools/css/reset/ 
   v2.0 | 20110126
   License: none (public domain)
*/

html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
  display: block;
}
body {
  line-height: 1;
}
ol, ul {
  list-style: none;
}
blockquote, q {
  quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
  content: '';
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}

  *,
  *:before,
  *:after {
    box-sizing: border-box;
  }

  body {
    font-family: Lato, sans-serif;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .Btn {
    margin: 0 0 8px 0;
    padding: .3em 1em;
    background: #17bebb;
    border: none;
    color: #fff;
    cursor: pointer;
    font-size: 1.2rem;
    font-family: monospace;
    text-transform: capitalize;
    transition: opacity .3s;
    &:last-child {
      margin-bottom: 0;
    }

    &:hover {
      opacity: .8;
    }

    &:disabled {
      cursor: default;
      background: #094644;
      color: #118b89;
      &:hover {
        opacity: 1;
      }
    }
  }

  .Main {
    position: relative;
    background: url('/static/bg.jpg') no-repeat #dedede;
    background-size: cover;
    width: 900px;
    height: 500px;
    margin: 0 auto;
    overflow: hidden;
  }

  .Splash {
    width: 100%;
    height: 100%;
    padding-bottom: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: rgba(0,0,0,.3);

    &__title {
      margin: 0;
      font-family: 'Luckiest Guy', sans-serif;
      font-size: 5.5rem;
      color: #cd5334;
      text-shadow: 5px 5px 0  #2e282a;
      strong {
        color: #56cfcd;
      }
    }

    &__lead {
      max-width: 70%;
      margin: 0 auto 1em;
      color: #fff;
      font-size: 1.2rem;
      text-align: center;
      opacity: .8;
    }

    .Btn {
      min-width: 45%;
      font-size: 1.4rem;
      padding: .5em;
    }
  }
</style>

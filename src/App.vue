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
        @click="start">
        Dos jugadores
      </button>

      <footer class="Credits">
        <a href="https://github.com/nuria-fl/todasjammers-ii/blob/master/CREDITS.md" target="_blank">Credits</a>
      </footer>
    </div>
    <button class="Btn SoundToggle" @click="toggleSound">
      <svg fill="#fff" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
        <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
        <path d="M0 0h24v24H0z" fill="none"/>
    </svg>
    </button>
  </main>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import sound from '@/services/sound'
import SetupScreen from '@/components/SetupScreen'
import BattleScreen from '@/components/BattleScreen'
import EndScreen from '@/components/EndScreen'

export default {
  data () {
    return {
      bgSong: null
    }
  },
  components: {
    SetupScreen,
    BattleScreen,
    EndScreen
  },
  mounted() {
    setTimeout(() => {
      sound.playBgMusic()
    }, 1000) 
  },
  computed: {
    ...mapState(['hasStarted', 'currentScreen'])
  },
  methods: {
    ...mapMutations(['startGame']),
    start () {
      sound.playMenu()
      this.startGame()
    },
    toggleSound () {
      sound.toggleSound()
    }
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
    position: relative;
  }

  .Credits {
    width: 100%;
    position: absolute;
    left: 0;
    bottom: 0;
    padding: 1em;
    font-size: .8rem;
    text-align: center;

    a {
      color: #fff;
    }
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

  .SoundToggle {
    position: absolute;
    top: 0;
    right: 0;
    padding: .3em;
    background: transparent;
    opacity: .5;
    z-index: 99;
    &:hover {
      opacity: .9;
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
      animation: titleBounce 3s infinite;
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

  @keyframes titleBounce {
      0% {
        transform: translate(0, -.5rem);
      }
      50% {
        transform: translate(0, .3rem);
      }
      100% {
        transform: translate(0, -.5rem);
      }
    }
</style>

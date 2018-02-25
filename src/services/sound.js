let isMuted = false
const bgMusic = new Audio('/static/lunar-joyride.mp3')

bgMusic.addEventListener('ended', function () {
  this.currentTime = 0
  this.play()
}, false)

const playBgMusic = () => {
  if (!isMuted) {
    bgMusic.play()
  }
}

const menuSound = new Audio('/static/Menu_Navigate_00.mp3')
const playMenu = () => {
  if (!isMuted) {
    menuSound.play()
  }
}

const turnSound = new Audio('/static/turn.mp3')
turnSound.volume = 0.3
const playTurn = () => {
  if (!isMuted) {
    turnSound.play()
  }
}

const hitSound = new Audio('/static/Hit_03.mp3')
const playHit = () => {
  if (!isMuted) {
    hitSound.play()
  }
}

const specialSound = new Audio('/static/cure.mp3')
const playSpecial = () => {
  if (!isMuted) {
    specialSound.play()
  }
}

const toggleSound = () => {
  if (isMuted) {
    isMuted = false
    bgMusic.play()
  } else {
    isMuted = true
    bgMusic.pause()
  }
}

export default {
  playBgMusic,
  playMenu,
  playTurn,
  playHit,
  playSpecial,
  toggleSound
}

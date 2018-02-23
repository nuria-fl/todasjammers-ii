const getRandomNumber = (max, min = 1) => {
  return Math.floor(Math.random() * max) + min
}

export default {
  getRandomNumber
}

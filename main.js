/* eslint-disable no-unused-vars */

class Car {
  constructor(direction, speed, location, hasBeenStarted) {
    this.direction = direction
    this.speed = speed
    this.location = location
    this.hasBeenStarted = false
  }
  turn(direction) {
    this.direction = direction
  }
  accelerate() {
    if (this.speed < 100) {
      this.speed += 10
    }
  }
  decelerate() {
    if (this.speed > 10) {
      this.speed += 10
    }
  }
  move() {
    // using viewport coordinate system with (0, 0) at top-left
    switch (this.direction) {
      case 'north':
        this.location[0] -= this.speed
        break
      case 'north-east':
        this.location[0] -= getSideFromHypotenuse(this.speed)
        this.location[1] += getSideFromHypotenuse(this.speed)
        break
      case 'north-west':
        this.location[0] -= getSideFromHypotenuse(this.speed)
        this.location[1] -= getSideFromHypotenuse(this.speed)
        break
      case 'south':
        this.location[0] += this.speed
        break
      case 'south-east':
        this.location[0] += getSideFromHypotenuse(this.speed)
        this.location[1] += getSideFromHypotenuse(this.speed)
        break
      case 'south-west':
        this.location[0] += getSideFromHypotenuse(this.speed)
        this.location[1] -= getSideFromHypotenuse(this.speed)
        break
      case 'east':
        this.location[1] += this.speed
        break
      case 'west':
        this.location[1] -= this.speed
        break
    }
    game.$car = renderCar(this)
  }
  start() {
    if (!game.playerStatus.ignition) {
      game.playerStatus.ignitionTimer = setInterval(() => {
        this.move()
      }, 16)
      game.playerStatus.ignition = true
    }
    else {
      clearInterval(game.playerStatus.ignitionTimer)
      game.playerStatus.ignition = false
    }
  }
}

function getSideFromHypotenuse(hypot) {
  return Math.floor(((hypot ** 2) / 2) ** 0.5)
}

const userCar = new Car('east', 30, [1000, 1000])

const game = {
  playerCar: userCar,
  playerStatus: {
    ignition: false,
    ignitionTimer: null
  },
  driveArea: document.getElementById('drive-area')
}

document.body.addEventListener('keydown', event => {
  console.log(event.code)
  if (event.code === 'Space') {
    game.playerCar.start()
  }
  if (game.playerStatus.ignition) {
    if (event.code === 'KeyW') {
      game.playerCar.turn('north')
    }
    if (event.code === 'KeyA') {
      game.playerCar.turn('west')
    }
    if (event.code === 'KeyS') {
      game.playerCar.turn('south')
    }
    if (event.code === 'KeyD') {
      game.playerCar.turn('east')
    }
  }
})

function renderCar(car) {
  const $oldRender = document.getElementById('player-car')
  game.driveArea.removeChild($oldRender)
  console.log(car.location)
  const [y, x] = car.location
  const $car = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
  $car.id = 'player-car'
  $car.setAttribute('height', 500)
  $car.setAttribute('width', 500)
  $car.setAttribute('x', x)
  $car.setAttribute('y', y)
  game.driveArea.appendChild($car)
}

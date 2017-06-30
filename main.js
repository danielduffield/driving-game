/* eslint-disable no-unused-vars */

class Car {
  constructor(direction, speed, location) {
    this.direction = direction
    this.speed = speed
    this.location = location
  }
  turn(direction) {
    this.direction = direction
  }
  accelerate(acceleration) {
    this.speed += acceleration
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
    renderCar(this)
  }
  static start(car) {
    setInterval(function () {
      car.move()
    }, 16)
  }
}

function getSideFromHypotenuse(hypot) {
  return Math.floor(((hypot ** 2) / 2) ** 0.5)
}

const userCar = new Car('east', 10, [1000, 1000])

const game = {
  playerCar: userCar,
  driveArea: document.getElementById('drive-area')
}

document.body.addEventListener('keydown', event => {
  if (event.code === 'Space') {
    Car.start(game.playerCar)
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

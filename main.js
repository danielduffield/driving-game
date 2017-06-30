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
    // using traditional coordinate system with (0, 0) at center
    switch (this.direction) {
      case 'north':
        this.location[0] += this.speed
        break
      case 'north-east':
        this.location[0] += getSideFromHypotenuse(this.speed)
        this.location[1] += getSideFromHypotenuse(this.speed)
        break
      case 'north-west':
        this.location[0] += getSideFromHypotenuse(this.speed)
        this.location[1] -= getSideFromHypotenuse(this.speed)
        break
      case 'south':
        this.location[0] -= this.speed
        break
      case 'south-east':
        this.location[0] -= getSideFromHypotenuse(this.speed)
        this.location[1] += getSideFromHypotenuse(this.speed)
        break
      case 'south-west':
        this.location[0] -= getSideFromHypotenuse(this.speed)
        this.location[1] -= getSideFromHypotenuse(this.speed)
        break
      case 'east':
        this.location[1] += this.speed
        break
      case 'west':
        this.location[1] -= this.speed
        break
    }
  }
  static start(car) {
    setInterval(function () {
      car.move()
    }, 32)
  }
}

function getSideFromHypotenuse(hypot) {
  return Math.floor(((hypot ** 2) / 2) ** 0.5)
}

const game = {
  playerCar: new Car('east', 1, [0, 0]),
  $playerCar: document.getElementById('player-car')
}

document.body.addEventListener('keydown', event => {
  if (event.code === 'Space') {
    Car.start(game.playerCar)
  }
})

class Soldier {

  constructor({ position = { x: 0, y: 0 } }) {
    this.position = position
    this.size = 16;
  }

  draw() {
    context.fillStyle = 'green';
    context.fillRect(this.position.x, this.position.y, this.size, this.size)

  }

}
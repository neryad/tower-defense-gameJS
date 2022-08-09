const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

canvas.width = 1280;
canvas.height = 728;
context.fillStyle = 'black';
context.fillRect(0, 0, canvas.width, canvas.height);
const image = new Image();
image.onload = () => {

  animate();

}
image.src = './assets/map.png';

//TODO: poner en un archivo aparte
class Enemy {

  constructor({ position = { x: 0, y: 0 } }) {
    this.position = position
    this.width = 25
    this.height = 25
    this.waypointIndex = 0
    this.center = {
      x: this.position.x + this.width / 2,
      y: this.position.y + this.height / 2,
    }
  }

  draw() {
    context.fillStyle = 'red'
    context.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  update() {
    this.draw();

    const waypoint = waypoints[this.waypointIndex];
    const yDistance = waypoint.y - this.center.y
    const xDistance = waypoint.x - this.center.x
    const angle = Math.atan2(yDistance, xDistance);
    this.position.x += Math.cos(angle);
    this.position.y += Math.sin(angle);
    this.center = {
      x: this.position.x + this.width / 2,
      y: this.position.y + this.height / 2,
    }
    if (Math.round(this.center.x) === Math.round(waypoint.x) && Math.round(this.center.y) === Math.round(waypoint.y) && this.waypointIndex < waypoints.length - 1) {
      this.waypointIndex++;
    }
  }

}
const enemy = new Enemy({ position: { x: waypoints[0].x, y: waypoints[0].y } });
const enemy2 = new Enemy({ position: { x: waypoints[0].x - 100, y: waypoints[0].y } });
function animate() {

  requestAnimationFrame(animate);
  context.drawImage(image, 0, 0);
  enemy.update();
  enemy2.update();
  // context.fillStyle = 'red'
  // context.fillRect(x, 565, 25, 25);
  // x++;

}


class Enemy extends Sprite  {

  constructor({ position = { x: 0, y: 0 }, speed, health =100 } ) {

    super({ position, imageSrc:'../assets/enemy/orc.png', frames:{max:7}});
    this.position = position
    this.width = 25;
    this.height = 25;
    this.waypointIndex = 0
    this.center = {
      x: this.position.x + this.width / 2,
      y: this.position.y + this.height / 2,
    }
    this.radius = 20;
    this.health = health;
    this.velocity = {
      x:0,
      y:0
    }
   this.speed = speed;
  }

  draw() {
    super.draw();
    // context.fillStyle = 'red'
    // //context.fillRect(this.position.x, this.position.y, this.width, this.height);
    // context.beginPath();

    // context.arc(this.center.x, this.center.y,this.radius, 0 , Math.PI * 2);
    // context.fill();
    context.fillStyle = 'red'
    context.fillRect(this.position.x, this.position.y - 15, this.width, 5)
    context.fillStyle='green'
    context.fillRect(this.position.x, this.position.y - 15, this.width * this.health / 100, 5)
  }

  update() {
    this.draw();
    super.update()

    const waypoint = waypoints[this.waypointIndex];
    const yDistance = waypoint.y - this.center.y
    const xDistance = waypoint.x - this.center.x
    const angle = Math.atan2(yDistance, xDistance);

    this.velocity.x = Math.cos(angle) * this.speed;
    this.velocity.y = Math.sin(angle) * this.speed;

    this.position.x += this.velocity.x
    this.position.y += this.velocity.y
    // this.position.x += Math.cos(angle);
    // this.position.y += Math.sin(angle);
    this.center = {
      x: this.position.x + this.width / 2,
      y: this.position.y + this.height / 2,
    }
    // if (Math.round(this.center.x) === Math.round(waypoint.x) && Math.round(this.center.y) === Math.round(waypoint.y) && this.waypointIndex < waypoints.length - 1) {
    //   this.waypointIndex++;
    // }
    if (
      Math.abs(Math.round(this.center.x) - Math.round(waypoint.x)) <
      Math.abs(this.velocity.x) &&
      Math.abs(Math.round(this.center.y) - Math.round(waypoint.y)) <
      Math.abs(this.velocity.y) &&
      this.waypointIndex < waypoints.length - 1
    ) {
      this.waypointIndex++
    }
  }

}
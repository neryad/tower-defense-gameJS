class Projectile {

  constructor({ position = { x: 0, y: 0 }, enemy }) {

    this.position = position;
    this.velocity = {
      x: 0,
      y: 0
    }
    this.enemy = enemy,
    this.radius = 5


  }

  draw() {
    context.beginPath();
    context.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
    context.fillStyle = 'orange';
    context.fill();
  };

  update() {
    this.draw();

    const angle = Math.atan2(
      this.enemy.center.y - this.position.y,
      this.enemy.center.x - this.position.x);
      //TODO poner random o por tipo de soldado el power
    //const power = Math.random() * 10;
    let power = 5.2;
   // let power = Math.random() * (10 - 5) + 5;
      this.velocity.x = Math.cos(angle) * power;
      this.velocity.y = Math.sin(angle) * power;
      this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }




}
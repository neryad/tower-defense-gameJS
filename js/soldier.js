class Soldier {

  constructor({ position = { x: 0, y: 0 } }) {
    this.position = position
    this.size = 16;
    this.center = {
      x: this.position.x + this.size / 2,
      y: this.position.y + this.size / 2,
    }
    this.projectiles = [

    ];

    this.radius =63
    this.target
    this.frame = 0
  }

  draw() {
    context.fillStyle = 'green';
    context.fillRect(this.position.x, this.position.y, this.size, this.size);

    context.beginPath();
    context.fillStyle = 'rgba(0,0,255,0.2)';
    context.arc(this.center.x, this.center.y, this.radius,0, Math.PI * 2);
    context.fill()

  }

  update(){
    this.draw();
    if(this.frame % 50 ===0 && this.target){
      this.projectiles.push(new Projectile({
        position: {
          x: this.center.x,
          y: this.center.y
        },
        enemy: this.target
      }))
    }
    this.frame++
  }

}
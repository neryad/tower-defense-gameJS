const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

canvas.width = 1280;
canvas.height = 728;
context.fillStyle = 'black';
context.fillRect(0, 0, canvas.width, canvas.height);

const placementData2D = [];
for (let i = 0; i < placementsData.length; i += 80) {
  placementData2D.push(placementsData.slice(i, i + 80));

}

const placementTiles = [];


placementData2D.forEach((row, y) => {
  row.forEach((symbol, x) => {
    if (symbol === 18) {
      //agregar soldier
      placementTiles.push(new PlacementsTile({ position: { x: x * 16, y: y * 16 } }))
    }
  })
})

const image = new Image();
image.onload = () => {

  animate();

}
image.src = './assets/map.png';

const enemies = [];
for (let i = 0; i <10; i++){
  const xOffset =  i * 150;
  enemies.push(new Enemy({ position: { x: waypoints[0].x - xOffset, y: waypoints[0].y } }));
}

// const enemy = new Enemy({ position: { x: waypoints[0].x, y: waypoints[0].y } });
// const enemy2 = new Enemy({ position: { x: waypoints[0].x - 100, y: waypoints[0].y } });
const soldiers = [];
let activeTile;
function animate() {

  requestAnimationFrame(animate);
  context.drawImage(image, 0, 0);
  placementTiles.forEach(tile => {
    tile.update(mouse);
  });
  soldiers.forEach((soldier) => {
    soldier.update();
    soldier.target = null;
    const validEnemies = enemies.filter((enemy) => {
      const xDifference = enemy.center.x - soldier.position.x;
      const yDifference = enemy.center.y - soldier.position.y;
      const distance = Math.hypot(xDifference, yDifference);
      return distance < enemy.radius + soldier.radius;
    })
    soldier.target = validEnemies[0];
    // console.log(validEnemies);
    for (let i = soldier.projectiles.length - 1; i >= 0; i--) {
      const projectile = soldier.projectiles[i];
      projectile.update();
      const xDifference = projectile.enemy.center.x - projectile.position.x;
      const yDifference = projectile.enemy.center.y - projectile.position.y;
      const distance = Math.hypot(xDifference, yDifference);
      if (distance < projectile.enemy.radius + projectile.radius) {

        soldier.projectiles.splice(i, 1);
      }
    }
    // soldier.projectiles.forEach((projectile, i) => {
      // projectile.update();
      // const xDifference = projectile.enemy.center.x - projectile.position.x;
      // const yDifference = projectile.enemy.center.y - projectile.position.y;
      // const distance = Math.hypot(xDifference, yDifference);
      // if(distance < projectile.enemy.radius + projectile.radius){

      //   soldier.projectiles.splice(i,1);
      // }

    // })
  })
 enemies.forEach((enemy)=>{
  enemy.update();
 })


}
const mouse = {
  x: undefined,
  y: undefined
}

canvas.addEventListener('click', (event) => {
  if (activeTile && !activeTile.occupied  ) {

    soldiers.push(new Soldier({ position: { x: activeTile.position.x, y: activeTile.position.y } })
    )

    activeTile.occupied = true
  }
});
window.addEventListener('mousemove', (event) => {

  mouse.x = event.clientX;
  mouse.y = event.clientY;
  for (let i = 0; i < placementTiles.length; i++) {
    let tile = placementTiles[i]
    if (
      mouse.x > tile.position.x &&
      mouse.x < tile.position.x + tile.size &&
      mouse.y > tile.position.y &&
      mouse.y < tile.position.y + tile.size
    ) {
      activeTile = tile;
      break;
    }

  }

})

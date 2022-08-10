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



const enemy = new Enemy({ position: { x: waypoints[0].x, y: waypoints[0].y } });
const enemy2 = new Enemy({ position: { x: waypoints[0].x - 100, y: waypoints[0].y } });
const soldiers = [];
let activeTile;
function animate() {

  requestAnimationFrame(animate);
  context.drawImage(image, 0, 0);
  placementTiles.forEach(tile => {
    tile.update(mouse);
  });
  soldiers.forEach((soldier) => {
    soldier.draw();
  })
  enemy.update();
  enemy2.update();


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

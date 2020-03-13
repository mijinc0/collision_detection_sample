import { World } from './World';

const CANVAS_WIDTH = 600;
const CANVAS_HEIGHT = 800;

const canvas = window.document.getElementById('main_canvas');
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

const ctx = canvas.getContext('2d');

// Characters
const cells = [];

// world
const world = new World(CANVAS_WIDTH, CANVAS_HEIGHT);
world.addCharacter(cells);

const updateInfo = {
  world: world,
  time: 0,
};

// main roop part
function update(updateInfo) {
  // update world
  world.update(updateInfo);

  // rendering
  world.render(ctx, time);
  
  window.requestAnimationFrame((nextTime) => {
    updateInfo.time = nextTime;
    update(updateInfo);
  });
}

// start
window.requestAnimationFrame((time) => {
    updateInfo.time = time;
    update(updateInfo);
});

import { Character } from './Character.js';
import { RoundrobinCollisionDetector } from './RoundrobinCollisionDetector.js';
import { MathUtil } from './MathUtil.js';
import { World } from './World.js';

const CANVAS_WIDTH = 600;
const CANVAS_HEIGHT = 400;

const canvas = window.document.getElementById('main_canvas');
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

const ctx = canvas.getContext('2d');

// Characters
const cellSize = 700;
const cells = [];
for (let k = 0; k < cellSize; k++) {
  const character = new Character(10, 10);
  const initX = MathUtil.random(CANVAS_WIDTH);
  const initY = MathUtil.random(CANVAS_HEIGHT);
  character.moveTo(initX, initY);
  cells.push(character);
}

// world
const collisionDetector = new RoundrobinCollisionDetector();
const worldOption = {
  collisionDetector: collisionDetector.test.bind(collisionDetector),
};
const world = new World(CANVAS_WIDTH, CANVAS_HEIGHT, worldOption);
world.addCharacters(cells);

const updateInfo = {
  world: world,
  time: 0,
};

// main roop part
function update(updateInfo) {
  // update world
  world.update(updateInfo);

  // rendering
  world.render(ctx, updateInfo.time);
  
  window.requestAnimationFrame((nextTime) => {
    updateInfo.time = nextTime;
    update(updateInfo);
  });
}

// start
window.addEventListener('load', () => {
  window.requestAnimationFrame((time) => {
    updateInfo.time = time;
    update(updateInfo);
  });
});

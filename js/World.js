import { StopWatch } from './StopWatch.js';

export class World {
  constructor(width, height, option) {
    this.width = width;
    this.height = height;

    this.background = '#AAAAAA';
    this.characters = [];

    this.collisionDetector = option.collisionDetector ?
      option.collisionDetector :
      (character) => {};

    this.stopWatch = new StopWatch();
  }

  addCharacters(chars) {
    this.characters.push(...chars);
  }

  update(info) {
    // update character
    this.characters.forEach((c) => {
      c.update(info);
    });

    // collision detection
    this.stopWatch.start();
    this.collisionDetector(this.characters);
    this.stopWatch.stop();
  }

  render(ctx, time) {
    // reset all
    ctx.fillStyle = this.background;
    ctx.fillRect(0, 0, this.width, this.height);

    // render characters
    this.characters.forEach((c) => {
      c.render(ctx, time);
    });
  }
}
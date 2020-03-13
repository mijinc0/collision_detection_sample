export class World {
  constructor(width, height, option) {
    this.width = width;
    this.height = height;

    this.background = '#AAAAAA';
    this.characters = [];

    this.collisionDetector = option.collisionDetector ?
      option.collisionDetector :
      (character) => {};
  }

  addCharacter(char) {
    this.characters.push(char);
  }

  update(info) {
    // update character
    this.characters.forEach((c) => {
      c.update(info);
    });

    // collision detection
    this.this.collisionDetector(this.character);
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
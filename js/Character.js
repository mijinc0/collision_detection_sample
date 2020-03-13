import { Position } from './Position';
import { MathUtil } from './MathUtil';
import { Vector } from './Vector';

export class Character {
  constructor(width, height){
    this.width = width;
    this.height = height;
    this.position = new Position(-1, -1);

    const initVector = {
      radian: MathUtil.random(Math.PI * 2),
      size: MathUtil.random(10),
    };
    this.vector = new Vector(initVector.radian, initVector.size);

    this.color = 'black';
  }

  moveTo(x, y) {
    this.position.x = x;
    this.position.y = y;
  };

  update(info) {
    // reset color
    this.color = 'black';

    // move position
    let x = this.position.x + this.vector.x;
    let y = this.position.y + this.vector.y;

    

    this.moveTo(x, y);
  }

  render(ctx, time) {
    ctx.fillStyle = this.color;
    ctx.fillRect(
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }

  collision(obj) {; 
    this.color = 'red';
  }
}
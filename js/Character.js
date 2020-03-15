import { Position } from './Position.js';
import { MathUtil } from './MathUtil.js';
import { Vector } from './Vector.js';

export class Character {
  constructor(width, height){
    this.width = width;
    this.height = height;
    this.position = new Position(-1, -1);

    const initRadian = MathUtil.random(Math.PI * 2)
    const initSize = MathUtil.random(50) / 10;
    this.vector = new Vector(initRadian, initSize);

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

    // 境界から出たら位置とベクトルをその軸に対して反転させる
    const width = info.world.width;
    if (x < 0 || width < x) {
      // 位置の反転
      x = (width - (x % width)) % width;
      // ベクトルの反転
      this.vector.x *= -1;
    }

    const height = info.world.height;
    if (y < 0 || height < y) {
      // 位置の反転
      y = (height - (y % height)) % height;
      // ベクトルの反転
      this.vector.y *= -1;
    }

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

  collision(obj) {
    this.color = 'red';
  }

  get x() {
    return this.position.x;
  }

  get y() {
    return this.position.y;
  }

  get topL() {
    return new Position(
      this.position.x,
      this.position.y,
    );
  }

  get topR() {
    return new Position(
      this.position.x + this.width,
      this.position.y,
    );
  }

  get bottomL() {
    return new Position(
      this.position.x,
      this.position.y + this.height,
    );
  }

  get bottomR() {
    return new Position(
      this.position.x + this.width,
      this.position.y + this.height,
    );
  }
}
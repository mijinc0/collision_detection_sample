import { MathUtil } from './MathUtil.js';

export class Vector {
  constructor(radian, size) {
    this.radian = MathUtil.mod(radian, Math.PI * 2);
    this.size = size;
    this._calcXY();
  }
  
  get x() {
    return this.sizeX;
  }
  
  get y() {
    return this.sizeY;
  }

  set x(x) {
    this.sizeX = x;
    this._calcRadianSize();
  }

  set y(y) {
    this.sizeY = y;
    this._calcRadianSize();
  }

  // 時計回りなので、減算する
  rotate(radianDelta) {
    const rotated = this.radian - radianDelta;
    this.radian = MathUtil.mod(rotated, Math.PI * 2)
    this._calcXY();
  }
  
  _calcXY() {
    this.sizeX = this.size * Math.cos(this.radian);
    this.sizeY = this.size * Math.sin(this.radian);
  }

  _calcRadianSize() {
    this.size = Math.sqrt(this.sizeX * this.sizeX + this.sizeY * this.sizeY);
    const sin = this.sizeY / this.size;
    this.radian = Math.asin(sin);
  }
}
import { MathUtil } from './MathUtil';

export class Vector {
  constructor(radian, size) {
    this.radian = MathUtil.mod(radian, Math.PI * 2);
    this.size = size;
    this._init();
  }
  
  get x() {
    return this.sizeX;
  }
  
  get y() {
    return this.sizeY;
  }

  // 時計回りなので、減算する
  rotate(radianDelta) {
    const rotated = this.radian - radianDelta;
    this.radian = MathUtil.mod(rotated, Math.PI * 2)
    this._init();
  }
  
  _init() {
    this.sizeX = this.size * Math.cos(this.radian);
    this.sizeY = this.size * Math.sin(this.radian);
  }
}
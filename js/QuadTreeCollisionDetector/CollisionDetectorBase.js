export class CollisionDetectorBase { 
  _collisionDetect(characters) {
    for (let k = 0; k < characters.length; k++) {
      for (let j = (k + 1); j < characters.length; j++) {
        const result = this._isCollision(characters[k], characters[j]);
        if (result) {
          characters[k].collision(j);
          characters[j].collision(k);
        }
      }
    }
  }
  
  _isCollision(charA, charB) {
    const resultX = this._isOverlap(charA.topL.x, charA.topR.x, charB.topL.x, charB.topR.x);
    const resultY = this._isOverlap(charA.topL.y, charA.bottomL.y, charB.topL.y, charB.bottomL.y);
    return resultX && resultY;
  }
  
  /**
   *
   * @param {number} sA  charA start position
   * @param {number} eA  charA end position
   * @param {number} sB  charB start position
   * @param {number} eB  charB end position
   */
  _isOverlap(sA, eA, sB, eB) {
    return (sA <= sB && sB <= eA) || (sA <= eB && eB <= eA);
  }
}
  
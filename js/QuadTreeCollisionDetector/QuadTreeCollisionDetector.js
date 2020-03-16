import { CollisionDetectorBase } from './CollisionDetectorBase.js';
import { LinerQuadTree } from './LinerQuadTree.js';
import { MortonUtil } from './MortonUtil.js';

export class QuadTreeCollisionDetector extends CollisionDetectorBase {
  constructor(width, height, treeLevel) {
    super();
  
    if (!(width && height && treeLevel)) throw Error('invalid constructor argument');
    
    this.width = width;
    this.height = height;
    // 0 means root only
    this.treeLevel = treeLevel;
    this.quadTree = new LinerQuadTree(treeLevel);
    
    const separaterSize = 2 ** this.treeLevel;
    this.cellWidth = width / separaterSize;
    this.cellHeight = height / separaterSize;
  }

  test(characters) {
    // reset tree
    this.quadTree.reset();
  
    // add characters
    this._addCharacters(characters);
    
    // test root
    // rootだけ特別なので単体で検査
    const initCharacterList = this.quadTree.getElements(0, 0);
    const startLevel = 1;
    const initMortonNum = 0;
    this._collisionDetect(initCharacterList);

    // test from level1
    this._test(startLevel, initMortonNum, initCharacterList);
  }

  _addCharacters(characters) {
    characters.forEach((character) => {
      const quadTreeNodePosition = this._calcQuadTreeNodePosition(character.topL, character.bottomR, this.treeLevel);
      this.quadTree.add(character, quadTreeNodePosition.level, quadTreeNodePosition.index);
    });
  }
  
  _test(level, parentMortonNum, characterList) {
    // calc start morton num from parent morton num
    // e.g.
    // parent : [00][10] (root0 -> 2)
    // child  : [00][10][00] (root0 -> 2 -> 0) => 8
    const startMortonNum = parentMortonNum << 2;
    
    // startMortonNumから4つのセルが検査対象
    for (let k = 0; k < 4; k++) {
      // ターゲットのセルの中にあるcharactersを取得
      const targetMortonNum = startMortonNum + k;
      const targets = this.quadTree.getElements(level, targetMortonNum);
      
      // cellの中と、親から引き継いだリストの中で衝突判定する
      targets.push(...characterList);
      super._collisionDetect(targets);
      
      // 自身の子供以降に、characterが存在すれば再帰で処理を続行、必要なければそのセルはそこで終了
      if(this.quadTree.hasElementInDescendant(level, targetMortonNum)) {
        this._test(level + 1, targetMortonNum, targets);
      }
    }
  }

  _calcQuadTreeNodePosition(topL, bottomR, treeLevel) {
    const topLX = topL.x / this.cellWidth;
    const topLY = topL.y / this.cellHeight;
    const mortonTopL = MortonUtil.calcMortonNumFromPosition(topLX, topLY);
    
    const bottomRX = bottomR.x / this.cellWidth;
    const bottomRY = bottomR.y / this.cellHeight;
    const mortonBottomR = MortonUtil.calcMortonNumFromPosition(bottomRX, bottomRY);

    // topLとbottomRが同じモートン番号の場合、一番下のレイヤーのセル内に収まっていることを意味する
    if (mortonTopL === mortonBottomR) {
      return {level: treeLevel, index: mortonTopL};
    }

    // topLとbottomRのモートン番号が違う場合、一番下のレイヤーのセルに収まっていないので
    // どのレイヤーに所属するのかを調べる
    const level = MortonUtil.calcBelongingLevel(mortonTopL, mortonBottomR, treeLevel);
    // レイヤーが上がった分だけ、離れたレイヤーのモートン番号に含まれる位置情報を切り落せば、
    // そのレイヤーでのモートン番号を得ることが出来る
    const mortonNum = mortonTopL >> (treeLevel - level);
    return {level: level, index: mortonNum};
  }
}
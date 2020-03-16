export class MortonUtil {
  /**
   * x,yの最大値は16bitなのは、jsで安全に使える整数が32bitであり、
   * x,yの値の合成時に 16bit->32bit に変換する必要があるため *1
   * @param {number} x : 4分木空間上のx軸のポジション(16bit) 
   * @param {number} y : 4分木空間上のy軸のポジション(16bit)
   */
  static calcMortonNumFromPosition(x, y) {
    const buffX = MortonUtil._expandBitRange(x);
    let buffY = MortonUtil._expandBitRange(y);
    
    // yを左に1シフトしてずらず
    buffY <<= 1;
    
    // andでx,yを合体すると、元のx,yの値が(bitで見た時に)交互にくるようになる
    // この値が、モートン番号と同じになる
    return buffX | buffY;
  }

  /**
   * 左上のモートン番号と、右下のモートン番号の排他的論理和(XOR)を取った時、完全に同じ場所なら"0"になる。
   * モートン番号は2bitずつに各レイヤーの位置情報を含んでいるので、各レイヤーで同じ場所を参照しているかどうかが分かる。
   * はじめに一番下のレイヤーの位置情報を確認し、00ならば同じモートン番号であることがわかる。
   * 逆に、00でなかった場合にはそのレイヤーでは同じ位置情報でないことが分かる。
   * 違った場合にはそのレイヤーから一つ上のレイヤーの位置情報を確認し、同じことをする。
   * 最終的に、位置情報が00になっているレイヤーを探すことで、所属するレベルを確認できる。
   * 
   * @param {number} mortonTopL 
   * @param {number} mortonBottomR 
   * @param {number} treeLevel 
   */
  static calcBelongingLevel(mortonTopL, mortonBottomR, treeLevel) {
    const xorMorton = mortonTopL ^ mortonBottomR;
    for (let k = 0; k < treeLevel; k++) {
      // 右シフトして、11をビットマスクにして2bitずつ確認する
      const flag = (xorMorton >> (k * 2)) & 0x3;
      // 00になった位置がセルの中にオブジェクトが含まれているレイヤー
      // 1回目で00になれば、一番下のレイヤー
      // 2回目で00になれば、一番下のレイヤーから一つ上のレイヤー...
      if (flag === 0) return treeLevel - k;
    }
    // treeの深さ分繰り返してダメなら、ルートのレイヤーということになる
    return 0;
  }
  
  /**
   * 16bitのデータを、各bitの間に0を入れて引き伸ばす(32bitになる) *1
   * e.g. 110101 -> 1 1 0 1 0 1 -> 010100010001
   * @param {number} uint16
   */
  static _expandBitRange(uint16) {
    uint16 = (uint16|(uint16<<8)) & 0x00ff00ff;
    uint16 = (uint16|(uint16<<4)) & 0x0f0f0f0f;
    uint16 = (uint16|(uint16<<2)) & 0x33333333;
    return (uint16|(uint16<<1)) & 0x55555555;
  }
}
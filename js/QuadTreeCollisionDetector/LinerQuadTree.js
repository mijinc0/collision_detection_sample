export class LinerQuadTree {
  constructor(level) {
    // 線形四分木の実体
    this.tree = [];
    this.level = level;
    this._expandTree();
  }
  
  /**
   * エレメントをノードにひとつ追加する。
   * @param {any} element 
   * @param {number} level 
   * @param {number} index 
   */
  add(element, level, index) {   
    // もしツリーの深さが足りなければ、ツリーを拡張する
    if (this.level < level) {
      this.level = level;
      this._expandTree();
    }

    // ノードが初期化されていなければ初期化する
    // またこの時点で、後から分かるようにルートまでの祖先ノードも初期化する
    this._initNodes(level, index);
    
    // 追加
    const linerIndex = this._calcLinerIndex(level, index);
    this.tree[linerIndex].push(element);
  }
  
  /**
   * ノード内の要素を返す。undefined(み初期化ノード)なら空配列を返す。
   * @param {number} level 
   * @param {number} index 
   */
  getElements(level, index) {
    const linerIndex = this._calcLinerIndex(level, index);
    return this.tree[linerIndex] ? this.tree[linerIndex] : [];
  }
  
  /**
   * そのノードの子、孫、さらにその下以降のノードの中に、エレメントが存在しているかどうかを返す
   * エレメント追加時に、祖先ノードの初期化を行っているので、自身の子供ノード4つのどれかが初期化
   * されていれば子孫ノードにエレメントがあることが確認できる
   * @param {number} level 
   * @param {number} index 
   */
  hasElementInDescendant(level, index) {
    let result = false;
    // 自身の子供ノード(4つ)の0番目のノードのindexは、自身のindexを左2シフトすると取得できる
    const childNodeStartIndex = index << 2;
    const linerIndex = this._calcLinerIndex(level + 1, childNodeStartIndex);
    for (let k = 0; k < 4; k++) {
      if (this.tree[linerIndex + k]) result = true;
    }
    return result;
  }
  
  reset() {
    this.tree.length = 0;
    this._expandTree();
  }
  
  _expandTree() {
    // nodeの総数は、rootのlevelを0として、_calcStartIndex(level + 1)で取れる
    this.tree.length = this._calcStartIndex(this.level + 1);
  }
  
  /**
   * 自身と、自身の祖先にあたるノードが初期化されていなければ初期化する
   * @param {number} level 
   * @param {number} index 
   */
  _initNodes(level, index) {
    for (let k = 0; k <= level; k++) {
      const currentLevel = level - k;
      // 四分木において自身の親のindexは、現在のindexを右に2シフトすれば出てくる
      const nodeIndex = index >> (2 * k);
      const linerIndex = this._calcLinerIndex(currentLevel, nodeIndex);
      // 既に初期化されていれば、それ以降は初期化されているはずなので抜ける
      if (this.tree[linerIndex]) break;
      // 初期化して、次(一つ上のレベル)に進む
      this.tree[linerIndex] = [];
    }
  }
  
  _calcLinerIndex(level, index) {
    return this._calcStartIndex(level) + index;
  }

  _calcStartIndex(level) {
    return (4 ** level - 1) / 3;
  }
}
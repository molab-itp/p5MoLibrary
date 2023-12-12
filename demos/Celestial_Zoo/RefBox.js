class RefBox {
  //
  //   refIndex: 0,
  //   width: 4800,
  //   height: 3200,
  //   refs: [{ label: '', pts: [{ x, y, w, h, z }, { x, y, w, h, z }], i } ]
  //
  constructor(props) {
    //
    Object.assign(this, props);

    // if (!this.refBox) {
    //   this.refBox = {
    //     width: this.backgImg.width,
    //     height: this.backgImg.height,
    //     refs: [],
    //   };
    // }
    // this.refIndex = 0;

    // this.restore_localStorage();
  }

  refEntry() {
    let refIndex = this.refIndex;
    let ent = this.refs[refIndex];
    if (!ent) {
      let i = this.refs.length + 1;
      ent = { label: '', pts: [{}, {}], i };
      this.refs[refIndex] = ent;
    }
    return ent;
  }

  get refLabel() {
    let ent = this.refEntry();
    return ent.label;
  }

  set refLabel(label) {
    let ent = this.refEntry();
    ent.label = label;
  }

  restore_localStorage() {
    console.log('restore_localStorage');
    let refBox;
    let str = localStorage.getItem(this.label);
    if (!str) {
      console.log('restore_localStorage no str');
      return;
    }
    // console.log('restore_localStorage str.length', str.length);
    try {
      refBox = JSON.parse(str);
    } catch (err) {
      console.log('restore_localStorage parse err', err);
      return;
    }
    Object.assign(this, refBox);
    // this.patchRefbox();
  }

  // Corrects to refBox store
  patchRefbox() {
    let refBox = this;
    let last = 0;
    for (let index = 0; index < refBox.refs.length; index++) {
      let ent = refBox.refs[index];
      ent.i = index + 1;
      if (!ent.pts[this.ptsIndex].w) {
        last = index;
      }
    }
    if (last) {
      console.log('patchRefbox splice last', last);
      refBox.refs.splice(last, 1);
    }
    refBox.label = refBox.label;
    refBox.refs = refBox.refs;
    this.save_localStorage();
  }

  save_localStorage() {
    let str = JSON.stringify(my.refBox);
    localStorage.setItem('refBox', str);
    // console.log('save_localStorage str.length', str.length);
    let n = this.refs.length;
    console.log('save_localStorage ', n, this.refs[n - 1].label);
  }
}

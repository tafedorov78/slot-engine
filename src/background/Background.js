import BaseContainer from "../containers/BaseContainer";
import * as PIXI from "pixi.js";

export default class Background extends BaseContainer {

  constructor(data) {
    super(data)
    this.init()
  }

  init(data) {
    const t = PIXI.Texture.from('graphics/background/main_bg')
    const s = new PIXI.Sprite(t)
    this.addChild(s)
  }

}

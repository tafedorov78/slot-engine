import BaseContainer from "./BaseContainer"
import Utils from '../utils/Utils'
import * as PIXI from "pixi.js";
import Config from "../config/Config";

export default class DecorationContainer extends BaseContainer {

  constructor(data) {
    super(data)
    this.init()
  }

  init(data) {
    const topFrame = new PIXI.Sprite(PIXI.Texture.from('graphics/decorations/topFrame'))
    const bottomFrame = new PIXI.Sprite(PIXI.Texture.from('graphics/decorations/bottomFrame'))
    Utils.applyFromPattern(topFrame, Config.pattern.topFrame)
    Utils.applyFromPattern(bottomFrame, Config.pattern.bottomFrame)
    this.addChild(topFrame)
    this.addChild(bottomFrame)

    const logo = new PIXI.Sprite(PIXI.Texture.from('graphics/decorations/logo_en'))
    Utils.applyFromPattern(logo, Config.pattern.logo)
    this.addChild(logo)

  }

}

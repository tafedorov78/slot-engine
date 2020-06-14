import BaseContainer from "./BaseContainer";
import * as PIXI from "pixi.js";
import Config from "../config/Config";
import Utils from "../utils/Utils";

export default class BackgroundContainer extends BaseContainer {

  constructor(data) {
    super(data)
    this.init()
  }

  init(data) {

    const back = new PIXI.Graphics()
    back.beginFill(0xffffff)
    back.drawRoundedRect(0, 0, Config.pattern.reels.width, Config.pattern.reels.height, 10)
    back.endFill()

    Utils.applyFromPattern(back, Config.pattern.reels)

    this.addChild(back)
  }

}

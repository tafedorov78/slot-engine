import * as PIXI from "pixi.js"
import ScaleManager from "./ScaleManager";
import Config from "../config/Config";


export default class Stage {
  constructor () {
    const canvas = document.getElementById('canvas')

    this.app = new PIXI.Application({
      view: canvas,
      legacy: true,
      width: Config.CANVAS_WIDTH_LANDSCAPE,
      height: Config.CANVAS_HEIGHT_LANDSCAPE
    })
    new ScaleManager(this.app)

    return this.app.stage
  }

}
import Platform from "../utils/Platform";
import * as PIXI from "pixi.js";
import Config from "../config/Config";

export default class ScaleManager {

  constructor (application) {
    this.app = application
    window.addEventListener('resize', this.onResize.bind(this), false)
    this.onResize()
  }


  onResize () {
    this.checkOrientation()
    let finalInnerWidth = innerWidth
    let finalInnerHeight = innerHeight

    this.app.view.style.width = finalInnerWidth + 'px'
    this.app.view.style.height = finalInnerHeight + 'px'

    const scaleRatio = Platform.isMobile() ? 2 : 1

    finalInnerWidth *= scaleRatio
    finalInnerHeight *= scaleRatio

    this.app.renderer.resize(finalInnerWidth, finalInnerHeight)

    const scale = Math.min(finalInnerWidth / this.safeZone.width, finalInnerHeight / this.safeZone.height)

    this.app.stage.scale.set(scale, scale)

    this.app.stage.x = (finalInnerWidth - (this.safeZone.width * scale)) / 2 - (this.safeZone.left) * scale
    this.app.stage.y = (finalInnerHeight - (this.safeZone.height * scale)) / 2 - this.safeZone.top * scale
  }

  checkOrientation() {
    let stageWidth = window.innerWidth
    let stageHeight = window.innerHeight
    if(stageWidth <= stageHeight) {
      this.orientation = 'V'

      this.shiftX = (Config.CANVAS_WIDTH_PORTRAIT - Config.SAFE_WIDTH_PORTRAIT) / 2
      this.shiftY = (Config.CANVAS_HEIGHT_PORTRAIT - Config.SAFE_HEIGHT_PORTRAIT) / 2
      this.safeZone = new PIXI.Rectangle(this.shiftX, this.shiftY, Config.SAFE_WIDTH_PORTRAIT, Config.SAFE_HEIGHT_PORTRAIT)

    } else {
      this.orientation = 'H'
      this.shiftX = (Config.CANVAS_WIDTH_LANDSCAPE - Config.SAFE_WIDTH_LANDSCAPE) / 2
      this.shiftY = (Config.CANVAS_HEIGHT_LANDSCAPE - Config.SAFE_HEIGHT_LANDSCAPE) / 2

      this.safeZone = new PIXI.Rectangle(this.shiftX, this.shiftY, Config.SAFE_WIDTH_LANDSCAPE, Config.SAFE_HEIGHT_LANDSCAPE)
    }
  }
}
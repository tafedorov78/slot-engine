import BaseSymbol from "./BaseSymbol"
import * as PIXI from 'pixi.js'

export default class Symbol extends BaseSymbol {

  constructor(data) {
    super(data)
  }

  init(index) {
    this.isBlurred = false
    this.symbolIndex = index
    this.frames = []
    const textureName = PIXI.Texture.from(`symbols/static/icon${index}`)

    this.frames.push(textureName)
    this.frames.push(textureName)
    this.spr = new PIXI.AnimatedSprite(this.frames)
    this.addChild(this.spr)
    this.interactive = true
    this.buttonMode = true
  }

  changeTextureByIndex(index) {
    this.symbolIndex = index
    this.frames.length = 0
    const textureName = PIXI.Texture.from(`symbols/static/icon${index}`)

    this.frames.push(textureName)
    this.frames.push(textureName)
    this.spr.textures = this.frames

    if(this.isBlurred) {
      this.spr.gotoAndStop(1)
    } else {
      this.spr.gotoAndStop(0)
    }
  }


  start = () => {}

}

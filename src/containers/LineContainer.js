import * as PIXI from 'pixi.js'
import * as particles from "pixi-particles";
import gsap from "gsap"
import BaseContainer from "./BaseContainer";


export default class LinesContainer extends BaseContainer {

  constructor(data) {
    super(data)
    this.init(data)
  }

  init(data) {
    this.graphics = new PIXI.Graphics()
    this.graphics.beginFill(0xff0000)
    this.graphics.drawRoundedRect(0, 0, 543, 3, 1)
    this.graphics.endFill()
    this.addChild(this.graphics)
    this.graphics.alpha = 0;
  }

  start() {
    if(this.isBlinking) return
    this.isBlinking = true
    gsap.to(this, 0.2, {value: 1, repeat: -1, onRepeat: () => {
        if(this.graphics.alpha != 0) {
          this.graphics.alpha = 0;
        } else {
          this.graphics.alpha = 1;
        }
      }
    })
  }

  stop() {
    this.isBlinking = false
    gsap.killTweensOf(this)
    this.graphics.alpha = 0;
  }


}

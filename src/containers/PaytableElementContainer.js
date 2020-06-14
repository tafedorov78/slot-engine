import BaseContainer from "./BaseContainer";
import gsap from "gsap";

export default class PaytableElementContainer extends BaseContainer {

  constructor ( element ) {
    super (element)
    this.element = element
    this.init ()
  }

  init () {
    this.addChild(this.element)
  }

  startBlinking() {
    if(this.isBlinking) return
    this.isBlinking = true
    gsap.to(this, 0.2, {value: 1, repeat: -1, onRepeat: () => {
        if(this.element.tint == 0xFF0000) {
          this.element.tint = 0xFFFFFF;
        } else {
          this.element.tint = 0xFF0000;
        }
      }
    })
  }

  stopBlinking() {
    this.isBlinking = false
    gsap.killTweensOf(this)
    this.element.tint = 0xFFFFFF;
  }

}

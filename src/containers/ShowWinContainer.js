import BaseContainer from "./BaseContainer";
import Signals from "../signals/Signals";
import Tweenlite from "gsap";
import * as PIXI from "pixi.js";
import Utils from "../utils/Utils";
import Config from "../config/Config";
import Facade from "../Facade";


export default class ShowWinContainer extends BaseContainer {

  constructor(data) {
    super(data)
    Signals.startSpin.add(this.onSpin, this)
    Signals.showWinnings.add(this.onShowWinnings, this)
    this.init(data)
  }

  init(data) {
    const style = new PIXI.TextStyle({
      fill: "0xff0000",
      fontSize: 80
    });

    this.winText = new PIXI.Text(``, style)
    this.winText.anchor.set(0.5)
    Utils.applyFromPattern(this.winText, Config.pattern.winnings)
    this.addChild(this.winText)
    this.winText.visible = false
  }

  onSpin() {
    this.winText.text = ''
    this.winText.visible = false
  }

  onShowWinnings(data) {
    const win = data.totalWin
    this.winText.visible = true
    this.value = 0
    Tweenlite.to (this, 1, { value: win, onUpdate: () => {
        this.winText.text = Number(this.value).toFixed(2)
      },onComplete: () => {
        Signals.showWinningsComplete.dispatch()
    }
    });
  }

}

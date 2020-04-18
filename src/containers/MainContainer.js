import BaseContainer from "./BaseContainer";
import SymbolsContainer from "./SymbolsContainer";
import LinesContainer from "./LinesContainer";
import Background from "../background/Background";
import Config from "../config/Config";
import * as PIXI from "pixi.js";
import DecorationContainer from "./DecorationContainer";
import Signals from "../signals/Signals";
import gsap from "gsap"
import {Power2} from "gsap"


export default class MainContainer extends BaseContainer {

  constructor(data) {
    super(data)
    Signals.startSpin.add(this.start, this)
    Signals.stopSpin.add(this.stop, this)
    this.init()
  }

  init(data) {
    //Creation back layer
    const background = new Background()
    this.addChild(background)

    //Creation symbols layer
    this.symbolsContainer = new SymbolsContainer()
    this.symbolsContainer.x = Config.CANVAS_WIDTH_LANDSCAPE / 2
    this.symbolsContainer.y = Config.pattern.reels.y + 650
    this.symbolsContainer.pivot.x = this.symbolsContainer.width / 2
    this.symbolsContainer.pivot.y = this.symbolsContainer.height / 2


    this.addChild(this.symbolsContainer)

    this.createSymbolMask()

    //Creation decoration layer

    //const linesContainer = new LinesContainer()

    this.decorationContainer = new DecorationContainer()
    this.addChild(this.decorationContainer)

    window.dispatchEvent(new Event('resize'))
  }

  start = () => {
   // gsap.to(this.symbolsContainer.scale, 1, {x: 0.6, y: 0.6, ease: Power2.easeOut})
  }

  stop = () => {
    //gsap.to(this.symbolsContainer.scale, 2.5, {x: 1, y: 1, ease: Power2.easeIn})
  }


  createSymbolMask() {

    const mask = new PIXI.Graphics()
    mask.beginFill(0x0FF000)
    mask.drawRect(Config.pattern.reels.x, Config.pattern.reels.y - 55, Config.SYMBOL_HEIGHT[0] * Config.VISIBLED_REELS, Config.SYMBOL_HEIGHT[0] * Config.VISIBLED_SYMBOLS[0] + 50)
    mask.endFill()
    this.symbolsContainer.mask = mask
    this.addChild(mask)
  }

}

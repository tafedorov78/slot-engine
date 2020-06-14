import BaseContainer from "./BaseContainer";
import SymbolsContainer from "./SymbolsContainer";
import BackgroundContainer from "./BackgroundContainer";
import Config from "../config/Config";
import * as PIXI from "pixi.js";
import Signals from "../signals/Signals";
import Utils from "../utils/Utils";
import PaytableContainer from "./PaytableContainer";
import LinesContainer from "./LinesContainer";
import ShowWinContainer from "./ShowWinContainer";

export default class MainContainer extends BaseContainer {

  constructor(data) {
    super(data)
    Signals.startSpin.add(this.start, this)
    Signals.stopSpin.add(this.stop, this)
    this.init()
  }

  init(data) {
    //Creation back layer
    const backgroundContainer = new BackgroundContainer()
    this.addChild(backgroundContainer)

    //Creation symbols layer
    this.symbolsContainer = new SymbolsContainer()
    Utils.applyFromPattern(this.symbolsContainer, Config.pattern.reels)
    this.addChild(this.symbolsContainer)

    const paytableContainer = new PaytableContainer()
    paytableContainer.x = 0
    paytableContainer.y = 0
    this.addChild(paytableContainer)

    const linesContainer = new LinesContainer()
    linesContainer.x = 0
    linesContainer.y = 0
    this.addChild(linesContainer)

    const showContainer = new ShowWinContainer()
    showContainer.x = 0
    showContainer.y = 0
    this.addChild(showContainer)


    this.createSymbolMask()

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
    mask.beginFill(0x0FF000, 0.3)
    mask.drawRect(Config.pattern.reels.x, Config.pattern.reels.y, Config.pattern.reels.width, Config.pattern.reels.height)
    mask.endFill()
    this.symbolsContainer.mask = mask
    this.addChild(mask)
  }

}

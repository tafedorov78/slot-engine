import gsap from "gsap"
import {Power2} from "gsap"
import * as PIXI from 'pixi.js'
import SymbolsContainer from "../../containers/SymbolsContainer";
import BaseReelManager from "./BaseReelManager";
import Signals from "../../signals/Signals";

export default class VerticalReelManager extends BaseReelManager {

  constructor (index, callback) {
    super(index, callback)

    this.blurFilter = new PIXI.filters.BlurFilter()
    this.blurFilter.blurX = 0
    this.blurFilter.blurY = 8
    this.blurFilter.autoFit = true
    Signals.init.add(this.init, this)
  }

  init() {
    this.parse(SymbolsContainer.allSymbols)
  }

  parse ( allSymbols ) {
    this.symbols = allSymbols[this.index]
    this.poolIn = SymbolsContainer.poolIn
    this.poolOut = SymbolsContainer.poolOut
    this.pasteSymbolsIntoTempContainer()
  }

  start = () => {
    this.sideSymbol = this.symbols[this.symbols.length - 1]

    if (this.startBounce > 0) {
      this.preSpin()
    } else {
      this.onStartComplete()
    }
  }

  preSpin = () => {
    let td = '-=' + this.startBounce
    gsap.to(this.symbols, 0.2, { y: td, onComplete: this.onStartComplete })
  }

  onStartComplete = () => {
    this.symbols.forEach(symbol => symbol.start())
    this.ticker.start()
    this.setBlur()
  }

  move () {
    for (let i = 0; i < this.symbols.length; i++) {
      this.symbols[i].y += this.speed
      this.symbols[i].alpha = 1
    }
    this.bottomChecking()
  }

  bottomChecking () {
    if (this.sideSymbol.y > this.symbolHeight * this.visibledSymbols) {
      this.sideSymbol.changeTextureByIndex(this.getNextKeyFromBand())
      this.sideSymbol.y = this.symbols[0].y - this.symbolHeight
      this.symbols.unshift(this.symbols.pop())
      this.sideSymbol = this.symbols[this.symbols.length - 1]
    }
  }

  update () {
    this.move()
  }

  stop = (data) => {
    let distance
    let td
    this.addStopDataSymbols(data)

    let extraSymbols = (this.totaSymbolsPerReel - this.visibledSymbols) / 2
    distance = (0 - this.symbols[extraSymbols].y + this.stopBounce)
    td = '+=' + String(distance)
    let t = (distance / (this.speed * 30))
    this.ticker.stop()
    gsap.to(this.symbols, t, { y: td, ease:Power2.easeOut, onComplete: this.onStopTweenComplete })
  }


  addStopDataSymbols = (data) => {
    let s
      for (let i = data.length - 1; i >= 0; i--) {
        let index = data[i]
        s = this.poolOut(index)
        this.symbols[0].parent.addChild(s)
        s.y = this.symbols[0].y - this.symbolHeight
        s.x = this.symbols[0].x
        this.symbols.unshift(s)
      }
      this.sideSymbol = s
    this.setUnBlur()
  }

  onStopTweenComplete = () => {
    if (this.stopBounce > 0) {
      let time = 0.3
      let td = '-=' + this.stopBounce
      gsap.to(this.symbols, time, { y: td, ease:Power2.easeOut, onComplete: this.onStopSpinningComplete })
    } else {
      this.onStopSpinningComplete()
    }
  }

  onStopSpinningComplete = () =>{
    let amount = this.symbols.length - this.totaSymbolsPerReel

    for (let i = 0; i < amount - 1; i++) {
      this.poolIn(this.symbols.pop())
      this.sideSymbol = this.symbols[this.symbols.length - 1]
    }
    this.poolIn(this.symbols.pop())
    this.callback(this.index)
  }

  setBlur() {
    //setTimeout(() => this.container.filters = [this.blurFilter], 0.5)
  }

  setUnBlur() {
    //this.container.filters = null
  }

  pasteSymbolsIntoTempContainer() {
    this.container = new PIXI.Container()
    this.originSymbolParent = this.symbols[0].parent
    this.originSymbolParent.addChild(this.container)

    for (let i = 0; i < this.symbols.length; i ++) {
      this.container.addChild(this.symbols[i])
    }
  }

}
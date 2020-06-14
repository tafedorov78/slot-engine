import Config from "../config/Config"
import Utils from "../utils/Utils"
import BaseContainer from "./BaseContainer"
import Symbol from "../symbols/Symbol"
import Signals from "../signals/Signals";

export default class SymbolsContainer extends BaseContainer {


  constructor(data) {
    super(data)
    SymbolsContainer.instance = this
    Signals.init.add(this.init, this)
  }

  poolIn = (symbol) => {
    this.removeChild(symbol)
    symbol.alpha = 1
    this.pool.push(symbol)
  }

  poolOut = (index) => {
    let symbol
    if (this.pool.length > 0) {
      symbol = this.pool.pop()
      symbol.changeTextureByIndex(index)
      this.addChild(symbol)
      symbol.alpha = 1
      return symbol
    } else {
      symbol = this.createSymbol(index)
      this.addChild(symbol)
      symbol.alpha = 1
      return symbol
    }
  }

  init(initData) {
    this.pool = []
    this.allSymbols = []
    let yy
    let xx = 0

    for (let i = 0; i < Config.TOTAL_REELS; i ++) {
      this.allSymbols.push([])
      yy = -Config.SYMBOL_HEIGHT[i] * (Config.TOTAL_SYMBOLS_PER_REEL[i] - Config.VISIBLED_SYMBOLS[i]) / 2
      xx = Config.pattern.reels.reels[i].x

      for (let j = 0; j < Config.TOTAL_SYMBOLS_PER_REEL[i]; j ++) {
        let symbol = this.poolOut(initData[i][j])
        symbol.x = xx
        symbol.y = yy
        yy += Config.SYMBOL_HEIGHT[i]
        this.addChild(symbol)
        this.allSymbols[i].push(symbol)
      }
    }
    SymbolsContainer.allSymbols = this.allSymbols
    SymbolsContainer.poolIn = this.poolIn
    SymbolsContainer.poolOut = this.poolOut

    Signals.gameInited.dispatch()
  }





  createSymbol(index) {
    return new Symbol(index)
  }
}

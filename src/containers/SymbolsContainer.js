import Config from "../config/Config"
import Utils from "../utils/Utils"
import BaseContainer from "./BaseContainer"
import Symbol from "../symbols/Symbol"

export default class SymbolsContainer extends BaseContainer {


  constructor(data) {
    super(data)
    this.init()
    SymbolsContainer.instance = this
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

  init() {
    this.pool = []
    this.allSymbols = []
    let yy
    let xx = 0

    for (let i = 0; i < Config.TOTAL_REELS; i ++) {
      this.allSymbols.push([])
      yy = -Config.SYMBOL_HEIGHT[i] * (Config.TOTAL_SYMBOLS_PER_REEL[i] - Config.VISIBLED_SYMBOLS[i]) / 2
      xx = Config.SYMBOL_HEIGHT[i] * i

      for (let j = 0; j < Config.TOTAL_SYMBOLS_PER_REEL[i]; j ++) {
        let symbol = this.poolOut(Math.ceil(Utils.randomNumber(0, 9)))
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
  }




  createSymbol(index) {
    return new Symbol(index)
  }
}

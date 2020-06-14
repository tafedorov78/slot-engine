import ReelsConfig from "../config/ReelsConfig";
import Config from "../config/Config";

export default class PaylinesHandler {

  handle ( reels ) {
    this.reels = reels
    let totalWin = 0
    let winLines = []

    if (this.isSymolFillsLine (ReelsConfig.SYMBOL_MAP.CHERRY, 1)) {
      totalWin += 2000
      winLines.push({line: 1, win: 2000, combination: 0})
    }
    if (this.isSymolFillsLine (ReelsConfig.SYMBOL_MAP.CHERRY, 2)) {
      totalWin += 1000
      winLines.push({line: 2, win: 1000, combination: 1})
    }
    if (this.isSymolFillsLine (ReelsConfig.SYMBOL_MAP.CHERRY, 3)) {
      totalWin += 4000
      winLines.push({line: 3, win: 4000, combination: 2})
    }

    if (this.isSymolFillsLine (ReelsConfig.SYMBOL_MAP.SEVEN, 1)) {
      totalWin += 150
      winLines.push({line: 1, win: 150, combination: 3})
    }
    if (this.isSymolFillsLine (ReelsConfig.SYMBOL_MAP.SEVEN, 2)) {
      totalWin += 150
      winLines.push({line: 2, win: 150, combination: 3})
    }
    if (this.isSymolFillsLine (ReelsConfig.SYMBOL_MAP.SEVEN, 3)) {
      totalWin += 150
      winLines.push({line: 3, win: 150, combination: 3})
    }

    if(this.isSymolsFillLine([ReelsConfig.SYMBOL_MAP.SEVEN, ReelsConfig.SYMBOL_MAP.CHERRY], 1)) {
      totalWin += 75
      winLines.push({line: 1, win: 75, combination: 4})
    }
    if(this.isSymolsFillLine([ReelsConfig.SYMBOL_MAP.SEVEN, ReelsConfig.SYMBOL_MAP.CHERRY], 2)) {
      totalWin += 75
      winLines.push({line: 2, win: 75, combination: 4})
    }
    if(this.isSymolsFillLine([ReelsConfig.SYMBOL_MAP.SEVEN, ReelsConfig.SYMBOL_MAP.CHERRY], 3)) {
      totalWin += 75
      winLines.push({line: 3, win: 75, combination: 4})
    }

    if (this.isSymolFillsLine (ReelsConfig.SYMBOL_MAP.TRIPLExBAR, 1)) {
      totalWin += 50
      winLines.push({line: 1, win: 50, combination: 5})
    }
    if (this.isSymolFillsLine (ReelsConfig.SYMBOL_MAP.TRIPLExBAR, 2)) {
      totalWin += 50
      winLines.push({line: 2, win: 50, combination: 5})
    }
    if (this.isSymolFillsLine (ReelsConfig.SYMBOL_MAP.TRIPLExBAR, 3)) {
      totalWin += 50
      winLines.push({line: 3, win: 50, combination: 5})
    }

    if (this.isSymolFillsLine (ReelsConfig.SYMBOL_MAP.DOUBLExBAR, 1)) {
      totalWin += 20
      winLines.push({line: 1, win: 20, combination: 6})
    }
    if (this.isSymolFillsLine (ReelsConfig.SYMBOL_MAP.DOUBLExBAR, 2)) {
      totalWin += 20
      winLines.push({line: 2, win: 20, combination: 6})
    }
    if (this.isSymolFillsLine (ReelsConfig.SYMBOL_MAP.DOUBLExBAR, 3)) {
      totalWin += 20
      winLines.push({line: 3, win: 20, combination: 6})
    }

    if (this.isSymolFillsLine (ReelsConfig.SYMBOL_MAP.BAR, 1)) {
      totalWin += 10
      winLines.push({line: 1, win: 10, combination: 7})
    }
    if (this.isSymolFillsLine (ReelsConfig.SYMBOL_MAP.BAR, 2)) {
      totalWin += 10
      winLines.push({line: 2, win: 10, combination: 7})
    }
    if (this.isSymolFillsLine (ReelsConfig.SYMBOL_MAP.BAR, 3)) {
      totalWin += 10
      winLines.push({line: 3, win: 10, combination: 7})
    }

    if(this.isSymolsFillLine([ReelsConfig.SYMBOL_MAP.BAR, ReelsConfig.SYMBOL_MAP.DOUBLExBAR, ReelsConfig.SYMBOL_MAP.TRIPLExBAR], 1, 2)) {
      totalWin += 5
      winLines.push({line: 1, win: 5, combination: 8})
    }
    if(this.isSymolsFillLine([ReelsConfig.SYMBOL_MAP.BAR, ReelsConfig.SYMBOL_MAP.DOUBLExBAR, ReelsConfig.SYMBOL_MAP.TRIPLExBAR], 2, 2)) {
      totalWin += 5
      winLines.push({line: 2, win: 5, combination: 8})
    }
    if(this.isSymolsFillLine([ReelsConfig.SYMBOL_MAP.BAR, ReelsConfig.SYMBOL_MAP.DOUBLExBAR, ReelsConfig.SYMBOL_MAP.TRIPLExBAR], 3, 2)) {
      totalWin += 5
      winLines.push({line: 3, win: 5, combination: 8})
    }

    return {winLines: winLines, totalWin:totalWin}
  }

  isSymolFillsLine ( s, line ) {
    if (this.reels[ 0 ][ line ] == s && this.reels[ 1 ][ line ] == s && this.reels[ 2 ][ line ] == s) {
      return true
    }
    return false
  }

  isSymbolFillsAnyLine ( s ) {
    if(this.isSymolFillsLine(s, 1) || this.isSymolFillsLine(s, 2) || this.isSymolFillsLine(s, 3)) {
      return true
    }
    return false
  }


  isSymolsFillLine(symbols, line, min = null) {
    let counter = 0
    let symbolList = {}
    let length = min ? min : symbols.length
    for (let i = 0; i < symbols.length; i ++) {
      for (let j = 0; j < this.reels.length; j ++) {
        if (this.reels[ j ][ line ] == symbols[ i ]) {
          counter++
          if(symbolList[symbols[i]] != undefined ) {
            symbolList[symbols[i]] ++
          } else {
            symbolList[symbols[i]] = 0
          }
        }
      }
    }
    let keys = Object.keys(symbolList).length
    if(counter == Config.TOTAL_REELS && keys  >= length) {
      return true
    } else {
      return false
    }
  }


}
import ReelsConfig from "../../config/ReelsConfig";
import Config from "../../config/Config";
import * as PIXI from "pixi.js";
import BaseManager from "../BaseManager";

export default class BaseReelManager extends BaseManager {

  constructor (index, callback) {
    super()

    this.callback = callback

    this.currentMap = null
    this.mapReel = []
    this.mapReelFreespins = []
    this.mapReelShift = 0
    this.mapReelFreespinsShift = 0
    this.currentShift = 0

    this.setIndex(index)

    this.ticker = new PIXI.Ticker()
    this.ticker.autoStart = false

    this.ticker.add(time => {
      this.update()
    })
  }

  setIndex(index) {
    this.index = index
    this.speed = Config.REELS_SPEED[index]
    this.startBounce = Config.START_REEL_BOUNCING[this.index]
    this.stopBounce = Config.STOP_REEL_BOUNCING[this.index]
    this.symbolHeight = Config.SYMBOL_HEIGHT[this.index]
    this.totaSymbolsPerReel = Config.TOTAL_SYMBOLS_PER_REEL[this.index]
    this.visibledSymbols = Config.VISIBLED_SYMBOLS[this.index]
    this.setRegularMap()
  }

  /**
   * Switched to freespins reel
   */
  setFreespinsMap () {
    if (!this.mapReelFreespins) return
    this.currentMap = ReelsConfig.FS_FAKE_REELS[this.index]
    this.currentShift = this.mapReelFreespinsShift
  }

  /**
   * Switched to regular reel
   */
  setRegularMap () {
    if (!this.mapReel) return
    this.currentMap = ReelsConfig.FAKE_REELS[this.index]
    this.currentShift = this.mapReelShift
  }

  /**
   *  It is actual only if mapping is there
   *  Getting the next indexes from the current reel (Optional)
   * @returns
   */
  getNextKeyFromBand () {
    if (this.currentShift < this.currentMap.length - 1) {
      this.currentShift++
    } else {
      this.currentShift = 0
    }
    let key = this.currentMap[this.currentShift]
    return key
  }

  /**
   * Getting the next symbol index from the band
   * @returns
   */
  getNextKey () {
    return this.getNextKeyFromBand()
  }

  /**
   * Getting the next indexes from the current band
   * @param {number} keyAmount - how many indexes do you need to get
   * @returns
   */
  getNextKeys (keyAmount) {
    let res = []
    for (let i = 0; i < keyAmount; i++) {
      res.push(this.getNextKeyFromBand())
    }
    return res
  }
}
import VerticalReelManager from './VerticalReelManager'
import Config from "../../config/Config";
import Signals from "../../signals/Signals";
import BaseManager from "../BaseManager";

export default class ReelsManager extends BaseManager {

  constructor (allSymbols, poolIn, poolOut) {
    super()
    this.allSymbols = allSymbols
    this.poolIn = poolIn
    this.poolOut = poolOut
    this.init()

    Signals.startSpin.add(this.start, this)
    Signals.stopSpin.add(this.stop, this)
  }

  init() {
    this.currentReels = this.createVerticalReels()
  }

  createVerticalReels = () => {
    const reels = []
    for (let i = 0; i < Config.TOTAL_REELS; i ++) {
      reels.push (new VerticalReelManager (i, this.reelCallback))
    }
    return reels
  }

  start = () => {
    this.iFastStop = false
    this.isStoppingStarted = false
    setTimeout(() => this.startReel(0), Config.START_REEL_DELAY[0])
    Signals.spinBtnPressed.addOnce(this.onImmediateStop, this)
  }

  startReel = (index) => {
    this.currentReels[index].start ()
    if(index + 1 < this.currentReels.length) {
      setTimeout(() => this.startReel(index + 1), Config.START_REEL_DELAY[index + 1])
    } else {
    }
  }

  onImmediateStop = () => {
    console.log('Stop!')
    this.iFastStop = true
    if(this.isStoppingStarted) {
      clearTimeout (this.currentReelStopTimeout)

      for (let i = this.lastStoppedReelIndex + 1; i < this.currentReels.length; i ++) {
        this.currentReels[ i ].stop ()
      }
    }
  }

  stop = (data = null) => {
    this.isStoppingStarted = true
    this.lastStoppedReelIndex = -1
    this.stopReelCounter = this.currentReels.length
    let delay = this.iFastStop ? 0 : Config.STOP_REEL_DELAY[0]
    setTimeout(() => this.stopReel(0), delay)
  }

  stopReel = (index) => {
    this.lastStoppedReelIndex = index
    this.currentReels[index].stop ()
    if(index + 1 < this.currentReels.length) {
      let delay = this.iFastStop ? 0 : Config.STOP_REEL_DELAY[index + 1]
      this.currentReelStopTimeout = setTimeout(() => this.stopReel(index + 1), delay)
    }
  }

  reelCallback = (reelIndex) => {
    this.stopReelCounter--
    if(this.stopReelCounter === 0) {
      Signals.reelsStopComplete.dispatch()
    }
  }
}
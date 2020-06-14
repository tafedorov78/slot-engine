import BaseState from './BaseState'
import GameStatesEnum from "../GameStatesEnum";
import Facade from "../../Facade";
import Utils from "../../utils/Utils";
import Config from "../../config/Config";
import ReelsConfig from "../../config/ReelsConfig";

export default class GetSpinResponseState extends BaseState {

  begin() {
    let spinResult = this.generateStopReels()
    Facade.model.spin(spinResult)
    this.end()
  }

  generateStopReels() {
    let shifts = [
      Utils.getRandomKey (1, 5),
      Utils.getRandomKey (1, 5),
      Utils.getRandomKey (1, 5)
    ]

    console.log(shifts)

    let reels = []
    for (let i = 0; i < Config.TOTAL_REELS; i ++) {
      reels.push(this.getNextKeysFromReel(4, i, ReelsConfig.FS_FAKE_REELS[i], shifts[i]))
    }
    return reels
  }

  getNextKeysFromReel (keyAmount, reelNumber, map, shift) {
    let res = []
    this.currentShift = shift
    this.currentMap = map
    for (let i = 0; i < keyAmount; i++) {
      res.push(this.getNextKeyFromBand())
    }
    return res
  }

  getNextKeyFromBand () {
    if (this.currentShift < this.currentMap.length - 1) {
      this.currentShift++
    } else {
      this.currentShift = 0
    }
    let key = this.currentMap[this.currentShift]
    return key
  }

  end = () => {
    this.stateMachine.setState(GameStatesEnum.SPIN_STOP)
  }
}

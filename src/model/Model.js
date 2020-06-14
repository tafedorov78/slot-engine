import StateMachine from "../states/StateMachine";
import GameStatesEnum from "../states/GameStatesEnum";
import Facade from '../Facade'
import Signals from "../signals/Signals";
import Utils from "../utils/Utils";
import ReelsConfig from "../config/ReelsConfig";
import Config from "../config/Config";
import PaylinesHandler from "./PaylinesHandler";

export default class Model {
  constructor () {
    this.start()
  }

  start() {
    Facade.model = this
    this.winLines = null
    this.debugData = null
    this.totalWin = 0
    this.stateMachine = new StateMachine()
    this.paylinesHandler = new PaylinesHandler()
    this.stateMachine.setState(GameStatesEnum.INIT)
  }

  init(data = null) {
    this.balance = data.balance
    this.bet = data.bet
    Signals.init.dispatch(this.genarateInitData())
  }

  genarateInitData() {
    let positions = [
      Utils.getRandomKey (0, ReelsConfig.FAKE_REELS[ 0 ].length - 1),
      Utils.getRandomKey (0, ReelsConfig.FAKE_REELS[ 1 ].length - 1),
      Utils.getRandomKey (0, ReelsConfig.FAKE_REELS[ 2 ].length - 1)
    ]

    const reels = []
    let currentShift
    let currentMap

    for (let i = 0; i < positions.length; i ++) {
      reels.push([])
      currentMap = ReelsConfig.FAKE_REELS[i]
      currentShift = positions[i]
      for (let j = 0; j < Config.TOTAL_SYMBOLS_PER_REEL[i]; j ++) {
        reels[i].push(currentMap[currentShift])
        if (currentShift < currentMap.length - 1) {
          currentShift++
        } else {
          currentShift = 0
        }
      }
    }
    return reels
  }

  spin(data) {
    this.currentReels = this.debugData ? this.debugData : data

    let winData = this.paylinesHandler.handle(this.currentReels)
    this.totalWin = winData.totalWin
    this.winLines = winData.winLines
    this.balance -= this.bet
  }

  set debugData(value) {
    this._debugData = value
    if(!this._debugData) {
      return
    }
    for (let i = 0; i < Config.TOTAL_REELS; i ++) {
      this._debugData[i].unshift(Utils.getRandomKey(1, 5))
    }
  }

  get debugData() {
    return this._debugData
  }


  set balance(value) {
    this._balance = value

    Signals.balanceUpdated.dispatch(Number(this._balance).toFixed(2))
  }

  get balance() {
    return this._balance
  }



}
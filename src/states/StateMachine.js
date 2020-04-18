import GameStatesEnum from './GameStatesEnum'
import InitState from './states/InitState'
import IdleState from './states/IdleState'
import FinalState from './states/FinalState'
import PreSpinStartState from './states/PreSpinStartState'
import SpinStartState from './states/SpinStartState'
import GetSpinResponseState from './states/GetSpinResponseState'
import SpinStopState from './states/SpinStopState'

import Signals from "../signals/Signals";


export default class StateMachine {
  constructor () {
    this.currentState = null
    this.idsArr = []
    this.statesArr = []

    this.addState(InitState, GameStatesEnum.INIT)
    this.addState(IdleState, GameStatesEnum.IDLE)
    this.addState(PreSpinStartState, GameStatesEnum.PRE_SPIN_START)
    this.addState(SpinStartState, GameStatesEnum.SPIN_START)
    this.addState(GetSpinResponseState, GameStatesEnum.GET_SPIN_RESPONSE)
    this.addState(SpinStopState, GameStatesEnum.SPIN_STOP)
    this.addState(FinalState, GameStatesEnum.FINAL)
  }

  addState (GameStatesEnum, id) {
    let stateId = this.getStateId(id)
    if (this.idsArr.indexOf(stateId) !== -1) {
      throw new Error('State already defined: ' + stateId)
    }
    this.idsArr[id] = stateId
    this.statesArr[id] = new GameStatesEnum(this, id)
  }

  getStateId (id) {
    for (let name in GameStatesEnum) {
      if (id === GameStatesEnum[name]) {
        return name
      }
    }
  }

  setState (id) {
    console.log('GameState::' + this.idsArr[id] + '_STATE')
    if (this.currentState) {
      this.currentState.cleanUp()
    }
    this.currentState = this.statesArr[id]
    if (this.currentState.dispatchStateChange) {
      Signals.stateChanged.dispatch(this.idsArr[id])
    }
    this.currentState.begin()
  }

}

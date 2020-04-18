import BaseState from './BaseState'
import GameStatesEnum from "../GameStatesEnum";
import Signals from "../../signals/Signals";


export default class SpinStartState extends BaseState {
  begin() {
    Signals.startSpin.dispatch()
    this.end()
  }



  end() {
    this.stateMachine.setState(GameStatesEnum.GET_SPIN_RESPONSE)
  }
}

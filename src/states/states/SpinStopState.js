import BaseState from './BaseState'
import Signals from "../../signals/Signals";
import GameStatesEnum from "../GameStatesEnum";

export default class SpinStopState extends BaseState {

  begin() {
    Signals.stopSpin.dispatch()
    Signals.reelsStopComplete.add(this.end, this)
  }



  end() {
    this.stateMachine.setState(GameStatesEnum.FINAL)
  }
}

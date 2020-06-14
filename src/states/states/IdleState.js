import BaseState from './BaseState'
import Signals from "../../signals/Signals";
import GameStatesEnum from "../GameStatesEnum";

export default class IdleState extends BaseState {

  begin() {
    Signals.spinBtnPressed.add(this.end, this)
  }



  end = () => {
    let gameState = GameStatesEnum.PRE_SPIN_START
    this.stateMachine.setState(gameState)
  }

  cleanUp() {
    Signals.spinBtnPressed.remove(this.end, this)
  }
}

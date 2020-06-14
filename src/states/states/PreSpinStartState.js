import BaseState from './BaseState'
import GameStatesEnum from "../GameStatesEnum";
import Facade from "../../Facade";


export default class PreSpinStartState extends BaseState {
  begin() {
    if(Facade.model.balance > 0) {
      this.end ()
    } else {
      alert("Balance must be more than 0")
      this.stateMachine.setState(GameStatesEnum.IDLE)
    }
  }



  end() {
    this.stateMachine.setState(GameStatesEnum.SPIN_START)
  }
}

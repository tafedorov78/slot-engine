import BaseState from './BaseState'
import GameStatesEnum from "../GameStatesEnum";


export default class PreSpinStartState extends BaseState {
  begin() {
    this.end()
  }



  end() {
    this.stateMachine.setState(GameStatesEnum.SPIN_START)
  }
}

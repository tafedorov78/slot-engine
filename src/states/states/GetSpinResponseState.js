import BaseState from './BaseState'
import Signals from "../../signals/Signals";
import GameStatesEnum from "../GameStatesEnum";

export default class GetSpinResponseState extends BaseState {

  begin() {
    //TODO: send request to server

    //TODO: on server response call end()
    setTimeout( () => this.end(), 1000)
  }



  end = () => {
    this.stateMachine.setState(GameStatesEnum.SPIN_STOP)
  }
}

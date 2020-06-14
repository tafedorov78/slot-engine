import BaseState from './BaseState'
import Signals from "../../signals/Signals";
import GameStatesEnum from "../GameStatesEnum";
import Facade from "../../Facade";

export default class SpinStopState extends BaseState {

  begin() {
    Signals.reelsStopComplete.add(this.end, this)

    setTimeout(() => {
      Signals.stopSpin.dispatch(Facade.model.currentReels)
    }, 1500)
  }



  end() {
    this.stateMachine.setState(GameStatesEnum.FINAL)
  }

  cleanUp() {
    Signals.reelsStopComplete.remove(this.end, this)
  }
}

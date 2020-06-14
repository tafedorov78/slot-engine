import BaseState from './BaseState'
import GameStatesEnum from "../GameStatesEnum";
import Signals from "../../signals/Signals";
import Facade from "../../Facade";


export default class ShowWinningsState extends BaseState {
  begin() {
    Signals.showWinningsComplete.add(this.end, this)
    Signals.showWinnings.dispatch({winLines: Facade.model.winLines, totalWin: Facade.model.totalWin})
  }

  end() {
    Facade.model.winLines = []
    Facade.model.balance += Facade.model.totalWin
    Facade.model.totalWin = 0
    Signals.showWinningsComplete.remove(this.end, this)
    this.stateMachine.setState(GameStatesEnum.FINAL)
  }

  cleanUp() {
    Signals.showWinningsComplete.remove(this.end, this)
  }
}

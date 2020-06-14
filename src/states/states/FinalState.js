import GameStatesEnum from "../GameStatesEnum"
import BaseState from "./BaseState"
import Facade from "../../Facade";

export default class FinalState extends BaseState {

  begin() {
    this.end()
  }

  end() {
    let gameState = GameStatesEnum.IDLE
    Facade.model.debugData = null

    if(Facade.model.totalWin > 0) {
      gameState = GameStatesEnum.SHOW_WINNINGS
    }

    this.stateMachine.setState(gameState)
	}
}
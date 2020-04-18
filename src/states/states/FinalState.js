import GameStatesEnum from "../GameStatesEnum"
import BaseState from "./BaseState"

export default class FinalState extends BaseState {

  begin() {
    this.end()
  }

  end() {
    let gameState = GameStatesEnum.IDLE
    this.stateMachine.setState(gameState)
	}
}
import StateMachine from "../states/StateMachine";
import GameStatesEnum from "../states/GameStatesEnum";

export default class Model {
  constructor () {
    this.start()
  }

  start() {
    this.stateMachine = new StateMachine()
    this.stateMachine.setState(GameStatesEnum.INIT)
  }
}
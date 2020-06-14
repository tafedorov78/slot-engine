import GameStatesEnum from '../GameStatesEnum'
import BaseState from './BaseState'
import Facade from "../../Facade";

export default class InitState extends BaseState {

  begin() {
    //TODO: Send request to server <init>
    this.end()
  }
  end() {
    //TODO: Store init data into Model
    Facade.model.init({balance: 5000, bet: 1})
    let gameState = GameStatesEnum.IDLE
    this.stateMachine.setState(gameState)
  }

}

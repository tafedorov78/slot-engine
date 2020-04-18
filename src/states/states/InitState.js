import GameStatesEnum from '../GameStatesEnum'
import BaseState from './BaseState'

export default class InitState extends BaseState {

  begin() {
    //TODO: Send request to server <init>
    this.end()
  }

  end() {
    //TODO: Store init data into Model
    let gameState = GameStatesEnum.IDLE
    this.stateMachine.setState(gameState)
  }

}

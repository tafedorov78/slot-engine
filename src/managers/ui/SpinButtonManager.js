import Signals from "../../signals/Signals";
import GameStatesEnum from "../../states/GameStatesEnum"
import BaseManager from "../BaseManager";

export default class SpinButtonManager extends BaseManager {

  constructor () {
    super()
    Signals.spinBtnPressed.add(this.onSpinBtnPressed, this)
    Signals.stateChanged.add(this.onStateChanged, this)

    this.parse()
  }

  onSpinBtnPressed () {
    this.spinBtn.className = "spinBtn pressed"
  }

  onStateChanged(state) {
    switch (state) {
      case GameStatesEnum.IDLE:
        this.spinBtn.className = "spinBtn"
      break
      default: break
    }
  }


  parse () {
    this.spinBtn = document.getElementById('spinBtn')
    this.spinBtn.addEventListener('click', () => Signals.spinBtnPressed.dispatch(), false)
  }

}

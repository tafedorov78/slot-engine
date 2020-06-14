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

  spinHTMLPressed() {
    Signals.spinBtnPressed.dispatch()
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
    this.spinBtn = document.getElementsByClassName('spinBtn')[0]
    this.spinBtn.addEventListener('click', this.spinHTMLPressed.bind(this), false)
  }

}

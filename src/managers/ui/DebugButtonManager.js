import Signals from "../../signals/Signals";
import GameStatesEnum from "../../states/GameStatesEnum"
import BaseManager from "../BaseManager";
import Facade from "../../Facade";

export default class DebugButtonManager extends BaseManager {

  constructor () {
    super()
    this.parse()
  }

  onStateChanged(state) {
    switch (state) {
      case GameStatesEnum.IDLE:
      break
      default: break
    }
  }


  parse () {
    this.debugData = document.getElementsByClassName('debagData')[0]
    this.debugBtn = document.getElementsByClassName('debugBtn')[0]
    this.debugBtn.addEventListener('click', this.debugHTMLPressed.bind(this), false)
  }

  debugHTMLPressed() {
    try {
      const JSONObject = JSON.parse (String (this.debugData.value))
      if(Array.isArray(JSONObject)) {
        Facade.model.debugData = JSONObject
      } else {
        alert("Debug data must contains Array of arrays (3).")
      }
    } catch {
      alert("Debug data must contains Array of arrays (3).")
    }

  }


}

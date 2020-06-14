import Signals from "../../signals/Signals";
import GameStatesEnum from "../../states/GameStatesEnum"
import BaseManager from "../BaseManager";
import Facade from "../../Facade";

export default class BalanceManager extends BaseManager {

  constructor () {
    super()
    Signals.startSpin.add(this.onSpin, this)
    Signals.balanceUpdated.add(this.setBalance, this)
    Signals.showWinningsComplete.add(this.blink, this)
    this.parse()
  }

  parse () {
    this.balanceElement = document.getElementsByClassName('balance')[0]
    this.balanceElement.className = "balance"
    this.balanceElement.onchange = this.onBalanceChanged.bind(this)
  }

  onBalanceChanged(value) {
    if(Number.isInteger(Number(this.balanceElement.value)) && Number(this.balanceElement.value) <= 5000) {
      Facade.model.balance = this.balanceElement.value
    } else {
      alert("Balance value must be in range 1...5000.")
      this.setBalance(Facade.model.balance.toFixed(2))
    }
  }

  setBalance(value) {
    this.balanceElement.value = value
  }

  onSpin() {
    this.balanceElement.className = "balance"
  }

  blink() {
    this.balanceElement.className = "balance scalePulse"
  }

}

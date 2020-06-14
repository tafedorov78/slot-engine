import BaseManager from "../BaseManager";
import SpinButtonManager from "./SpinButtonManager";
import BalanceManager from "./BalanceManager";
import DebugButtonManager from "./DebugButtonManager";

export default class UIManager extends BaseManager {

  constructor () {
    super()

    this.spinButtonManager = new SpinButtonManager()
    this.balanceManager = new BalanceManager()
    this.debugButtonManager = new DebugButtonManager()
  }

}

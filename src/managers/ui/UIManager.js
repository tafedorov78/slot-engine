import BaseManager from "../BaseManager";
import SpinButtonManager from "./SpinButtonManager";

export default class UIManager extends BaseManager {

  constructor () {
    super()

    this.spinButtonManager = new SpinButtonManager()
  }

}

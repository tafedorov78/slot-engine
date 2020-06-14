import BaseContainer from "./BaseContainer";
import LineContainer from "./LineContainer";
import Utils from "../utils/Utils";
import Config from "../config/Config";
import Signals from "../signals/Signals";


export default class LinesContainer extends BaseContainer {

  constructor(data) {
    super(data)
    Signals.startSpin.add(this.onSpin, this)
    Signals.showWinnings.add(this.onShowWinnings, this)
    this.init(data)
  }

  init(data) {
    this.lines = []

    let line
    for (let i = 0; i < 3; i ++) {
      line = new LineContainer()
      Utils.applyFromPattern(line, Config.pattern[`line${i + 1}`])
      this.addChild(line)
      this.lines.push(line)
    }
  }

  onSpin() {
    for (let i = 0; i < this.lines.length; i ++) {
      this.lines[i].stop()
    }
  }

  onShowWinnings(data) {
    let lineIndex
    for (let i = 0; i < data.winLines.length; i ++) {
      lineIndex = data.winLines[ i ].line - 1
      this.lines[lineIndex].start()
    }
  }

}

import BaseContainer from "./BaseContainer";
import Utils from "../utils/Utils";
import * as PIXI from "pixi.js";
import Config from "../config/Config";
import Signals from "../signals/Signals";
import gsap from "gsap"
import PaytableElementContainer from "./PaytableElementContainer";

export default class PaytableContainer extends BaseContainer {

  constructor(data) {
    super(data)
    Signals.startSpin.add(this.onSpin, this)
    Signals.showWinnings.add(this.onShowWinnings, this)
    this.init()
  }

  init(data) {
    const style = new PIXI.TextStyle({
      fill: "white",
      fontSize: 10
    });

    this.combinations = []

    const threeCHERRY_top = new PaytableElementContainer(new PIXI.Text(`3 CHERRY symbols on top line 2000`, style))
    this.combinations.push(threeCHERRY_top)
    Utils.applyFromPattern(threeCHERRY_top, Config.pattern.stroke1)
    this.addChild(threeCHERRY_top)

    const threeCHERRY_center = new PaytableElementContainer(new PIXI.Text(`3 CHERRY symbols on center line 1000`, style))
    this.combinations.push(threeCHERRY_center)
    Utils.applyFromPattern(threeCHERRY_center, Config.pattern.stroke2)
    this.addChild(threeCHERRY_center)

    const threeCHERRY_bottom = new PaytableElementContainer(new PIXI.Text(`3 CHERRY symbols on bottom line 4000`, style))
    this.combinations.push(threeCHERRY_bottom)
    Utils.applyFromPattern(threeCHERRY_bottom, Config.pattern.stroke3)
    this.addChild(threeCHERRY_bottom)

    const seven_symbols_on_any_line = new PaytableElementContainer(new PIXI.Text(`3 7 symbols on any line 150`, style))
    this.combinations.push(seven_symbols_on_any_line)
    Utils.applyFromPattern(seven_symbols_on_any_line, Config.pattern.stroke4)
    this.addChild(seven_symbols_on_any_line)

    const any_combination_of_CHERRY_and_seven_on_any_line = new PaytableElementContainer(new PIXI.Text(`Any combination of CHERRY and 7 on any line 75`, style))
    this.combinations.push(any_combination_of_CHERRY_and_seven_on_any_line)
    Utils.applyFromPattern(any_combination_of_CHERRY_and_seven_on_any_line, Config.pattern.stroke5)
    this.addChild(any_combination_of_CHERRY_and_seven_on_any_line)

    const three_TRIOxBAR_symbols_on_any_line = new PaytableElementContainer(new PIXI.Text(`3 3xBAR symbols on any line 50`, style))
    this.combinations.push(three_TRIOxBAR_symbols_on_any_line)
    Utils.applyFromPattern(three_TRIOxBAR_symbols_on_any_line, Config.pattern.stroke6)
    this.addChild(three_TRIOxBAR_symbols_on_any_line)

    const three_DUOxBAR_symbols_on_any_line = new PaytableElementContainer(new PIXI.Text(`3 2xBAR symbols on any line 20`, style))
    this.combinations.push(three_DUOxBAR_symbols_on_any_line)
    Utils.applyFromPattern(three_DUOxBAR_symbols_on_any_line, Config.pattern.stroke7)
    this.addChild(three_DUOxBAR_symbols_on_any_line)

    const three_BAR_symbols_on_any_line = new PaytableElementContainer(new PIXI.Text(`3 BAR symbols on any line 10`, style))
    this.combinations.push(three_BAR_symbols_on_any_line)
    Utils.applyFromPattern(three_BAR_symbols_on_any_line, Config.pattern.stroke8)
    this.addChild(three_BAR_symbols_on_any_line)

    const combination_of_any_BAR_symbols_on_any_line = new PaytableElementContainer(new PIXI.Text(`Combination of any BAR symbols on any line 5`, style))
    Utils.applyFromPattern(combination_of_any_BAR_symbols_on_any_line, Config.pattern.stroke9)
    this.addChild(combination_of_any_BAR_symbols_on_any_line)
    this.combinations.push(combination_of_any_BAR_symbols_on_any_line)

  }

  onShowWinnings(data) {
    this.winCombinations = []
    for (let i = 0; i < data.winLines.length; i ++) {
      this.winCombinations.push (data.winLines[ i ].combination)
    }
    this.blink()
  }



  blink() {
    for (let i = 0; i < this.winCombinations.length; i ++) {
      this.combinations[this.winCombinations[i]].startBlinking()
    }
  }

  onSpin() {
    if(!this.combinations) {
      return
    }

    for (let i = 0; i < this.combinations.length; i ++) {
      this.combinations[i].stopBlinking()
    }
  }


}

import Signals from "../signals/Signals"
import Config from "../config/Config"
import "pixi-assetslist-loader"
import * as PIXI from "pixi.js"

export default class ApplicationLoader {

  constructor() {
    PIXI.Loader.shared.add("./assets/AssetsConfig.json");
    PIXI.Loader.shared.once('complete', this.build, this);
    PIXI.Loader.shared.load()
  }

  build = () => {
    Config.pattern = PIXI.Loader.shared.resources['pattern'].data
    Signals.assetsLoadingComplete.dispatch()


  }

}

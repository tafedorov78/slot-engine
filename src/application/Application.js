import Signals from "../signals/Signals";
import Model from "../model/Model";
import Stage from "../stage/Stage";
import MainContainer from "../containers/MainContainer";
import ApplicationLoader from "./ApplicationLoader";
import GameManager from "../managers/GameManager";

export default class Application {
  constructor () {
    Signals.assetsLoadingComplete.add(this.onAssetsLoadingComplete)
    this.appLoader = new ApplicationLoader()
    this.stage = new Stage()
  }

  onAssetsLoadingComplete = () => {
    this.mainContainer = new MainContainer()
    this.stage.addChild(this.mainContainer)

    this.gameManager = new GameManager()

    this.model = new Model()

  }
}
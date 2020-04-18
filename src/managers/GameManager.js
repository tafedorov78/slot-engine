import ReelsManager from "./reels/ReelsManager";
import UIManager from "./ui/UIManager";

export default class GameManager {

  constructor () {
    this.start()
  }

  start() {
    this.uiManager = new UIManager()
    this.reelsManager = new ReelsManager()
  }
}
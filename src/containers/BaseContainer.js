import * as PIXI from "pixi.js";

export default class BaseContainer extends PIXI.Container {

  constructor(data) {
    super()
  }

  init(data) {
    throw error(`Method Init is not implemented!`)
  }

}
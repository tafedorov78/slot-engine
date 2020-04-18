import * as PIXI from 'pixi.js'
import * as particles from "pixi-particles";
import gsap from "gsap"
import BaseContainer from "./BaseContainer";


export default class LinesContainer extends BaseContainer {

  constructor(data) {
    super(data)
  }

  init(data) {
    this.points = [
      this.getChildByName('point00'),
      this.getChildByName('point12'),
      this.getChildByName('point20'),
      this.getChildByName('point32'),
      this.getChildByName('point40')
  ]

    this.particleContainer = new PIXI.Container()
    this.addChild(this.particleContainer)



    let confetties = [PIXI.Texture.from('img'), PIXI.Texture.from('fire')]

    this.emitter =  new particles.Emitter(this.particleContainer, confetties, PIXI.Loader.shared.resources['jsn'].data)


    this.ticker = new PIXI.Ticker()
    this.ticker.add((deltaTime) => {
      this.update()
    })
    //this.start()
  }

  start() {
    let t = gsap.timeline()

    this.emitter.spawnPos.set(this.points[0].x, this.points[0].y)

    t.to(this.emitter.spawnPos, 0.2, {x: this.points[0].x, y: this.points[0].y})
      .to(this.emitter.spawnPos, 0.2, {x: this.points[1].x, y: this.points[1].y})
      .to(this.emitter.spawnPos, 0.2, {x: this.points[2].x, y: this.points[2].y})
      .to(this.emitter.spawnPos, 0.2, {x: this.points[3].x, y: this.points[3].y})
      .to(this.emitter.spawnPos, 0.2, {x: this.points[4].x, y: this.points[4].y})

    this.emitter.emit = true
    this.ticker.start()
  }

  stop() {
    this.emitter.emit = false
    this.ticker.stop()
  }

  update () {
    this.emitter.update(0.01)
  }

}

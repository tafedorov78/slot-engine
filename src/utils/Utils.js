export default new class Utils {
  constructor (func) {}

  clamp (val, min, max) {
    return Math.min(Math.max(min, val), max)
  }

  dedupe (arr, map) {
    return arr.reduce(function (p, c) {
      let key = (map.map(value => c[value])).join('|')
      if (p.temp.indexOf(key) === -1) {
        p.out.push(c)
        p.temp.push(key)
      }
      return p
    }, { temp: [], out: [] }).out
  }

  flatten (arr) {
    return [].concat.apply([], arr)
  }

  formatNumber (value, tweened, precision) {
    if (this.useCredits) {
      return tweened ? Number(value).toFixed(precision) : this.toCredits(value)
    }
    return Number(value).toFixed(precision)
  }

  getFrames (ext = '', doubleZero = false, ...rest) {
    let key = rest[0]
    let output = []
    let indexStr
    if (key === undefined) {
      console.warn('key is required as first parameter!')
      return
    } else if (rest.length === 1) {
      let index = 0
      if (index < 10 && doubleZero) {
        indexStr = '0' + index
      }
      else {
        indexStr = index
      }
      if (!PIXI.utils.TextureCache[key + indexStr + ext]) {
        throw new Error(`The frameId "${key + indexStr}.png" does not exist in the texture cache`)
      }

      while (PIXI.utils.TextureCache[key + indexStr + ext]) {
        output.push(PIXI.utils.TextureCache[key + indexStr + ext])
        index++
        if (index < 10 && doubleZero) {
          indexStr = '0' + index
        }
        else {
          indexStr = index
        }
      }
    } else {
      let labels = []
      rest.forEach(function (data, index) {
        if (index) {
          if (Array.isArray(data)) {
            labels = labels.concat(this.getSequenceArray(key, data[0], data[1]))
          } else if (typeof data === 'number') {
            labels.push(key + data + ext)
          } else if (typeof data === 'object' && data.repeat) {
            let counter = data.repeat
            while (counter-- > 0) {
              data.arr ? labels = labels.concat(this.getSequenceArray(key, data.arr[0], data.arr[1])) : labels.push(key + data.frame + ext)
            }
          }
        }
      }, this)
      labels.forEach(label => output.push(PIXI.Texture.fromFrame(label)))
    }
    return output
  }

  getSequenceArray (prefix, start, stop, suffix = '.png') {
    let output = []
    let frame = ''
    if (start < stop) {
      for (let i = start; i <= stop; i++) {
        frame = prefix + i + suffix
        output.push(frame)
      }
    } else {
      for (let i = start; i >= stop; i--) {
        frame = prefix + i + suffix
        output.push(frame)
      }
    }
    return output
  }

  isFunction (obj) {
    return !!(obj && obj.constructor && obj.call && obj.apply)
  }

  randomNumber (min, max) {
    return Math.random() * (max - min) + min
  }

  shuffle (arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]]
    }
    return arr
  }

  sortByValue (arr, ...values) {
    do {
      let value = values.shift()
      arr = arr.sort((a, b) => a[value] - b[value])
    } while (values.length > 0)
    return arr
  }

  toCredits (value) {
    if (typeof value === 'string') {
      value = Number(value)
    }
    value /= this.model.denomination
    if (this.model.denomination == 0.1) {
      value = Math.round(value * 100) / 100
    }
    return this.model.denomination == 0.01 ? Math.round(value) : value | 0
  }

  wrap (value, max) {
    return ((value % max) + max) % max
  }

  arrayClone (arr) {
    let newArr = []
    for (let i = 0; i < arr.length; i++) {
      newArr.push(arr[i])
    }
    return newArr
  }

  array2Clone (arr) {
    let newArr = []
    for (let i = 0; i < arr.length; i++) {
      newArr.push(this.arrayClone(arr[i]))
    }
    return newArr
  }

  // Converts from degrees to radians.
  deg2rad(degrees) {
    return degrees * Math.PI / 180;
  }

// Converts from radians to degrees.
  rad2deg(radians) {
    return radians * 180 / Math.PI;
  }

  applyFromPattern(obj1, obj2, isExtra = false) {
    if(!obj2) {
      console.log('PATTERN ERROR:: ' + obj2 + ' NOT FOUND')
      return
    }
    obj1.x = obj2.x
    obj1.y = obj2.y
    if(isExtra) {
      obj1.width = obj2.width
      obj1.height = obj2.height
      obj1.rotation = obj2.rotation
    }

  }

  distanceAB(xa, ya, xb, yb) {
    let xs = xb - xa
    let ys = yb - ya
    xs *= xs
    ys *= ys
    return Math.sqrt(xs + ys)
  }

  angleAB(ax, ay, bx, by) {
    return Math.atan2(by - ay, bx - ax);
  }

  /**
   *  Getting the next index randomly
   * @returns
   */
  getRandomKey (minId, maxId) {
    let min = Math.ceil(minId)
    let max = Math.floor(maxId)
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  fadeInOut(source, alpha, time, onComplete = null) {
    TweenMax.to(source, time, {alpha: alpha, ease: Power0.easeOut, onComplete: onComplete})
  }

  generateSecret(session) {
    let secret = sessionStorage.getItem(session) // sessionStorage represents HTML5 Session Storage

    if (secret === null) {
      secret = ''
      const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
      for (let i = 0; i < 40; i++) {
        secret += possible.charAt(Math.floor(Math.random() * possible.length))
      }

      sessionStorage.setItem(session, secret)
    }

    return secret
  }

  scalling(item, time, scaleStart, scaleEnd, yoyo = false, repeat = 0) {
    item.scale.set(scaleStart)
    TweenMax.to(item.scale, time, {x: scaleEnd, y: scaleEnd, repeat: repeat,  yoyo:yoyo})
  }

  isEmpty(obj) {
    for(let key in obj) {
      if(obj.hasOwnProperty(key))
        return false;
    }
    return true;
  }

}()

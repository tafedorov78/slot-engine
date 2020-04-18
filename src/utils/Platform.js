export default new class Platform {

  constructor() {
    this.uAgent = navigator.userAgent || '';
    this.browser = {
      version : (this.uAgent.match( /.+(?:me|ox|on|rv|it|era|ie)[\/: ]([\d.]+)/ ) || [0,'0'])[1],
      opera : /opera/i.test(this.uAgent),
      msie : (/msie/i.test(this.uAgent) && !/opera/i.test(this.uAgent)),
      msie6 : (/msie 6/i.test(this.uAgent) && !/opera/i.test(this.uAgent)),
      msie7 : (/msie 7/i.test(this.uAgent) && !/opera/i.test(this.uAgent)),
      msie8 : (/msie 8/i.test(this.uAgent) && !/opera/i.test(this.uAgent)),
      msie9 : (/msie 9/i.test(this.uAgent) && !/opera/i.test(this.uAgent)),
      msie10 : (/msie 10/i.test(this.uAgent) && !/opera/i.test(this.uAgent)),
      mozilla : /firefox/i.test(this.uAgent),
      chrome : /chrome/i.test(this.uAgent),
      safari : (!(/chrome/i.test(this.uAgent)) && /webkit|safari|khtml/i.test(this.uAgent)),
      iphone : /iphone/i.test(this.uAgent),
      ipod : /ipod/i.test(this.uAgent),
      iphone4 : /iphone.*OS 4/i.test(this.uAgent),
      ipod4 : /ipod.*OS 4/i.test(this.uAgent),
      ipad : /ipad/i.test(this.uAgent),
      ios : /ipad|ipod|iphone/i.test(this.uAgent),
      android : /android/i.test(this.uAgent),
      bada : /bada/i.test(this.uAgent),
      mobile : /iphone|ipod|ipad|opera mini|opera mobi|iemobile/i.test(this.uAgent),
      msie_mobile : /iemobile/i.test(this.uAgent),
      safari_mobile : /iphone|ipod|ipad/i.test(this.uAgent),
      opera_mobile : /opera mini|opera mobi/i.test(this.uAgent),
      opera_mini : /opera mini/i.test(this.uAgent),
      mac : /mac/i.test(this.uAgent),
      webkit : /webkit/i.test(this.uAgent),
      android_version: parseFloat(this.uAgent.slice(this.uAgent.indexOf("Android")+8)) || 0
    };
  }

  getUserAgent () {
    return navigator.userAgent
  }

  isiPhoneXXs() {
    const ratio = window.devicePixelRatio || 1
    const screen = {
      width : window.screen.width * ratio,
      height : window.screen.height * ratio,
    }
    if (this.isIOs() && screen.width === 1125 && screen.height === 2436) {
      return true
    }
    return false
  }

  isiPhoneXsMAX() {
    const ratio = window.devicePixelRatio || 1
    const screen = {
      width : window.screen.width * ratio,
      height : window.screen.height * ratio,
    }
    if (this.isIOs() && screen.width === 1242 && screen.height === 2688) {
      return true
    }
    return false
  }

  isIPhone5 () {
    const ratio = window.devicePixelRatio || 1
    const screen = {
      width : window.screen.width * ratio,
      height : window.screen.height * ratio,
    }
    if (this.isIOs() && screen.width === 640 && screen.height === 1136) {
      return true
    }
    return false
  }

  isIPhone678 () {
    const ratio = window.devicePixelRatio || 1
    const screen = {
      width : window.screen.width * ratio,
      height : window.screen.height * ratio,
    }
    if (this.isIOs() && screen.width === 750 && screen.height === 1334) {
      return true
    }
    return false
  }

  isIPhone678PLUS () {
    const ratio = window.devicePixelRatio || 1
    const screen = {
      width : window.screen.width * ratio,
      height : window.screen.height * ratio,
    }
    if (this.isIOs() && screen.width === 1080 && screen.height === 1920) {
      return true
    }
    return false
  }

  isIPhoneXr () {
    const ratio = window.devicePixelRatio || 1
    const screen = {
      width : window.screen.width * ratio,
      height : window.screen.height * ratio,
    }
    if (this.isIOs() && screen.width === 828 && screen.height === 1792) {
      return true
    }
    return false
  }


  isIPhone () {
    return this.getUserAgent().match(/iPhone/i) && !this.isIEMobile()
  }

  isIOs () {
    return this.getUserAgent().match(/iPhone|iPad|iPod/i) && !this.isIEMobile()
  }

  isIEMobile () {
    return this.getUserAgent().indexOf('IEMobile') >= 0
  }

  isAndroid () {
    var ua = navigator.userAgent.toLowerCase();
    var isAndroid = ua.indexOf("android") > -1; //&& ua.indexOf("mobile");
    return isAndroid
  }

  isPortrait () {
    if (this.isAndroid()) {
      return window.screen.availHeight > window.screen.availWidth
    }
    return document.body.clientWidth < document.body.clientHeight
  }

  isIPhone6OrBigger () {
    var screenMaxSize = Math.max(window.screen.width, window.screen.height)
    return this.isIPhone() && (screenMaxSize >= 667.0)
  }

  isTopFrame () {
    return window.top === window.self
  }

  isMobile () {
    if (this.mobileCached === undefined) {
      this.mobileCached = this.getUserAgent().match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile/i)
    }
    return this.mobileCached
  }

  isYandexBrowser () {
    return this.getUserAgent().match(/YaBrowser\/[.0-9]*/)
  }


}()

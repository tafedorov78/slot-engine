import signals from 'signals'

export default {
  assetsLoadingComplete: new signals.Signal (),

  spinBtnPressed: new signals.Signal (),

  startSpin: new signals.Signal (),
  stopSpin: new signals.Signal (),
  reelsStopComplete: new signals.Signal (),

  stateChanged: new signals.Signal ()


}
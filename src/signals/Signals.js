import signals from 'signals'

export default {
  init: new signals.Signal (),
  gameInited: new signals.Signal (),
  assetsLoadingComplete: new signals.Signal (),

  spinBtnPressed: new signals.Signal (),
  balanceEntered: new signals.Signal (),
  balanceUpdated: new signals.Signal (),

  startSpin: new signals.Signal (),
  stopSpin: new signals.Signal (),
  reelsStopComplete: new signals.Signal (),

  showWinnings: new signals.Signal (),
  showWinningsComplete: new signals.Signal (),
  stateChanged: new signals.Signal ()


}
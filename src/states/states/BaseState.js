export default class BaseState {

	constructor(stateMachine, id) {
		this.stateMachine = stateMachine;
		this.id = id;
		this.dispatchStateChange = true;
	}

  begin() {
    throw error('Method enter() must be implemented')
	}

  end() {
		throw error('Method exit() must be implemented')
	}

	cleanUp() {}
}
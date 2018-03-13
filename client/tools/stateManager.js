class StateManager{
  constructor(game){
    this.game = game;
  }

  initialize(){
    this.game.Controller.WASD.PAUSE.onDown.add(this.togglePause, this);
    this.score = 0;
  }

  togglePause(){
    this.game.paused = !this.game.paused;
    this.game.advance();
  }

  update(inputs){
  }
}

Tools.StateManager = StateManager;
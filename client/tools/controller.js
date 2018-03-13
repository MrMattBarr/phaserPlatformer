class Controller{
  constructor(game){
    this.game = game;
    this.PressedKeys = {}
  // The player and its settings
  }

static get KeyMap() {
  return {
    JUMP: "Up",
    DOWN: "Down",
    LEFT: "Left",
    RIGHT: "Right",
    SPACE: "Space"
  }
}

initialize(){
  this.cursors = this.game.input.keyboard.createCursorKeys();
  this.WASD= {
    JUMP: this.game.input.keyboard.addKey(Phaser.Keyboard.W),
    PAUSE: this.game.input.keyboard.addKey(Phaser.Keyboard.S),
    LEFT: this.game.input.keyboard.addKey(Phaser.Keyboard.A),
    RIGHT: this.game.input.keyboard.addKey(Phaser.Keyboard.D),
    SPACE: this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR),
    PRIMARY: this.game.input.keyboard.addKey(Phaser.Keyboard.J)
  };
  }

  getInputs(){
    inputs = {
      pressedKeys: [],
      newKeys: [],
      releasedKeys: []
    }

    for(inputKey in this.WASD){
      if(typeof inputKey == 'undefined') continue;
      if(this.WASD[inputKey].isDown){
        inputs.pressedKeys.push(Controller.KeyMap[inputKey]);
        if(!this.PressedKeys[inputKey]){
          inputs.newKeys.push(Controller.KeyMap[inputKey]);
        }
        this.PressedKeys[inputKey] = true;
      } else {
        if(this.PressedKeys[inputKey]){
          inputs.releasedKeys.push(Controller.KeyMap[inputKey]);
        }
        this.PressedKeys[inputKey] = false;
      }
    }
    return inputs;
  }


}

Tools.Controller = Controller;
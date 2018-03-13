class MusicManager{
  constructor(game){
    this.game = game;
    this.game.load.audio('backgroundMusic', ['assets/music/test.mp3']);
    this.paused = false;
    this.started = false;
  }

  initialize(){
    this.music = this.game.add.audio('backgroundMusic');
  }

  toggleMusic(){
    if(!this.started){
      this.started = true;
      this.music.play();
      return;
    }
    this.paused = !this.paused;
    if(this.paused){
      this.music.pause();
    } else {
      this.music.resume();
    }
  }

  update(){
    if(_.contains(inputs.newKeys, Tools.Controller.KeyMap.SPACE)){
      this.toggleMusic();
    }
  }
}

Tools.MusicManager = MusicManager;
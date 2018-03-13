const WINDOW_SIZE = {x: window.innerWidth, y: window.innerHeight}

let game = new Phaser.Game(WINDOW_SIZE.x, WINDOW_SIZE.y, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {
  game.WINDOW_SIZE = WINDOW_SIZE;
  game.Sprites = new Tools.SpriteManager(game);
  game.Ui = new Tools.UiManager(game);
  game.Sprites.loadSprites();
  game.Player = new Tools.Player(game);
  game.Music = new Tools.MusicManager(game);
  game.World = new Tools.WorldManager(game);
  game.Controller = new Tools.Controller(game);
  game.State = new Tools.StateManager(game);
  game.Enemies = new Tools.EnemyManager(game, Enemies);
  game.Items = new Tools.ItemManager(game, Items);
  game.advance = advance;
}

function create() {
  //  We're going to be using physics, so enable the Arcade Physics system
  game.physics.startSystem(Phaser.Physics.ARCADE);
  game.world.setBounds(0,0,game.World.size.x,game.World.size.y);
  game.Music.initialize();
  game.World.initialize();
  game.Player.initialize();
  game.Enemies.initialize();
  game.Controller.initialize();
  game.Ui.initialize();
  game.State.initialize();

  game.stage.disableVisibilityChange = true;
}

function update() {
  advance();
}

function advance(){
  const inputs = game.Controller.getInputs();
  game.State.update(inputs);
  game.World.update(inputs);
  game.Enemies.update(inputs);
  game.Player.update(inputs, game.State);
  game.Music.update(inputs);
  game.camera.x = game.Player.player.body.x - (WINDOW_SIZE.x / 2);
  game.Ui.update(inputs);
}

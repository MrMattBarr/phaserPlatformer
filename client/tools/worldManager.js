class WorldManager{
  constructor(game){
    this.game = game;
    this.size = {x:2000, y: game.WINDOW_SIZE.y}
    
    this.GroundBaseWidth = 400;
    this.GroundBaseHeight = 32;
  }

initialize() {
  this.createBackground();
  this.createBounds();
  this.createLedges();
  this.createBlocks();
  }

createBounds(){
  this.bounds = this.game.add.group();
  this.bounds.enableBody = true;
  const left = this.bounds.create(0, 0, 'ground');
  left.scale.setTo(5 / this.GroundBaseWidth, this.size.y / this.GroundBaseHeight);
  left.body.immovable = true;
  const right = this.bounds.create(this.size.x - 5, 0, 'ground');
  right.scale.setTo(5 / this.GroundBaseWidth, this.size.y / this.GroundBaseHeight);
  right.body.immovable = true;
}

createBackground(){
  this.sky = this.game.add.sprite(-10, -10, 'sky');
  const SkyBaseWidth = 800;
  const SkyBaseHeight = 600;
  this.sky.scale.setTo((this.size.x + 20) / SkyBaseWidth, (this.size.y + 20) / SkyBaseHeight);

}

createLedges(){
  this.platforms = this.game.add.group();
  this.platforms.enableBody = true;
  let ledge = this.platforms.create(350,500,'ground');
  ledge.body.immovable = true;
  ledge = this.platforms.create(800,200,'ground');
  ledge.body.immovable = true;
  const down = this.platforms.create(0, this.size.y - 5, 'ground');
  down.scale.setTo(this.size.x / this.GroundBaseWidth, 5 / this.GroundBaseHeight);
  down.body.immovable = true;
}

update(){
  this.updateBackground();
  this.updateBlocks({game: this.game});
}

updateBlocks({game}){
    game.physics.arcade.overlap(game.Player.primaryItem.hitbox, this.blocks, this.blockHit, null, this);
}

blockHit(item, block){
  if(!this.game.Player.primaryItem.using || block.lastHitId == this.game.Player.primaryItem.useId){
    return false;
  }
  block.lastHitId = this.game.Player.primaryItem.useId;
  block.alpha = block.alpha -.25;
  if(block.alpha < .5){
    block.kill();
  }
}


updateBackground(){
  this.sky.position ={
    x: this.game.camera.view.x - 10,
    y: this.game.camera.view.y - 10
  }
}

createBlocks(){
  const BLOCK_SIZE = 64
  this.blocks = this.game.add.group();
  this.blocks.enableBody = true;
  const block_height = 500 - BLOCK_SIZE
  let block = this.blocks.create(420, block_height, 'block');
  block.scale.setTo(BLOCK_SIZE / this.GroundBaseWidth, BLOCK_SIZE / this.GroundBaseHeight);
  block.lastHitId = 0;
  block.anchor.setTo(1,1);
  block.body.immovable = true;
  block = this.blocks.create(630, block_height, 'block');
  block.scale.setTo(BLOCK_SIZE / this.GroundBaseWidth, BLOCK_SIZE / this.GroundBaseHeight);
  block.lastHitId = 0;
  block.body.immovable = true;

}
}

Tools.WorldManager = WorldManager;
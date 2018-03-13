class Player{

  get PLAYER_GRAVITY(){
    return 400  
  }
  constructor(game){
    this.game = game;
    this.BASE_VELOCITY = 0;
  // The player and its settings
}

initialize(){
    //  We need to enable physics on the player
    this.playerGroup = this.game.add.group();
    this.player = this.playerGroup.create(600, 200, 'dude');
    this.game.physics.arcade.enable(this.player);
    this.player.anchor.setTo(.5,.5);

    this.player.body.gravity.y = 2500;
    this.player.body.collideWorldBounds = true;
    //  Our two animations, walking left and right.
    this.player.animations.add('run', [5, 6, 7, 8], 10, true);
    this.facing = 'right';
    this.equipPickaxe();
  }

  update(inputs, state){
    this.registerCollisions();
    this.updateMovement({inputs, state});
    this.updateActions({inputs, state});
    if(!!this.primaryItem.using)this.primaryItem.update({game: this.game, player: this.player});
  }

  handOffset(){
    let offset =
    {
      x: 20,
      y: 6
    }
    if(this.facing == 'left') offset.x *= -1;
    return offset;
  }

  registerCollisions(){
    this.game.physics.arcade.collide(this.player, this.game.World.platforms);
    this.game.physics.arcade.collide(this.player, this.game.World.blocks);
  }


  updateMovement({inputs, state}){
    if(_.contains(inputs.pressedKeys, Tools.Controller.KeyMap.RIGHT)){
      this.player.body.velocity.x = this.BASE_VELOCITY + 200;
      this.player.animations.play('run');
      this.facing = 'right';
      this.player.scale.setTo(1,1);
    } else if(_.contains(inputs.pressedKeys, Tools.Controller.KeyMap.LEFT)){
      this.facing = 'left';
      this.player.body.velocity.x = this.BASE_VELOCITY - 200;
      this.player.scale.setTo(-1,1);
      this.player.animations.play('run');
    } else {
      this.player.animations.stop();
      this.player.body.velocity.x = this.BASE_VELOCITY;
      this.player.frame = 5;
    }

    if(_.contains(inputs.newKeys, Tools.Controller.KeyMap.JUMP)){
      this.player.body.velocity.y = this.BASE_VELOCITY - 750;
    }    
  }

  updateActions({inputs, state}){
    if(_.contains(inputs.newKeys, Tools.Controller.KeyMap.PRIMARY)){
      this.primaryItem.use();
    }
  }

  equipPickaxe(){
    this.primaryItem = new this.game.Items.Items.Pickaxe({game:this.game, player:this.player});
  }

}

Tools.Player = Player;
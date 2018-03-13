class Piggy{
  constructor({game, location={x:0,y:0}}){
    this.spriteName = 'baddie';
    this.sprite = game.add.sprite(location.x, location.y, this.spriteName);
    this.scripts = ['goRight', 'goLeft', 'standStill'];
    this.activeScript='goRight';
    this.facing = 'right';
    this.game = game;
    this.lastHitId = 0;

    this.RUN_VELOCITY = 150;

    game.physics.arcade.enable(this.sprite);
    this.sprite.body.gravity.y = 500;
    this.sprite.body.collideWorldBounds = true;
    this.sprite.animations.add('left', [1, 0], 5, true);
    this.sprite.animations.add('right', [3, 2], 5, true);
  }

  update({game, inputs}){
    if(game.Player.primaryItem.using)
    {
      game.physics.arcade.overlap(game.Player.primaryItem.hitbox, this.sprite, this.attacked, null, this);
    }
      game.physics.arcade.collide(game.World.bounds, this.sprite, this.ranIntoSomething, null, this);
      game.physics.arcade.collide(game.World.blocks, this.sprite, this.ranIntoSomething, null, this);
      this[this.activeScript]();
      if(!this.sprite.body.touching.down){
        this.sprite.animations.stop();
        this.sprite.frame = this.facing == 'right' ? 3: 0;
      }
  }

  attacked(){
  if(!this.game.Player.primaryItem.using || this.lastHitId == this.game.Player.primaryItem.useId){
    return false;
  }
    this.lastHitId = this.game.Player.primaryItem.useId;
    this.game.State.score += 1;
    this.jump();
  }

  ranIntoSomething(){
    if(this.sprite.body.touching.up){
      this.activeScript='standStill';
      return;
    }
    if(this.sprite.body.touching.left){
      this.activeScript='goRight';
      this.facing = 'right';
    } else if(this.sprite.body.touching.right){
      this.activeScript='goLeft';
      this.facing = 'left';
    }
  }

  goRight(){
      this.sprite.body.velocity.x = this.RUN_VELOCITY;
      this.sprite.play('right');
  }

  jump(){
    this.sprite.body.velocity.y = -200;
  }

  goLeft(){
    this.sprite.body.velocity.x = 0 - this.RUN_VELOCITY;
    this.sprite.play('left');
  }

  standStill(){
    this.sprite.body.velocity.x = 0;
    this.sprite.animations.stop();
    this.sprite.frame = this.facing == 'right' ? 2: 1;
  }
}

Enemies.Piggy = Piggy;
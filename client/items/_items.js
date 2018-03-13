Items = {};

class Equippable{

  generateAttributes(){
    return {
      spriteName: '',
      swingAngle: {min: -30, max: 80},
      held: false,
      swingSpeed: 1
    }
  }

  constructor({game}){
    this.attributes = this.generateAttributes();
    this.using = false;
    this.useId = -1;
    this.game = game;
  }

  update(){
    if(this.attributes.held){
      handOffset = this.game.Player.handOffset();
      this.hitbox.x = this.game.Player.player.x + handOffset.x;
      this.hitbox.y = this.game.Player.player.y + handOffset.y;
      this.sprite.x = this.game.Player.player.x;
      this.sprite.y = this.game.Player.player.y + handOffset.y;

      if(this.game.Player.facing == 'left'){
        this.sprite.scale.setTo(-1 * this.ratios.x, this.ratios.y);
      } else {
        this.sprite.scale.setTo(this.ratios.x, this.ratios.y);
      }
    }
  }

  kill(){
    this.sprite.kill();
    this.hitbox.kill();
    this.using = false;
  }

  use(){
    if(this.using) return false;
    this.using = true;
    this.useId = Math.random();
    this.createSprite();
    this.createHitbox();
  }

  setRatios(){
    this.ratios = {
      x:this.attributes.size.x / this.sprite.width,
      y:this.attributes.size.y / this.sprite.height
    }
  }

  createHitbox(){
    player = this.game.Player.player;
    this.hitbox = this.game.add.sprite(player.x, player.y, this.attributes.spriteName);
    this.game.physics.arcade.enable(this.hitbox);
    this.hitbox.alpha = 0;
    this.hitbox.scale.setTo(this.ratios.x, this.ratios.y);
    this.hitbox.anchor.setTo(.5, .5);

  }

  createSprite(){
    player = this.game.Player.player;
    this.sprite = this.game.add.sprite(player.x, player.y, this.attributes.spriteName);
    this.setRatios();
    this.sprite.scale.setTo(this.ratios.x, this.ratios.y);
    if(!!this.attributes.anchor) this.sprite.anchor.setTo(this.attributes.anchor.x, this.attributes.anchor.y);
    
  }
}

Items.Equippable = Equippable;
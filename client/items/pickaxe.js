class Pickaxe extends Items.Equippable{
  generateAttributes(){
    return _.extend(super.generateAttributes(),{
      size: {x:32, y:32},
      spriteName: 'pickaxe',
      held: true,
      anchor: {x:0, y:1},
      swingSpeed: 7
    });
  }


  constructor({game, player}){
    super({game});
  }

  use(){
    super.use();
    this.sprite.absoluteAngle = this.attributes.swingAngle.min;
  }

  update({game, player}){
    super.update();
    if(this.using)
    {
      this.swing();
    }
  }

  swing(){
    this.sprite.absoluteAngle = this.sprite.absoluteAngle + this.attributes.swingSpeed;
    if(this.sprite.absoluteAngle > this.attributes.swingAngle.max){
      this.kill();
    }
    let intendedAngle = this.sprite.absoluteAngle;
    if(this.game.Player.facing == 'left') intendedAngle *= -1;
    this.sprite.angle = intendedAngle;
  }
}

Items.Pickaxe = Pickaxe;
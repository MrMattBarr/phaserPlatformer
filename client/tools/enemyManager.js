class EnemyManager {
  constructor(game, Enemies) {
    this.game = game;
    this.Enemies = Enemies;
    this.ENEMY_COUNT = 2;
    this.enemyList = [];
    this.enemyGroup = [];
    this.BASE_VELOCITY = 0;
  }

  initialize() {
    this.createEnemies();
  }

  createEnemies() {
    this.enemyGroup = this.game.add.group();
    this.enemyGroup.enableBody = true;
    for (let i = 0; i < this.ENEMY_COUNT; i++) {
      const piggy = new this.Enemies.Piggy({game: this.game, location: {x:200 + (200 * i), y: 400}});
      this.enemyGroup.add(piggy.sprite);
      this.enemyList.push(piggy);
    }
  }

  update(inputs) {
    this.registerCollisions();
    for (enemy of this.enemyList) {
      enemy.update({game:this.game, inputs:inputs});
    }
  }

  registerCollisions() {
    const hitPlatform = this.game.physics.arcade.collide(this.game.World.platforms, this.enemyGroup);
    const hitGrounds = this.game.physics.arcade.collide(this.game.World.grounds, this.enemyGroup);
    const hitBlocks = this.game.physics.arcade.collide(this.game.World.blocks, this.enemyGroup);
  }
}

Tools.EnemyManager = EnemyManager;
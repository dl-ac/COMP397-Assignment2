module managers {
    export class Enemy {
        // Constants
        private static ENEMY_QUANTITY: number = 150;

        // PRIVATE INSTANCE MEMBERS
        private _enemyPool: Array<objects.Enemy>;

        // PUBLIC PROPERTIES
        public get Enemies(): Array<objects.Enemy> {
            return this._enemyPool;
        }

        // CONSTRUCTOR
        constructor() {
            this._buildEnemyPool();
        }

        // PRIVATE METHODS
        private _buildEnemyPool(): void {
            // create an empty container
            this._enemyPool = new Array<objects.Enemy>();

            for (let count = 0; count < Enemy.ENEMY_QUANTITY; count++) {
                let enemy = new objects.Enemy();
                this._enemyPool.push(enemy);
            }
        }

        // PUBLIC METHODS
        public AddEnemiesToScene(scene: objects.Scene) {
            this._enemyPool.forEach(enemy => {
                scene.addChild(enemy);
            });
        }

        public GetEnemy(): objects.Enemy {
            // remove the enemy from the front of the pool
            let enemy = this._enemyPool.shift();

            // Define the default values for the enemy
            enemy.isActive = true;

            // push the enemy to the back of the pool
            this._enemyPool.push(enemy);

            // return a reference to the active enemy
            return enemy;
        }

        public Update() {
            this._enemyPool.forEach(enemy => {
                enemy.Update();
            });
        }

        public GetMoviments(moviment: enums.MovimentTypes): Array<objects.EnemyMoviment> {
            let result: Array<objects.EnemyMoviment> = new Array<objects.EnemyMoviment>();

            switch (moviment) {
                case enums.MovimentTypes.TL_TO_BR:
                    result.push(new objects.EnemyMoviment(0, new objects.Vector2(-5, 4), 0));
                    result.push(new objects.EnemyMoviment(206));
                    break;

                case enums.MovimentTypes.BL_TO_TR:
                    result.push(new objects.EnemyMoviment(0, new objects.Vector2(-5, -4), 0));
                    result.push(new objects.EnemyMoviment(206));
                    break;
            }

            return result;
        }

        public CreateEnemies() {
            let type = util.Mathf.RandomRangeInt(0, enums.MovimentTypes.NUM_OF_MOVIMENTS - 1);
            let qty = util.Mathf.RandomRangeInt(4, 6);

            switch (type) {
                case enums.MovimentTypes.BL_TO_TR:
                case enums.MovimentTypes.TL_TO_BR:
                    let posX = util.Mathf.RandomRangeInt(config.Game.SCREEN_WIDTH - 125, config.Game.SCREEN_WIDTH + 25);
                    let posY1 = config.Game.SCREEN_HEIGHT + 20;
                    let posY2 = -20;
                    let delay = 0;

                    for (let iCt = 0; iCt < qty; iCt++) {
                        let enemy = this.GetEnemy();
                        let fireRate = iCt % 2 == 0 ? util.Mathf.RandomRangeInt(40, 60) : 0;
                        enemy.ActivateEnemy(enums.MovimentTypes.BL_TO_TR, posX, posY1, fireRate, delay);

                        enemy = this.GetEnemy();
                        fireRate = iCt % 2 == 1 ? util.Mathf.RandomRangeInt(40, 60) : 0;
                        enemy.ActivateEnemy(enums.MovimentTypes.TL_TO_BR, posX, posY2, fireRate, delay);

                        delay += 10;
                    }
                    break;
            }
        }
    }
}

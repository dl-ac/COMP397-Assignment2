/*
 * File: objects/Enemy.ts
 * Author: Ailton De Lima - 301018951
 * Description: Controls a single enemy according to pre-defined moviments
 *
 * Created: 2020-04-06
 */
module objects {
    export class Enemy extends GameObject {
        // PRIVATE INSTANCE MEMBERS
        private _engineSound: createjs.AbstractSoundInstance;
        private _bulletSpawn: objects.Vector2;
        private _enemyTicks: number;
        private _fireRate: number;
        private _moviments: Array<objects.EnemyMovement>;
        private _currentMoviment: objects.EnemyMovement;
        private _delayStart: number;

        // PUBLIC PROPERTIES
        public get engineSound(): createjs.AbstractSoundInstance {
            return this._engineSound;
        }

        // CONSTRUCTOR
        constructor() {
            super(config.Game.TEXTURE_ATLAS, "enemy", 0, 0, true);

            this.Start();
        }

        // PRIVATE METHODS
        protected _checkBounds(): void {
            this._bulletSpawn = new Vector2(this.position.x - this.halfWidth, this.position.y);
        }

        private _move(): void {
            // Move if there is any moviment and update the bullet spawn point
            this.position = Vector2.add(this.position, this.velocity);
        }

        // PUBLIC METHODS
        public Start(): void {
            this.type = enums.GameObjectType.ENEMY;

            // Sets the initial velocity
            this.velocity = new objects.Vector2(-5, 0);

            // Sets the initial boss position
            let initialPosX = config.Game.SCREEN_WIDTH + this.width;
            let initialPosY = util.Mathf.RandomRange(
                config.Game.GAMEBAR_HEIGHT + this.halfHeight,
                config.Game.SCREEN_HEIGHT - this.halfHeight
            );
            this.position = new objects.Vector2(initialPosX, initialPosY);

            // Sets the place where bullets will be fired
            this._bulletSpawn = new Vector2(this.position.x - this.halfWidth, this.position.y - 36);
            this._enemyTicks = 0;
            this._fireRate = 0;
            this._delayStart = 0;
        }

        public Update(): void {
            if (this.isActive) {
                this._enemyTicks++;
                if (this._delayStart > 0) {
                    if (this._enemyTicks >= this._delayStart) {
                        this._delayStart = 0;
                        this._enemyTicks = 0;
                    }
                    return;
                }
                this._move();
                this._checkBounds();

                this.rotation += this._currentMoviment.Rotation;

                if (this._enemyTicks > this._currentMoviment.Tick) {
                    if (this._moviments.length > 0) {
                        this._currentMoviment = this._moviments.shift();
                        this.velocity = this._currentMoviment.Velocity;
                    } else {
                        this.Reset();
                    }
                }

                if (this._fireRate > 0 && this._enemyTicks % this._fireRate == 0) {
                    this.FireBullets();
                }
            }
        }

        public Reset(): void {
            this.isActive = false;
            this.position = new Vector2(-1500, -1500);
            this.velocity = Vector2.zero();
        }

        public FireBullets(): void {
            let velX = util.Mathf.RandomRangeInt(-15, -12);
            let velY = util.Mathf.RandomRangeInt(-3, 3);

            // First bullet
            let bullet = config.Game.BULLET_MANAGER.GetEnemyBullet("enemyBullet", velX, velY);
            bullet.position = this._bulletSpawn;
        }

        public ActivateEnemy(
            moviment: enums.MovimentTypes,
            posX: number,
            posY: number,
            fireRate: number,
            delayStart: number
        ): void {
            this._moviments = config.Game.ENEMY_MANAGER.GetMoviments(moviment);
            this._currentMoviment = this._moviments.shift();

            if (this._currentMoviment.Tick == 0) {
                this.velocity = this._currentMoviment.Velocity;
                this.rotation = this._currentMoviment.Rotation;
                this._currentMoviment = this._moviments.shift();
            }

            this.position = new Vector2(posX, posY);
            this._fireRate = fireRate;
            this._enemyTicks = 0;
            this._delayStart = delayStart;
            this.isActive = true;
        }
    }
}

module objects {
    export class Boss extends GameObject {
        // Local constants
        private static BOSS_POS_X: number = config.Game.SCREEN_WIDTH - 70;
        private static UPPER_BOUND: number = 203;
        private static LOWER_BOUND: number = 350;

        // PRIVATE INSTANCE MEMBERS
        private _engineSound: createjs.AbstractSoundInstance;
        private _missileSpawn: objects.Vector2;
        private _bulletSpawn1: objects.Vector2;
        private _bulletSpawn2: objects.Vector2;
        private _bossAppearing: boolean;
        private _bossTicks: number;
        private _fireMissileStatus: number;
        private _bossMissile: objects.Bullet;

        // PUBLIC PROPERTIES
        public get engineSound(): createjs.AbstractSoundInstance {
            return this._engineSound;
        }

        // CONSTRUCTOR
        constructor() {
            super(config.Game.TEXTURE_ATLAS, "bossFlight", 0, 0, true);

            this.Start();
        }

        // PRIVATE METHODS
        protected _checkBounds(): void {
            // axis X
            if (this.position.x < Boss.BOSS_POS_X) {
                this.position = new Vector2(Boss.BOSS_POS_X, this.position.y);
                this._setRandomVelocity();
                this._bossAppearing = false;
            }

            // axis Y
            if (this.position.y <= this.halfHeight + config.Game.GAMEBAR_HEIGHT) {
                this.position = new Vector2(this.position.x, this.halfHeight + config.Game.GAMEBAR_HEIGHT);
            } else if (this.position.y >= config.Game.SCREEN_HEIGHT - this.halfHeight) {
                this.position = new Vector2(this.position.x, config.Game.SCREEN_HEIGHT - this.halfHeight);
            }

            this._missileSpawn = new Vector2(Boss.BOSS_POS_X - 78, this.position.y - 8);
            this._bulletSpawn1 = new Vector2(Boss.BOSS_POS_X - 100, this.position.y - 35);
            this._bulletSpawn2 = new Vector2(Boss.BOSS_POS_X - 100, this.position.y + 26);
        }

        private _move(): void {
            // Move if there is any moviment and update the bullet spawn point
            this.position = Vector2.add(this.position, this.velocity);
        }

        private _checkVelocity(): void {
            // Every second, change the velocity when the boss is not launching the missile
            if (this._bossTicks % 5 == 0 && this._fireMissileStatus <= 0) {
                this._setRandomVelocity();
            }
        }

        private _setRandomVelocity(): void {
            let velY = util.Mathf.RandomRangeInt(1, 3);

            // If the boss is the lower bound, it should go up, so change the direction
            if (this.position.y >= Boss.LOWER_BOUND) {
                velY *= -1;
            } else if (this.position.y <= Boss.UPPER_BOUND) {
                // Otherwise, if boss is in the middle (lesser than lower bound, but bellow the upper bound)
                // Random choose the direction
                if (util.Mathf.RandomRangeInt(0, 1) == 0) {
                    velY *= -1;
                }
            }
            this.velocity = new objects.Vector2(0, velY);
        }

        private _checkAttack(): void {
            // Every 15s (5 ticks * 15), throw a missile
            if (this._bossTicks % 75 == 0) {
                this._fireMissileStatus = 0;
            }

            // Check the current animation
            switch (this.currentAnimation) {
                case "bossFlight":
                    if (this._fireMissileStatus == 0) {
                        this.gotoAndPlay("bossAttack2Begin");
                    } else if (this._bossTicks % 20 == 0) {
                        // Fire each 4s (5 ticks * 4), if not throwing a rocket
                        this.gotoAndPlay("bossAttack1");
                    }
                    break;

                case "bossAttack2Begin":
                    if (this._fireMissileStatus == 0) {
                        config.Game.SOUND_MANAGER.PlaySound("bossMissile", 0.05);
                        this._fireMissileStatus = 1;
                    }
                    break;

                case "bossAttack2Mid":
                    if (this._fireMissileStatus == 1) {
                        this.FireRocket();
                        this._fireMissileStatus = 2;
                    }
                    break;

                case "bossAttack2End":
                    this._bossMissile.velocity = new Vector2(-25, 0);
                    this._fireMissileStatus = -1;
                    break;

                case "bossAttack1":
                    this.FireBullets();
                    break;
            }
        }

        // PUBLIC METHODS
        public Start(): void {
            this.type = enums.GameObjectType.BOSS;
            this.Reset();
        }

        public Update(): void {
            this._move();
            this._checkBounds();

            if (!this._bossAppearing) {
                if (createjs.Ticker.getTicks() % 12 == 0) {
                    this._bossTicks++;
                    this._checkVelocity();
                    this._checkAttack();
                }
            }
        }

        public Reset(): void {
            // Sets the initial boss position
            let initialPosX = config.Game.SCREEN_WIDTH + this.width;
            let initialPosY = util.Mathf.RandomRange(
                config.Game.GAMEBAR_HEIGHT + this.halfHeight,
                config.Game.SCREEN_HEIGHT - this.halfHeight
            );
            this.position = new objects.Vector2(initialPosX, initialPosY);

            // Sets the place where bullets will be fired
            this._missileSpawn = new Vector2(Boss.BOSS_POS_X - 78, this.position.y - 8);
            this._bulletSpawn1 = new Vector2(Boss.BOSS_POS_X - 9, this.position.y - 36);
            this._bulletSpawn2 = new Vector2(Boss.BOSS_POS_X - 9, this.position.y + 26);
            this._bossAppearing = true;
            this._bossTicks = 0;
            this._fireMissileStatus = -1;
            this.isActive = false;
        }

        public FireBullets(): void {
            // First bullet
            let bullet = config.Game.BULLET_MANAGER.GetEnemyBullet("bossBullet", -14, 0);
            bullet.position = this._bulletSpawn1;

            // Second bullet
            bullet = config.Game.BULLET_MANAGER.GetEnemyBullet("bossBullet", -14, 0);
            bullet.position = this._bulletSpawn2;

            config.Game.SOUND_MANAGER.PlaySound("bossBullet", 0.01);
        }

        public FireRocket(): void {
            this._bossMissile = config.Game.BULLET_MANAGER.GetEnemyBullet("bossMissile", 0, 0);
            this._bossMissile.position = this._missileSpawn;
            this.velocity = Vector2.zero(); // Stop the boss moviment to fire the missile
        }

        public MakeActive(): void {
            // Play the sound of boss appearing in the screen
            // this._engineSound = createjs.Sound.play("engine");
            // this._engineSound.volume = 0.1; // 10% volume

            // Sets the initial velocity
            this.velocity = new objects.Vector2(-5, 0);
            this.isActive = true;
        }
    }
}

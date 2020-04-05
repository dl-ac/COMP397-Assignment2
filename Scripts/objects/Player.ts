module objects {
    export class Player extends GameObject {
        // PRIVATE INSTANCE MEMBERS
        private _engineSound: createjs.AbstractSoundInstance;
        private _bulletSpawn: objects.Vector2;
        private _horizontalSpeed: number;
        private _verticalSpeed: number;

        // PUBLIC PROPERTIES
        public get engineSound(): createjs.AbstractSoundInstance {
            return this._engineSound;
        }

        // CONSTRUCTOR
        constructor() {
            super(config.Game.TEXTURE_ATLAS, "planeFull", 0, 0, true);

            this.Start();
        }

        // PRIVATE METHODS
        protected _checkBounds(): void {
            // axis X
            if (this.position.x <= this.halfWidth) {
                this.position = new Vector2(this.halfWidth, this.position.y);
            } else if (this.position.x >= config.Game.SCREEN_WIDTH * 0.5 - this.halfWidth) {
                this.position = new Vector2(config.Game.SCREEN_WIDTH * 0.5 - this.halfWidth, this.position.y);
            }

            // axis Y
            if (this.position.y <= this.halfHeight + 36) {
                this.position = new Vector2(this.position.x, this.halfHeight + 36);
            } else if (this.position.y >= config.Game.SCREEN_HEIGHT - this.halfHeight) {
                this.position = new Vector2(this.position.x, config.Game.SCREEN_HEIGHT - this.halfHeight);
            }
        }

        private _move(): void {
            let velX: number = 0;
            let velY: number = 0;

            // Verify the X axis
            if (config.Game.KEYBOARD_MANAGER.MoveLeft) {
                velX -= this._horizontalSpeed;
            }
            if (config.Game.KEYBOARD_MANAGER.MoveRight) {
                velX += this._horizontalSpeed;
            }

            // Verify the Y axis
            if (config.Game.KEYBOARD_MANAGER.MoveUp) {
                velY -= this._verticalSpeed;
            }
            if (config.Game.KEYBOARD_MANAGER.MoveDown) {
                velY += this._verticalSpeed;
            }

            // Move if there is any moviment and update the bullet spawn point
            if (velX != 0 || velY != 0) {
                this.position = Vector2.add(this.position, new Vector2(velX, velY));
                this._bulletSpawn = new Vector2(this.position.x + this.halfWidth, this.position.y + 4);
            }
        }

        // PUBLIC METHODS
        public Start(): void {
            this.type = enums.GameObjectType.PLAYER;
            // this._engineSound = createjs.Sound.play("engine");
            // this._engineSound.loop = -1; // loop forever
            // this._engineSound.volume = 0.1; // 10% volume
            this._horizontalSpeed = 8;
            this._verticalSpeed = 10;
            let initialPosX = this.halfWidth + 10;
            let initialPosY = config.Game.SCREEN_HEIGHT * 0.5;
            this.position = new objects.Vector2(initialPosX, initialPosY);
            this._bulletSpawn = new Vector2(this.position.x + this.halfWidth, this.position.y + 4);
        }

        public Update(): void {
            this._move();
            this._checkBounds();

            // fire bullets every 10 frames
            if (createjs.Ticker.getTicks() % 8 == 0) {
                if (config.Game.KEYBOARD_MANAGER.Fire) {
                    this.FireBullets();
                }
            }
        }

        public Reset(): void {}

        public FireBullets(): void {
            let bullet = config.Game.BULLET_MANAGER.GetBullet();
            bullet.position = this._bulletSpawn;
        }
    }
}

module objects {
    export class Bullet extends objects.GameObject {
        // PRIVATE INSTANCE MEMBERS
        private _horizontalSpeed?: number;
        private _verticalSpeed?: number;

        // PUBLIC PROPERTIES

        // CONSTRUCTOR
        constructor() {
            super(config.Game.TEXTURE_ATLAS, "playerBullet", new Vector2(), true);

            this.Start();
        }

        // PRIVATE METHODS
        protected _checkBounds(): void {
            // check X axis
            if (this.position.x <= -this.width || this.position.x >= config.Game.SCREEN_WIDTH + this.width) {
                this.Reset();
            }

            // check Y axis
            if (this.position.y <= -this.height || this.position.y >= config.Game.SCREEN_HEIGHT + this.height) {
                this.Reset();
            }
        }

        private _move(): void {
            this.position = Vector2.add(this.position, this.velocity);
        }

        // PUBLIC METHODS
        public Start(): void {
            this.type = enums.GameObjectType.PLAYER_BULLET;
            this._horizontalSpeed = 12; // 12 px per frame by deftaul
            this._verticalSpeed = 0; // no vertical speed by default
            this.velocity = new Vector2(this._horizontalSpeed, this._verticalSpeed);
            this.Reset();
        }

        public Update(): void {
            if (this.isActive) {
                this._move();
                this._checkBounds();
            }
        }

        public Reset(): void {
            this.position = new objects.Vector2(-1000, -1000);
            this.isActive = false;
        }
    }
}

module objects {
    export class Background extends GameObject {
        // PRIVATE INSTANCE MEMBERS
        private _startPosition: Vector2;
        private _loop: boolean;

        // PUBLIC PROPERTIES

        // CONSTRUCTOR
        constructor(isMenu: boolean) {
            super(config.Game.BACKGROUND_ATLAS, isMenu ? "menu" : "play");

            if (isMenu) {
                this.velocity = Vector2.zero();
            } else {
                this.velocity = new Vector2(-0.05, 0);
            }
            this.position = Vector2.zero();

            this.Start();
        }

        // PRIVATE METHODS

        protected _checkBounds(): void {
            if (this.x <= -(this.width - config.Game.SCREEN_WIDTH)) {
                if (this._loop) {
                    this.Reset();
                } else {
                    this.velocity = Vector2.zero();
                }
            }
        }

        private _move(): void {
            this.position = Vector2.add(this.position, this.velocity);
        }

        // PUBLIC METHODS
        public Start(): void {
            this.type = enums.GameObjectType.BACKGROUND;
            this.Reset();
        }

        public Update(): void {
            if (this.velocity.x != 0 || this.velocity.y != 0) {
                this._move();
                this._checkBounds();
            }
        }

        public Reset(): void {}
    }
}

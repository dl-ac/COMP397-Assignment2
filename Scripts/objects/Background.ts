module objects {
    export class Background extends GameObject {
        // PRIVATE INSTANCE MEMBERS
        private _verticalSpeed?: number;
        private _loop: boolean;

        // PUBLIC PROPERTIES

        // CONSTRUCTOR
        constructor(backgroundName: string, verticalSpeed: number = 0, loop: boolean = false) {
            super(config.Game.BACKGROUND_ATLAS, backgroundName);

            this._verticalSpeed = verticalSpeed;
            this._loop = loop;

            this.Start();
        }

        // PRIVATE METHODS

        protected _checkBounds(): void {
            if (this.y >= 0) {
                if (this._loop) {
                    this.Reset();
                } else {
                    this._verticalSpeed = 0;
                    this.velocity = new Vector2(0, 0);
                }
            }
        }

        private _move(): void {
            this.position = Vector2.add(this.position, this.velocity);
        }

        // PUBLIC METHODS
        public Start(): void {
            this.type = enums.GameObjectType.BACKGROUND;
            this.velocity = new Vector2(0, this._verticalSpeed);
            this.Reset();
        }

        public Update(): void {
            if (this._verticalSpeed > 0) {
                this._move();
                this._checkBounds();
            }
        }

        public Reset(): void {
            this.position = new Vector2(0, 0);
        }
    }
}

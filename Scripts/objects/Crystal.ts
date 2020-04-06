module objects {
    export class Crystal extends GameObject {
        // PRIVATE INSTANCE MEMBERS
        private _horizontalSpeed?: number;

        // PUBLIC PROPERTIES

        // CONSTRUCTOR
        constructor() {
            super(config.Game.TEXTURE_ATLAS, "crystal", new Vector2(), true);

            this.Start();
        }

        // PRIVATE METHODS

        protected _checkBounds(): void {
            if (this.x < -this.width) {
                this.Reset();
            }
        }

        private _move(): void {
            this.position = Vector2.add(this.position, this.velocity);
        }

        // PUBLIC METHODS
        public Start(): void {
            this.type = enums.GameObjectType.CRYSTAL;
            this._horizontalSpeed = -5; // 5 px per frame
            this.velocity = new Vector2(this._horizontalSpeed, 0);
            this.Reset();
        }

        public Update(): void {
            if (this.isActive) {
                this._move();
                this._checkBounds();
            }
        }

        public Reset(): void {
            this.position = new Vector2(-2000, -2000);
            this.isActive = false;
        }
    }
}

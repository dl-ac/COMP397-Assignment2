/*
 * File: objects/Button.ts
 * Author: Ailton De Lima - 301018951
 * Description: All the buttons from game. Fades 30% when a mouseover a button
 *
 * Created: 2020-04-06
 */
module objects {
    export class Button extends GameObject {
        // constructor
        constructor(button_name: string = "button", x: number = 0, y: number = 0, isCentered: boolean = false) {
            super(config.Game.TEXTURE_ATLAS, button_name, x, y, isCentered);

            this.on("mouseover", this.MouseOver);
            this.on("mouseout", this.MouseOut);

            this.Start();
        }

        // PRIVATE METHODS
        protected _checkBounds(): void {}

        // PUBLIC METHODS
        MouseOver(): void {
            this.alpha = 0.7;
        }

        MouseOut(): void {
            this.alpha = 1.0;
        }

        /**
         * This function is used for initialization
         *
         * @memberof Button
         */
        public Start(): void {
            this.type = enums.GameObjectType.BUTTON;
        }

        public Update(): void {}

        public Reset(): void {}
    }
}

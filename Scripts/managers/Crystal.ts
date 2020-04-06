/*
 * File: managers/Crystal.ts
 * Author: Ailton De Lima - 301018951
 * Description: Manager for crystals, creates a pool and control the utilization during the play
 *
 * Created: 2020-04-06
 */
module managers {
    export class Crystal {
        // Constants
        private static CRYSTAL_QUANTITY: number = 50;

        // PRIVATE INSTANCE MEMBERS
        private _crystalPool: Array<objects.Crystal>;

        // PUBLIC PROPERTIES
        public get Crystals(): Array<objects.Crystal> {
            return this._crystalPool;
        }

        // CONSTRUCTOR
        constructor() {
            this._buildcrystalPool();
        }

        // PRIVATE METHODS
        private _buildcrystalPool(): void {
            // create an empty container
            this._crystalPool = new Array<objects.Crystal>();

            for (let count = 0; count < Crystal.CRYSTAL_QUANTITY; count++) {
                let crystal = new objects.Crystal();
                this._crystalPool.push(crystal);
            }
        }

        // PUBLIC METHODS
        public AddCrystalsToScene(scene: objects.Scene) {
            this._crystalPool.forEach(crystal => {
                scene.addChild(crystal);
            });
        }

        public GetCrystal(): objects.Crystal {
            // remove the crystal from the front of the pool
            let crystal = this._crystalPool.shift();

            // Define the default values for the crystal
            crystal.isActive = true;

            // push the crystal to the back of the pool
            this._crystalPool.push(crystal);

            // return a reference to the active crystal
            return crystal;
        }

        public Update() {
            this._crystalPool.forEach(crystal => {
                crystal.Update();
            });
        }
    }
}

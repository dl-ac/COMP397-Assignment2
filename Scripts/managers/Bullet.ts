/*
 * File: managers/Bullet.ts
 * Author: Ailton De Lima - 301018951
 * Description: Manager for bullets, creates a pool and control the utilization during the play
 *
 * Created: 2020-04-06
 */
module managers {
    const BULLET_PLAYER_SPEED: number = 12;

    export class Bullet {
        // PRIVATE INSTANCE MEMBERS
        private _bulletNumber: number;
        private _bulletPool: Array<objects.Bullet>;

        // PUBLIC PROPERTIES
        public get Bullets(): Array<objects.Bullet> {
            return this._bulletPool;
        }

        // CONSTRUCTOR
        constructor() {
            this._buildBulletPool();
        }

        // PRIVATE METHODS
        private _buildBulletPool(): void {
            // initialize bullet number
            this._bulletNumber = 100;

            // create an empty container
            this._bulletPool = new Array<objects.Bullet>();

            for (let count = 0; count < this._bulletNumber; count++) {
                let bullet = new objects.Bullet();
                this._bulletPool.push(bullet);
            }
        }

        private _getBullet(spriteName: string, type: enums.GameObjectType, velocity: objects.Vector2): objects.Bullet {
            // remove the bullet from the front of the pool
            let bullet = this._bulletPool.shift();

            // Define the default values for the player bullet
            bullet.gotoAndPlay(spriteName);
            bullet.type = type;
            bullet.velocity = velocity;

            bullet.isActive = true;

            // push the bullet to the back of the pool
            this._bulletPool.push(bullet);

            // return a reference to the active bullet
            return bullet;
        }

        // PUBLIC METHODS
        public AddBulletsToScene(scene: objects.Scene) {
            this._bulletPool.forEach(bullet => {
                scene.addChild(bullet);
            });
        }

        public GetPlayerBullet(): objects.Bullet {
            return this._getBullet(
                "playerBullet",
                enums.GameObjectType.PLAYER_BULLET,
                new objects.Vector2(BULLET_PLAYER_SPEED, 0)
            );
        }

        public GetEnemyBullet(spriteName: string, speedX: number, speedY: number): objects.Bullet {
            return this._getBullet(spriteName, enums.GameObjectType.ENEMY_BULLET, new objects.Vector2(speedX, speedY));
        }

        public Update() {
            this._bulletPool.forEach(bullet => {
                bullet.Update();
            });
        }
    }
}

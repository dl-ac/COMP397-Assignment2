/*
 * File: objects/EnemyMovement.ts
 * Author: Ailton De Lima - 301018951
 * Description: POJO class of the enemy movement
 *
 * Created: 2020-04-06
 */
module objects {
    export class EnemyMovement {
        // PRIVATE INSTANCE MEMBERS
        private _tick: number;
        private _velocity: Vector2;
        private _rotation: number;

        // PUBLIC PROPERTIES
        public get Tick(): number {
            return this._tick;
        }

        public get Velocity(): Vector2 {
            return this._velocity;
        }

        public get Rotation(): number {
            return this._rotation;
        }

        // CONSTRUCTORS
        constructor(tick: number, velocity: Vector2 = Vector2.zero(), rotation: number = 0) {
            this._tick = tick;
            this._velocity = velocity;
            this._rotation = rotation;
        }
    }
}

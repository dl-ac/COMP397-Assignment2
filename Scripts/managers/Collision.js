"use strict";
var managers;
(function (managers) {
    var Collision = /** @class */ (function () {
        function Collision() {
        }
        Collision.squaredRadiusCheck = function (object1, object2) {
            // squared radius check
            var radii = object1.halfHeight + object2.halfHeight;
            if (objects.Vector2.sqrDistance(object1.position, object2.position) < radii * radii) {
                if (!object2.isColliding) {
                    Collision._collisionResponse(object2);
                    object2.isColliding = true;
                    return true;
                }
            }
            else {
                object2.isColliding = false;
            }
            return false;
        };
        Collision.AABBCheck = function (object1, object2) {
            var object1Offset = !object1.isCentered
                ? new objects.Vector2(0, 0)
                : new objects.Vector2(object1.halfWidth, object1.halfHeight);
            var object2Offset = !object2.isCentered
                ? new objects.Vector2(0, 0)
                : new objects.Vector2(object2.halfWidth, object2.halfHeight);
            var object1TopLeft = new objects.Vector2(object1.position.x - object1Offset.x, object1.position.y - object1Offset.y);
            var object2TopLeft = new objects.Vector2(object2.position.x - object2Offset.x, object2.position.y - object2Offset.y);
            // AABB Collision Detection
            if (object1TopLeft.x < object2TopLeft.x + object2.width &&
                object1TopLeft.x + object1.width > object2TopLeft.x &&
                object1TopLeft.y < object2TopLeft.y + object2.height &&
                object1TopLeft.y + object1.height > object2TopLeft.y) {
                if (!object2.isColliding) {
                    Collision._collisionResponse(object2);
                    object2.isColliding = true;
                    return true;
                }
            }
            else {
                object2.isColliding = false;
            }
            return false;
        };
        /**
         * Helper method to assist with Collision Response
         *
         * @private
         * @static
         * @param {objects.GameObject} object2
         * @memberof Collision
         */
        Collision._collisionResponse = function (object2) {
            switch (object2.type) {
                // Player colliding with a Crystal
                case enums.GameObjectType.CRYSTAL:
                    var yaySound = createjs.Sound.play("yay");
                    yaySound.volume = 0.2;
                    config.Game.SCORE_BOARD.AddScore(config.Game.SCORE_CRYSTAL_VALUE);
                    break;
                // Bullet or enemy colliding with a player
                case enums.GameObjectType.PLAYER:
                    config.Game.SOUND_MANAGER.PlaySound("playerHit", 0.5);
                    config.Game.SCORE_BOARD.DamagePlayer();
                    // Check for the player lives
                    if (config.Game.SCORE_BOARD.PlayerLives <= 0) {
                        config.Game.SCENE_STATE = scenes.State.END;
                    }
                    break;
                // Player bullet colliding with a boss
                case enums.GameObjectType.BOSS:
                    config.Game.SOUND_MANAGER.PlaySound("bossHit", 0.1);
                    config.Game.SCORE_BOARD.DamageBoss();
                    // Check for the boss lives
                    if (config.Game.SCORE_BOARD.BossLives <= 0) {
                        config.Game.SCORE_BOARD.AddScore(config.Game.SCORE_BOSS_VALUE);
                        config.Game.SCENE_STATE = scenes.State.END;
                    }
                    break;
                // Player bullet colliding with a enemy
                case enums.GameObjectType.ENEMY:
                    config.Game.SOUND_MANAGER.PlaySound("enemyExplosion", 0.2);
                    object2.Reset();
                    config.Game.SCORE_BOARD.AddScore(config.Game.SCORE_ENEMY_VALUE);
                    break;
            }
        };
        return Collision;
    }());
    managers.Collision = Collision;
})(managers || (managers = {}));
//# sourceMappingURL=Collision.js.map
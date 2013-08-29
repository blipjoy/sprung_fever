game.Person = me.ObjectEntity.extend({
    "init" : function (x, y, settings) {
        this.parent(x, y, settings);

        // Physics
        this.setVelocity(6.0, 6.0);
        this.setFriction(0.5, 0.5);
        this.moving = false;

        // Animations
        var names = [];
        var dirs = [ "left", "right", "up", "down" ];
        for (var j = 0; j < 4; j++) {
            for (var i = 1; i <= 10; i++) {
                names.push(settings.name + "-" + dirs[j] + "-" + i + ".png");
            }
        }
        this.renderable = game.texture.createAnimationFromName(names);
        this.renderable.animationspeed = 48;

        // Define animation frames
        this.renderable.addAnimation("stand-left", [ 0 ]);
        this.renderable.addAnimation("left", [
            0, 1, 2, 3, 4, 5, 6, 7, 8, 9
        ]);
        this.renderable.addAnimation("stand-right", [ 10 ]);
        this.renderable.addAnimation("right", [
            10, 11, 12, 13, 14, 15, 16, 17, 18, 19
        ]);
        this.renderable.addAnimation("stand-up", [ 20 ]);
        this.renderable.addAnimation("up", [
            20, 21, 22, 23, 24, 25, 26, 27, 28, 29
        ]);
        this.renderable.addAnimation("stand-down", [ 30 ]);
        this.renderable.addAnimation("down", [
            30, 31, 32, 33, 34, 35, 36, 37, 38, 39
        ]);

        // Default Animation
        this.renderable.setCurrentAnimation("stand-down");
        this.direction = "down";

        // Set the renderable position to bottom center
        this.anchorPoint.set(0.5, 1.0);
    },

    "update" : function () {
        if (this.moving) {
            switch (this.direction) {
            case "left":
                if (!this.renderable.isCurrentAnimation("left"))
                    this.renderable.setCurrentAnimation("left");

                this.vel.x = -this.accel.x * me.timer.tick;
                break;

            case "right":
                if (!this.renderable.isCurrentAnimation("right"))
                    this.renderable.setCurrentAnimation("right");

                this.vel.x = this.accel.x * me.timer.tick;
                break;

            case "up":
                if (!this.renderable.isCurrentAnimation("up"))
                    this.renderable.setCurrentAnimation("up");

                this.vel.y = -this.accel.y * me.timer.tick;
                break;

            case "down":
                if (!this.renderable.isCurrentAnimation("down"))
                    this.renderable.setCurrentAnimation("down");

                this.vel.y = this.accel.y * me.timer.tick;
                break;
            }

            if (!this.sprinting) {
                this.vel.x /= 1.5;
                this.vel.y /= 1.5;

                this.renderable.current.animationspeed =
                    this.renderable.animationspeed;
            }
            else {
                this.renderable.current.animationspeed = 24;
            }
        }

        this.updateMovement();

        if (this.vel.y) {
            // Resort objects now that the Y-position has changed
            me.game.sort(game.sort);
        }

        if (this.vel.x || this.vel.y) {
            this.parent();
            return true;
        }

        if (!this.renderable.isCurrentAnimation("stand-" + this.direction)) {
            this.renderable.setCurrentAnimation("stand-" + this.direction);
            return true;
        }

        return false;
    }
});

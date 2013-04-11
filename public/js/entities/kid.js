game.Kid = me.ObjectEntity.extend({
    "init" : function (x, y, settings) {
        this.parent(x, y, settings);

        // Physics
        this.setVelocity(4, 4);
        this.setFriction(0.5, 0.5);

        // Animations
        this.renderable = game.texture.createAnimationFromName([
            "kid-left-1.png", "kid-left-2.png", "kid-left-3.png",
            "kid-left-4.png", "kid-left-5.png", "kid-left-6.png",
            "kid-left-7.png", "kid-left-8.png", "kid-left-9.png",
            "kid-left-10.png",
            "kid-right-1.png", "kid-right-2.png", "kid-right-3.png",
            "kid-right-4.png", "kid-right-5.png", "kid-right-6.png",
            "kid-right-7.png", "kid-right-8.png", "kid-right-9.png",
            "kid-right-10.png",
            "kid-up-1.png", "kid-up-2.png", "kid-up-3.png",
            "kid-up-4.png", "kid-up-5.png", "kid-up-6.png",
            "kid-up-7.png", "kid-up-8.png", "kid-up-9.png",
            "kid-up-10.png",
            "kid-down-1.png", "kid-down-2.png", "kid-down-3.png",
            "kid-down-4.png", "kid-down-5.png", "kid-down-6.png",
            "kid-down-7.png", "kid-down-8.png", "kid-down-9.png",
            "kid-down-10.png"
        ]);

        this.renderable.animationspeed = ~~(me.sys.fps / 30);
        
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

        me.game.viewport.follow(this, me.game.viewport.AXIS.BOTH);
    },

    "update" : function () {
        if (me.input.isKeyPressed("left")) {
            if (!this.renderable.isCurrentAnimation("left"))
                this.renderable.setCurrentAnimation("left");

            this.pos.y = Math.round(this.pos.y / 24) * 24;
            this.vel.x = -this.accel.x * me.timer.tick;
            this.direction = "left";
        }
        else if (me.input.isKeyPressed("right")) {
            if (!this.renderable.isCurrentAnimation("right"))
                this.renderable.setCurrentAnimation("right");

            this.pos.y = Math.round(this.pos.y / 24) * 24;
            this.vel.x = this.accel.x * me.timer.tick;
            this.direction = "right";
        }
        else if (me.input.isKeyPressed("up")) {
            if (!this.renderable.isCurrentAnimation("up"))
                this.renderable.setCurrentAnimation("up");

            this.pos.x = Math.round(this.pos.x / 24) * 24;
            this.vel.y = -this.accel.y * me.timer.tick;
            this.direction = "up";
        }
        else if (me.input.isKeyPressed("down")) {
            if (!this.renderable.isCurrentAnimation("down"))
                this.renderable.setCurrentAnimation("down");

            this.pos.x = Math.round(this.pos.x / 24) * 24;
            this.vel.y = this.accel.y * me.timer.tick;
            this.direction = "down";
        }

        this.updateMovement();

        if (this.vel.x || this.vel.y || this.renderable.isFlickering()) {
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

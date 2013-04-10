game.MainPlayer = me.ObjectEntity.extend({
    "init" : function (x, y, settings) {
        settings.image = "kid";
        settings.spritewidth = 48;
        settings.spriteheight = 72;

        this.parent(x, y, settings);

        this.updateColRect(8, 32, 40, 32);

        this.setVelocity(3, 3);
        this.setFriction(0.5, 0.5);

        me.game.viewport.follow(this, me.game.viewport.AXIS.BOTH);
    },

    "update" : function () {
        if (me.input.isKeyPressed("left")) {
            this.vel.x = -this.accel.x * me.timer.tick;
            this.flipX(true);
        }
        else if (me.input.isKeyPressed("right")) {
            this.vel.x = this.accel.x * me.timer.tick;
            this.flipX(false);
        }

        if (me.input.isKeyPressed("up")) {
            this.vel.y = -this.accel.y * me.timer.tick;
        }
        else if (me.input.isKeyPressed("down")) {
            this.vel.y = this.accel.y * me.timer.tick;
        }

        this.updateMovement();

        if (this.vel.x || this.vel.y || this.renderable.isFlickering()) {
            this.parent();
            return true;
        }

        return false;
    }
});

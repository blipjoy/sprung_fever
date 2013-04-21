game.Heart = me.SpriteObject.extend({
    "init" : function (x, y, step) {
        var heart = game.texture.atlas["heart.png"];

        this.parent(
            x,
            y,
            game.texture.texture,
            heart.frame.width,
            heart.frame.height
        );
        this.offset.setV(heart.frame.pos);
        if (heart.rotated) {
            this._sourceAngle = -(Math.PI / 2);
        }

        this.step = step;
    },

    "update" : function () {
        this.step++;

        var scale = 1.0 - (this.step * 0.01);
        this.resize(scale);
        if (scale < 0.2) {
            me.game.remove(this);
            return false;
        }

        this.pos.x += Math.sin(this.step * 0.08);
        this.pos.y--;

        this.angle = Math.sin((this.step + 1) * 0.08) * 0.2;

        return true;
    }
});

game.Sweat = me.ObjectEntity.extend({
    "init" : function (x, y) {
        this.parent(x, y, {
            "width" : 21,
            "height" : 15
        });

        this.renderable = game.texture.createAnimationFromName([
            "sweat-1.png", "sweat-2.png", "sweat-3.png", "sweat-4.png"
        ]);
        this.renderable.animationspeed = ~~(me.sys.fps / 10);

        // Define animation frames
        this.renderable.addAnimation("default", [ 0, 1, 2, 3 ]);
        this.renderable.setCurrentAnimation("default");

        this.vel.x = (Math.random() - 0.5) * 3;
        this.vel.y = -(Math.random() * 2);

        if (this.vel.x > 0) {
            this.renderable.flipX();
        }

        this.step = 0;
    },

    "update" : function () {
        this.step++;

        var scale = 1.0 - (this.step * 0.025);
        this.renderable.resize(scale);
        if (scale < 0.2) {
            me.game.remove(this);
            return false;
        }

        this.vel.y += 0.098;
        this.updateMovement();

        return this.renderable.update();
    }
});

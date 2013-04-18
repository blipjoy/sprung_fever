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

game.Overlay = me.Renderable.extend({
    "init" : function (image, alpha) {
        this.image = me.loader.getImage(image);

        this.parent(new me.Vector2d(), c.WIDTH, c.HEIGHT);

        this.alpha = (typeof(alpha) !== "undefined") ? alpha : 1;

        this.isPersistent = true;
        this.floating = true;
    },

    "update" : function () {
        return this.alpha !== 0;
    },

    "draw" : function (context) {
        if (this.alpha === 0)
            return;

        if (this.alpha !== 1) {
            var save = context.globalAlpha;
            context.globalAlpha = this.alpha;
        }

        context.drawImage(this.image, 0, 0);

        if (this.alpha !== 1)
            context.globalAlpha = save;
    }
});

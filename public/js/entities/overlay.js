game.Overlay = me.Renderable.extend({
    "init" : function (image) {
        this.image = me.loader.getImage(image);

        this.parent(new me.Vector2d(), c.WIDTH, c.HEIGHT);

        this.isPersistent = true;
        this.floating = true;
    },

    "draw" : function (context, color) {
        this.parent(context, color);
        context.drawImage(this.image, 0, 0, c.WIDTH, c.HEIGHT);
    }
});

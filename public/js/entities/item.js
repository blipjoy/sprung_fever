game.Item = me.CollectableEntity.extend({
    "init" : function (x, y, settings) {
        this.parent(x, y, settings);
        this.font = new me.Font("Verdana", 20, "#f0f", "center");
        this.font.bold();
    },

    "onCollision" : function (res, obj) {
        me.audio.play("collect");

        game.errands.set(this.name, true);

        this.parent(res, obj);
    },

    "draw" : function (context) {
        context.fillStyle = "#000";
        context.fillRect(this.pos.x, this.pos.y, this.width, this.height);
        this.font.draw(context, this.name, this.pos.x, this.pos.y);
    }
});

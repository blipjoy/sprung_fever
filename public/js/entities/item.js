game.ItemBase = me.CollectableEntity.extend({
    "init" : function (x, y, settings) {
        this.parent(x, y, settings);
        this.font = new me.Font("Verdana", 20, "#f0f", "center");
        this.font.bold();
    },

    "draw" : function (context) {
        context.fillStyle = "#000";
        context.fillRect(this.pos.x, this.pos.y, this.width, this.height);
        this.font.draw(context, this.name, this.pos.x, this.pos.y);
    }
});

game.Item = game.ItemBase.extend({
    "onCollision" : function (res, obj) {
        me.audio.play("collect", false, null, 0.3);

        game.errands.set(this.name, true);

        this.parent(res, obj);
    }
});

game.BadItem = game.ItemBase.extend({
    "onCollision" : function (res, obj) {
        me.audio.play("baditem", false, null, 0.3);

        game.kid.attentionDeficit = true;
        me.game.HUD.updateItemValue("attention", -128);

        this.parent(res, obj);
    }
})

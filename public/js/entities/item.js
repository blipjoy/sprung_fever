game.ItemBase = me.CollectableEntity.extend({
    "init" : function (x, y, settings) {
        this.shadow = game.texture.createSpriteFromName("shadow.png");

        this.renderable = game.texture.createSpriteFromName(
            (settings.image ? settings.image : settings.name) + ".png"
        );
        delete settings.image;
        settings.width = this.renderable.width;
        settings.height = this.renderable.height;

        this.shadow.pos.y += ~~(this.renderable.height * 0.666);
        this.shadow.pos.x -= this.shadow.hWidth - this.renderable.hWidth;

        this.parent(x, y, settings);

        this.step = 0;
        this.hPI = Math.PI / 2;
    },

    "update" : function () {
        this.step += 0.0324;
        return true;
    },

    "draw" : function (context) {
        var x = this.pos.x;
        var y = this.pos.y;
        var offset = (Math.sin(this.step) + this.hPI) * 8;

        context.translate(x, y);
        this.shadow.draw(context);
        context.translate(0, -offset);
        this.renderable.draw(context);
        context.translate(-x, -y + offset);
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

        game.player.attentionDeficit = true;
        var attention = game.playscreen.attention;
        attention.value -= attention.defaultvalue / 2;

        this.parent(res, obj);
    }
})

game.Door = me.ObjectEntity.extend({
    "init" : function (x, y, settings) {
        this.parent(x, y, settings);

        this.renderable = new me.SpriteObject(
            0, 0,
            me.loader.getImage("tileset"),
            48, 48
        );
        this.renderable.offset.x = 513;
        this.renderable.offset.y = 156;

        this.open = 0;
        this.which = settings.which;
    },

    "update" : function () {
        if ((this.pos.distance(game.kid.pos) / 48) < 2) {
            // Open the door
            if (this.open === 0) {
                this.open = 1;
                new me.Tween(this.renderable.pos)
                    .to({
                        "x" : ((this.which === "left") ? -48 : 48)
                    }, 500)
                    .onComplete((function () {
                        this.open = 2;
                    }).bind(this))
                    .easing(me.Tween.Easing.Sinusoidal.EaseOut)
                    .start();
            }
        }
        else if (this.open === 2) {
            // Close the door
            this.open = 1;
            new me.Tween(this.renderable.pos)
                .to({
                    "x" : 0
                }, 500)
                .onComplete((function () {
                    this.open = 0;
                }).bind(this))
                .easing(me.Tween.Easing.Sinusoidal.EaseOut)
                .start();
        }
    }
});

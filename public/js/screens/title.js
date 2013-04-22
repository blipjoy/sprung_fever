game.ScrollingImage = me.ImageLayer.extend({
    "init" : function (image, scrollX, scrollY) {
        this.scrollX = scrollX;
        this.scrollY = scrollY;

        this.parent(image, 0, 0, image, 1, 1);
    },

    "update" : function () {
        this.pos.x += this.scrollX;
        this.pos.y += this.scrollY;

        return true;
    }
});

game.TitleScreen = me.ScreenObject.extend({
    "init" : function () {
        this.parent(true);
        this.leaving = false;
        this.step = 0;
    },

    "onResetEvent" : function () {
        me.audio.playTrack("grocery", 0.5);

        this.font = new me.Font("Verdana", 32, "#5d4", "center");
        this.font.bold();

        var clouds = new game.ScrollingImage("clouds", 1, 0.3);
        var logo = new me.ImageLayer("logo", 0, 0, "logo", 2, 1);

        me.game.add(clouds, 1);
        me.game.add(logo, 2);

        me.game.viewport.fadeOut("#000", 250);
    },

    "update" : function () {
        if (!this.leaving && me.input.isKeyPressed("action")) {
            this.leaving = true;
            me.game.viewport.fadeIn("#000", 500, function () {
                me.state.change(me.state.PLAY);
            });
        }

        this.step++;

        return true;
    },

    "draw" : function (context) {
        if (((this.step / 20) & 3) !== 0) {
            var msg = (me.sys.isMobile ? "Tap" : "Press Enter") + " to Start";

            context.shadowBlur = 3;
            context.shadowColor = "#000";
            context.shadowOffsetX = 2;
            context.shadowOffsetY = 2;

            this.font.draw(
                context,
                msg,
                c.WIDTH / 2,
                c.HEIGHT - 120
            );

            context.shadowColor = "rgba(0,0,0,0)";
        }

        this.parent(context);
    }
});

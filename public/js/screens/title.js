game.ScrollingImage = me.ImageLayer.extend({
    "init" : function (image, scrollX, scrollY) {
        this.scrollX = scrollX;
        this.scrollY = scrollY;

        this.parent(image, 0, 0, image, 1, 1);
    },

    "update" : function () {
        this.pos.x = (this.pos.x + this.scrollX) % this.imagewidth;
        this.pos.y = (this.pos.y + this.scrollY) % this.imageheight;

        return true;
    }
});

game.Flower = me.Renderable.extend({
    "init" : function (x, y, size, loops, left) {
        this.parent(new me.Vector2d(x, y), 200, 200);
        this.loops = loops;
        this.size = size;
        this.swing = (size * loops) / 500;
        this.weight = (size * loops) / 400;
        this.image = me.loader.getImage("flower");

        this.rotate = Math.random() * Math.PI * 2;
        this.scale = size / 50;

        if (left) {
            this.size = -size;
            this.swing = -this.swing;
        }

        this.step = ~~(Math.random() * 40);
    },

    "update" : function () {
        this.step++;

        this.weight += Math.sin(this.step * 0.0513536) * 0.06;
        this.swing += Math.cos(this.step * 0.0612234) * 0.004;
        this.rotate += Math.cos(this.step * 0.0472234) * 0.007;

        return true;
    },

    "draw" : function (context) {
        var x = this.pos.x;
        var y = this.pos.y;
        var v = 0;
        var w = 0;
        var size = Math.abs(this.size);

        context.save();

        context.beginPath();
        context.moveTo(x, y);
        for (var i = 0; i < this.loops; i++) {
            y += this.weight * i;
            v = i * size * this.swing;
            w = this.weight * (i + 1);

            context.bezierCurveTo(
                x + this.size + v, y,
                x + this.size + v, y + size + this.weight,
                x + this.size / 2 + v, y + size
            );
            context.bezierCurveTo(
                x + v, y + size - this.weight,
                x + v, y - w,
                x + this.size + v, y
            );
        }
        context.lineCap = "round";
        context.strokeStyle = "#071";
        context.lineWidth = 6;
        context.stroke();
        context.strokeStyle = "#0a2";
        context.lineWidth = 3;
        context.stroke();

        context.translate( x + this.size + v, y);
        context.rotate(this.rotate);
        context.scale(this.scale, this.scale);
        context.drawImage(
            this.image,
            -this.image.width / 2,
            -this.image.height / 2
        );

        context.restore();
    }
});

game.TitleScreen = me.ScreenObject.extend({
    "init" : function () {
        this.parent(true);
        this.leaving = false;
        this.step = 0;
    },

    "onResetEvent" : function () {
        me.audio.playTrack("grocery", 0.75);

        this.font = new me.Font("Verdana", 32, "#5d4", "center");
        this.font.bold();

        var clouds = new game.ScrollingImage("clouds", 0.6, 0.3);
        var logo = new me.ImageLayer("logo", 0, 0, "logo", 2, 1);
        var flower1 = new game.Flower(650, 330, 50, 5, false);
        var flower2 = new game.Flower(200, 180, 35, 6, true);
        var flower3 = new game.Flower(380, 450, 43, 8, false);

        me.game.add(clouds, 1);
        me.game.add(logo, 2);
        me.game.add(flower1, 3);
        me.game.add(flower2, 3);
        me.game.add(flower3, 3);
        me.game.sort(game.sort);

        me.game.viewport.fadeOut("#000", 250);

        if (me.sys.isMobile) {
            var vp = me.game.viewport;
            me.input.registerPointerEvent("mousedown", vp, function () {
                me.input.triggerKeyEvent(me.input.KEY.ENTER, true);
            }, true);
            me.input.registerPointerEvent("mouseup", vp, function () {
                me.input.triggerKeyEvent(me.input.KEY.ENTER, false);
            }, true);
        }
    },

    "onDestroyEvent" : function () {
        if (me.sys.isMobile) {
            me.input.triggerKeyEvent(me.input.KEY.ENTER, false);
            var vp = me.game.viewport;
            me.input.releasePointerEvent("mousedown", vp);
            me.input.releasePointerEvent("mouseup", vp);
        }
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

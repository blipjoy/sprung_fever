game.HUD_Meter = me.HUD_Item.extend({
    "init" : function (name, x, y, val, bg, fg) {
        this.parent(x, y, val);

        this.bg = bg;
        this.fg = fg;

        // Cache image for item name
        var font = new me.Font("Verdana", 18, "#fff", "left");
        font.bold();
        var ctx = me.video.createCanvasSurface(100, 20);
        this.label = ctx.canvas;
        this.label.width = font.measureText(ctx, name + ":").width;
        this.label.height = 20;

        ctx.shadowBlur = 3;
        ctx.shadowColor = "#000";
        ctx.shadowOffsetX = 2;
        ctx.shadowOffsetY = 2;

        font.draw(ctx, name + ":", 0, 0);
    },

    "draw" : function (context) {
        var x = this.pos.x;
        var y = this.pos.y;

        context.save();

        // Draw border
        context.strokeStyle = context.fillStyle = "#004058";
        context.lineJoin = "round";
        context.lineWidth = 3;
        context.strokeRect(x + 0.5, y + 0.5, this.defaultvalue, 20);
        context.fillRect(x + 2, y + 2, this.defaultvalue, 17);

        // Setup clipping region for meter segments
        context.beginPath();
        for (var i = 0; i < this.defaultvalue; i += 16) {
            context.rect(x + 2 + i, y + 2, 13, 17);
        }
        context.clip();

        // Draw background color
        context.fillStyle = this.bg;
        context.fillRect(x + 2, y + 2, this.defaultvalue, 17);

        // Draw foreground color
        context.fillStyle = this.fg;
        context.fillRect(x + 2, y + 2, ~~this.value, 17);

        // Destroy clipping region
        context.restore();

        // Draw label
        context.drawImage(this.label, x, y - 24);
    }
});

game.Errands = me.Renderable.extend({
    "init" : function () {
        this.parent(new me.Vector2d(-360, 200), 0, 0);

        this.image = me.loader.getImage("note");

        this.items = {};
        me.game.currentLevel.items.forEach((function (item) {
            this.items[item] = false;
        }).bind(this));

        // Animation
        this.angle = -0.3;
        this.ratio = 16;

        this.floating = true;
        this.invalidated = true;

        this.complete = false;

        this.red = new me.Font("Verdana", 18, "#f30");
        this.red.bold();
        this.green = new me.Font("Verdana", 18, "#3f0");
        this.green.bold();

        // Animation! :D
        new me.Tween(this)
            .to({
                "angle" : 0
            }, 1000)
            .delay(500)
            .easing(me.Tween.Easing.Back.EaseOut)
            .start();

        new me.Tween(this.pos)
            .to({
                "x" : 150
            }, 1000)
            .delay(500)
            .easing(me.Tween.Easing.Back.EaseOut)
            .onComplete((function () {
                new me.Tween(this)
                    .to({
                        "ratio" : 3
                    }, 500)
                    .easing(me.Tween.Easing.Quartic.EaseIn)
                    .delay(1000)
                    .start();

                new me.Tween(this.pos)
                    .to({
                        "x" : 20,
                        "y" : 70
                    }, 500)
                    .delay(1000)
                    .start();
            }).bind(this))
            .start();
    },

    "set" : function (item, value) {
        if (item in this.items) {
            this.items[item] = (value === true);
            this.invalidated = true;

            this.complete = true;
            for (var item in this.items) {
                if (!this.items[item]) {
                    this.complete = false;
                    break;
                }
            }
        }
    },

    "update" : function () {
        var result = this.invalidated;
        this.invalidated = false;
        return result;
    },

    "draw" : function (context) {
        if (this.angle)
            context.rotate(this.angle);
        context.drawImage(
            this.image,
            0, 0,
            this.image.width, this.image.height,
            ~~(this.pos.x - this.ratio * 3),
            ~~(this.pos.y - this.ratio * 4),
            ~~(this.image.width * this.ratio),
            ~~(this.image.height * this.ratio)
        );

        context.shadowBlur = 3;
        context.shadowColor = "#000";
        context.shadowOffsetX = 2;
        context.shadowOffsetY = 2;

        var y = this.pos.y;
        for (item in this.items) {
            var font, check;
            if (this.items[item]) {
                font = this.green;
                check = "\u2611 ";
            }
            else {
                font = this.red;
                check = "\u2612 ";
            }
            font.draw(context, check + item, this.pos.x, y);
            y += font.height;
        }

        context.shadowColor = "rgba(0,0,0,0)";

        if (this.angle)
            context.rotate(-this.angle);
    }
});

game.HUD_Heart = me.SpriteObject.extend({
    "init" : function (x, y) {
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

        this.isPersistent = true;
        this.floating = true;

        // Animation!
        this.size = 1;
        this.minSize = 0.9
        this.rate = 1000;

        this.beat = function () {
            me.audio.play("heartbeat1", false, null, (800 - this.rate) / 800);

            new me.Tween(this)
                .to({
                    "size" : this.minSize
                }, this.rate / 5)
                .delay(this.rate)
                .easing(me.Tween.Easing.Bounce.EaseOut)
                .onUpdate((function () {
                    this.resize(this.size);
                }).bind(this))
                .onComplete((function () {
                    var volume = (800 - this.rate) / 800; // Don't cache
                    me.audio.play("heartbeat2", false, null, volume);

                    new me.Tween(this)
                        .to({
                            "size" : 1
                        }, this.rate / 5)
                        .easing(me.Tween.Easing.Back.EaseOut)
                        .onUpdate((function () {
                            this.resize(this.size);
                        }).bind(this))
                        .onComplete((function () {
                            this.beat();
                        }).bind(this))
                        .start();
                }).bind(this))
                .start();
        };

        me.event.subscribe(me.event.LEVEL_LOADED, this.beat.bind(this));
    },

    "onDestroyEvent" : function () {
        me.event.unsubscribe(me.event.LEVEL_LOADED, this.beat.bind(this));
    },

    "update" : function () {
        return true;
    }
});

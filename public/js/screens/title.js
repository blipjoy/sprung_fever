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
    "STATES" : {
        "IDLE"          : 0,
        "TRANSITION1"   : 1,
        "SELECT_SELF"   : 2,
        "TRANSITION2"   : 3,
        "SELECT_CRUSH"  : 4,
        "TRANSITION3"   : 5
    },

    "init" : function () {
        this.parent(true);
        this.leaving = false;
        this.step = 0;
        this.state = this.STATES.IDLE;
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

        me.input.bindKey(me.input.KEY.ENTER, "action", true);
        me.input.bindKey(me.input.KEY.LEFT,  "left",   true);
        me.input.bindKey(me.input.KEY.RIGHT, "right",  true);

        me.input.bindTouch(me.input.KEY.ENTER);
    },

    "onDestroyEvent" : function () {
        var gamemix = document.getElementById("gamemix");
        if (gamemix) {
            document.body.removeChild(gamemix);
        }

        me.input.unbindTouch();
    },

    "update" : function () {
        var self = this;
        function addClickable(name, x, y, callback) {
            var spr = game.PersonSprite(name);
            spr.alpha = 0;
            spr.resize(2);
            spr.setCurrentAnimation("down");
            spr.pos.set(x, y);
            me.game.add(spr, 5);

            // Tween sprite
            spr.tween = new me.Tween(spr)
                .to({
                    "alpha" : 1
                }, 250)
                .onComplete(callback || null)
                .start();

            // Make clickable
            me.input.registerPointerEvent("mousedown", spr, function () {
                self.choice = name;
            });

            return spr;
        }

        switch (this.state) {
        case this.STATES.IDLE:
            if (me.input.isKeyPressed("action")) {
                this.state++;

                this.choice = "kid";

                // Create a background
                var bg = new game.ColorLayer(
                    new me.Vector2d(0, 0),
                    c.WIDTH,
                    c.HEIGHT,
                    "select bg",
                    "rgba(0, 0, 0, 0)"
                );
                me.game.add(bg, 4);

                // Add clickable sprites
                this.boy = addClickable(
                    "kid",
                    c.WIDTH * 0.333 - 24,
                    c.HEIGHT * 0.4
                );
                this.girl = addClickable(
                    "redgirl",
                    c.WIDTH * 0.667 - 24,
                    c.HEIGHT * 0.4,
                    function () {
                        this.state++;
                    }.bind(this)
                );

                // Tween BG
                bg.alpha = 0;
                new me.Tween(bg)
                    .to({
                        "alpha" : 0.75
                    }, 250)
                    .onUpdate(function () {
                        bg.color = "rgba(0, 0, 0, " + bg.alpha + ")";
                    }.bind(this))
                    .start();
            }
            break;

        case this.STATES.SELECT_SELF:
            if (me.input.isKeyPressed("left")) {
                this.choice = "kid"
            }
            else if (me.input.isKeyPressed("right")) {
                this.choice = "redgirl"
            }

            if (me.input.isKeyPressed("action")) {
                this.state++;

                game.GENDERS.player = this.choice;
                this.choice = "redgirl";

                new me.Tween(this.boy)
                    .to({
                        "alpha" : 0
                    }, 250)
                    .chain(this.boy.tween)
                    .start();

                new me.Tween(this.girl)
                    .to({
                        "alpha" : 0
                    }, 250)
                    .chain(this.girl.tween)
                    .start();
            }
            break;

        case this.STATES.SELECT_CRUSH:
            if (me.input.isKeyPressed("left")) {
                this.choice = "kid"
            }
            else if (me.input.isKeyPressed("right")) {
                this.choice = "redgirl"
            }

            if (me.input.isKeyPressed("action")) {
                this.state++;

                game.GENDERS.crush1 = this.choice;
                game.GENDERS.crush2 = this.choice;

                me.game.viewport.fadeIn("#000", 500, function () {
                    me.state.change(me.state.PLAY);
                });
            }
            break;
        }

        this.step++;

        return true;
    },

    "draw" : function (context) {
        switch (this.state) {
        case this.STATES.IDLE:
            if (((this.step / 20) & 3) !== 0) {
                var msg = (me.device.isMobile ? "Tap" : "Press Enter") +
                    " to Start";

                context.shadowBlur = 3;
                context.shadowColor = "#000";
                context.shadowOffsetX = 2;
                context.shadowOffsetY = 2;

                this.font.draw(context, msg, c.WIDTH * 0.5, c.HEIGHT - 120);

                context.shadowColor = "rgba(0,0,0,0)";
            }
            break;

        case this.STATES.SELECT_SELF:
            context.shadowBlur = 3;
            context.shadowColor = "#000";
            context.shadowOffsetX = 2;
            context.shadowOffsetY = 2;

            this.font.draw(context, "I AM A ...", c.WIDTH * 0.5, 100);
            this.font.draw(context, "BOY", c.WIDTH * 0.333, c.HEIGHT * 0.6);
            this.font.draw(context, "GIRL", c.WIDTH * 0.667, c.HEIGHT * 0.6);

            if (!me.device.isMobile) {
                context.lineWidth = 3;
                context.strokeStyle = "#fff";
                context.strokeRect(
                    (this.choice === "kid" ? this.boy : this.girl).pos.x - 40,
                    this.boy.pos.y - 48,
                    128,
                    160
                );
            }

            context.shadowColor = "rgba(0,0,0,0)";
            break;

        case this.STATES.SELECT_CRUSH:
            context.shadowBlur = 3;
            context.shadowColor = "#000";
            context.shadowOffsetX = 2;
            context.shadowOffsetY = 2;

            this.font.draw(context, "AND I LIKE ...", c.WIDTH * 0.5, 100);
            this.font.draw(context, "BOYS", c.WIDTH * 0.333, c.HEIGHT * 0.6);
            this.font.draw(context, "GIRLS", c.WIDTH * 0.667, c.HEIGHT * 0.6);

            if (!me.device.isMobile) {
                context.lineWidth = 3;
                context.strokeStyle = "#fff";
                context.strokeRect(
                    (this.choice === "kid" ? this.boy : this.girl).pos.x - 40,
                    this.boy.pos.y - 48,
                    128,
                    160
                );
            }

            context.shadowColor = "rgba(0,0,0,0)";
            break;
        }

        this.parent(context);
    }
});

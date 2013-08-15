game.Kid = game.Person.extend({
    "init" : function (x, y, settings) {
        this.parent(x, y, settings);

        // Reference the kid from the global namespace
        game.kid = this;

        me.game.viewport.follow(this, me.game.viewport.AXIS.BOTH);

        this.step = 0;
    },

    "update" : function () {
        // Movement
        if (me.input.isKeyPressed("left")) {
            this.moving = true;
            this.direction = "left";
        }
        else if (me.input.isKeyPressed("right")) {
            this.moving = true;
            this.direction = "right";
        }
        else if (me.input.isKeyPressed("up")) {
            this.moving = true;
            this.direction = "up";
        }
        else if (me.input.isKeyPressed("down")) {
            this.moving = true;
            this.direction = "down";
        }
        else {
            this.moving = false;
        }

        // Sprinting
        var stamina = game.playscreen.stamina;
        this.sprinting = this.cansprint && me.input.isKeyPressed("sprint");
        if (this.sprinting && this.moving) {
            stamina.value -= 1;
            if (stamina.value <= 0) {
                this.cansprint = false;
            }
        }
        else {
            stamina.value += 0.5;
            if (stamina.value >= stamina.defaultvalue) {
                stamina.reset();
                this.cansprint = true;
            }
        }

        // Attention
        var attention = game.playscreen.attention;
        if (!this.attentionDeficit) {
            attention.value += 0.25;
            if (attention.value >= attention.defaultvalue)
                attention.reset();
            else if (attention.value > attention.defaultvalue / 2) {
                game.playscreen.bindKeys(false, false);
            }
            else if (attention.value > attention.defaultvalue / 4) {
                game.playscreen.bindKeys(true, false);
            }
        }
        else if (attention.value <= 0 &&
            !game.playscreen.restart) {
            // End game.
            game.playscreen.restart = true;
            me.game.viewport.fadeIn("#000", 500, function () {
                me.levelDirector.reloadLevel.defer();
            });
            return;
        }
        else {
            this.attentionDeficit = false;

            // "Nervous" effects
            if (attention.value < attention.defaultvalue / 8) {
                game.playscreen.bindKeys(true, true);
                me.game.viewport.shake(12, 50);
            }
            else if (attention.value < attention.defaultvalue / 4) {
                game.playscreen.bindKeys(true, false);
                me.game.viewport.shake(8, 50);
            }
            else if (attention.value < attention.defaultvalue / 2) {
                me.game.viewport.shake(4, 50);
            }

            // Emit a random heart
            if (!~~(Math.random() * attention.value * 0.2)) {
                me.game.add(me.entityPool.newInstanceOf("heart",
                    this.pos.x + (Math.random() - 0.5) * 15,
                    this.pos.y - (this.renderable.height - 10),
                    ~~(Math.random() * 60)
                ), this.z + 1);
                me.game.sort(game.sort);
            }
        }

        if (attention.value < attention.defaultvalue) {
            // Emit a random sweat drop
            if (!~~(Math.random() * attention.value * 0.3)) {
                me.audio.play("sweatdrop", false, null, 0.1);
                me.game.add(me.entityPool.newInstanceOf("sweat",
                    this.pos.x + (Math.random() - 0.5) * 15,
                    this.pos.y - (this.renderable.height - 20)
                ), this.z + 1);
                me.game.sort(game.sort);
            }
        }

        // HUD Heartbeat
        var attn = attention.value;
        var full_attn = attention.defaultvalue;
        var hAttn = full_attn / 2;
        game.playscreen.heart.rate = attn * 3 + 150;
        game.playscreen.heart.minSize = (0.2 / full_attn) * attn + 0.7;

        // Red overlay opacity
        game.playscreen.red.alpha = (attn < hAttn) ? (hAttn - attn) / hAttn : 0;

        var result = this.parent();
        me.game.collide(this, true);

        // Stepping sound effects
        if (this.moving && (this.vel.x || this.vel.y)) {
            if (this.step === 0) {
                me.audio.play(
                    "step" + (Math.round(Math.random()) + 1),
                    false,
                    null,
                    0.1
                );
            }

            this.step++;
            if (this.sprinting) {
                this.step++;
            }
            if (this.step >= 16) {
                this.step = 0;
            }
        }
        else {
            this.step = 0;
        }

        return result;
    }
});

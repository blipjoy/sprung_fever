game.Kid = game.Person.extend({
    "init" : function (x, y, settings) {
        this.parent(x, y, settings);

        // Reference the kid from the global namespace
        game.kid = this;

        me.game.viewport.follow(this, me.game.viewport.AXIS.BOTH);
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
        this.sprinting = this.cansprint && me.input.isKeyPressed("sprint");
        if (this.sprinting) {
            me.game.HUD.updateItemValue("stamina", -1);
            if (me.game.HUD.getItemValue("stamina") <= 0) {
                this.cansprint = false;
            }
        }
        else {
            me.game.HUD.updateItemValue("stamina", 0.5);
            if (me.game.HUD.getItemValue("stamina") >= 256) {
                me.game.HUD.reset("stamina");
                this.cansprint = true;
            }
        }

        // Attention
        var attn = 0;
        if (!this.attentionDeficit) {
            me.game.HUD.updateItemValue("attention", 0.25);
            attn = me.game.HUD.getItemValue("attention");
            if (attn >= 256)
                me.game.HUD.reset("attention");
            else if (attn > 128) {
                game.playscreen.bindKeys(false, false);
            }
            else if (attn > 64) {
                game.playscreen.bindKeys(true, false);
            }
        }
        else {
            this.attentionDeficit = false;

            // "Nervous" effects
            attn = me.game.HUD.getItemValue("attention");
            if (attn < 32) {
                game.playscreen.bindKeys(true, true);
                me.game.viewport.shake(12, 50);
            }
            else if (attn < 64) {
                game.playscreen.bindKeys(true, false);
                me.game.viewport.shake(8, 50);
            }
            else if (attn < 128) {
                me.game.viewport.shake(4, 50);
            }

            // Emit a random heart
            if (!~~(Math.random() * attn * 0.2)) {
                me.game.add(new game.Heart(
                    this.pos.x + (Math.random() - 0.5) * 15,
                    this.pos.y - (this.renderable.height - 10),
                    ~~(Math.random() * 60)
                ), this.z + 1);
                me.game.sort();
            }
        }

        if (attn < 256) {
            // Emit a random sweat drop
            if (!~~(Math.random() * attn * 0.3)) {
                me.game.add(new game.Sweat(
                    this.pos.x + (Math.random() - 0.5) * 15,
                    this.pos.y - (this.renderable.height - 20)
                ), this.z + 1);
                me.game.sort();
            }
        }

        // HUD Heartbeat
        game.playscreen.heart.rate = attn * 3 + 150;
        game.playscreen.heart.minSize = (0.2 / 256) * attn + 0.7;

        // Red overlay opacity
        game.playscreen.red.alpha = (attn < 128) ? (128 - attn) / 128 : 0;

        var result = this.parent();
        me.game.collide(this, true);
        return result;
    }
});

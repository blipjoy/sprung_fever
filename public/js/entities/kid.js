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
            if (me.game.HUD.getItemValue("stamina") >= 255) {
                me.game.HUD.reset("stamina");
                this.cansprint = true;
            }
        }

        // Attention
        if (!this.attentionDeficit) {
            me.game.HUD.updateItemValue("attention", 0.25);
            if (me.game.HUD.getItemValue("attention") >= 255)
                me.game.HUD.reset("attention");
        }
        else
            this.attentionDeficit = false;

        return this.parent();
    }
});

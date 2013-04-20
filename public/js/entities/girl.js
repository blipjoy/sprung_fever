game.Girl = game.Person.extend({
    "timeout" : 0,

    "update" : function () {
        if (!this.moving && ~~(Math.random() * 100) == 0) {
            // Choose a random direction, and start moving!
            this.moving = true;
            this.direction = [
                "left",
                "right",
                "up",
                "down"
            ][~~(Math.random() * 4)];

            // And stop moving up to 3 seconds later
            this.timeout = setTimeout((function () {
                this.moving = false;
                this.timeout = 0;
            }).bind(this), Math.random() * 3000);
        }

        // AoE
        if ((this.pos.distance(game.kid.pos) / 48) < 3) {
            game.kid.attentionDeficit = true;

            me.game.HUD.updateItemValue("attention", -0.5);
            if (me.game.HUD.getItemValue("attention") <= 0 &&
                !game.playscreen.ending) {
                // End game.
                game.playscreen.ending = true;
                me.state.change(me.state.MENU);
            }
        }

        return this.parent();
    },

    "destroy" : function () {
        if (this.timeout)
            clearTimeout(this.timeout);

        this.parent();
    }
});

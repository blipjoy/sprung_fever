game.PlayScreen = me.ScreenObject.extend({
    "onResetEvent" : function () {
        // Bind keys
        me.input.bindKey(me.input.KEY.LEFT, "left");
        me.input.bindKey(me.input.KEY.RIGHT, "right");
        me.input.bindKey(me.input.KEY.UP, "up");
        me.input.bindKey(me.input.KEY.DOWN, "down");

        me.input.bindKey(me.input.KEY.A, "left");
        me.input.bindKey(me.input.KEY.D, "right");
        me.input.bindKey(me.input.KEY.W, "up");
        me.input.bindKey(me.input.KEY.S, "down");

        me.input.bindKey(me.input.KEY.SHIFT, "sprint");

        // Load level
        me.levelDirector.loadLevel("demo_map");

        // Create HUD.
        if (!me.game.HUD) {
            me.game.addHUD(0, 0, c.WIDTH, 50, "#000");

            me.game.HUD.addItem("attention", new game.HUD_Item(
                "Attention", 100, 15, 255
            ));

            me.game.HUD.addItem("stamina", new game.HUD_Item(
                "Stamina", c.WIDTH - 300, 15, 255
            ));
        }
    },

    "onDestroyEvent" : function () {
        // Unbind keys
        me.input.unbindKey(me.input.KEY.LEFT);
        me.input.unbindKey(me.input.KEY.RIGHT);
        me.input.unbindKey(me.input.KEY.UP);
        me.input.unbindKey(me.input.KEY.DOWN);

        me.input.unbindKey(me.input.KEY.A);
        me.input.unbindKey(me.input.KEY.D);
        me.input.unbindKey(me.input.KEY.W);
        me.input.unbindKey(me.input.KEY.S);

        me.input.unbindKey(me.input.KEY.SHIFT);

        // Reset HUD
        me.game.HUD.reset();
    }
});

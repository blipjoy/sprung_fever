game.PlayScreen = me.ScreenObject.extend({
    "onResetEvent" : function () {
        // Bind keys
        me.input.bindKey(me.input.KEY.LEFT, "left");
        me.input.bindKey(me.input.KEY.RIGHT, "right");
        me.input.bindKey(me.input.KEY.UP, "up");
        me.input.bindKey(me.input.KEY.DOWN, "down");

        // Load level
        me.levelDirector.loadLevel("demo_map");
    },

    "onDestroyEvent" : function () {
        // Unbind keys
        me.input.unbindKey(me.input.KEY.LEFT);
        me.input.unbindKey(me.input.KEY.RIGHT);
        me.input.unbindKey(me.input.KEY.UP);
        me.input.unbindKey(me.input.KEY.DOWN);
    }
});

game.PlayScreen = me.ScreenObject.extend({
    "onResetEvent" : function () {
        // Bind keys
        this.invertX = null;
        this.invertY = null;
        this.bindKeys(false, false);

        this.exit = false;
        this.restart = false;

        me.game.onLevelLoaded = this.onLevelLoaded.bind(this);

        // Create HUD
        me.game.addHUD(0, 0, c.WIDTH, 50, "#000");
        me.game.HUD.addItem("attention", new game.HUD_Item(
            "Attention", 100, 15, 255
        ));
        me.game.HUD.addItem("stamina", new game.HUD_Item(
            "Stamina", c.WIDTH - 300, 15, 255
        ));
        this.red = new game.Overlay("overlay-red", 0);
        me.game.add(this.red, Infinity);

        // Load level
        me.levelDirector.loadLevel("grocery");
    },

    "onLevelLoaded" : function (name) {
        // Reset HUD
        me.game.HUD.reset();
        this.red.alpha = 0;

        // Rebind keys
        this.invertX = null;
        this.invertY = null;
        this.bindKeys(false, false);

        if (!this.restart) {
            // Start music
            me.audio.stopTrack();
            me.audio.playTrack(name);
        }

        // Create errands list
        game.errands = new game.Errands();
        me.game.add(game.errands, 1000);
        me.game.sort();

        this.exit = false;
        this.restart = false;

        me.game.viewport.fadeOut("#000", 500);
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

        // Disable HUD
        me.game.disableHUD();
    },

    "bindKeys" : function (invertX, invertY) {
        if (this.invertX == invertX && this.invertY == invertY)
            return;

        this.invertX = invertX;
        this.invertY = invertY;

        if (invertX) {
            me.input.bindKey(me.input.KEY.LEFT, "right");
            me.input.bindKey(me.input.KEY.RIGHT, "left");
            me.input.bindKey(me.input.KEY.A, "right");
            me.input.bindKey(me.input.KEY.D, "left");
        }
        else {
            me.input.bindKey(me.input.KEY.LEFT, "left");
            me.input.bindKey(me.input.KEY.RIGHT, "right");
            me.input.bindKey(me.input.KEY.A, "left");
            me.input.bindKey(me.input.KEY.D, "right");
        }

        if (invertY) {
            me.input.bindKey(me.input.KEY.UP, "down");
            me.input.bindKey(me.input.KEY.DOWN, "up");
            me.input.bindKey(me.input.KEY.W, "down");
            me.input.bindKey(me.input.KEY.S, "up");
        }
        else {
            me.input.bindKey(me.input.KEY.UP, "up");
            me.input.bindKey(me.input.KEY.DOWN, "down");
            me.input.bindKey(me.input.KEY.W, "up");
            me.input.bindKey(me.input.KEY.S, "down");
        }

        me.input.bindKey(me.input.KEY.SHIFT, "sprint");
    }
});

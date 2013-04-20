game.PlayScreen = me.ScreenObject.extend({
    "onResetEvent" : function () {
        // Bind keys
        this.invertX = null;
        this.invertY = null;
        this.bindKeys(false, false);

        this.ending = false;

        // Load level
        me.levelDirector.loadLevel("grocery");

        // Start music
        if (!me.audio.getCurrentTrack())
            me.audio.playTrack("grocery");

        // Create HUD
        me.game.addHUD(0, 0, c.WIDTH, 50, "#000");
        me.game.HUD.addItem("attention", new game.HUD_Item(
            "Attention", 100, 15, 255
        ));
        me.game.HUD.addItem("stamina", new game.HUD_Item(
            "Stamina", c.WIDTH - 300, 15, 255
        ));
        game.errands = new game.Errands([
            "milk", "bread", "eggs", "cheese", "broccoli", "carrots"
        ]);
        me.game.add(game.errands, 1000);
        me.game.sort();

        // Animate errands list! :D
        new me.Tween(game.errands)
            .to({
                "angle" : 0
            }, 1000)
            .delay(500)
            .easing(me.Tween.Easing.Back.EaseOut)
            .start();
        new me.Tween(game.errands.pos)
            .to({
                "x" : 150
            }, 1000)
            .delay(500)
            .easing(me.Tween.Easing.Back.EaseOut)
            .onComplete(function () {
                new me.Tween(game.errands)
                    .to({
                        "ratio" : 3
                    }, 500)
                    .easing(me.Tween.Easing.Quartic.EaseIn)
                    .delay(1000)
                    .start();
                new me.Tween(game.errands.pos)
                    .to({
                        "x" : 20,
                        "y" : 70
                    }, 500)
                    .delay(1000)
                    .start();
            })
            .start();
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

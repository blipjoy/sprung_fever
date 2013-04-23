game.UI = me.Renderable.extend({
    "init" : function () {
        this.parent(new me.Vector2d(35, 395), 870, 220);
        this.isPersistent = true;
        this.floating = true;

        // Directional pad
        this.dpad = {
            "up"    : new me.Rect(new me.Vector2d(100, 400), 80, 60),
            "down"  : new me.Rect(new me.Vector2d(100, 540), 80, 60),
            "left"  : new me.Rect(new me.Vector2d(40, 460), 60, 80),
            "right" : new me.Rect(new me.Vector2d(180, 460), 60, 80),
            "image" : me.loader.getImage("ui-dpad")
        };

        me.input.registerMouseEvent("mousedown", this.dpad.up, function () {
            me.input.triggerKeyEvent(me.input.KEY.UP, true);
        }, true);
        me.input.registerMouseEvent("mouseup", this.dpad.up, function () {
            me.input.triggerKeyEvent(me.input.KEY.UP, false);
        }, true);

        me.input.registerMouseEvent("mousedown", this.dpad.down, function () {
            me.input.triggerKeyEvent(me.input.KEY.DOWN, true);
        }, true);
        me.input.registerMouseEvent("mouseup", this.dpad.down, function () {
            me.input.triggerKeyEvent(me.input.KEY.DOWN, false);
        }, true);

        me.input.registerMouseEvent("mousedown", this.dpad.left, function () {
            me.input.triggerKeyEvent(me.input.KEY.LEFT, true);
        }, true);
        me.input.registerMouseEvent("mouseup", this.dpad.left, function () {
            me.input.triggerKeyEvent(me.input.KEY.LEFT, false);
        }, true);

        me.input.registerMouseEvent("mousedown", this.dpad.right, function () {
            me.input.triggerKeyEvent(me.input.KEY.RIGHT, true);
        }, true);
        me.input.registerMouseEvent("mouseup", this.dpad.right, function () {
            me.input.triggerKeyEvent(me.input.KEY.RIGHT, false);
        }, true);

        // Action buttons
        this.button = {
            "b"     : new me.Rect(new me.Vector2d(690, 460), 80, 80),
            "a"     : new me.Rect(new me.Vector2d(810, 460), 80, 80),
            "image" : me.loader.getImage("ui-button")
        };

        me.input.registerMouseEvent("mousedown", this.button.b, function () {
            me.input.triggerKeyEvent(me.input.KEY.SHIFT, true);
        }, true);
        me.input.registerMouseEvent("mouseup", this.button.b, function () {
            me.input.triggerKeyEvent(me.input.KEY.SHIFT, false);
        }, true);

        me.input.registerMouseEvent("mousedown", this.button.a, function () {
            me.input.triggerKeyEvent(me.input.KEY.ENTER, true);
        }, true);
        me.input.registerMouseEvent("mouseup", this.button.a, function () {
            me.input.triggerKeyEvent(me.input.KEY.ENTER, false);
        }, true);
    },

    "destroy" : function () {
        me.input.releaseMouseEvent("mousedown", this.dpad.up);
        me.input.releaseMouseEvent("mouseup", this.dpad.up);
        me.input.releaseMouseEvent("mousedown", this.dpad.down);
        me.input.releaseMouseEvent("mouseup", this.dpad.down);
        me.input.releaseMouseEvent("mousedown", this.dpad.left);
        me.input.releaseMouseEvent("mouseup", this.dpad.left);
        me.input.releaseMouseEvent("mousedown", this.dpad.right);
        me.input.releaseMouseEvent("mouseup", this.dpad.right);
        me.input.releaseMouseEvent("mousedown", this.button.a);
        me.input.releaseMouseEvent("mouseup", this.button.a);
        me.input.releaseMouseEvent("mousedown", this.button.b);
        me.input.releaseMouseEvent("mouseup", this.button.b);
    },

    "draw" : function (context) {
        context.drawImage(this.dpad.image, 35, 395);
        context.drawImage(this.button.image, 686, 456);
        context.drawImage(this.button.image, 806, 456);
    }
});

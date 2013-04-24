/**
 * Basic Triangle class
 */
game.Triangle = Object.extend({

    /**
     * Constructor
     * @name game.Triangle#init
     * @function
     * @param {me.Vector2d} a Point a
     * @param {me.Vector2d} b Point b
     * @param {me.Vector2d} c Point c
     */
    "init" : function (a, b, c) {
        this.a = a;
        this.b = b;
        this.c = c;
        this.fill = false
    },

    /**
     * Check if a point lies within the triangle
     * @name game.Triangle#containsPoint
     * @function
     * @param {me.Vector2d} p Point to check
     * @return {Boolean}
     * @see http://goo.gl/6sAFR
     */
    "containsPoint" : function (p) {
        function sign(t, u, v) {
            return (t.x - v.x) * (u.y - v.y) - (u.x - v.x) * (t.y - v.y);
        }

        return (
            sign(p, this.a, this.b) > 0 &&
            sign(p, this.b, this.c) > 0 &&
            sign(p, this.c, this.a) > 0
        );
    },

    "draw" : function (context, color) {
        context.beginPath();
        context.moveTo(this.a.x, this.a.y);
        context.lineTo(this.b.x, this.b.y);
        context.lineTo(this.c.x, this.c.y);
        context.closePath();

        context.strokeStyle = color;
        context.stroke();

        if (this.pressed) {
            context.fillStyle = color;
            context.fill();
        }
    }
});

game.UI = me.Renderable.extend({
    "init" : function () {
        this.parent(new me.Vector2d(35, 395), 870, 220);
        this.isPersistent = true;
        this.floating = true;

        this.dpad = me.loader.getImage("ui-dpad");
        this.button = me.loader.getImage("ui-button");

        // Button areas
        var buttons = this.buttons = {
            // Directional pad
            "up"    : new game.Triangle(
                new me.Vector2d(140, 500),
                new me.Vector2d(-20, 360),
                new me.Vector2d(300, 360)
            ),
            "down"  : new game.Triangle(
                new me.Vector2d(140, 500),
                new me.Vector2d(300, 640),
                new me.Vector2d(-20, 640)
            ),
            "left"  : new game.Triangle(
                new me.Vector2d(140, 500),
                new me.Vector2d(0, 660),
                new me.Vector2d(0, 340)
            ),
            "right" : new game.Triangle(
                new me.Vector2d(140, 500),
                new me.Vector2d(280, 340),
                new me.Vector2d(280, 660)
            ),
            // Action buttons
            "b"     : new me.Rect(new me.Vector2d(690, 460), 80, 80),
            "a"     : new me.Rect(new me.Vector2d(810, 460), 80, 80)
        };

        // Set keys
        buttons.up.key      = me.input.KEY.UP;
        buttons.down.key    = me.input.KEY.DOWN;
        buttons.left.key    = me.input.KEY.LEFT;
        buttons.right.key   = me.input.KEY.RIGHT;
        buttons.b.key       = me.input.KEY.SHIFT;
        buttons.a.key       = me.input.KEY.SHIFT;

        var tracked = {};

        // Event handlers
        function touchmove() {
            var touches = me.input.touches;

            // Update tracked touches list
            for (var i = 0; i < touches.length; i++) {
                tracked[touches[i].id] = touches[i];
            }

            // Iterate each button
            for (var name in buttons) {

                // Check if button is pressed by any touch
                var pressed = false;
                for (var id in tracked) {
                    if (tracked[id] &&
                        (pressed = buttons[name].containsPoint(tracked[id]))
                    ) break;
                }

                if (!buttons[name].pressed && pressed) {
                    // Button down
                    buttons[name].pressed = true;
                    me.input.triggerKeyEvent(buttons[name].key, true);
                }
                else if (buttons[name].pressed && !pressed) {
                    // Button up
                    buttons[name].pressed = false;
                    me.input.triggerKeyEvent(buttons[name].key, false);
                }
            }
        }

        function touchend() {
            var touches = me.input.touches;

            // Update tracked touches list
            for (var i = 0; i < touches.length; i++) {
                tracked[touches[i].id] = null;
            }

            // Iterate each button
            for (var name in buttons) {

                // Check if button is released by any touch
                var released = false;
                for (var i = 0; i < touches.length; i++) {
                    if ((released = buttons[name].containsPoint(touches[i])))
                        break;
                }

                if (buttons[name].pressed && released) {
                    // Button up
                    buttons[name].pressed = false;
                    me.input.triggerKeyEvent(buttons[name].key, false);
                }
            }
        }

        this.vp = me.game.viewport.getRect();
        me.input.registerMouseEvent("touchstart", this.vp, touchmove, true);
        me.input.registerMouseEvent("touchmove", this.vp, touchmove, true);
        me.input.registerMouseEvent("touchend", this.vp, touchend, true);
    },

    "destroy" : function () {
        me.input.releaseMouseEvent("touchstart", this.vp);
        me.input.releaseMouseEvent("touchmove", this.vp);
        me.input.releaseMouseEvent("touchend", this.vp);
    },

    "draw" : function (context) {
        context.drawImage(this.dpad, 35, 395);
        context.drawImage(this.button, 686, 456);
        context.drawImage(this.button, 806, 456);

        if (me.debug.renderHitBox) {
            this.buttons.up.draw(context, "#00f");
            this.buttons.down.draw(context, "#0f0");
            this.buttons.left.draw(context, "#0ff");
            this.buttons.right.draw(context, "#f00");
            this.buttons.b.draw(context, "#f0f");
            this.buttons.a.draw(context, "#ff0");
        }
    }
});

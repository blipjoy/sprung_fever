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
    },

    /**
     * Check if a point lies within the triangle
     * @name game.Triangle#containsPoint
     * @function
     * @param {me.Vector2d} p Point to check
     * @return {Boolean}
     * @see http://goo.gl/6sAFR
     */
    "containsPoint" : function (x, y) {
        function sign(u, v) {
            return (x - v.x) * (u.y - v.y) - (u.x - v.x) * (y - v.y);
        }

        return (
            sign(this.a, this.b) > 0 &&
            sign(this.b, this.c) > 0 &&
            sign(this.c, this.a) > 0
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

        // Set default button properties
        for (var name in buttons) {
            buttons[name].pressed = false;
            buttons[name].id = 0;
        }

        // Event handlers
        function mousemove(e) {
console.log("mousedown", e);
            // Iterate each button
            for (var name in buttons) {
                var button = buttons[name];

                // Check if button is pressed by this touch
                var pressed = button.containsPoint(e.gameX, e.gameY);

                if (pressed && !button.pressed) {
                    // Button down
                    button.pressed = true;
                    button.id = e.pointerId;
                    me.input.triggerKeyEvent(button.key, true);
                }
                else if ((button.id === e.pointerId) &&
                    !pressed && button.pressed) {
                    // Button up
                    button.pressed = false;
                    button.id = 0;
                    me.input.triggerKeyEvent(button.key, false);
                }
            }
        }

        function mouseup(e) {
console.log("mouseup", e);
            // Iterate each button
            for (var name in buttons) {
                var button = buttons[name];

                // Check if button is released by this touch
                var released = (button.id === e.pointerId);

                if (button.pressed && released) {
                    // Button up
                    button.pressed = false;
                    button.id = 0;
                    me.input.triggerKeyEvent(button.key, false);
                }
            }
        }

        me.input.registerPointerEvent("mousedown", this, mousemove, true);
        me.input.registerPointerEvent("mousemove", this, mousemove, true);
        me.input.registerPointerEvent("mouseup", this, mouseup, true);
    },

    "destroy" : function () {
        me.input.releasePointerEvent("mousedown", this);
        me.input.releasePointerEvent("mousemove", this);
        me.input.releasePointerEvent("mouseup", this);
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

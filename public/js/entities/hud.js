game.HUD_Item = me.HUD_Item.extend({
    "init" : function (name, x, y, val) {
        this.parent(x, y, val);

        // Cache image for item name
        var font = new me.Font("Verdana", 16, "#fff", "left");
        var ctx = me.video.createCanvasSurface(100, 20);
        this.image = ctx.canvas;
        this.image.width = font.measureText(ctx, name + ":").width;
        this.image.height = 20;
        font.draw(ctx, name + ":", 0, 0);
    },

    "draw" : function (context) {
        var x = this.pos.x;
        var y = this.pos.y;

        context.strokeStyle = "#fff";
        context.lineJoin = "round";
        context.lineWidth = 3;

        context.strokeRect(x, y, 261, 20);

        context.fillStyle = "rgb(" +
            Math.min((this.defaultvalue - ~~this.value) * 2, 255) + "," + // Red
            (this.value > 127 ? 255 : ~~this.value * 2) + "," + // Green
            0 + // Blue
            ")";
        context.fillRect(x + 3, y + 3, ~~this.value, 14);

        context.drawImage(this.image, x - this.image.width - 10, y);
    }
});

game.Errands = me.Renderable.extend({
    "init" : function () {
        this.parent(new me.Vector2d(-360, 200), 0, 0);

        this.image = me.loader.getImage("note");

        this.items = {};
        me.game.currentLevel.items.forEach((function (item) {
            this.items[item] = false;
        }).bind(this));

        // Animation
        this.angle = -0.3;
        this.ratio = 16;

        this.floating = true;
        this.invalidated = true;

        this.complete = false;

        this.red = new me.Font("Verdana", 18, "#f30");
        this.red.bold();
        this.green = new me.Font("Verdana", 18, "#3f0");
        this.green.bold();
    },

    "set" : function (item, value) {
        if (item in this.items) {
            this.items[item] = (value === true);
            this.invalidated = true;

            this.complete = true;
            for (var item in this.items) {
                if (!this.items[item]) {
                    this.complete = false;
                    break;
                }
            }
        }
    },

    "update" : function () {
        var result = this.invalidated;
        this.invalidated = false;
        return result;
    },

    "draw" : function (context) {
        if (this.angle)
            context.rotate(this.angle);
        context.drawImage(
            this.image,
            0, 0,
            this.image.width, this.image.height,
            ~~(this.pos.x - this.ratio * 3),
            ~~(this.pos.y - this.ratio * 4),
            ~~(this.image.width * this.ratio),
            ~~(this.image.height * this.ratio)
        );

        context.shadowBlur = 3;
        context.shadowColor = "#000";
        context.shadowOffsetX = 2;
        context.shadowOffsetY = 2;

        var y = this.pos.y;
        for (item in this.items) {
            var font, check;
            if (this.items[item]) {
                font = this.green;
                check = "\u2611 ";
            }
            else {
                font = this.red;
                check = "\u2612 ";
            }
            font.draw(context, check + item, this.pos.x, y);
            y += font.height;
        }

        context.shadowColor = "rgba(0,0,0,0)";

        if (this.angle)
            context.rotate(-this.angle);
    }
});

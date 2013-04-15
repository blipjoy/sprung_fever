game.HUD_Item = me.HUD_Item.extend({
    "init" : function (name, x, y, val) {
        this.parent(x, y, val);

        // Cache image for item name
        var font = new me.Font("Verdana", 16, "#fff", "left");
        this.image = document.createElement("canvas");
        var ctx = this.image.getContext("2d");
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

game.HUD_Item = me.HUD_Item.extend({
    "init" : function (name, x, y, val) {
        this.parent(x, y, val);
        this.font = new me.Font("Verdana", 16, "#fff", "right");

        this.name = name;
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

        this.font.draw(context, this.name + ":", x - 10, y);
    }
});

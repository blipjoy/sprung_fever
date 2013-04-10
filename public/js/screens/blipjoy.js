game.LoadBlipjoyLogo = function LoadBlipjoyLogo(callback) {
    game.BlipjoyLogo = new Image();
    game.BlipjoyLogo.onload = callback
    game.BlipjoyLogo.src = (
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAOCAYAAAA1+Nx+AA" +
        "AD8GlDQ1BJQ0MgUHJvZmlsZQAAOMuNVd1v21QUP4lvXKQWP6Cxjg4Vi69VU1u5Gxqtxg" +
        "ZJk6XpQhq5zdgqpMl1bhpT1za2021Vn/YCbwz4A4CyBx6QeEIaDMT2su0BtElTQRXVJK" +
        "Q9dNpAaJP2gqpwrq9Tu13GuJGvfznndz7v0TVAx1ea45hJGWDe8l01n5GPn5iWO1YhCc" +
        "9BJ/RAp6Z7TrpcLgIuxoVH1sNfIcHeNwfa6/9zdVappwMknkJsVz19HvFpgJSpO64PIN" +
        "5G+fAp30Hc8TziHS4miFhheJbjLMMzHB8POFPqKGKWi6TXtSriJcT9MzH5bAzzHIK1I0" +
        "8t6hq6zHpRdu2aYdJYuk9Q/881bzZa8Xrx6fLmJo/iu4/VXnfH1BB/rmu5ScQvI77m+B" +
        "kmfxXxvcZcJY14L0DymZp7pML5yTcW61PvIN6JuGr4halQvmjNlCa4bXJ5zj6qhpxruj" +
        "eKPYMXEd+q00KR5yNAlWZzrF+Ie+uNsdC/MO4tTOZafhbroyXuR3Df08bLiHsQf+ja6g" +
        "TPWVimZl7l/oUrjl8OcxDWLbNU5D6JRL2gxkDu16fGuC054OMhclsyXTOOFEL+kmMGs4" +
        "i5kfNuQ62EnBuam8tzP+Q+tSqhz9SuqpZlvR1EfBiOJTSgYMMM7jpYsAEyqJCHDL4dcF" +
        "FTAwNMlFDUUpQYiadhDmXteeWAw3HEmA2s15k1RmnP4RHuhBybdBOF7MfnICmSQ2SYjI" +
        "BM3iRvkcMki9IRcnDTthyLz2Ld2fTzPjTQK+Mdg8y5nkZfFO+se9LQr3/09xZr+5GcaS" +
        "ufeAfAww60mAPx+q8u/bAr8rFCLrx7s+vqEkw8qb+p26n11Aruq6m1iJH6PbWGv1VIY2" +
        "5mkNE8PkaQhxfLIF7DZXx80HD/A3l2jLclYs061xNpWCfoB6WHJTjbH0mV35Q/lRXlC+" +
        "W8cndbl9t2SfhU+Fb4UfhO+F74GWThknBZ+Em4InwjXIyd1ePnY/Psg3pb1TJNu15TMK" +
        "WMtFt6ScpKL0ivSMXIn9QtDUlj0h7U7N48t3i8eC0GnMC91dX2sTivgloDTgUVeEGHLT" +
        "izbf5Da9JLhkhh29QOs1luMcScmBXTIIt7xRFxSBxnuJWfuAd1I7jntkyd/pgKaIwVr3" +
        "MgmDo2q8x6IdB5QH162mcX7ajtnHGN2bov71OU1+U0fqqoXLD0wX5ZM005UHmySz3qLt" +
        "DqILDvIL+iH6jB9y2x83ok898GOPQX3lk3Itl0A+BrD6D7tUjWh3fis58BXDigN9yF8M" +
        "5PJH4B8Gr79/F/XRm8m241mw/wvur4BGDj42bzn+Vmc+NL9L8GcMn8F1kAcXi1s/XUAA" +
        "AAlUlEQVQ4y81SQQ6AIAzriL/zTx74E++rB7M4YMjEi01INiltBwIAn9aOvLRn1pTgCg" +
        "XFKeoyw45c9QVH5BhSVNwKFhyd4bKBiltB79unCWzy6NUotjfimvityT/+olUkkiBvD1" +
        "vbvuW1XK8meT2yiHSHFSJS1R6P5HAvWYL7QE2yEa8NpdzpBN40Ee7jBN59jxJ6vcUJPW" +
        "+qsLnznKkAAAAASUVORK5CYII="
    );
}

// Simple image resize function using "nearest neighbor"
// Only works for scaling up
game.resize = function resize(image, scale) {
    var iw = image.width,
        ih = image.height,
        ipitch = iw * 4,
        ow = iw * scale,
        oh = ih * scale,
        opitch = ow * 4,
        context = me.video.createCanvasSurface(ow, oh);

    // Get original pixels
    context.drawImage(image, 0, 0);
    var ipixels = context.getImageData(0, 0, iw, ih);
    try {
        var opixels = context.createImageData(ow, oh);
    }
    catch(e) {
        var opixels = context.getImageData(0, 0, ow, oh);
    }

    var ix = 0,
        iy = 0;

    for (var oy = 0; oy < oh; oy++) {
        iy = Math.floor(oy / scale);
        for (var x = 0, ox = 0; x < ow; x++, ox += 4) {
            ix = Math.floor(x / scale) * 4;
            opixels.data[ox + 0 + oy * opitch] = ipixels.data[ix + 0 + iy * ipitch]; // R
            opixels.data[ox + 1 + oy * opitch] = ipixels.data[ix + 1 + iy * ipitch]; // G
            opixels.data[ox + 2 + oy * opitch] = ipixels.data[ix + 2 + iy * ipitch]; // B
            opixels.data[ox + 3 + oy * opitch] = ipixels.data[ix + 3 + iy * ipitch]; // A
        }
    }

    context.putImageData(opixels, 0, 0);

    return context.canvas;
};

game.LoadingScreen = me.ScreenObject.extend({
    "init" : function () {
        this.parent(true);

        // Create a new scaled image
        var img = game.BlipjoyLogo;
        this.scale = Math.round(Math.min(
                c.WIDTH / img.width / 3,
                c.HEIGHT / img.height / 3
            ));
        this.logo = game.resize(img, this.scale);

        // The invader just happens to be at x:8 and 8x8 px
        this.size = this.scale * 8;

        // Flag to cause a redraw
        this.invalidate = false;

        // Handler for loading status bar
        this.handler = null;

        // Loading progress percentage
        this.loadPercent = 0;
    },

    "onResetEvent" : function onResetEvent() {
        this.handler = me.event.subscribe(
            me.event.LOADER_PROGRESS, this.onProgressUpdate.bind(this)
        );
    },

    "onDestroyEvent" : function onDestroyEvent() {
        me.event.unsubscribe(this.handler);
    },

    "onProgressUpdate" : function onProgressUpdate(progress) {
        this.loadPercent = progress;
        this.invalidate = true;
    },

    "update" : function update() {
        if (this.invalidate) {
            this.invalidate = false;
            return true;
        }

        return false;
    },

    "draw" : function draw(context) {
        var img = this.logo,
            x = (c.WIDTH - img.width) / 2,
            y = (c.HEIGHT - img.height) / 2;

        me.video.clearSurface(context, "#000");

        // Draw logo
        context.drawImage(
            img,
            this.size, 0, this.size, this.size,
            x + this.size, y, this.size, this.size
        );

        // Draw progress bar
        var progress = Math.floor(this.loadPercent * c.WIDTH);
        context.fillStyle = "#fff";
        context.fillRect(2, y + this.scale * 11, progress - 4, 4);
    }
});

game.BlipjoyScreen = me.ScreenObject.extend({
    "regions" : [
        { t: 0, x: 8, y: 0, w: 8, h: 8 },       // Invader
        { t: 500, x: 0, y: 9, w: 3, h: 5 },     // B
        { t: 200, x: 4, y: 9, w: 3, h: 5 },     // L
        { t: 500, x: 8, y: 9, w: 1, h: 5 },     // i
        { t: 150, x: 10, y: 9, w: 3, h: 5 },    // P
        { t: 150, x: 13, y: 9, w: 3, h: 5 },    // J
        { t: 250, x: 17, y: 9, w: 3, h: 5 },    // O
        { t: 500, x: 21, y: 9, w: 3, h: 5 }     // Y
    ],

    "init" : function init() {
        var img = game.BlipjoyLogo,
            scale = Math.round(Math.min(
                c.WIDTH / img.width / 3,
                c.HEIGHT / img.height / 3
            ));
        this.logo = game.resize(img, scale);

        // Resize the regions, too
        var len = this.regions.length,
            r = null;
        for (var i = 0; i < len; i++) {
            r = this.regions[i];
            r.x *= scale;
            r.y *= scale;
            r.w *= scale;
            r.h *= scale;
        }

        this.parent(true);
    },

    "onResetEvent" : function onResetEvent() {
        var self = this;

        // There are better ways to do this. :)
        self.state = 0;
        self.timeout = 0;
        animate();

        function animate() {
            if (self.state) {
                me.audio.play("blip" + self.state);
            }
            self.state++;
            var r = self.regions[self.state];
            if (r) {
                self.timeout = setTimeout(animate, r.t);
            }
        }

        setTimeout(function () {
            me.game.viewport.fadeIn("#000", 250, function () {
                me.state.change(me.state.MENU);
            });
        }, 5000);
    },

    "onDestroyEvent" : function onDestroyEvent() {
        clearTimeout(this.timeout);
    },

    "update" : function update() {
        return true;
    },

    "draw" : function draw(context) {
        var img = this.logo,
            x = (c.WIDTH - img.width) / 2,
            y = (c.HEIGHT - img.height) / 2,
            r = null;

        me.video.clearSurface(context, "#000");

        var len = Math.min(this.state, this.regions.length);
        for (i = 0; i < len; i++) {
            r = this.regions[i];
            context.drawImage(
                img,
                r.x, r.y, r.w, r.h,
                x + r.x, y + r.y, r.w, r.h
            );
        }
    }
});

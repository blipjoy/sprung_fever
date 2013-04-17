
/* Game namespace */
var game = {
    // Run on page load.
    "onload" : function () {
        // Initialize the video.
        if (!me.video.init("screen", c.WIDTH, c.HEIGHT, c.DOUBLEBUF)) {
            alert("Your browser does not support HTML5 canvas.");
            return;
        }

        // Initialize the audio.
        me.audio.init("mp3,ogg");

        // Set a callback to run when loading is complete.
        me.loader.onload = this.loaded.bind(this);
        this.loadResources();

        // Initialize melonJS and display a loading screen.
        game.LoadBlipjoyLogo(function () {
            me.state.set(me.state.LOADING, new game.LoadingScreen());
            me.state.change(me.state.LOADING);
        });
    },

    "loadResources" : function () {
        // Set all resources to be loaded.
        var resources = [];

        // Graphics.
        this.resources["img"].forEach(function forEach(value) {
            resources.push({
                "name"  : value,
                "type"  : "image",
                "src"   : "resources/img/" + value + ".png"
            })
        });

        // Atlases.
        this.resources["tps"].forEach(function forEach(value) {
            resources.push({
                "name"  : value,
                "type"  : "tps",
                "src"   : "resources/img/" + value + ".json"
            })
        });

        // Maps.
        this.resources["map"].forEach(function forEach(value) {
            resources.push({
                "name"  : value,
                "type"  : "tmx",
                "src"   : "resources/map/" + value + ".json"
            })
        });

        // Sound effects.
        this.resources["sfx"].forEach(function forEach(value) {
            resources.push({
                "name"      : value,
                "type"      : "audio",
                "src"       : "resources/sfx/",
                "channel"   : 3
            })
        });

        // Background music.
        this.resources["bgm"].forEach(function forEach(value) {
            resources.push({
                "name"      : value,
                "type"      : "audio",
                "src"       : "resources/bgm/",
                "channel"   : 1,
                "stream"    : true
            })
        });

        // Load the resources.
        me.loader.preload(resources);
    },

    // Run on game resources loaded.
    "loaded" : function () {
        // Set up game states.
        me.state.set(me.state.BLIPJOY, new game.BlipjoyScreen());
        me.state.set(me.state.MENU, new game.TitleScreen());
        game.playscreen = new game.PlayScreen();
        me.state.set(me.state.PLAY, game.playscreen);

        // Add object classes to entity pool.
        me.entityPool.add("kid", game.Kid);
        me.entityPool.add("girl", game.Girl);
        me.entityPool.add("redgirl", game.Girl);

        me.entityPool.add("milk", game.Item);
        me.entityPool.add("bread", game.Item);
        me.entityPool.add("eggs", game.Item);
        me.entityPool.add("cheese", game.Item);
        me.entityPool.add("broccoli", game.Item);
        me.entityPool.add("carrots", game.Item);

        me.entityPool.add("cookies", game.Item);
        me.entityPool.add("icecream", game.Item);
        me.entityPool.add("cake", game.Item);
        me.entityPool.add("candy", game.Item);

        // Load texture.
        game.texture = new me.TextureAtlas(
            me.loader.getAtlas("texture"),
            me.loader.getImage("texture")
        );

        // Overlay.
        me.game.add(new game.Overlay("overlay"), Infinity);

        // Start the game.
        me.state.change(c.DEBUG ? me.state.PLAY : me.state.BLIPJOY);
    },

    // Top-down perspective sort function.
    "sort" : function (a, b) {
        var result = (b.z - a.z);
        return (
            result ? result : ((b.pos && b.pos.y) - (a.pos && a.pos.y)) || 0
        );
    }

};

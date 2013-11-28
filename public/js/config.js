(function () {

    var enabled = false;

    function parseHash() {
        var hash = {};
        document.location.hash.substr(1).split("&").filter(function (value) {
            return (value !== "");
        }).forEach(function (value) {
            var kv = value.split("=");
            var k = kv.shift();
            var v = kv.join("=");
            hash[k] = v || true;
        });

        return hash;
    }

    function defineConst(obj, key, value) {
        Object.defineProperty(obj, key, {
            "configurable" : true,
            "get" : (function (v) {
                return function () {
                    return v;
                }
            })(value)
        });
    }

    /* Constants */
    window.c = {
        "DEBUG"     : false,

        "WIDTH"     : 960,
        "HEIGHT"    : 640,

        "GUID"      : (function () {
            function S4() {
                return ("0000" + Math.floor(Math.random() * 0x10000).toString(16)).slice(-4);
            };

            return (
                S4() + S4() + "-" +
                S4() + "-" +
                S4() + "-" +
                S4() + "-" +
                S4() + S4() + S4()
            );
        })(),

        "HASH"      : parseHash()
    };

    // Helper to enable debug by setting a special hash in the URL.
    if (window.c.HASH.debug) {
        c.DEBUG = true;
        window.onReady(function () {
            enableDebug.defer(true);
        });
    }

    window.addEventListener("hashchange", function (e) {
        defineConst(window.c, "HASH", parseHash());
        defineConst(window.c, "DEBUG", window.c.HASH.debug);
        if (window.c.DEBUG) {
            enableDebug();
        }
    });

    // Turn the `c` object into a hash of constants.
    Object.keys(window.c).forEach(function (key) {
        if (typeof(window.c[key]) === "function") {
            return;
        }

        defineConst(window.c, key, window.c[key]);
    });


    // Game engine settings.
    me.sys.gravity = 0;
    me.sys.preRender = true; // Be faster!
    me.sys.stopOnAudioError = false;

    function enableDebug() {
        if (!enabled) {
            enabled = true;
            me.plugin.register(debugPanel, "debug");
        }
    }

    // Game states.
    me.state.BLIPJOY = me.state.USER + 0;

})();

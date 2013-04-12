(function () {

    var enabled = false;

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
        })()
    };

    // Helper to enable debug by setting a special hash in the URL.
    if (document.location.hash === "#debug") {
        c.DEBUG = true;
        window.onReady(function () {
            enableDebug.defer(true);
        });
    }

    window.addEventListener("hashchange", function (e) {
        var debug = (document.location.hash === "#debug");
        enableDebug(debug);
        try {
            c.__defineGetter__("DEBUG", function () {
                return debug;
            });
        }
        catch (e) {
            c.DEBUG = debug;
        }
    });

    // Turn the `c` object into a hash of constants.
    try {
        Object.keys(c).forEach(function (key) {
            if (typeof(c[key]) === "function") {
                return;
            }

            c.__defineGetter__(
                key,
                (function (value) {
                    return function () {
                        return value
                    };
                })(c[key])
            );
        });
    }
    catch (e) {
        // No getters? FAKE CONSTANTS!
    }


    // Game engine settings.
    me.sys.gravity = 0;
    //me.sys.dirtyRegion = true; // Be fast!
    me.sys.preRender = true; // Be faster!
    me.sys.useNativeAnimFrame = true; // Be fastest!
    me.sys.stopOnAudioError = false;

    function enableDebug(enable) {
        if (!enabled) {
            enabled = true;
            me.plugin.register(debugPanel, "debug");
        }
    }

    // Game states.
    me.state.BLIPJOY = me.state.USER + 0;

})();

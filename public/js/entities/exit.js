game.Exit = me.ObjectEntity.extend({
    "onCollision" : function (res, obj) {
        // End of level?
        if (game.errands.complete && !game.playscreen.exit) {
            game.playscreen.exit = true;
            me.game.viewport.fadeIn("#000", 500, function () {
                me.levelDirector.nextLevel.defer();
            });
        }
    }
});

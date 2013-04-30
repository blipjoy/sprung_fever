game.Exit = me.ObjectEntity.extend({
    "onCollision" : function (res, obj) {
        // End of level?
        if (game.errands.complete && !game.playscreen.exit) {
            game.playscreen.exit = true;
            me.game.viewport.fadeIn("#000", 500, function () {
                if (me.levelDirector.getCurrentLevelId() === "library") {
                    // End of game?
                    me.state.change(me.state.GAME_END);
                }
                else {
                    me.levelDirector.nextLevel.defer();
                }
            });
        }
    }
});

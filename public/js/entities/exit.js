game.Exit = me.ObjectEntity.extend({
    "onCollision" : function (res, obj) {
        // End of level?
        if (game.errands.complete) {
            me.state.change(me.state.MENU);
        }
    }
});

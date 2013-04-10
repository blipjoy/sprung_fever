game.TitleScreen = me.ScreenObject.extend({
    "onResetEvent" : function () {
        // FIXME
        me.state.change(me.state.PLAY);
    }
});

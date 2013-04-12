game.Girl = game.Person.extend({
    "update" : function () {
        if (!this.moving && ~~(Math.random() * 100) == 0) {
            // Choose a random direction, and start moving!
            this.moving = true;
            this.direction = [
                "left",
                "right",
                "up",
                "down"
            ][~~(Math.random() * 4)];

            // And stop moving up to 3 seconds later
            setTimeout((function () {
                this.moving = false;
            }).bind(this), Math.random() * 3000);
        }

        return this.parent();
    }
});

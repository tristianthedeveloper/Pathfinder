var AI = /** @class */ (function () {
    function AI() {
        this.target = {
            y: 0,
            x: 0
        };
        this.currentIndex = {
            y: 0,
            x: 0
        };
        this.prevIndex = {
            y: 3,
            x: 0
        };
    }
    /**
     * Remmber in this class, think of the Y as being DOWN isntead of up, and x being right to left like normal.
     *
     */
    AI.prototype.setPath = function (array) {
        this.blocks = array;
        for (var i = 0; i < array.length; i++) {
            for (var j = 0; j < array.length; j++) {
                if (array[i][j] === 'f') {
                    this.target.y = i; // down
                    this.target.x = j; // across
                }
            }
        }
        this.begin();
    };
    AI.prototype.moveDown = function () {
        this.currentIndex.y += 1;
        this.redrawPath();
    };
    AI.prototype.moveRight = function () {
        this.currentIndex.x += 1;
        this.redrawPath();
    };
    AI.prototype.moveLeft = function () {
        this.currentIndex.x -= 1;
        this.redrawPath();
    };
    AI.prototype.moveUp = function () {
        this.currentIndex.y -= 1;
        this.redrawPath();
    };
    /**
     * a return of 1 means that we can move there! a return of 0 means we cannot and we need to try somewhere else.
     */
    AI.prototype.getUp = function () {
        var y = this.currentIndex.y - 1;
        var x = this.currentIndex.x;
        if (this.prevIndex.y === y && this.prevIndex.x === x) {
            console.log("returning zero because of same value ");
            return 0;
        }
        try {
            if (this.blocks[y][x] === "y" || this.blocks[y][x] === "f")
                return 1;
            else
                return 0;
        }
        catch (e) {
            return 0;
        }
    };
    /**
     * a return of 1 means that we can move there! a return of 0 means we cannot and we need to try somewhere else.
     */
    AI.prototype.getDown = function () {
        var testAgainstY = this.currentIndex.y + 1;
        var x = this.currentIndex.x;
        if (this.prevIndex.y === testAgainstY && this.prevIndex.x === x) {
            console.log("returning zero because of same value ");
            return 0;
        }
        try {
            if (this.blocks[testAgainstY][x] === "y" || this.blocks[testAgainstY][x] === "f")
                return 1;
            else
                return 0;
        } // watch out for that darn index error!
        catch (e) {
            return 0;
        }
    };
    /**
     * a return of 1 means that we can move there! a return of 0 means we cannot and we need to try somewhere else.
     */
    AI.prototype.getLeft = function () {
        var y = this.currentIndex.y;
        var testAgainstX = this.currentIndex.x - 1;
        if (this.prevIndex.y === y && this.prevIndex.x === testAgainstX) {
            console.log("returning zero because of previous value");
            return 0;
        }
        try {
            if (this.blocks[y][testAgainstX] === "y" || this.blocks[y][testAgainstX] === "f")
                return 1;
            else
                return 0;
        }
        catch (e) {
            return 0;
        }
    };
    /**
     * a return of 1 means that we can move there! a return of 0 means we cannot and we need to try somewhere else.
     */
    AI.prototype.getRight = function () {
        var y = this.currentIndex.y;
        var testAgainstX = this.currentIndex.x + 1;
        if (this.prevIndex.y === y && this.prevIndex.x === testAgainstX)
            return 0;
        try {
            if (this.blocks[y][testAgainstX] === "y" || this.blocks[y][testAgainstX] === "f")
                return 1;
            else
                return 0;
        }
        catch (e) {
            return 0;
        }
    };
    AI.prototype.location = function () {
        return "[" + this.currentIndex.y + " down, " + this.currentIndex.x + " across]";
    };
    AI.prototype.redrawPath = function () {
        var copy = this.blocks;
        copy[this.prevIndex.y][this.prevIndex.x] = "y";
        copy[this.currentIndex.y][this.currentIndex.x] = "a";
        var str = "";
        for (var i = 0; i < copy.length; i++) {
            str += "[";
            for (var j = 0; j < copy[i].length; j++) {
                str += copy[i][j] + (j < copy[i].length - 1 ? "," : "");
            }
            str += "]\n";
        }
        console.log("Path with AI:\n" + str);
    };
    AI.prototype.findNextMove = function () {
        console.log("previous index: " + this.prevIndex.y + " down, " + this.prevIndex.x + " across");
        var y = this.currentIndex.y;
        var x = this.currentIndex.x;
        console.log("current location: [" + this.location() + "]");
        if (this.target.y === y && this.target.x === x) {
            console.log("WE WIN!");
            return 1;
        }
        if (this.getUp() === 1) {
            console.log("moving up");
            this.prevIndex.x = this.currentIndex.x;
            this.prevIndex.y = this.currentIndex.y;
            this.moveUp();
            return 0;
        }
        if (this.getDown() === 1) {
            console.log("moving down");
            this.prevIndex.x = this.currentIndex.x;
            this.prevIndex.y = this.currentIndex.y;
            this.moveDown();
            return 0;
        }
        if (this.getLeft() === 1) {
            console.log("left");
            this.prevIndex.x = this.currentIndex.x;
            this.prevIndex.y = this.currentIndex.y;
            this.moveLeft();
            return 0;
        }
        if (this.getRight() === 1) {
            this.prevIndex.x = this.currentIndex.x;
            this.prevIndex.y = this.currentIndex.y;
            console.log("right");
            this.moveRight();
            return 0;
        }
    };
    AI.prototype.begin = function () {
        var _this = this;
        if (this.findNextMove() === 1)
            return;
        this.redrawPath();
        setTimeout(function () {
            _this.begin();
        }, 2000);
    };
    return AI;
}());
var ai;
var Pathwax = /** @class */ (function () {
    function Pathwax() {
        this.blocks = [[], []];
    }
    Pathwax.prototype.setupPathwax = function () {
        this.blocks = [
            ["x", "x", "x", "f"],
            ["y", "y", "y", "y"],
            ["y", "x", "x", "x"],
            ["a", "x", "x", "x"]
        ];
        var x = "";
        for (var i = 0; i < this.blocks.length; i++) {
            x += "[";
            for (var j = 0; j < this.blocks[i].length; j++) {
                x += this.blocks[i][j] + (j < this.blocks[i].length - 1 ? "," : "");
            }
            x += "]\n";
        }
        console.log("starting path:\n" + x);
        ai = new AI();
        console.log("[0][3] " + this.blocks[0][3]);
        console.log("[3][0] " + this.blocks[3][0]);
        ai.currentIndex.x = 0;
        ai.currentIndex.y = 3;
        ai.setPath(this.blocks);
    };
    return Pathwax;
}());
new Pathwax().setupPathwax();
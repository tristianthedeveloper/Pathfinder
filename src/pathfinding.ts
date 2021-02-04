
/**
 *  heres a little pathfinding (sure?) thing that I made instead of doing my schoolwork
 * 
 * WARNING: SLOPPY CODE AHEAD! THIS IS MY FIRST TYPESCRIPT PROJECT EVER.
 * 
 *  The (AI?) pathfinds(?) through the "blocks" that it's given, the open spaces it can travel through are denotated
 *  by a "y", the finish line it searches for is denotated by an "f", the AI is denotated by "a" and the closed parts that it is not allowed to get into are denotated with "x"
 */



class AI {

    path: string = "";

    paths = {
        LEFT: "left ",
        RIGHT: "right ",
        UP: "up ",
        DOWN: "down "
    }

    blocks: Object[][];
    target = {
        y: 0,
        x: 0
    }
    /**
     * Remmber in this class, think of the Y as being DOWN isntead of up, and x being right to left like normal.
     * 
     */
    setPath(array: Object[][]) {

        this.blocks = array;

        for (let i = 0; i < array.length; i++) {
            for (var j = 0; j < array.length; j++) {
                if (array[i][j] === 'f') {
                    this.target.y = i; // down
                    this.target.x = j; // across
                }
            }
        }


        this.begin();

    }

    currentIndex = {
        y: 0,
        x: 0
    };
    prevIndex = {
        y: undefined,
        x: undefined,
    };

    moveDown() {
        this.currentIndex.y += 1;
        this.redrawPath();
    }

    moveRight() {
        this.currentIndex.x += 1;
        this.redrawPath();
    }

    moveLeft() {
        this.currentIndex.x -= 1;
        this.redrawPath();
    }

    moveUp() {
        this.currentIndex.y -= 1;
        this.redrawPath();
    }

    /**
     * a return of 1 means that we can move there! a return of 0 means we cannot and we need to try somewhere else.
     */
    getUp() {
        var y = this.currentIndex.y - 1;
        var x = this.currentIndex.x;

        if (this.prevIndex.y === y && this.prevIndex.x === x) {
            console.log("returning zero because of same value ");
            return 0;
        }

        try {

            if (this.blocks[y][x] === "y" || this.blocks[y][x] === "f") {
                return 1;
            }
            else {
                return 0;
            }
        }
        catch (e) { return 0; }

    }

    /**
     * a return of 1 means that we can move there! a return of 0 means we cannot and we need to try somewhere else.
     */
    getDown() {
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
        catch (e) { return 0; }
    }
    /**
     * a return of 1 means that we can move there! a return of 0 means we cannot and we need to try somewhere else.
     */
    getLeft() {
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
        catch (e) { return 0; }

    }
    /**
     * a return of 1 means that we can move there! a return of 0 means we cannot and we need to try somewhere else.
     */
    getRight() {
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
        catch (e) { return 0; }

    }

    location() {
        return `[${this.currentIndex.y} down, ${this.currentIndex.x} across]`;
    }

    redrawPath() {

        var copy = this.blocks;

        copy[this.prevIndex.y][this.prevIndex.x] = "y";

        copy[this.currentIndex.y][this.currentIndex.x] = "a";


        var str = "";

        for (let i = 0; i < copy.length; i++) {
            str += "["
            for (let j = 0; j < copy[i].length; j++) {
                str += copy[i][j] + (j < copy[i].length - 1 ? "," : "");
            }

            str += "]\n";
        }
        console.log("Path with AI:\n" + str);
    }

    findNextMove(): number {

        console.log("previous index: " + this.prevIndex.y + " down, " + this.prevIndex.x + " across");
        var y = this.currentIndex.y;
        var x = this.currentIndex.x;
        console.log(`current location: [${this.location()}]`);
        if (this.target.y === y && this.target.x === x) {
            console.log("Finish Line Reached!");

            console.log(`path taken: ${this.path}`);

            return 1;
        }
        if (this.getUp() === 1) {
            this.prevIndex.x = this.currentIndex.x;
            this.prevIndex.y = this.currentIndex.y;
            this.moveUp();
            this.path += this.paths.UP;
            return 0;
        }
        if (this.getDown() === 1) {
            console.log("moving down");
            this.prevIndex.x = this.currentIndex.x;
            this.prevIndex.y = this.currentIndex.y;
            this.moveDown();
            this.path += this.paths.DOWN;
            return 0;
        }
        if (this.getLeft() === 1) {
            console.log("left");
            this.prevIndex.x = this.currentIndex.x;
            this.prevIndex.y = this.currentIndex.y;
            this.moveLeft();
            this.path += this.paths.LEFT;
            return 0;
        }
        if (this.getRight() === 1) {
            this.prevIndex.x = this.currentIndex.x;
            this.prevIndex.y = this.currentIndex.y;
            console.log("right");
            this.moveRight();
            this.path += this.paths.RIGHT;
            return 0;
        }

    }

    begin() {

        if (this.findNextMove() === 1)
            return;

        this.redrawPath();
        setTimeout(() => {
            this.begin();
        }, 200); // this is for effect!

    }

}


var ai: AI;
ai = new AI();

class Pathway {

    blocks: Object[][] = [[], []];

    setupPathway() {
        this.blocks = [
            ["x", "x", "x", "x", "x", "y", "f"],
            ["x", "y", "y", "y", "x", "y", "x"],
            ["x", "y", "x", "y", "x", "y", "x"],
            ["y", "y", "x", "y", "y", "y", "x"],
            ["y", "x", "x", "x", "x", "x", "s"],
            ["y", "y", "y", "y", "y", "y", "y"]
        ];
        var startingPoint = { x: 0, y: 0 };
        var x = ""; // sloppy codes could be better probably idk just dont want tos
        for (let i = 0; i < this.blocks.length; i++) {
            x += "["
            for (let j = 0; j < this.blocks[i].length; j++) {
                if (this.blocks[i][j] === "s") {
                    this.blocks[i][j] = "a"; // give it a configurable starting point?
                    startingPoint.y = i; // down (REMEMBER THIS ! IT'S WEIRD!)
                    startingPoint.x = j; // across
                }else if (this.blocks[i][j] === "f") {
                    ai.target.x = j;
                    ai.target.y = i;
                }
                x += this.blocks[i][j] + (j < this.blocks[i].length - 1 ? "," : "");
            }
            x += "]\n";
        }


        console.log("starting \"maze\":\n" + x);

        ai.currentIndex.x = startingPoint.x;
        ai.currentIndex.y = startingPoint.y;

        ai.setPath(this.blocks);
    }
}

new Pathway().setupPathway();


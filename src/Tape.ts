export class Tape {


    private position: Cell;
    private blank: string;

    constructor(blank: string) {
        this.position = undefined;
        this.blank = blank;
    }

    init(word: string) {
        for (let i = 0; i < word.length; i++) {
            let symbol = word.charAt(i);
            this.position = this.insertCell(symbol, this.position, undefined);
        }
        this.position = this.findLeftEnd(this.position);
    }

    private findLeftEnd(cell: Cell): Cell {
        let currentCell = cell;
        while (currentCell.left !== undefined) {
            currentCell = currentCell.left;
        }
        return currentCell;
    }

    private insertCell(symbol: string, left: Cell, right: Cell): Cell {
        let center = new Cell(symbol, left, right);
        if (left) {
            left.right = center;
        }
        if (right) {
            right.left = center;
        }
        return center;
    }

    public read(): string {
        return this.position.value;
    }

    public write(value: string) {
        this.position.value = value;
    }

    public moveLeft() {
        if (this.position.left === undefined) {
            this.position = this.insertCell(this.blank, undefined, this.position);
        } else {
            this.position = this.position.left;
        }
    }

    public moveRight() {
        if (this.position.right === undefined) {
            this.position = this.insertCell(this.blank, this.position, undefined);
        } else {
            this.position = this.position.right;
        }
    }

    public toString(): string {
        let currentCell = this.findLeftEnd(this.position);
        let printOut = "";
        do {
            printOut += currentCell.value;
            currentCell = currentCell.right;
        } while (currentCell != undefined);
        return printOut;
    }
}

class Cell {
    left: Cell;
    right: Cell;
    value: string;

    constructor(value: string, left: Cell, right: Cell) {
        this.value = value;
        this.left = left;
        this.right = right;
    }
}
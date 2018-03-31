import * as fs from "fs-extra";

import { Configuration, State, MOVEMENT } from "./Configuration";

export class TuringMachine {

    config: Configuration;
    tape: string[];
    position: number;
    state: State;

    constructor(config: Configuration) {
        this.config = config;
        this.tape = [];
        this.position = 0;
        this.state = config.start;
    }

    startWord(word: string) {
        for (let i = 0; i < word.length; i++) {
            let char = word.charAt(i);
            if (this.config.sigma.filter((elem) => elem === char).length > 0 || char === this.config.blank) {
                this.tape[i] = word.charAt(i);
            } else {
                throw new Error(`Character '${char} is not in the alphabet ${this.config.sigma}`);
            }
        }
    }

    run() {
        console.log("Starting turing machine with word " + this.tape);
        this.state = this.config.start;
        do {
            // console.log(`Executing state ${this.state.name} at position ${this.position}`);
            let nextState: any = this.executeState(this.state);
            // console.log(`Next state: ${nextState}, new position: ${this.position}`);
            this.state = this.config.getStateByName(nextState);
        } while (this.state != undefined)

        console.log("Finished turing machine with word " + this.tape);
        if (this.state === undefined) {
            console.log("Failed");
        } else if (this.config.accepting.filter((state) => state.name === this.state.name).length > 0) {
            console.log("This was a success");
        } else {
            console.log("failed");
        }
    }

    executeState(state: State): State {
        let symbol = this.readTape(this.position);
        if (symbol === undefined) {
            return undefined;
        }
        // console.log(`Read symbol ${symbol}`);
        let action = state.getActionForSymbol(symbol);
        // console.log(`Executing action ${action}`);
        this.tape[this.position] = action.write;
        let movementString: string;
        switch (action.move) {
            case MOVEMENT.LEFT:
                this.position -= 1;
                movementString = "left";
                break;
            case MOVEMENT.NONE:
                this.position = this.position;
                movementString = "nowhere";
                break;
            case MOVEMENT.RIGHT:
                this.position += 1;
                movementString = "right";
                break;
        }
        console.log(`State ${state.name}: Read symbol ${symbol}, writing symbol ${action.write}, moving ${movementString}, position ${this.position} next state: ${action.next.name}`);
        return action.next;
    }

    readTape(position: number) {
        if (position < 0) {
            return undefined;
        }
        let symbol = this.tape[this.position];
        if (symbol === undefined) {
            this.tape[this.position] = this.config.blank;
            symbol = this.config.blank;
        }
        return symbol;
    }

}
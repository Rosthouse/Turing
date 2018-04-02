import * as fs from "fs-extra";

import { Configuration, State, MOVEMENT } from "./Configuration";
import { Tape } from "./Tape";

export class TuringMachine {

    config: Configuration;
    tape: Tape;
    state: State;

    constructor(config: Configuration) {
        this.config = config;
        this.tape = new Tape(config.blank);
        this.state = config.start;
    }

    startWord(word: string) {
        this.tape.init(word);
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
            let nextState: any = this.executeState(this.state);
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
        let symbol = this.tape.read();
        let action = state.getActionForSymbol(symbol);
        this.tape.write(action.write);
        let movementString: string;
        switch (action.move) {
            case MOVEMENT.LEFT:
                this.tape.moveLeft();
                movementString = "left";
                break;
            case MOVEMENT.NONE:
                movementString = "nowhere";
                break;
            case MOVEMENT.RIGHT:
                this.tape.moveRight();
                movementString = "right";
                break;
        }
        console.log(`State ${state.name}: Read symbol ${symbol}, writing symbol ${action.write}, moving ${movementString}, position ${this.position} next state: ${action.next.name}`);
        return action.next;
    }
}
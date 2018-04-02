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
    }

    run() {
        console.log(`Starting turing machine with word "${this.tape.toString()}"`);
        this.state = this.config.start;
        do {
            let nextState: any = this.executeState(this.state); // Is a string
            this.state = this.config.getStateByName(nextState);
        } while (this.state != undefined && this.state.hasActions())

        console.log(`Starting turing machine with word "${this.tape.toString()}"`);
        if (this.config.accept(this.state)) {
            console.log("Word was accepted");
        } else if (this.config.reject(this.state)) {
            console.log("Word was rejected");
        } else {
            console.log("Undefined state. Something went terribly wrong");
        }
    }

    executeState(state: State): State {
        const symbol = this.tape.read();
        const action = state.getActionForSymbol(symbol);
        if (action === undefined) {
            console.log("No action found, stopping machinge");
            return undefined;
        }
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
        console.log(`State ${state.name}: Read symbol ${symbol}, writing symbol ${action.write}, moving ${movementString}, next state: ${action.next}`);
        return action.next;
    }
}
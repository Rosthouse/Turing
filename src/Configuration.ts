import * as fs from "fs";

export enum MOVEMENT {
    NONE,
    LEFT,
    RIGHT
}

export class Configuration {
    sigma: string[];
    start: State;
    states: State[];
    blank: string;
    accepting: State[];
    rejecting: State[];

    getStateByName(name: string): State {
        let state = this.states.filter((state) => state.name === name)[0];
        return state;
    }

    static readConfiguration(path: string): Configuration {
        return this.parseConfiguration(fs.readFileSync(path).toString());
    }

    static parseConfiguration(config: string): Configuration {
        let json = JSON.parse(config);
        let configuration: Configuration = new Configuration();
        configuration.sigma = json.sigma;
        configuration.blank = json.blank;
        configuration.states = this.parseStates(json.states);
        configuration.start = configuration.getStateByName(json.start);
        configuration.accepting = json.accepting.map((state) => configuration.getStateByName(state));
        configuration.rejecting = json.rejecting.map((state) => configuration.getStateByName(state));
        return configuration;
    }

    static parseStates(json: any[]): State[] {
        let states = [];
        for (let i = 0; i < json.length; i++) {
            let state = this.parseState(json[i]);
            states.push(state);
        }
        return states;
    }

    static parseState(json: any): State {

        let state = new State();
        state.name = json.name;
        state.actions = [];
        for (let i = 0; i < json.actions.length; i++) {
            state.actions.push(this.parseAction(json.actions[i]));
        }
        state.actions = json.actions.map((action) => this.parseAction(action));
        return state;
    }

    static parseAction(json: any): Action {
        let action = new Action();
        action.read = json.read;
        action.write = json.write;
        action.next = json.next;
        action.move = this.parseMovement(json.move);
        return action;
    }

    static parseMovement(char: any): MOVEMENT {
        let character: string = char;
        switch (character) {
            case "R": return MOVEMENT.RIGHT;
            case "L": return MOVEMENT.LEFT;
            case "N": return MOVEMENT.NONE;
            default: return undefined;
        }
    }
}

export class State {
    name: string;
    actions: Action[];

    getActionForSymbol(symbol: string): Action {
        let action = this.actions.filter((action) => action.read === symbol)[0];
        return action;
    }
}

export class Action {
    read: string;
    write: string;
    next: State;
    move: MOVEMENT
}
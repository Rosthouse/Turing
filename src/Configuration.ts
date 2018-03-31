
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
    rejectiong: State[];
}

export class State {
    name: string;
    actions: Action;
}

export class Action {
    read: string;
    write: string;
    next: State;
    move: MOVEMENT
}
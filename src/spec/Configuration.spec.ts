import { expect } from 'chai';

import { Configuration, State } from "../Configuration"

describe("Configuration", () => {

    it("should read a configuration from a path", () => {
        let configuration = Configuration.readConfiguration("./res/configuration.json");
        expect(configuration).to.not.be.undefined;
    });

    it("should contain six states", () => {
        let configuration = Configuration.readConfiguration("./res/configuration.json");
        expect(configuration.states).to.have.length(5);
    });

    it("should contain states with two actions", () => {
        let configuration = Configuration.readConfiguration("./res/configuration.json");
        let state = configuration.states[0];
        expect(state.actions).to.have.length(2);
    });

    it("should contain actions with movements", () => {
        let configuration = Configuration.readConfiguration("./res/configuration.json");
        let state = configuration.states[0];
        expect(state.actions).to.have.length(2);
    });

    it("should have a start state", () => {
        let configuration = Configuration.readConfiguration("./res/configuration.json");
        let start: State = configuration.start;
        expect(start.name).to.equal("s1");
    });
});
import { expect } from "chai";
import { TuringMachine } from "../TuringMachine";
import { Configuration, State } from "../Configuration";

describe("Turing Machine", () => {

    let config: Configuration;
    let machine: TuringMachine;

    beforeEach(() => {
        config = new Configuration();
        config.sigma = ["1"];
        config.blank = "0";
        config.start = new State();
        config.start.name = "Test";
        machine = new TuringMachine(config);
    });

    describe("Setup", () => {

        it("Should have a start state", () => {
            expect(machine.state.name).to.deep.equal("Test");
        });

        it("Should set a start word", () => {
            machine.startWord("111");
            expect(machine.tape).to.deep.equal(["1", "1", "1"]);
        });

        it("Should accept the blank sign", () => {
            machine.startWord("1101");
            expect(machine.tape).to.deep.equal(["1", "1", "0", "1"]);
        });

        it("Should refuse a character not in the alphabet", () => {
            try {
                machine.startWord("1A1");
                expect.fail("This shouldn't work")
            } catch (err) {
            }
        });

    });
    describe("Running", () => {
        let config: Configuration;

        beforeEach(() => {
            config = Configuration.readConfiguration("./res/configuration.json");
        });

        it("should execute a state", () => {
            machine.startWord("111");
            let newState: State = machine.executeState(config.start);

        })
    })
})
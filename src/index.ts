import { TuringMachine } from "./TuringMachine";
import { Configuration } from "./Configuration";

let configuration = Configuration.readConfiguration("res/configuration.json");
let machine = new TuringMachine(configuration);
machine.startWord("11000");
machine.run();
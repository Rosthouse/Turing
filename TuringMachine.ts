import { Configuration } from "./Configuration";

export class TuringMachine {

    readConfiguration(path: string): Configuration {
        JSON.parse(fs.readFileSync(path));
    }
}
import * as fs from "fs-extra";

import { Configuration } from "./Configuration";

export class TuringMachine {

    readConfiguration(path: string): Configuration {
        JSON.parse(fs.readFileSync(path));
        return undefined;
    }
}
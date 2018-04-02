import { TuringMachine } from "./TuringMachine";
import { Configuration } from "./Configuration";




import { Argv } from "yargs";


console.info(`CLI starter.`);

function serve(port: string) {
    console.info(`Serve on port ${port}.`);
}

require('yargs')
    .command("read", "Reads a word through a turing machine", (yargs: Argv) => {
        yargs
            .option('word', {
                alias: "w",
                describe: "A word to check with a turing machine",
                default: "",
            })
            .option('configuration', {
                alias: "c",
                default: "res/configuration.json",
            })
    }, (args: any) => {
        let configuration = Configuration.readConfiguration(args.configuration);
        let machine = new TuringMachine(configuration);
        // machine.startWord("101#101");
        // machine.startWord("##1##");
        machine.startWord(args.word);
        machine.run();
    }).argv;
import { ipAddressFilter } from "./ipAddressFilter";

if (process.argv.length < 4) {
    console.log("Please specify a number of task and required arguments");
}

const taskNumber = process.argv[2];
switch (taskNumber) {
    case "1":
        ipAddressFilter(process.argv.slice(3));
        break;
}
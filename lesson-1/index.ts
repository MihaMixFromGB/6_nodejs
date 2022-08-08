import { consoleLogPrimeNumbers } from './primeNumbers';
import { consoleLogCountDown } from './timer';

if (process.argv.length < 4) {
    console.log("Please specify a number of task and required arguments");
}

const taskNumber = process.argv[2];
switch (taskNumber) {
    case "1":
        consoleLogPrimeNumbers(process.argv.slice(3));
        break;
    case "2":
        consoleLogCountDown(process.argv.slice(3));
        break;
}
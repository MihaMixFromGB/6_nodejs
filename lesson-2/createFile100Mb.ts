import fs from "fs";

const FILENAME = "./lesson-2/access.log";
const recordTemplate = " - [30/Jan/2021:11:11:20 -0300] POST /foo HTTP/1.1 200 0 - curl/7.47.0" + "\n";

let size = 0;
do {
    fs.appendFileSync(FILENAME, getRandomIPAddress() + recordTemplate);
    size = fs.statSync(FILENAME).size;
} while (size < 1e8)

function getRandomIPAddress(): string {
    let ip = getRandomNumber(1, 256) + ".";
    ip += getRandomNumber(0, 256) + ".";
    ip += getRandomNumber(0, 256) + ".";
    ip += getRandomNumber(0, 256);

    return ip;
}

function getRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min) + min); 
}
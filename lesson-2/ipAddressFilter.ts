import { createReadStream, createWriteStream, WriteStream } from "fs";
import readLine from 'readline';

export function ipAddressFilter([logFile, filterStr]: string[]) {
    filterRequestToFile(logFile, filterStr);
}

function filterRequestToFile(logFile: string, filterStr: string) {
    
    const readStream = createReadStream(logFile, { encoding: 'utf-8'});
    const rl = readLine.createInterface(readStream);

    const pattern = getPatternToRegEx(filterStr);
    const regex = new RegExp(pattern, 'g');
    
    const writeStream: WriteStream = getWriteStream(filterStr);
    rl
        .on('line', (line) => {
            if (regex.test(line)) {
                writeStream.write(line + '\n');
            }
        })
        .on('close', () => writeStream?.close());
}

function getPatternToRegEx(filterStr: string): string {
    let pattern = filterStr
                    .replace("*", "\\d+")
                    .replace(".", "\\.");
    
    return pattern;
}

function getWriteStream(filterStr: string): WriteStream {
    const fileName = filterStr.replace(/\./g, "_")
                                .replace(/\*/g, "any");
    
    const writeStream = createWriteStream(`./lesson-2/${fileName}_requests.log`, {
        encoding: 'utf-8',
        flags: 'a'
    })

    return writeStream;
}
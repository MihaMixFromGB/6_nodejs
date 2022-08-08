import EventEmitter from "events";

interface ICountDown {
    days: number,
    hours: number,
    minutes: number,
    seconds: number,
    elapsedInSeconds: number
};
interface ITickPayload {
    name: string,
    countDown: ICountDown,
    eventEmitter: EventEmitter
}

export function consoleLogCountDown(datesStr: string[]): Record<string, NodeJS.Timer> {
    const timerIds: Record<string, NodeJS.Timer> = {};
    const eventEmitter = new EventEmitter();
    console.log("datesStr", datesStr);
    if (datesStr.length < 1) {
        console.log("No dates to start timers!");
        return timerIds;
    }

    let endDate: Date;
    let timerName: string;
    for (let i = 0; i < datesStr.length; i++) {
        timerName = `$timer-${i}`;
        if (!validateDate(timerName, datesStr[i])) {
            continue;
        }

        endDate = new Date(datesStr[i]);
        const timerId = createTimer(timerName, endDate, eventEmitter);
        timerIds[timerName] = timerId;

        eventEmitter.on("tick", handlerTick);
        eventEmitter.on("elapsed", (timerName) => {
            clearInterval(timerIds[timerName]);
            delete timerIds[timerName];
        });
    }

    return timerIds;
}

function validateDate(timerName: string, dateStr: string): boolean {
    const parseDate = Date.parse(dateStr);
    if (isNaN(parseDate)) {
        console.log(`${timerName}: Date isn't correct. Valid date format is 'YYYY-MM-DD hh:mm:ss'`);
        return false;
    }
    
    const date = new Date(parseDate);
    const nowDate = new Date();

    if (date < nowDate) {
        console.log(`${timerName}: You are late :(`);
        return false;
    }

    return true;
};

function createTimer(name: string, endDate: Date, eventEmitter: EventEmitter): NodeJS.Timer {
    const INTERVAL_IN_MS = 1000;
    
    const timerId = setInterval(() => {
        let countDown = getCountDown(endDate);
        eventEmitter.emit("tick", {name, countDown, eventEmitter});
    }, INTERVAL_IN_MS);

    return timerId;
};

function handlerTick(payload: ITickPayload) {
    const { name, countDown, eventEmitter } = payload;
    if (countDown.elapsedInSeconds < 0) {
        console.log("Timer is elapsed!");
        eventEmitter.emit("elapsed", name);
        return;
    }

    let countDownString = name + ":";
    countDownString += " " + countDown.days + " days";
    countDownString += " " + countDown.hours + " hours";
    countDownString += " " + countDown.minutes + " minutes";
    countDownString += " " + countDown.seconds + " seconds";

    console.log(countDownString);
};

function getCountDown(date: Date): ICountDown {
    let countDownInSeconds = (date.getTime() - (new Date()).getTime()) / 1000;
    const elapsedInSeconds = countDownInSeconds;

    const SECONDS_IN_ONE_DAY = 24 * 60 * 60;
    const SECONDS_IN_ONE_HOUR = 60 * 60;
    const SECONDS_IN_ONE_MINUTE = 60;

    const days = Math.floor(countDownInSeconds / SECONDS_IN_ONE_DAY);
    countDownInSeconds -= days * SECONDS_IN_ONE_DAY;
    countDownInSeconds = Math.round(countDownInSeconds);

    const hours = Math.floor(countDownInSeconds / SECONDS_IN_ONE_HOUR);
    countDownInSeconds -= hours * SECONDS_IN_ONE_HOUR;
    countDownInSeconds = Math.round(countDownInSeconds);

    const minutes = Math.floor(countDownInSeconds / SECONDS_IN_ONE_MINUTE);
    countDownInSeconds -= minutes * SECONDS_IN_ONE_MINUTE;
    countDownInSeconds = Math.round(countDownInSeconds);

    return {
        days,
        hours,
        minutes,
        seconds: countDownInSeconds,
        elapsedInSeconds
    }
};
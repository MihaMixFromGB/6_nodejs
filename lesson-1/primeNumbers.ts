import colors from 'colors';

export function consoleLogPrimeNumbers(range: string[]): void {
    const messageForNoPrimeNumbers = "There aren't any prime numbers in a specifed range!".red;
    const colorsOrder = [colors.green, colors.yellow, colors.red];

    const min = Number(range[0]);
    const max = Number(range[1]);

    const primes = getPrimeNumbers(min, max);

    if (primes.length === 0) {
        console.log(messageForNoPrimeNumbers);
    }

    let iColor = 0;
    primes.forEach(i => { 
        if (iColor > colorsOrder.length - 1) {
            iColor = 0
        }

        console.log(
            colorsOrder[iColor].call({}, i.toString())
        );
        iColor++;
    })
}

function getPrimeNumbers(min: number, max: number): number[] {
    const primes: number[] = [];
    
    if (!isIntegerArgs([min, max])) {
        return [];
    }
    if (max < 2 || max <= min) {
        return [];
    }

    min = (min < 2) ? 2 : min;

    for (let i = min; i <= max; i++) {
        if (isPrime(i)) {
            primes.push(i)
        }
    }

    return primes;
}

function isIntegerArgs(args: number[]): boolean {
    args.forEach(i => {
        if (!Number.isInteger(i)) {
            console.log(`${i} argument isn't integer!`.red);
            return false;
        }
    })

    return true;
}

function isPrime(num: number): boolean {
    for (let i = 2; i < Math.ceil(num/2); i++) {
        if ((num % i) === 0) {
            return false;
        }
    }

    return true;
}
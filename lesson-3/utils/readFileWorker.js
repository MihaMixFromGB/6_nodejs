// import { workerData, parentPort } from 'worker_threads';
// import fs from 'fs';
const { workerData, parentPort } = require('worker_threads');
const fs = require('fs');

const content = fs.readFileSync(workerData, { encoding: 'utf8' });

parentPort?.postMessage(content);
import "babel-core/register";
import "babel-polyfill";
import Scheduler from './index';

function sleep(ms) {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(), ms);
    });
}

Scheduler.scheduleJob(async () => {
    console.log('job begin');
    await sleep(5000);
    console.log('job end');
}, 3000);

setTimeout(() => Scheduler.cancelAll(), 2000);

console.log('code end');
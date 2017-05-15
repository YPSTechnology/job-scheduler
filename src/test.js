import 'babel-core/register';
import 'babel-polyfill';
import Scheduler from './index';

function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(() => resolve(), ms);
    });
}

Scheduler.scheduleJob(async () => {
    console.log('job step 1');
    await sleep(1000);
    console.log('job step 2');
    await sleep(1000);
    console.log('job step 3');
    await sleep(1000);
    console.log('job step 4');
    await sleep(1000);
    console.log('job step 5');
    await sleep(1000);
    console.log('job step 6');
}, 3000, { jobName: 'MyJob' });

setTimeout(() => Scheduler.cancelJob({ jobName: 'MyJob' }), 2000);

console.log('code end');

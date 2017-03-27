## About
[job-scheduler](https://github.com/YPSTechnology/job-scheduler) is a job manager for nodejs, providing job creation, rescheduling, cancel, etc.

## Installation
    npm install job-scheduler
    
## Quickstart
```javascript
const jobScheduler = require('job-scheduler');

jobScheduler.scheduleJob(function() {
  console.log('hello from job');      // log will be printed in 3000ms
}, 3000);
```

## API
### scheduleJob(`callback`, `time`, `options`)
Schedule a job, happening in `time`ms from now on.

* `callback` - (Function, Require) What to be done in the job.
* `time` - (Number, Optional, Default `zero`) A millisecond based time point, when will the job happen.
* `options` - (Object, Optional, Default `{}`) Job options.

  * `loop` - (Boolean, Optional, Default `false`) Whether it's a loop job. 
    * `true`, the job will happen every `time`ms(setInterval-like).
    * `false`, the job will happen only once in `time`ms from now on(setTimeout-like).
  * `exclusive` - (Boolean, Optional, Default `false`) If it's a `loop` job and `exclusive` is `true`. Job instances will happen one one by one, no overlap. The interval between job instances is `time`ms.
  * `argArray` - (Array, Optional, Default `undefined`) The argument array of `callback`;
  
You can also put any other properties in the `options` for searching jobs, described in subsequent APIs.
```javascript
jobScheduler.scheduleJob(function(args) {
  console.log('job args', args);      //job args [ 1, 2, 3 ]
}, 3000, {loop: true, exclusive: true, argArray: [1, 2, 3]});
```

### reschedule(`options`, `time`)
Reschedule a job(s).
* `options` - (Object, Optional, Default `{}`) Which job(s) will be rescheduled. Only the job(s) whose `options` is equal to or contains the given `options`, will be rescheduled. Default `options` means rescheduling all jobs.
* `time` - (Number, Optional, Default `zero`) Reschedule time.
```javascript
jobScheduler.scheduleJob(function() {
  console.log('job happen',);      // job will not happen in 3000ms.
}, 3000, {jobName: 'MyJob'});

// sleep 1 second

jobScheduler.reschedule({jobName: 'MyJob'}, 5000);  // job will happen in 5000ms from now on.
```

### cancelJob(`options`)
Cancel a job(s).
* `options` - (Object, Optional, Default `{}`) Which job(s) will be canceled, like `reschedule`.
```javascript
jobScheduler.scheduleJob(function() {
  console.log('job happen',);      // job will not happen.
}, 3000, {jobName: 'MyJob'});

// sleep 1 second

jobScheduler.cancelJob({jobName: 'MyJob'});
```

### cancelAll()
Cancel all jobs.
```javascript
jobScheduler.scheduleJob(function() {
  console.log('job1 happen',);      // job1 will not happen.
}, 3000, {jobName: 'MyJob1'});

jobScheduler.scheduleJob(function() {
  console.log('job2 happen',);      // job2 will not happen.
}, 3000, {jobName: 'MyJob2'});

// sleep 1 second

jobScheduler.cancelAll();
```

## doNow(`options`, `remove`)
Let a job(s) happen right now.
* `options` - (Object, Optional, Default `{}`) Which job(s) will be done now, like `reschedule`.
* `remove` - (Boolean, Optional, Default `false`) Whether to remove the job(s) after do it now.
  * `true` - Remove it after do it now.
  * `false` - Keep it after do it now, it will happen again when its scheduled time is coming.
```javascript
jobScheduler.scheduleJob(function() {
  console.log('job happen',);      // job will happen in 1000ms instead of 3000ms.
}, 3000, {jobName: 'MyJob'});

// sleep 1 second

jobScheduler.doNow({jobName: 'MyJob'}, true);
```

## Build the src
    npm run build
The build result will be in dist folder.
import DelayJob from './DelayJob';
import LoopJob from './LoopJob';

export default class Scheduler {
    constructor() {
        this.jobList = [];
    }

    // options:
    //   loop
    //   exclusive
    //   argArray
    scheduleJob(callback, time = 0, options = {}) {
        if (typeof callback !== 'function') {
            throw new Error('addJob: the first parameter is not a function');
        }
        if (options.loop) {
            let t = new LoopJob(callback, time, options);
            this.jobList.push(t);
            t.schedule();
        } else {
            let t = new DelayJob(callback, time, options);
            let length = this.jobList.push(t);
            t.schedule(() => this.jobList.splice(length - 1, 1));
        }
    }

    reschedule(options = {}, time = 0) {
        this.jobList.forEach((t, i) => {
            if (t.match(options)) {
                t.reschedule(time, () => this.jobList.splice(i, 1));
            }
        });
    }

    cancelJob(options = {}) {
        let taskIndices = [];
        this.jobList.forEach((t, i) => {
            if (t.match(options)) {
                t.cancel();
                taskIndices.push(i);
            }
        });
        taskIndices.forEach((i) => this.jobList.splice(i, 1));
    }

    cancelAll() {
        this.jobList.forEach((t) => t.cancel());
        this.jobList = [];
    }

    doNow(options, remove) {
        let taskIndices = [];
        this.jobList.forEach((t, i) => {
            if (t.match(options)) {
                t.run();
                if (remove) {
                    taskIndices.push(i);
                }
            }
        });
        taskIndices.forEach((i) => this.jobList.splice(i, 1));
    }
};
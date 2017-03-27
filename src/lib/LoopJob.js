export default class LoopJob {
    constructor(callback, interval, options) {
        this.callback = callback;
        this.interval = interval;
        this.options = options;
        this.loop = true;
    }

    schedule() {
        if (this.options.exclusive) {
            this.timer = setTimeout(this.runExclusively.bind(this), this.interval);
        } else {
            this.timer = setInterval(this.run.bind(this), this.interval);
        }
    }

    reschedule(time) {
        this.cancel();
        this.interval = time;
        if (this.options.exclusive) {
            this.timer = setTimeout(this.runExclusively.bind(this), this.interval);
        } else {
            this.timer = setInterval(this.run.bind(this), this.interval);
        }
    }

    runExclusively() {
        this.callback.apply(this.options.context, this.options.argArray);
        if (this.loop) {
            this.schedule();
        }
    }

    run() {
        this.callback.apply(this.options.context, this.options.argArray);
    }

    cancel() {
        this.loop = false;
        if (this.options.exclusive) {
            clearTimeout(this.timer);
        } else {
            clearInterval(this.timer);
        }
    }

    match(query) {
        if (typeof query == 'object' && typeof this.options.query == 'object') {
            for (let k in query) {
                if (query[k] !== this.options.query[k]) {
                    return false;
                }
            }
            return true;
        } else {
            return query === this.options.query;
        }
    }
}
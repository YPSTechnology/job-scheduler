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

    async runExclusively() {
        await this.callback(this.options.argArray);
        if (this.loop) {
            this.schedule();
        }
    }

    async run() {
        await this.callback(this.options.argArray);
    }

    cancel() {
        this.loop = false;
        if (this.options.exclusive) {
            clearTimeout(this.timer);
        } else {
            clearInterval(this.timer);
        }
    }

    match(options) {
        if (typeof options === 'object' && typeof this.options === 'object') {
            let equal = true;
            Object.keys(options).forEach((k) => {
                if (options[k] !== this.options[k]) {
                    equal = false;
                }
            });
            return equal;
        }
        return options === this.options;
    }
}

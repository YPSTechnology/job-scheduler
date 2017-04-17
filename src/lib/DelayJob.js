export default class DelayJob {
    constructor(callback, delay, options) {
        this.callback = callback;
        this.delay = delay;
        this.options = options;
    }

    schedule(onDestroyed) {
        this.timer = setTimeout(() => {
            this.run();
            onDestroyed();
        }, this.delay);
    }

    reschedule(time, onDestroyed) {
        this.cancel();
        this.delay = time;
        this.timer = setTimeout(() => {
            this.run();
            onDestroyed();
        }, this.delay);
    }

    run() {
        this.callback(this.options.argArray);
    }

    cancel() {
        clearTimeout(this.timer);
    }

    match(query) {
        if (typeof query === 'object' && typeof this.options.query === 'object') {
            let equal = true;
            Object.keys(query).forEach((k) => {
                if (query[k] !== this.options.query[k]) {
                    equal = false;
                }
            });
            return equal;
        }
        return query === this.options.query;
    }
}

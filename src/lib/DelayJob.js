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

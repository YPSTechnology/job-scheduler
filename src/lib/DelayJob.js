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
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LoopJob = function () {
    function LoopJob(callback, interval, options) {
        _classCallCheck(this, LoopJob);

        this.callback = callback;
        this.interval = interval;
        this.options = options;
        this.loop = true;
    }

    _createClass(LoopJob, [{
        key: 'schedule',
        value: function schedule() {
            if (this.options.exclusive) {
                this.timer = setTimeout(this.runExclusively.bind(this), this.interval);
            } else {
                this.timer = setInterval(this.run.bind(this), this.interval);
            }
        }
    }, {
        key: 'reschedule',
        value: function reschedule(time) {
            this.cancel();
            this.interval = time;
            if (this.options.exclusive) {
                this.timer = setTimeout(this.runExclusively.bind(this), this.interval);
            } else {
                this.timer = setInterval(this.run.bind(this), this.interval);
            }
        }
    }, {
        key: 'runExclusively',
        value: function runExclusively() {
            this.callback.apply(this.options.context, this.options.argArray);
            if (this.loop) {
                this.schedule();
            }
        }
    }, {
        key: 'run',
        value: function run() {
            this.callback.apply(this.options.context, this.options.argArray);
        }
    }, {
        key: 'cancel',
        value: function cancel() {
            this.loop = false;
            if (this.options.exclusive) {
                clearTimeout(this.timer);
            } else {
                clearInterval(this.timer);
            }
        }
    }, {
        key: 'match',
        value: function match(query) {
            var _this = this;

            if ((typeof query === 'undefined' ? 'undefined' : _typeof(query)) === 'object' && _typeof(this.options.query) === 'object') {
                var equal = true;
                Object.keys(query).forEach(function (k) {
                    if (query[k] !== _this.options.query[k]) {
                        equal = false;
                    }
                });
                return equal;
            }
            return query === this.options.query;
        }
    }]);

    return LoopJob;
}();

exports.default = LoopJob;
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DelayJob = function () {
    function DelayJob(callback, delay, options) {
        _classCallCheck(this, DelayJob);

        this.callback = callback;
        this.delay = delay;
        this.options = options;
    }

    _createClass(DelayJob, [{
        key: 'schedule',
        value: function schedule(onDestroyed) {
            var _this = this;

            this.timer = setTimeout(function () {
                _this.run();
                onDestroyed();
            }, this.delay);
        }
    }, {
        key: 'reschedule',
        value: function reschedule(time, onDestroyed) {
            var _this2 = this;

            this.cancel();
            this.delay = time;
            this.timer = setTimeout(function () {
                _this2.run();
                onDestroyed();
            }, this.delay);
        }
    }, {
        key: 'run',
        value: function run() {
            this.callback(this.options.argArray);
        }
    }, {
        key: 'cancel',
        value: function cancel() {
            clearTimeout(this.timer);
        }
    }, {
        key: 'match',
        value: function match(query) {
            var _this3 = this;

            if ((typeof query === 'undefined' ? 'undefined' : _typeof(query)) === 'object' && _typeof(this.options.query) === 'object') {
                var equal = true;
                Object.keys(query).forEach(function (k) {
                    if (query[k] !== _this3.options.query[k]) {
                        equal = false;
                    }
                });
                return equal;
            }
            return query === this.options.query;
        }
    }]);

    return DelayJob;
}();

exports.default = DelayJob;
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _DelayJob = require('./DelayJob');

var _DelayJob2 = _interopRequireDefault(_DelayJob);

var _LoopJob = require('./LoopJob');

var _LoopJob2 = _interopRequireDefault(_LoopJob);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Scheduler = function () {
    function Scheduler() {
        _classCallCheck(this, Scheduler);

        this.jobList = [];
    }

    // options:
    //   loop
    //   exclusive
    //   argArray


    _createClass(Scheduler, [{
        key: 'scheduleJob',
        value: function scheduleJob(callback) {
            var _this = this;

            var time = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

            if (typeof callback !== 'function') {
                throw new Error('addJob: the first parameter is not a function');
            }
            if (options.loop) {
                var t = new _LoopJob2.default(callback, time, options);
                this.jobList.push(t);
                t.schedule();
            } else {
                var _t = new _DelayJob2.default(callback, time, options);
                var length = this.jobList.push(_t);
                _t.schedule(function () {
                    return _this.jobList.splice(length - 1, 1);
                });
            }
        }
    }, {
        key: 'reschedule',
        value: function reschedule() {
            var _this2 = this;

            var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var time = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

            this.jobList.forEach(function (t, i) {
                if (t.match(options)) {
                    t.reschedule(time, function () {
                        return _this2.jobList.splice(i, 1);
                    });
                }
            });
        }
    }, {
        key: 'cancelJob',
        value: function cancelJob() {
            var _this3 = this;

            var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

            var taskIndices = [];
            this.jobList.forEach(function (t, i) {
                if (t.match(options)) {
                    t.cancel();
                    taskIndices.push(i);
                }
            });
            taskIndices.forEach(function (i) {
                return _this3.jobList.splice(i, 1);
            });
        }
    }, {
        key: 'cancelAll',
        value: function cancelAll() {
            this.jobList.forEach(function (t) {
                return t.cancel();
            });
            this.jobList = [];
        }
    }, {
        key: 'doNow',
        value: function doNow(options, remove) {
            var _this4 = this;

            var taskIndices = [];
            this.jobList.forEach(function (t, i) {
                if (t.match(options)) {
                    t.run();
                    if (remove) {
                        taskIndices.push(i);
                    }
                }
            });
            taskIndices.forEach(function (i) {
                return _this4.jobList.splice(i, 1);
            });
        }
    }]);

    return Scheduler;
}();

exports.default = Scheduler;
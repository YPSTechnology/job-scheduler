'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

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
        value: function () {
            var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.next = 2;
                                return this.callback(this.options.argArray);

                            case 2:
                                if (this.loop) {
                                    this.schedule();
                                }

                            case 3:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function runExclusively() {
                return _ref.apply(this, arguments);
            }

            return runExclusively;
        }()
    }, {
        key: 'run',
        value: function () {
            var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _context2.next = 2;
                                return this.callback(this.options.argArray);

                            case 2:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function run() {
                return _ref2.apply(this, arguments);
            }

            return run;
        }()
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
        value: function match(options) {
            var _this = this;

            if ((typeof options === 'undefined' ? 'undefined' : _typeof(options)) === 'object' && _typeof(this.options) === 'object') {
                var equal = true;
                Object.keys(options).forEach(function (k) {
                    if (options[k] !== _this.options[k]) {
                        equal = false;
                    }
                });
                return equal;
            }
            return options === this.options;
        }
    }]);

    return LoopJob;
}();

exports.default = LoopJob;
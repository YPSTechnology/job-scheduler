'use strict';

require('babel-core/register');

require('babel-polyfill');

var _index = require('./index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function sleep(ms) {
    return new Promise(function (resolve) {
        setTimeout(function () {
            return resolve();
        }, ms);
    });
}

_index2.default.scheduleJob(_asyncToGenerator(regeneratorRuntime.mark(function _callee() {
    return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
            switch (_context.prev = _context.next) {
                case 0:
                    console.log('job step 1');
                    _context.next = 3;
                    return sleep(1000);

                case 3:
                    console.log('job step 2');
                    _context.next = 6;
                    return sleep(1000);

                case 6:
                    console.log('job step 3');
                    _context.next = 9;
                    return sleep(1000);

                case 9:
                    console.log('job step 4');
                    _context.next = 12;
                    return sleep(1000);

                case 12:
                    console.log('job step 5');
                    _context.next = 15;
                    return sleep(1000);

                case 15:
                    console.log('job step 6');

                case 16:
                case 'end':
                    return _context.stop();
            }
        }
    }, _callee, undefined);
})), 3000, { loop: true, exclusive: true, jobName: 'MyJob' });

setTimeout(function () {
    return _index2.default.cancelJob({ jobName: 'MyJob' });
}, 10000);

console.log('code end');
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
                    console.log('job begin');
                    _context.next = 3;
                    return sleep(5000);

                case 3:
                    console.log('job end');

                case 4:
                case 'end':
                    return _context.stop();
            }
        }
    }, _callee, undefined);
})), 3000);

setTimeout(function () {
    return _index2.default.cancelAll();
}, 2000);

console.log('code end');